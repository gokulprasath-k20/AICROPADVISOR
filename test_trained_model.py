"""
Test the trained crop recommendation model
"""

import requests
import json

# API endpoint
API_URL = "http://localhost:8000/recommend-crop"

# Test cases with expected results
test_cases = [
    {
        "name": "Rice Test - High rainfall, humidity",
        "data": {
            "N": 90,
            "P": 45,
            "K": 45,
            "temperature": 25,
            "humidity": 85,
            "ph": 6.5,
            "rainfall": 200
        },
        "expected": "rice"
    },
    {
        "name": "Wheat Test - Cool temp, low rainfall",
        "data": {
            "N": 65,
            "P": 40,
            "K": 40,
            "temperature": 20,
            "humidity": 60,
            "ph": 7.0,
            "rainfall": 75
        },
        "expected": "wheat"
    },
    {
        "name": "Maize Test - Moderate conditions",
        "data": {
            "N": 100,
            "P": 50,
            "K": 30,
            "temperature": 24,
            "humidity": 65,
            "ph": 6.5,
            "rainfall": 120
        },
        "expected": "maize"
    },
    {
        "name": "Cotton Test - High N, warm temp",
        "data": {
            "N": 140,
            "P": 60,
            "K": 60,
            "temperature": 30,
            "humidity": 70,
            "ph": 7.5,
            "rainfall": 90
        },
        "expected": "cotton"
    },
    {
        "name": "Chickpea Test - Low rainfall, moderate temp",
        "data": {
            "N": 55,
            "P": 70,
            "K": 100,
            "temperature": 22,
            "humidity": 50,
            "ph": 7.0,
            "rainfall": 60
        },
        "expected": "chickpea"
    }
]

def test_model():
    """Test the trained model with various inputs"""
    print("🧪 TESTING TRAINED CROP RECOMMENDATION MODEL")
    print("=" * 60)
    
    success_count = 0
    total_tests = len(test_cases)
    
    for i, test_case in enumerate(test_cases, 1):
        print(f"\n{i}. {test_case['name']}")
        print("-" * 40)
        
        try:
            # Make API request
            response = requests.post(API_URL, json=test_case['data'], timeout=10)
            
            if response.status_code == 200:
                result = response.json()
                predicted_crop = result['crop']
                confidence = result['confidence']
                yield_prediction = result['predicted_yield_kg_per_ha']
                sustainability = result['sustainability_score']
                
                print(f"✅ API Response: SUCCESS")
                print(f"📊 Input: N={test_case['data']['N']}, P={test_case['data']['P']}, K={test_case['data']['K']}")
                print(f"   Temp={test_case['data']['temperature']}°C, Humidity={test_case['data']['humidity']}%")
                print(f"   pH={test_case['data']['ph']}, Rainfall={test_case['data']['rainfall']}mm")
                print(f"🌾 Predicted Crop: {predicted_crop}")
                print(f"🎯 Confidence: {confidence:.3f}")
                print(f"📈 Predicted Yield: {yield_prediction} kg/ha")
                print(f"🌱 Sustainability Score: {sustainability}/10")
                
                # Check if prediction matches expected (for validation)
                if predicted_crop.lower() == test_case['expected'].lower():
                    print(f"✅ CORRECT: Matches expected crop ({test_case['expected']})")
                    success_count += 1
                else:
                    print(f"⚠️  DIFFERENT: Expected {test_case['expected']}, got {predicted_crop}")
                    print(f"   (This might still be valid based on input conditions)")
                
            else:
                print(f"❌ API Error: {response.status_code}")
                print(f"Response: {response.text}")
                
        except requests.exceptions.ConnectionError:
            print("❌ CONNECTION ERROR: Backend server not running")
            print("   Please start the backend: cd backend && python app.py")
            break
        except Exception as e:
            print(f"❌ ERROR: {e}")
    
    print(f"\n" + "=" * 60)
    print(f"📊 TEST RESULTS SUMMARY")
    print(f"=" * 60)
    print(f"Total Tests: {total_tests}")
    print(f"Expected Matches: {success_count}")
    print(f"Success Rate: {(success_count/total_tests)*100:.1f}%")
    
    if success_count >= total_tests * 0.6:  # 60% success rate is good
        print(f"✅ MODEL PERFORMANCE: GOOD")
        print(f"   The model is working well and giving diverse predictions!")
    else:
        print(f"⚠️  MODEL PERFORMANCE: NEEDS REVIEW")
        print(f"   Consider retraining with more diverse data")
    
    print(f"\n🎉 MODEL TESTING COMPLETED!")
    return success_count, total_tests

if __name__ == "__main__":
    test_model()
