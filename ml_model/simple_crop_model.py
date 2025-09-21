"""
Simplified AI-Based Crop Recommendation System for SIH 2025
This version uses basic libraries for immediate execution
"""

import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report
import pickle
import json

class SimpleCropRecommendationSystem:
    def __init__(self):
        self.model = None
        self.crops_info = {}
        
    def create_sample_data(self):
        """Create sample crop recommendation data"""
        np.random.seed(42)
        
        # Indian crop data with realistic parameters
        crops_data = {
            'rice': {'N': (80, 120), 'P': (40, 60), 'K': (40, 60), 'temp': (20, 27), 'humidity': (80, 90), 'ph': (5.5, 7.0), 'rainfall': (150, 300)},
            'wheat': {'N': (50, 80), 'P': (30, 50), 'K': (30, 50), 'temp': (12, 25), 'humidity': (55, 70), 'ph': (6.0, 7.5), 'rainfall': (30, 100)},
            'maize': {'N': (80, 120), 'P': (40, 60), 'K': (20, 40), 'temp': (18, 27), 'humidity': (55, 75), 'ph': (5.8, 7.0), 'rainfall': (65, 180)},
            'cotton': {'N': (120, 160), 'P': (40, 80), 'K': (40, 80), 'temp': (21, 30), 'humidity': (50, 80), 'ph': (5.8, 8.0), 'rainfall': (50, 150)},
            'sugarcane': {'N': (75, 150), 'P': (50, 80), 'K': (50, 80), 'temp': (21, 27), 'humidity': (75, 85), 'ph': (6.0, 7.5), 'rainfall': (75, 165)},
            'chickpea': {'N': (40, 70), 'P': (60, 85), 'K': (80, 120), 'temp': (17, 27), 'humidity': (65, 80), 'ph': (6.0, 7.5), 'rainfall': (65, 125)},
            'kidney_beans': {'N': (20, 40), 'P': (60, 80), 'K': (20, 40), 'temp': (15, 25), 'humidity': (65, 75), 'ph': (6.0, 7.0), 'rainfall': (60, 140)},
            'coconut': {'N': (125, 140), 'P': (50, 60), 'K': (120, 140), 'temp': (27, 35), 'humidity': (90, 95), 'ph': (5.2, 8.0), 'rainfall': (150, 250)},
            'banana': {'N': (100, 120), 'P': (75, 85), 'K': (50, 60), 'temp': (26, 30), 'humidity': (75, 85), 'ph': (6.0, 7.5), 'rainfall': (100, 180)},
            'apple': {'N': (20, 30), 'P': (125, 135), 'K': (200, 250), 'temp': (21, 24), 'humidity': (80, 90), 'ph': (5.5, 7.0), 'rainfall': (150, 180)}
        }
        
        data = []
        for crop, params in crops_data.items():
            for _ in range(150):  # 150 samples per crop
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
        
        self.df = pd.DataFrame(data)
        return self.df
    
    def analyze_data(self):
        """Analyze the dataset"""
        print("="*60)
        print("STEP 1: DATA UNDERSTANDING AND PREPROCESSING")
        print("="*60)
        
        print(f"Dataset shape: {self.df.shape}")
        print(f"\nFirst 5 rows:")
        print(self.df.head())
        
        print(f"\nColumn information:")
        print(f"Columns: {list(self.df.columns)}")
        print(f"Data types:\n{self.df.dtypes}")
        
        print(f"\nUnique crops and their counts:")
        crop_counts = self.df['label'].value_counts()
        print(crop_counts)
        
        print(f"\nSummary statistics:")
        numerical_features = ['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall']
        print(self.df[numerical_features].describe())
        
        return numerical_features
    
    def train_models(self):
        """Train and evaluate multiple models"""
        print("\n" + "="*60)
        print("STEP 2: MODEL BUILDING AND EVALUATION")
        print("="*60)
        
        # Prepare data
        features = ['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall']
        X = self.df[features]
        y = self.df['label']
        
        # Split data
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.2, random_state=42, stratify=y
        )
        
        print(f"Training set shape: {X_train.shape}")
        print(f"Testing set shape: {X_test.shape}")
        
        # Train Random Forest (best performing for this type of data)
        print("\n--- Training Random Forest Classifier ---")
        rf_model = RandomForestClassifier(n_estimators=100, random_state=42)
        rf_model.fit(X_train, y_train)
        
        # Make predictions
        y_pred = rf_model.predict(X_test)
        accuracy = accuracy_score(y_test, y_pred)
        
        print(f"Random Forest Accuracy: {accuracy:.4f}")
        print(f"\nClassification Report:")
        print(classification_report(y_test, y_pred))
        
        # Store the best model
        self.model = rf_model
        self.X_test = X_test
        self.y_test = y_test
        
        return rf_model, accuracy
    
    def optimize_and_save_model(self):
        """Optimize and save the model"""
        print("\n" + "="*60)
        print("STEP 3: MODEL OPTIMIZATION AND EXPORT")
        print("="*60)
        
        # For simplicity, we'll use the current model as optimized
        print("Using Random Forest with default parameters as the optimized model")
        print(f"Model accuracy: {accuracy_score(self.y_test, self.model.predict(self.X_test)):.4f}")
        
        # Save the model
        with open('crop_recommendation_model.pkl', 'wb') as f:
            pickle.dump(self.model, f)
        
        print("Model saved as 'crop_recommendation_model.pkl'")
        
        return self.model
    
    def create_prediction_function(self):
        """Create the crop recommendation function"""
        print("\n" + "="*60)
        print("STEP 4: BUILD A PREDICTION FUNCTION")
        print("="*60)
        
        def recommend_crop(N, P, K, temperature, humidity, ph, rainfall):
            """
            Recommend crop based on soil and climate conditions
            """
            try:
                # Load model if not already loaded
                if self.model is None:
                    with open('crop_recommendation_model.pkl', 'rb') as f:
                        model = pickle.load(f)
                else:
                    model = self.model
                
                # Create input array
                input_data = np.array([[N, P, K, temperature, humidity, ph, rainfall]])
                
                # Make prediction
                prediction = model.predict(input_data)
                return prediction[0]
                
            except Exception as e:
                return f"Error: {str(e)}"
        
        # Test the function
        print("Testing the recommendation function...")
        test_input = [90, 42, 43, 21, 82, 6.5, 203]
        print(f"Test input: N={test_input[0]}, P={test_input[1]}, K={test_input[2]}, "
              f"Temperature={test_input[3]}°C, Humidity={test_input[4]}%, "
              f"pH={test_input[5]}, Rainfall={test_input[6]}mm")
        
        result = recommend_crop(*test_input)
        print(f"Recommended crop: {result}")
        
        return recommend_crop
    
    def create_enhanced_function(self):
        """Create enhanced prediction with yield and sustainability"""
        print("\n" + "="*60)
        print("STEP 5: EXPAND FOR YIELD AND SUSTAINABILITY")
        print("="*60)
        
        def recommend_crop_enhanced(N, P, K, temperature, humidity, ph, rainfall):
            """
            Enhanced crop recommendation with yield and sustainability
            """
            try:
                # Get crop prediction
                if self.model is None:
                    with open('crop_recommendation_model.pkl', 'rb') as f:
                        model = pickle.load(f)
                else:
                    model = self.model
                
                input_data = np.array([[N, P, K, temperature, humidity, ph, rainfall]])
                crop_prediction = model.predict(input_data)[0]
                
                # Calculate yield (kg/ha) - simplified model
                base_yield = (N + P + K) / 10 * (humidity / 100)
                
                # Crop-specific multipliers
                yield_multipliers = {
                    'rice': 1.2, 'wheat': 1.0, 'maize': 1.3, 'cotton': 0.8,
                    'sugarcane': 2.5, 'chickpea': 0.7, 'kidney_beans': 0.6,
                    'coconut': 0.4, 'banana': 1.1, 'apple': 0.9
                }
                
                multiplier = yield_multipliers.get(crop_prediction, 1.0)
                predicted_yield = base_yield * multiplier * np.random.uniform(0.8, 1.2)
                predicted_yield = max(500, min(8000, predicted_yield))
                
                # Calculate sustainability score (1-10)
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
        
        # Test enhanced function
        print("Testing enhanced recommendation function...")
        test_input = [90, 42, 43, 21, 82, 6.5, 203]
        result = recommend_crop_enhanced(*test_input)
        
        print(f"Enhanced recommendation:")
        print(f"  Crop: {result['crop']}")
        print(f"  Predicted Yield: {result['predicted_yield_kg_per_ha']} kg/ha")
        print(f"  Sustainability Score: {result['sustainability_score']}/10")
        
        return recommend_crop_enhanced

def main():
    """Main execution function"""
    print("AI-Based Crop Recommendation System for SIH 2025")
    print("Simplified Version for Immediate Execution")
    print("="*60)
    
    # Initialize system
    crop_system = SimpleCropRecommendationSystem()
    
    # Step 1: Create and analyze data
    crop_system.create_sample_data()
    crop_system.analyze_data()
    
    # Step 2: Train models
    crop_system.train_models()
    
    # Step 3: Save model
    crop_system.optimize_and_save_model()
    
    # Step 4: Create prediction function
    recommend_crop = crop_system.create_prediction_function()
    
    # Step 5: Create enhanced function
    recommend_crop_enhanced = crop_system.create_enhanced_function()
    
    print("\n" + "="*60)
    print("MODEL TRAINING COMPLETED SUCCESSFULLY!")
    print("="*60)
    print("Files generated:")
    print("- crop_recommendation_model.pkl (Trained model)")
    
    # Additional test cases
    print("\n" + "="*60)
    print("ADDITIONAL TEST CASES")
    print("="*60)
    
    test_cases = [
        [20, 28, 30, 22, 60, 6.8, 80],    # Should suggest wheat
        [100, 50, 50, 25, 85, 6.5, 200], # Should suggest rice
        [80, 40, 30, 24, 70, 6.2, 120],  # Should suggest maize
    ]
    
    for i, test_case in enumerate(test_cases, 1):
        print(f"\nTest Case {i}: {test_case}")
        result = recommend_crop_enhanced(*test_case)
        print(f"  Recommended Crop: {result['crop']}")
        print(f"  Yield: {result['predicted_yield_kg_per_ha']} kg/ha")
        print(f"  Sustainability: {result['sustainability_score']}/10")
    
    return crop_system, recommend_crop, recommend_crop_enhanced

if __name__ == "__main__":
    crop_system, recommend_crop, recommend_crop_enhanced = main()
