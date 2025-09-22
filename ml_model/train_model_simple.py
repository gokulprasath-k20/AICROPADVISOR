"""
Simple and Robust Crop Recommendation Model Training
Optimized for SIH 2025 - Jharkhand Agriculture App
"""

import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report
import joblib
import warnings
warnings.filterwarnings('ignore')

# Set random seed for reproducibility
np.random.seed(42)

def create_enhanced_dataset():
    """Create a comprehensive crop dataset with realistic parameters"""
    print("Creating enhanced crop dataset...")
    
    # Define crop types with their optimal growing conditions
    crops_data = {
        'rice': {
            'N': (80, 120), 'P': (40, 60), 'K': (40, 60), 
            'temp': (22, 30), 'humidity': (75, 90), 
            'ph': (5.5, 7.0), 'rainfall': (150, 300)
        },
        'wheat': {
            'N': (50, 80), 'P': (30, 50), 'K': (30, 50), 
            'temp': (15, 25), 'humidity': (50, 70), 
            'ph': (6.0, 7.5), 'rainfall': (50, 100)
        },
        'maize': {
            'N': (80, 120), 'P': (40, 60), 'K': (20, 40), 
            'temp': (20, 28), 'humidity': (55, 75), 
            'ph': (5.8, 7.0), 'rainfall': (80, 180)
        },
        'cotton': {
            'N': (120, 160), 'P': (40, 80), 'K': (40, 80), 
            'temp': (25, 35), 'humidity': (60, 80), 
            'ph': (5.8, 8.0), 'rainfall': (60, 120)
        },
        'sugarcane': {
            'N': (100, 150), 'P': (50, 80), 'K': (50, 80), 
            'temp': (24, 32), 'humidity': (70, 85), 
            'ph': (6.0, 7.5), 'rainfall': (120, 200)
        },
        'chickpea': {
            'N': (40, 70), 'P': (60, 85), 'K': (80, 120), 
            'temp': (18, 28), 'humidity': (40, 65), 
            'ph': (6.2, 7.8), 'rainfall': (30, 100)
        },
        'kidney_beans': {
            'N': (20, 40), 'P': (60, 80), 'K': (20, 40), 
            'temp': (20, 28), 'humidity': (60, 75), 
            'ph': (6.0, 7.5), 'rainfall': (80, 150)
        },
        'banana': {
            'N': (100, 120), 'P': (75, 85), 'K': (50, 60), 
            'temp': (26, 32), 'humidity': (75, 85), 
            'ph': (6.0, 7.5), 'rainfall': (100, 180)
        }
    }
    
    data = []
    samples_per_crop = 300  # Generate more samples for better training
    
    for crop, params in crops_data.items():
        for _ in range(samples_per_crop):
            # Add realistic variation to the data
            noise_factor = 0.15
            
            sample = {
                'N': np.random.uniform(params['N'][0], params['N'][1]) * (1 + np.random.uniform(-noise_factor, noise_factor)),
                'P': np.random.uniform(params['P'][0], params['P'][1]) * (1 + np.random.uniform(-noise_factor, noise_factor)),
                'K': np.random.uniform(params['K'][0], params['K'][1]) * (1 + np.random.uniform(-noise_factor, noise_factor)),
                'temperature': np.random.uniform(params['temp'][0], params['temp'][1]) * (1 + np.random.uniform(-noise_factor/2, noise_factor/2)),
                'humidity': np.random.uniform(params['humidity'][0], params['humidity'][1]) * (1 + np.random.uniform(-noise_factor/2, noise_factor/2)),
                'ph': np.random.uniform(params['ph'][0], params['ph'][1]) * (1 + np.random.uniform(-noise_factor/3, noise_factor/3)),
                'rainfall': np.random.uniform(params['rainfall'][0], params['rainfall'][1]) * (1 + np.random.uniform(-noise_factor, noise_factor)),
                'label': crop
            }
            
            # Ensure values are within reasonable bounds
            sample['N'] = max(10, min(200, sample['N']))
            sample['P'] = max(5, min(150, sample['P']))
            sample['K'] = max(5, min(300, sample['K']))
            sample['temperature'] = max(10, min(45, sample['temperature']))
            sample['humidity'] = max(20, min(100, sample['humidity']))
            sample['ph'] = max(4.0, min(9.0, sample['ph']))
            sample['rainfall'] = max(20, min(400, sample['rainfall']))
            
            data.append(sample)
    
    df = pd.DataFrame(data)
    df = df.sample(frac=1, random_state=42).reset_index(drop=True)  # Shuffle
    
    print(f"Dataset created with {len(df)} samples")
    print(f"Crops: {df['label'].unique()}")
    print(f"Samples per crop: {df['label'].value_counts().iloc[0]}")
    
    return df

def train_crop_model():
    """Train the crop recommendation model"""
    print("="*60)
    print("TRAINING CROP RECOMMENDATION MODEL")
    print("="*60)
    
    # Create dataset
    df = create_enhanced_dataset()
    
    # Prepare features and target
    features = ['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall']
    X = df[features]
    y = df['label']
    
    print(f"\nFeature columns: {features}")
    print(f"Target classes: {sorted(y.unique())}")
    
    # Split the data
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )
    
    print(f"\nTraining set: {X_train.shape}")
    print(f"Testing set: {X_test.shape}")
    
    # Train Random Forest model (best performing for this task)
    print("\nTraining Random Forest model...")
    model = RandomForestClassifier(
        n_estimators=200,
        max_depth=20,
        min_samples_split=5,
        min_samples_leaf=2,
        max_features='sqrt',
        random_state=42,
        n_jobs=-1
    )
    
    model.fit(X_train, y_train)
    
    # Evaluate the model
    y_pred = model.predict(X_test)
    accuracy = accuracy_score(y_test, y_pred)
    
    print(f"\nModel Performance:")
    print(f"Accuracy: {accuracy:.4f}")
    print(f"Training samples: {len(X_train)}")
    print(f"Test samples: {len(X_test)}")
    
    # Feature importance
    print(f"\nFeature Importance:")
    for feature, importance in zip(features, model.feature_importances_):
        print(f"{feature}: {importance:.4f}")
    
    # Detailed classification report
    print(f"\nDetailed Classification Report:")
    print(classification_report(y_test, y_pred))
    
    # Save the model
    model_filename = 'crop_recommendation_model.pkl'
    joblib.dump(model, model_filename)
    print(f"\nModel saved as: {model_filename}")
    
    # Copy to backend directory
    try:
        import shutil
        backend_path = '../backend/crop_recommendation_model.pkl'
        shutil.copy(model_filename, backend_path)
        print(f"Model copied to backend: {backend_path}")
    except Exception as e:
        print(f"Could not copy to backend: {e}")
    
    # Test the model with sample predictions
    print(f"\n" + "="*60)
    print("TESTING MODEL PREDICTIONS")
    print("="*60)
    
    test_cases = [
        # Rice conditions: High rainfall, humidity, moderate temp
        [90, 45, 45, 25, 85, 6.5, 200],
        # Wheat conditions: Low rainfall, cool temp
        [65, 40, 40, 20, 60, 7.0, 75],
        # Maize conditions: Moderate values
        [100, 50, 30, 24, 65, 6.5, 120],
        # Cotton conditions: High N, warm temp
        [140, 60, 60, 30, 70, 7.5, 90],
        # Chickpea conditions: Low rainfall, moderate temp
        [55, 70, 100, 22, 50, 7.0, 60]
    ]
    
    test_names = ['Rice Test', 'Wheat Test', 'Maize Test', 'Cotton Test', 'Chickpea Test']
    
    for i, (test_case, name) in enumerate(zip(test_cases, test_names)):
        prediction = model.predict([test_case])[0]
        probabilities = model.predict_proba([test_case])[0]
        confidence = max(probabilities)
        
        print(f"\n{name}:")
        print(f"Input: N={test_case[0]}, P={test_case[1]}, K={test_case[2]}, "
              f"Temp={test_case[3]}°C, Humidity={test_case[4]}%, "
              f"pH={test_case[5]}, Rainfall={test_case[6]}mm")
        print(f"Predicted Crop: {prediction}")
        print(f"Confidence: {confidence:.3f}")
    
    print(f"\n" + "="*60)
    print("MODEL TRAINING COMPLETED SUCCESSFULLY!")
    print("="*60)
    
    return model, accuracy

if __name__ == "__main__":
    model, accuracy = train_crop_model()
    print(f"\nFinal Model Accuracy: {accuracy:.4f}")
    print("Model is ready for use in the backend API!")
