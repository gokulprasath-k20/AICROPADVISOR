"""
FastAPI Backend for AI-Based Crop Recommendation System
SIH 2025 - Jharkhand Agriculture App
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pickle
import numpy as np
import json
import requests
from datetime import datetime
from typing import Dict, List, Optional
import uvicorn

app = FastAPI(
    title="Crop Recommendation API",
    description="AI-based crop recommendation system for farmers in Jharkhand, India",
    version="1.0.0"
)

# Enable CORS for React Native app
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the trained model
try:
    import joblib
    model = joblib.load('crop_recommendation_model.pkl')
    print("✅ Trained model loaded successfully!")
    print(f"Model type: {type(model).__name__}")
except FileNotFoundError:
    try:
        model = joblib.load('../ml_model/crop_recommendation_model.pkl')
        print("✅ Model loaded from ml_model directory!")
    except FileNotFoundError:
        print("❌ Model file not found. Please train the model first by running:")
        print("   cd ml_model && python train_model_simple.py")
        model = None
except Exception as e:
    print(f"❌ Error loading model: {e}")
    model = None

# Pydantic models for request/response
class CropRecommendationRequest(BaseModel):
    N: float  # Nitrogen content
    P: float  # Phosphorus content
    K: float  # Potassium content
    temperature: float  # Temperature in Celsius
    humidity: float  # Humidity percentage
    ph: float  # Soil pH
    rainfall: float  # Rainfall in mm

class CropRecommendationResponse(BaseModel):
    crop: str
    predicted_yield_kg_per_ha: float
    sustainability_score: float
    confidence: float
    recommendations: List[str]

class WeatherRequest(BaseModel):
    latitude: float
    longitude: float

class CropPriceResponse(BaseModel):
    crop: str
    current_price_per_kg: float
    market_trend: str
    last_updated: str

# Sample crop data for Jharkhand
JHARKHAND_CROPS_DATA = {
    'rice': {
        'avg_price': 25.0,
        'season': 'Kharif',
        'investment_per_ha': 35000,
        'profit_margin': 0.3,
        'water_requirement': 'High',
        'suitable_districts': ['Ranchi', 'Dhanbad', 'Jamshedpur', 'Bokaro']
    },
    'wheat': {
        'avg_price': 22.0,
        'season': 'Rabi',
        'investment_per_ha': 28000,
        'profit_margin': 0.25,
        'water_requirement': 'Medium',
        'suitable_districts': ['Palamu', 'Garhwa', 'Latehar']
    },
    'maize': {
        'avg_price': 18.0,
        'season': 'Kharif/Rabi',
        'investment_per_ha': 25000,
        'profit_margin': 0.35,
        'water_requirement': 'Medium',
        'suitable_districts': ['Ranchi', 'Hazaribagh', 'Koderma']
    },
    'cotton': {
        'avg_price': 45.0,
        'season': 'Kharif',
        'investment_per_ha': 40000,
        'profit_margin': 0.4,
        'water_requirement': 'Medium',
        'suitable_districts': ['Palamu', 'Garhwa']
    },
    'sugarcane': {
        'avg_price': 3.5,
        'season': 'Annual',
        'investment_per_ha': 60000,
        'profit_margin': 0.45,
        'water_requirement': 'High',
        'suitable_districts': ['Ranchi', 'Hazaribagh']
    },
    'chickpea': {
        'avg_price': 55.0,
        'season': 'Rabi',
        'investment_per_ha': 20000,
        'profit_margin': 0.5,
        'water_requirement': 'Low',
        'suitable_districts': ['Palamu', 'Garhwa', 'Latehar']
    },
    'kidney_beans': {
        'avg_price': 80.0,
        'season': 'Rabi',
        'investment_per_ha': 22000,
        'profit_margin': 0.6,
        'water_requirement': 'Medium',
        'suitable_districts': ['Ranchi', 'Hazaribagh']
    },
    'banana': {
        'avg_price': 15.0,
        'season': 'Annual',
        'investment_per_ha': 45000,
        'profit_margin': 0.4,
        'water_requirement': 'High',
        'suitable_districts': ['Ranchi', 'Dhanbad']
    }
}

# Climate data for Jharkhand districts
JHARKHAND_CLIMATE = {
    'Ranchi': {'avg_temp': 24, 'avg_rainfall': 1200, 'avg_humidity': 70},
    'Dhanbad': {'avg_temp': 26, 'avg_rainfall': 1100, 'avg_humidity': 68},
    'Jamshedpur': {'avg_temp': 27, 'avg_rainfall': 1300, 'avg_humidity': 72},
    'Bokaro': {'avg_temp': 25, 'avg_rainfall': 1150, 'avg_humidity': 69},
    'Hazaribagh': {'avg_temp': 23, 'avg_rainfall': 1000, 'avg_humidity': 65},
    'Palamu': {'avg_temp': 25, 'avg_rainfall': 900, 'avg_humidity': 62},
    'Garhwa': {'avg_temp': 24, 'avg_rainfall': 950, 'avg_humidity': 63},
    'Koderma': {'avg_temp': 24, 'avg_rainfall': 1050, 'avg_humidity': 67}
}

@app.get("/")
async def root():
    return {
        "message": "AI-Based Crop Recommendation System API",
        "version": "1.0.0",
        "description": "Smart India Hackathon 2025 - Jharkhand Agriculture App"
    }

@app.post("/recommend-crop", response_model=CropRecommendationResponse)
async def recommend_crop(request: CropRecommendationRequest):
    """
    Recommend the best crop based on soil and climate conditions
    """
    if model is None:
        raise HTTPException(status_code=500, detail="Model not loaded")
    
    try:
        # Prepare input data
        input_data = np.array([[
            request.N, request.P, request.K, 
            request.temperature, request.humidity, 
            request.ph, request.rainfall
        ]])
        
        # Get prediction
        crop_prediction = model.predict(input_data)[0]
        
        # Get prediction probabilities for confidence
        try:
            probabilities = model.predict_proba(input_data)[0]
            confidence = float(np.max(probabilities))
            print(f"🎯 Predicted crop: {crop_prediction} (confidence: {confidence:.3f})")
        except Exception as e:
            print(f"⚠️ Could not get probabilities: {e}")
            confidence = 0.85  # Default confidence
        
        # Calculate yield
        base_yield = (request.N + request.P + request.K) / 10 * (request.humidity / 100)
        yield_multipliers = {
            'rice': 1.2, 'wheat': 1.0, 'maize': 1.3, 'cotton': 0.8,
            'sugarcane': 2.5, 'chickpea': 0.7, 'kidney_beans': 0.6,
            'coconut': 0.4, 'banana': 1.1, 'apple': 0.9
        }
        
        multiplier = yield_multipliers.get(crop_prediction, 1.0)
        predicted_yield = base_yield * multiplier * np.random.uniform(0.8, 1.2)
        predicted_yield = max(500, min(8000, predicted_yield))
        
        # Calculate sustainability score
        water_score = max(0, 10 - (request.rainfall / 200))
        fertilizer_score = max(0, 10 - (request.N / 100))
        ph_score = 10 if 6.0 <= request.ph <= 7.5 else max(0, 10 - abs(request.ph - 6.75) * 2)
        
        sustainability_score = (water_score + fertilizer_score + ph_score) / 3
        sustainability_score = max(1, min(10, sustainability_score))
        
        # Generate recommendations
        recommendations = []
        crop_data = JHARKHAND_CROPS_DATA.get(crop_prediction, {})
        
        if crop_data:
            recommendations.append(f"Best season for {crop_prediction}: {crop_data.get('season', 'N/A')}")
            recommendations.append(f"Water requirement: {crop_data.get('water_requirement', 'Medium')}")
            recommendations.append(f"Expected investment: ₹{crop_data.get('investment_per_ha', 0):,} per hectare")
            
            suitable_districts = crop_data.get('suitable_districts', [])
            if suitable_districts:
                recommendations.append(f"Suitable districts: {', '.join(suitable_districts)}")
        
        # Add soil-specific recommendations
        if request.ph < 6.0:
            recommendations.append("Consider adding lime to increase soil pH")
        elif request.ph > 7.5:
            recommendations.append("Consider adding organic matter to reduce soil pH")
            
        if request.N < 40:
            recommendations.append("Consider nitrogen-rich fertilizers or organic compost")
        
        return CropRecommendationResponse(
            crop=crop_prediction,
            predicted_yield_kg_per_ha=round(predicted_yield, 2),
            sustainability_score=round(sustainability_score, 2),
            confidence=round(confidence, 3),
            recommendations=recommendations
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")

@app.get("/crop-prices")
async def get_crop_prices():
    """
    Get current crop prices in Jharkhand markets
    """
    prices = []
    for crop, data in JHARKHAND_CROPS_DATA.items():
        # Simulate price fluctuation (±10%)
        base_price = data['avg_price']
        current_price = base_price * np.random.uniform(0.9, 1.1)
        
        # Determine trend
        trend_factor = np.random.choice(['up', 'down', 'stable'], p=[0.3, 0.3, 0.4])
        
        prices.append(CropPriceResponse(
            crop=crop,
            current_price_per_kg=round(current_price, 2),
            market_trend=trend_factor,
            last_updated=datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        ))
    
    return {"prices": prices}

@app.get("/crop-info/{crop_name}")
async def get_crop_info(crop_name: str):
    """
    Get detailed information about a specific crop
    """
    crop_data = JHARKHAND_CROPS_DATA.get(crop_name.lower())
    
    if not crop_data:
        raise HTTPException(status_code=404, detail="Crop not found")
    
    # Calculate potential profit
    investment = crop_data['investment_per_ha']
    profit_margin = crop_data['profit_margin']
    avg_yield = 2000  # kg/ha (example)
    revenue = avg_yield * crop_data['avg_price']
    profit = revenue * profit_margin
    
    return {
        "crop": crop_name,
        "season": crop_data['season'],
        "investment_per_ha": investment,
        "expected_revenue_per_ha": revenue,
        "expected_profit_per_ha": profit,
        "profit_margin": f"{profit_margin * 100}%",
        "water_requirement": crop_data['water_requirement'],
        "suitable_districts": crop_data['suitable_districts'],
        "current_market_price": crop_data['avg_price']
    }

@app.get("/climate-data/{district}")
async def get_climate_data(district: str):
    """
    Get climate data for a specific district in Jharkhand
    """
    district_data = JHARKHAND_CLIMATE.get(district.title())
    
    if not district_data:
        raise HTTPException(status_code=404, detail="District not found")
    
    return {
        "district": district.title(),
        "average_temperature": district_data['avg_temp'],
        "average_rainfall": district_data['avg_rainfall'],
        "average_humidity": district_data['avg_humidity'],
        "suitable_crops": [
            crop for crop, data in JHARKHAND_CROPS_DATA.items()
            if district.title() in data.get('suitable_districts', [])
        ]
    }

@app.get("/districts")
async def get_districts():
    """
    Get list of all districts in Jharkhand
    """
    return {
        "districts": list(JHARKHAND_CLIMATE.keys()),
        "total_districts": len(JHARKHAND_CLIMATE)
    }

@app.get("/investment-analysis/{crop_name}")
async def get_investment_analysis(crop_name: str, area_hectares: float = 1.0):
    """
    Get detailed investment and profit analysis for a crop
    """
    crop_data = JHARKHAND_CROPS_DATA.get(crop_name.lower())
    
    if not crop_data:
        raise HTTPException(status_code=404, detail="Crop not found")
    
    # Calculate for given area
    total_investment = crop_data['investment_per_ha'] * area_hectares
    avg_yield_per_ha = 2000  # kg/ha (example)
    total_yield = avg_yield_per_ha * area_hectares
    total_revenue = total_yield * crop_data['avg_price']
    total_profit = total_revenue * crop_data['profit_margin']
    
    # Break down costs (example distribution)
    cost_breakdown = {
        "seeds": total_investment * 0.15,
        "fertilizers": total_investment * 0.25,
        "pesticides": total_investment * 0.10,
        "irrigation": total_investment * 0.20,
        "labor": total_investment * 0.20,
        "machinery": total_investment * 0.10
    }
    
    return {
        "crop": crop_name,
        "area_hectares": area_hectares,
        "total_investment": total_investment,
        "cost_breakdown": cost_breakdown,
        "expected_yield_kg": total_yield,
        "expected_revenue": total_revenue,
        "expected_profit": total_profit,
        "roi_percentage": (total_profit / total_investment) * 100,
        "break_even_price_per_kg": total_investment / total_yield,
        "season": crop_data['season'],
        "risk_level": "Medium"  # This could be calculated based on various factors
    }

@app.get("/health")
async def health_check():
    """
    Health check endpoint
    """
    return {
        "status": "healthy",
        "model_loaded": model is not None,
        "timestamp": datetime.now().isoformat()
    }

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
