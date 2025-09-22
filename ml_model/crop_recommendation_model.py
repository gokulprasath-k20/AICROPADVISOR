"""
AI-Based Crop Recommendation System for SIH 2025
Machine Learning Model Implementation
"""

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split, GridSearchCV, RandomizedSearchCV
from sklearn.ensemble import RandomForestClassifier
from sklearn.svm import SVC
from sklearn.naive_bayes import GaussianNB
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
import xgboost as xgb
import joblib
import warnings
warnings.filterwarnings('ignore')

# Set random seed for reproducibility
np.random.seed(42)

class CropRecommendationSystem:
    def __init__(self):
        self.models = {}
        self.best_model = None
        self.best_model_name = None
        self.X_train = None
        self.X_test = None
        self.y_train = None
        self.y_test = None
        
    def load_and_analyze_data(self, dataset_path='Crop_recommendation.csv'):
        """
        STEP 1: DATA UNDERSTANDING AND PREPROCESSING
        """
        print("="*60)
        print("STEP 1: DATA UNDERSTANDING AND PREPROCESSING")
        print("="*60)
        
        try:
            # Load the dataset
            self.df = pd.read_csv(dataset_path)
            print(f"Dataset loaded successfully! Shape: {self.df.shape}")
            
        except FileNotFoundError:
            print(f"Dataset not found at {dataset_path}")
            print("Creating a sample dataset for demonstration...")
            # Create a sample dataset if the original is not available
            self.df = self.create_sample_dataset()
        
        # Display first 5 rows
        print("\n1. First 5 rows of the dataset:")
        print(self.df.head())
        
        # Column information
        print("\n2. Dataset Information:")
        print(f"Columns: {list(self.df.columns)}")
        print(f"Data types:\n{self.df.dtypes}")
        print(f"Missing values:\n{self.df.isnull().sum()}")
        
        # Unique crops and their counts
        print("\n3. Unique crops in the dataset:")
        crop_counts = self.df['label'].value_counts()
        print(crop_counts)
        print(f"Total number of unique crops: {len(crop_counts)}")
        
        # Summary statistics
        print("\n4. Summary statistics for numerical features:")
        numerical_features = ['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall']
        print(self.df[numerical_features].describe())
        
        # Data preprocessing
        print("\n5. Data Preprocessing:")
        
        # Separate features and target
        X = self.df[numerical_features]
        y = self.df['label']
        
        print(f"Features shape: {X.shape}")
        print(f"Target shape: {y.shape}")
        
        # Split the data
        self.X_train, self.X_test, self.y_train, self.y_test = train_test_split(
            X, y, test_size=0.2, random_state=42, stratify=y
        )
        
        print(f"Training set shape: {self.X_train.shape}")
        print(f"Testing set shape: {self.X_test.shape}")
        
        # Visualize data distribution
        self.visualize_data_distribution()
        
        return self.X_train, self.X_test, self.y_train, self.y_test
    
    def create_sample_dataset(self):
        """Create a sample dataset if the original is not available"""
        np.random.seed(42)
        
        # Define crop types and their typical requirements
        crops_data = {
            'rice': {'N': (80, 120), 'P': (40, 60), 'K': (40, 60), 'temp': (20, 27), 'humidity': (80, 90), 'ph': (5.5, 7.0), 'rainfall': (150, 300)},
            'maize': {'N': (80, 120), 'P': (40, 60), 'K': (20, 40), 'temp': (18, 27), 'humidity': (55, 75), 'ph': (5.8, 7.0), 'rainfall': (65, 180)},
            'wheat': {'N': (50, 80), 'P': (30, 50), 'K': (30, 50), 'temp': (12, 25), 'humidity': (55, 70), 'ph': (6.0, 7.5), 'rainfall': (30, 100)},
            'cotton': {'N': (120, 160), 'P': (40, 80), 'K': (40, 80), 'temp': (21, 30), 'humidity': (50, 80), 'ph': (5.8, 8.0), 'rainfall': (50, 150)},
            'sugarcane': {'N': (75, 150), 'P': (50, 80), 'K': (50, 80), 'temp': (21, 27), 'humidity': (75, 85), 'ph': (6.0, 7.5), 'rainfall': (75, 165)},
            'kidney_beans': {'N': (20, 40), 'P': (60, 80), 'K': (20, 40), 'temp': (15, 25), 'humidity': (65, 75), 'ph': (6.0, 7.0), 'rainfall': (60, 140)},
            'chickpea': {'N': (40, 70), 'P': (60, 85), 'K': (80, 120), 'temp': (17, 27), 'humidity': (65, 80), 'ph': (6.0, 7.5), 'rainfall': (65, 125)},
            'coconut': {'N': (125, 140), 'P': (50, 60), 'K': (120, 140), 'temp': (27, 35), 'humidity': (90, 95), 'ph': (5.2, 8.0), 'rainfall': (150, 250)},
            'jute': {'N': (78, 85), 'P': (45, 55), 'K': (60, 70), 'temp': (25, 35), 'humidity': (75, 85), 'ph': (6.0, 7.5), 'rainfall': (120, 180)},
            'coffee': {'N': (100, 120), 'P': (15, 25), 'K': (60, 80), 'temp': (23, 30), 'humidity': (50, 70), 'ph': (6.0, 7.0), 'rainfall': (150, 250)}
        }
        
        data = []
        for crop, params in crops_data.items():
            for _ in range(220):  # Generate 220 samples per crop
                sample = {
                    'N': np.random.uniform(params['N'][0], params['N'][1]),
                    'P': np.random.uniform(params['P'][0], params['P'][1]),
                    'K': np.random.uniform(params['K'][0], params['K'][1]),
                    'temperature': np.random.uniform(params['temp'][0], params['temp'][1]),
                    'humidity': np.random.uniform(params['humidity'][0], params['humidity'][1]),
                    'ph': np.random.uniform(params['ph'][0], params['ph'][1]),
                    'rainfall': np.random.uniform(params['rainfall'][0], params['rainfall'][1]),
                    'label': crop
                }
                data.append(sample)
        
        return pd.DataFrame(data)
    
    def visualize_data_distribution(self):
        """Visualize the data distribution"""
        try:
            # Use non-interactive backend for headless environments
            plt.switch_backend('Agg')
            
            plt.figure(figsize=(15, 10))
            
            # Plot 1: Crop distribution
            plt.subplot(2, 3, 1)
            self.df['label'].value_counts().plot(kind='bar', rot=45)
            plt.title('Distribution of Crops')
            plt.xlabel('Crops')
            plt.ylabel('Count')
            
            # Plot 2-6: Feature distributions (limit to 5 features to fit in 2x3 grid)
            numerical_features = ['N', 'P', 'K', 'temperature', 'humidity']
            for i, feature in enumerate(numerical_features, 2):
                plt.subplot(2, 3, i)
                plt.hist(self.df[feature], bins=30, alpha=0.7)
                plt.title(f'Distribution of {feature}')
                plt.xlabel(feature)
                plt.ylabel('Frequency')
            
            plt.tight_layout()
            plt.savefig('data_distribution.png', dpi=300, bbox_inches='tight')
            print("Data distribution plot saved as 'data_distribution.png'")
            
            # Correlation heatmap
            plt.figure(figsize=(10, 8))
            numerical_features_all = ['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall']
            correlation_matrix = self.df[numerical_features_all].corr()
            sns.heatmap(correlation_matrix, annot=True, cmap='coolwarm', center=0)
            plt.title('Feature Correlation Heatmap')
            plt.tight_layout()
            plt.savefig('correlation_heatmap.png', dpi=300, bbox_inches='tight')
            print("Correlation heatmap saved as 'correlation_heatmap.png'")
            
        except Exception as e:
            print(f"Visualization skipped due to display issues: {e}")
            print("Continuing with model training...")
    
    def train_and_evaluate_models(self):
        """
        STEP 2: MODEL BUILDING AND EVALUATION
        """
        print("\n" + "="*60)
        print("STEP 2: MODEL BUILDING AND EVALUATION")
        print("="*60)
        
        # Initialize models with better parameters for crop recommendation
        models = {
            'Random Forest': RandomForestClassifier(
                n_estimators=100,
                max_depth=15,
                min_samples_split=5,
                min_samples_leaf=2,
                random_state=42,
                n_jobs=-1
            ),
            'XGBoost': xgb.XGBClassifier(
                n_estimators=100,
                max_depth=6,
                learning_rate=0.1,
                subsample=0.8,
                colsample_bytree=0.8,
                random_state=42,
                eval_metric='mlogloss',
                n_jobs=-1
            ),
            'SVM': SVC(
                C=10,
                kernel='rbf',
                gamma='scale',
                random_state=42,
                probability=True  # Enable probability estimates
            ),
            'Gaussian Naive Bayes': GaussianNB()
        }
        
        results = {}
        
        for name, model in models.items():
            print(f"\n--- Training {name} ---")
            
            # Train the model
            model.fit(self.X_train, self.y_train)
            
            # Make predictions
            y_pred = model.predict(self.X_test)
            
            # Calculate accuracy
            accuracy = accuracy_score(self.y_test, y_pred)
            results[name] = accuracy
            
            print(f"Accuracy: {accuracy:.4f}")
            
            # Classification report
            print(f"\nClassification Report for {name}:")
            print(classification_report(self.y_test, y_pred))
            
            # Confusion matrix
            try:
                cm = confusion_matrix(self.y_test, y_pred)
                plt.figure(figsize=(10, 8))
                sns.heatmap(cm, annot=True, fmt='d', cmap='Blues')
                plt.title(f'Confusion Matrix - {name}')
                plt.xlabel('Predicted')
                plt.ylabel('Actual')
                plt.tight_layout()
                plt.savefig(f'confusion_matrix_{name.replace(" ", "_").lower()}.png', dpi=300, bbox_inches='tight')
                print(f"Confusion matrix saved for {name}")
                plt.close()  # Close the figure to free memory
            except Exception as e:
                print(f"Confusion matrix visualization skipped for {name}: {e}")
            
            # Store the model
            self.models[name] = model
        
        # Find the best model
        self.best_model_name = max(results, key=results.get)
        self.best_model = self.models[self.best_model_name]
        
        print(f"\n--- MODEL COMPARISON ---")
        for name, accuracy in sorted(results.items(), key=lambda x: x[1], reverse=True):
            print(f"{name}: {accuracy:.4f}")
        
        print(f"\nBest performing model: {self.best_model_name} with accuracy: {results[self.best_model_name]:.4f}")
        
        return results
    
    def optimize_best_model(self):
        """
        STEP 3: MODEL OPTIMIZATION AND EXPORT
        """
        print("\n" + "="*60)
        print("STEP 3: MODEL OPTIMIZATION AND EXPORT")
        print("="*60)
        
        print(f"Optimizing {self.best_model_name}...")
        
        if self.best_model_name == 'Random Forest':
            param_grid = {
                'n_estimators': [100, 200, 300],
                'max_depth': [10, 20, None],
                'max_features': ['sqrt', 'log2'],
                'min_samples_split': [2, 5, 10]
            }
            
        elif self.best_model_name == 'XGBoost':
            param_grid = {
                'n_estimators': [100, 200, 300],
                'max_depth': [3, 6, 10],
                'learning_rate': [0.01, 0.1, 0.2],
                'subsample': [0.8, 0.9, 1.0]
            }
            
        elif self.best_model_name == 'SVM':
            param_grid = {
                'C': [0.1, 1, 10, 100],
                'kernel': ['rbf', 'poly', 'sigmoid'],
                'gamma': ['scale', 'auto']
            }
            
        else:  # Gaussian Naive Bayes
            param_grid = {
                'var_smoothing': [1e-9, 1e-8, 1e-7, 1e-6]
            }
        
        # Perform GridSearchCV
        if self.best_model_name == 'Random Forest':
            base_model = RandomForestClassifier(random_state=42)
        elif self.best_model_name == 'XGBoost':
            base_model = xgb.XGBClassifier(random_state=42, eval_metric='mlogloss')
        elif self.best_model_name == 'SVM':
            base_model = SVC(random_state=42)
        else:
            base_model = GaussianNB()
        
        grid_search = GridSearchCV(
            base_model, 
            param_grid, 
            cv=5, 
            scoring='accuracy', 
            n_jobs=-1,
            verbose=1
        )
        
        grid_search.fit(self.X_train, self.y_train)
        
        # Get the best model
        self.best_model = grid_search.best_estimator_
        
        print(f"Best parameters: {grid_search.best_params_}")
        print(f"Best cross-validation score: {grid_search.best_score_:.4f}")
        
        # Final evaluation
        final_predictions = self.best_model.predict(self.X_test)
        final_accuracy = accuracy_score(self.y_test, final_predictions)
        
        print(f"Final optimized model accuracy: {final_accuracy:.4f}")
        
        # Save the model
        model_filename = 'crop_recommendation_model.pkl'
        joblib.dump(self.best_model, model_filename)
        print(f"Model saved as {model_filename}")
        
        # Also save to backend directory for API use
        try:
            import shutil
            backend_model_path = '../backend/crop_recommendation_model.pkl'
            shutil.copy(model_filename, backend_model_path)
            print(f"Model also copied to backend directory: {backend_model_path}")
        except Exception as e:
            print(f"Could not copy to backend directory: {e}")
        
        return self.best_model, final_accuracy
    
    def create_prediction_function(self):
        """
        STEP 4: BUILD A PREDICTION FUNCTION
        """
        print("\n" + "="*60)
        print("STEP 4: BUILD A PREDICTION FUNCTION")
        print("="*60)
        
        def recommend_crop(N, P, K, temperature, humidity, ph, rainfall, model_path='crop_recommendation_model.pkl'):
            """
            Recommend crop based on soil and climate conditions
            
            Parameters:
            N, P, K: Soil nutrient levels
            temperature: Temperature in Celsius
            humidity: Humidity percentage
            ph: Soil pH level
            rainfall: Rainfall in mm
            model_path: Path to the saved model
            
            Returns:
            str: Recommended crop name
            """
            try:
                # Load the saved model
                model = joblib.load(model_path)
                
                # Create input array
                input_data = np.array([[N, P, K, temperature, humidity, ph, rainfall]])
                
                # Make prediction
                prediction = model.predict(input_data)
                
                return prediction[0]
            
            except Exception as e:
                return f"Error in prediction: {str(e)}"
        
        # Test the function
        print("Testing the recommendation function...")
        test_input = [90, 42, 43, 21, 82, 6.5, 203]
        print(f"Test input: N={test_input[0]}, P={test_input[1]}, K={test_input[2]}, "
              f"Temperature={test_input[3]}°C, Humidity={test_input[4]}%, "
              f"pH={test_input[5]}, Rainfall={test_input[6]}mm")
        
        recommended_crop = recommend_crop(*test_input)
        print(f"Recommended crop: {recommended_crop}")
        
        return recommend_crop
    
    def create_enhanced_prediction_function(self):
        """
        STEP 5: EXPAND FOR YIELD AND SUSTAINABILITY
        """
        print("\n" + "="*60)
        print("STEP 5: EXPAND FOR YIELD AND SUSTAINABILITY")
        print("="*60)
        
        def recommend_crop_enhanced(N, P, K, temperature, humidity, ph, rainfall, model_path='crop_recommendation_model.pkl'):
            """
            Enhanced crop recommendation with yield prediction and sustainability score
            
            Returns:
            dict: {
                'crop': crop_name,
                'predicted_yield_kg_per_ha': yield_value,
                'sustainability_score': score
            }
            """
            try:
                # Load the saved model
                model = joblib.load(model_path)
                
                # Create input array
                input_data = np.array([[N, P, K, temperature, humidity, ph, rainfall]])
                
                # Make prediction
                crop_prediction = model.predict(input_data)[0]
                
                # Calculate simulated yield (kg/ha)
                base_yield = (N + P + K) / 10 * (humidity / 100)
                
                # Crop-specific yield multipliers (simulated)
                yield_multipliers = {
                    'rice': 1.2, 'wheat': 1.0, 'maize': 1.3, 'cotton': 0.8,
                    'sugarcane': 2.5, 'kidney_beans': 0.6, 'chickpea': 0.7,
                    'coconut': 0.4, 'jute': 0.9, 'coffee': 0.5
                }
                
                multiplier = yield_multipliers.get(crop_prediction, 1.0)
                predicted_yield = base_yield * multiplier * np.random.uniform(0.8, 1.2)  # Add some randomness
                predicted_yield = max(500, min(8000, predicted_yield))  # Clamp between realistic values
                
                # Calculate sustainability score (1-10)
                # Lower water and fertilizer requirements = higher sustainability
                water_score = max(0, 10 - (rainfall / 200))
                fertilizer_score = max(0, 10 - (N / 100))
                ph_score = 10 if 6.0 <= ph <= 7.5 else max(0, 10 - abs(ph - 6.75) * 2)
                
                sustainability_score = (water_score + fertilizer_score + ph_score) / 3
                sustainability_score = max(1, min(10, sustainability_score))
                
                return {
                    'crop': crop_prediction,
                    'predicted_yield_kg_per_ha': round(predicted_yield, 2),
                    'sustainability_score': round(sustainability_score, 2)
                }
                
            except Exception as e:
                return {
                    'crop': f"Error: {str(e)}",
                    'predicted_yield_kg_per_ha': 0,
                    'sustainability_score': 0
                }
        
        # Test the enhanced function
        print("Testing the enhanced recommendation function...")
        test_input = [90, 42, 43, 21, 82, 6.5, 203]
        print(f"Test input: N={test_input[0]}, P={test_input[1]}, K={test_input[2]}, "
              f"Temperature={test_input[3]}°C, Humidity={test_input[4]}%, "
              f"pH={test_input[5]}, Rainfall={test_input[6]}mm")
        
        result = recommend_crop_enhanced(*test_input)
        print(f"Enhanced recommendation result:")
        print(f"  Crop: {result['crop']}")
        print(f"  Predicted Yield: {result['predicted_yield_kg_per_ha']} kg/ha")
        print(f"  Sustainability Score: {result['sustainability_score']}/10")
        
        return recommend_crop_enhanced

def main():
    """Main execution function"""
    print("AI-Based Crop Recommendation System for SIH 2025")
    print("=" * 60)
    
    # Initialize the system
    crop_system = CropRecommendationSystem()
    
    # Step 1: Load and analyze data
    crop_system.load_and_analyze_data()
    
    # Step 2: Train and evaluate models
    crop_system.train_and_evaluate_models()
    
    # Step 3: Optimize the best model
    crop_system.optimize_best_model()
    
    # Step 4: Create prediction function
    recommend_crop = crop_system.create_prediction_function()
    
    # Step 5: Create enhanced prediction function
    recommend_crop_enhanced = crop_system.create_enhanced_prediction_function()
    
    print("\n" + "="*60)
    print("MODEL TRAINING COMPLETED SUCCESSFULLY!")
    print("="*60)
    print("Files generated:")
    print("- best_crop_recommendation_model.pkl (Trained model)")
    print("- data_distribution.png (Data visualization)")
    print("- correlation_heatmap.png (Feature correlations)")
    print("- confusion_matrix_*.png (Model evaluation plots)")
    
    return crop_system, recommend_crop, recommend_crop_enhanced

if __name__ == "__main__":
    crop_system, recommend_crop, recommend_crop_enhanced = main()
