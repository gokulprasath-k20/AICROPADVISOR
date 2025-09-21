"""
Create a sample crop recommendation dataset for testing
This simulates the Kaggle Crop Recommendation Dataset
"""

import pandas as pd
import numpy as np

def create_crop_dataset():
    """Create a comprehensive crop recommendation dataset"""
    np.random.seed(42)
    
    # Define crop types and their typical requirements for Indian agriculture
    crops_data = {
        'rice': {
            'N': (80, 120), 'P': (40, 60), 'K': (40, 60), 
            'temp': (20, 27), 'humidity': (80, 90), 
            'ph': (5.5, 7.0), 'rainfall': (150, 300)
        },
        'maize': {
            'N': (80, 120), 'P': (40, 60), 'K': (20, 40), 
            'temp': (18, 27), 'humidity': (55, 75), 
            'ph': (5.8, 7.0), 'rainfall': (65, 180)
        },
        'wheat': {
            'N': (50, 80), 'P': (30, 50), 'K': (30, 50), 
            'temp': (12, 25), 'humidity': (55, 70), 
            'ph': (6.0, 7.5), 'rainfall': (30, 100)
        },
        'cotton': {
            'N': (120, 160), 'P': (40, 80), 'K': (40, 80), 
            'temp': (21, 30), 'humidity': (50, 80), 
            'ph': (5.8, 8.0), 'rainfall': (50, 150)
        },
        'sugarcane': {
            'N': (75, 150), 'P': (50, 80), 'K': (50, 80), 
            'temp': (21, 27), 'humidity': (75, 85), 
            'ph': (6.0, 7.5), 'rainfall': (75, 165)
        },
        'kidney_beans': {
            'N': (20, 40), 'P': (60, 80), 'K': (20, 40), 
            'temp': (15, 25), 'humidity': (65, 75), 
            'ph': (6.0, 7.0), 'rainfall': (60, 140)
        },
        'chickpea': {
            'N': (40, 70), 'P': (60, 85), 'K': (80, 120), 
            'temp': (17, 27), 'humidity': (65, 80), 
            'ph': (6.0, 7.5), 'rainfall': (65, 125)
        },
        'coconut': {
            'N': (125, 140), 'P': (50, 60), 'K': (120, 140), 
            'temp': (27, 35), 'humidity': (90, 95), 
            'ph': (5.2, 8.0), 'rainfall': (150, 250)
        },
        'jute': {
            'N': (78, 85), 'P': (45, 55), 'K': (60, 70), 
            'temp': (25, 35), 'humidity': (75, 85), 
            'ph': (6.0, 7.5), 'rainfall': (120, 180)
        },
        'coffee': {
            'N': (100, 120), 'P': (15, 25), 'K': (60, 80), 
            'temp': (23, 30), 'humidity': (50, 70), 
            'ph': (6.0, 7.0), 'rainfall': (150, 250)
        },
        'banana': {
            'N': (100, 120), 'P': (75, 85), 'K': (50, 60), 
            'temp': (26, 30), 'humidity': (75, 85), 
            'ph': (6.0, 7.5), 'rainfall': (100, 180)
        },
        'grapes': {
            'N': (23, 30), 'P': (130, 140), 'K': (200, 250), 
            'temp': (23, 25), 'humidity': (80, 90), 
            'ph': (6.0, 8.0), 'rainfall': (150, 250)
        },
        'watermelon': {
            'N': (100, 120), 'P': (10, 15), 'K': (50, 70), 
            'temp': (24, 27), 'humidity': (65, 75), 
            'ph': (6.0, 7.0), 'rainfall': (40, 60)
        },
        'muskmelon': {
            'N': (100, 120), 'P': (10, 15), 'K': (50, 70), 
            'temp': (27, 32), 'humidity': (85, 95), 
            'ph': (6.0, 7.0), 'rainfall': (20, 40)
        },
        'apple': {
            'N': (20, 30), 'P': (125, 135), 'K': (200, 250), 
            'temp': (21, 24), 'humidity': (80, 90), 
            'ph': (5.5, 7.0), 'rainfall': (150, 180)
        },
        'orange': {
            'N': (20, 30), 'P': (10, 15), 'K': (10, 15), 
            'temp': (25, 30), 'humidity': (90, 95), 
            'ph': (6.0, 7.5), 'rainfall': (100, 120)
        },
        'papaya': {
            'N': (50, 60), 'P': (55, 65), 'K': (60, 70), 
            'temp': (25, 30), 'humidity': (85, 95), 
            'ph': (6.0, 6.5), 'rainfall': (45, 55)
        },
        'pomegranate': {
            'N': (20, 25), 'P': (10, 15), 'K': (40, 50), 
            'temp': (18, 22), 'humidity': (85, 95), 
            'ph': (6.5, 7.5), 'rainfall': (50, 70)
        },
        'lentil': {
            'N': (20, 25), 'P': (60, 70), 'K': (80, 90), 
            'temp': (25, 28), 'humidity': (65, 70), 
            'ph': (6.0, 7.5), 'rainfall': (25, 50)
        },
        'blackgram': {
            'N': (40, 50), 'P': (60, 70), 'K': (20, 25), 
            'temp': (25, 35), 'humidity': (65, 75), 
            'ph': (6.0, 7.0), 'rainfall': (60, 70)
        },
        'mungbean': {
            'N': (20, 25), 'P': (40, 50), 'K': (20, 25), 
            'temp': (27, 32), 'humidity': (80, 90), 
            'ph': (6.2, 7.2), 'rainfall': (75, 100)
        },
        'mothbeans': {
            'N': (20, 25), 'P': (40, 50), 'K': (20, 25), 
            'temp': (27, 32), 'humidity': (65, 75), 
            'ph': (6.5, 7.5), 'rainfall': (25, 50)
        },
        'pigeonpeas': {
            'N': (20, 25), 'P': (60, 70), 'K': (20, 25), 
            'temp': (18, 29), 'humidity': (60, 65), 
            'ph': (6.0, 7.0), 'rainfall': (60, 65)
        }
    }
    
    data = []
    samples_per_crop = 100  # Generate 100 samples per crop
    
    for crop, params in crops_data.items():
        for _ in range(samples_per_crop):
            # Add some noise to make the data more realistic
            noise_factor = 0.1
            
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
            sample['N'] = max(0, min(200, sample['N']))
            sample['P'] = max(0, min(150, sample['P']))
            sample['K'] = max(0, min(300, sample['K']))
            sample['temperature'] = max(8, min(45, sample['temperature']))
            sample['humidity'] = max(10, min(100, sample['humidity']))
            sample['ph'] = max(3.5, min(10, sample['ph']))
            sample['rainfall'] = max(20, min(400, sample['rainfall']))
            
            data.append(sample)
    
    df = pd.DataFrame(data)
    
    # Shuffle the dataset
    df = df.sample(frac=1, random_state=42).reset_index(drop=True)
    
    return df

if __name__ == "__main__":
    # Create the dataset
    df = create_crop_dataset()
    
    # Save to CSV
    df.to_csv('Crop_recommendation.csv', index=False)
    
    print(f"Dataset created successfully!")
    print(f"Shape: {df.shape}")
    print(f"Crops: {df['label'].unique()}")
    print(f"Samples per crop: {df['label'].value_counts().iloc[0]}")
    print("\nFirst 5 rows:")
    print(df.head())
    print("\nDataset saved as 'Crop_recommendation.csv'")
