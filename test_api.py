"""
Test script for Crop Advisor API
"""

import requests
import json

def test_api():
    base_url = "http://localhost:8000"
    
    print("🌾 Testing Crop Advisor API")
    print("=" * 40)
    
    # Test 1: Health check
    try:
        response = requests.get(f"{base_url}/health")
        if response.status_code == 200:
            print("✅ Health check passed")
            data = response.json()
            print(f"   Status: {data['status']}")
            print(f"   Model loaded: {data['model_loaded']}")
        else:
            print("❌ Health check failed")
    except Exception as e:
        print(f"❌ Could not connect to API: {e}")
        return
    
    # Test 2: Root endpoint
    try:
        response = requests.get(f"{base_url}/")
        if response.status_code == 200:
            print("✅ Root endpoint working")
            data = response.json()
            print(f"   Message: {data['message']}")
        else:
            print("❌ Root endpoint failed")
    except Exception as e:
        print(f"❌ Root endpoint error: {e}")
    
    # Test 3: Crop recommendation
    try:
        test_data = {
            "N": 90,
            "P": 42,
            "K": 43,
            "temperature": 21,
            "humidity": 82,
            "ph": 6.5,
            "rainfall": 203
        }
        
        response = requests.post(f"{base_url}/recommend-crop", json=test_data)
        if response.status_code == 200:
            print("✅ Crop recommendation working")
            data = response.json()
            print(f"   Recommended crop: {data['crop']}")
            print(f"   Predicted yield: {data['predicted_yield_kg_per_ha']} kg/ha")
            print(f"   Sustainability score: {data['sustainability_score']}/10")
            print(f"   Confidence: {data['confidence']}")
        else:
            print(f"❌ Crop recommendation failed: {response.status_code}")
    except Exception as e:
        print(f"❌ Crop recommendation error: {e}")
    
    # Test 4: Crop prices
    try:
        response = requests.get(f"{base_url}/crop-prices")
        if response.status_code == 200:
            print("✅ Crop prices working")
            data = response.json()
            print(f"   Found {len(data['prices'])} crop prices")
        else:
            print("❌ Crop prices failed")
    except Exception as e:
        print(f"❌ Crop prices error: {e}")
    
    # Test 5: Crop info
    try:
        response = requests.get(f"{base_url}/crop-info/rice")
        if response.status_code == 200:
            print("✅ Crop info working")
            data = response.json()
            print(f"   Rice season: {data['season']}")
            print(f"   Investment per ha: ₹{data['investment_per_ha']:,}")
        else:
            print("❌ Crop info failed")
    except Exception as e:
        print(f"❌ Crop info error: {e}")
    
    print("\n🎉 API testing completed!")
    print("📖 Full API documentation: http://localhost:8000/docs")

if __name__ == "__main__":
    test_api()
