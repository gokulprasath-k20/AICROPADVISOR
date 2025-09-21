"""
Simplified FastAPI Backend for AI-Based Crop Recommendation System
SIH 2025 - Jharkhand Agriculture App (No Authentication Required)
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pickle
import numpy as np
import os
from datetime import datetime
from typing import Dict, List, Optional
import uvicorn

app = FastAPI(
    title="Crop Advisor API",
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

# Try to load the trained model
model = None
try:
    model_path = os.path.join('..', 'ml_model', 'crop_recommendation_model.pkl')
    if os.path.exists(model_path):
        with open(model_path, 'rb') as f:
            model = pickle.load(f)
        print("✅ Model loaded successfully!")
    else:
        print("⚠️  Model file not found. Using fallback predictions.")
except Exception as e:
    print(f"⚠️  Could not load model: {e}. Using fallback predictions.")

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

class CropPriceResponse(BaseModel):
    crop: str
    current_price_per_kg: float
    market_trend: str
    last_updated: str

# Sample crop data for Jharkhand
JHARKHAND_CROPS_DATA = {
    'rice': {
        'avg_price': 25.0,
        'season': 'खरीफ',
        'investment_per_ha': 35000,
        'profit_margin': 0.3,
        'water_requirement': 'उच्च',
        'suitable_districts': ['Ranchi / रांची', 'Dhanbad / धनबाद', 'Jamshedpur / जमशेदपुर', 'Bokaro / बोकारो']
    },
    'wheat': {
        'avg_price': 22.0,
        'season': 'रबी',
        'investment_per_ha': 28000,
        'profit_margin': 0.25,
        'water_requirement': 'मध्यम',
        'suitable_districts': ['Palamu / पलामू', 'Garhwa / गढ़वा', 'Latehar / लातेहार']
    },
    'maize': {
        'avg_price': 18.0,
        'season': 'खरीफ/रबी',
        'investment_per_ha': 25000,
        'profit_margin': 0.35,
        'water_requirement': 'मध्यम',
        'suitable_districts': ['Ranchi / रांची', 'Hazaribagh / हजारीबाग', 'Koderma / कोडरमा']
    },
    'cotton': {
        'avg_price': 45.0,
        'season': 'खरीफ',
        'investment_per_ha': 40000,
        'profit_margin': 0.4,
        'water_requirement': 'मध्यम',
        'suitable_districts': ['Palamu / पलामू', 'Garhwa / गढ़वा']
    },
    'sugarcane': {
        'avg_price': 3.5,
        'season': 'वार्षिक',
        'investment_per_ha': 60000,
        'profit_margin': 0.45,
        'water_requirement': 'उच्च',
        'suitable_districts': ['Ranchi / रांची', 'Hazaribagh / हजारीबाग']
    },
    'chickpea': {
        'avg_price': 55.0,
        'season': 'रबी',
        'investment_per_ha': 20000,
        'profit_margin': 0.5,
        'water_requirement': 'कम',
        'suitable_districts': ['Palamu / पलामू', 'Garhwa / गढ़वा', 'Latehar / लातेहार']
    },
    'kidney_beans': {
        'avg_price': 80.0,
        'season': 'रबी',
        'investment_per_ha': 22000,
        'profit_margin': 0.6,
        'water_requirement': 'मध्यम',
        'suitable_districts': ['Ranchi / रांची', 'Hazaribagh / हजारीबाग']
    },
    'banana': {
        'avg_price': 15.0,
        'season': 'वार्षिक',
        'investment_per_ha': 45000,
        'profit_margin': 0.4,
        'water_requirement': 'उच्च',
        'suitable_districts': ['Ranchi / रांची', 'Dhanbad / धनबाद']
    }
}

def fallback_crop_prediction(N, P, K, temperature, humidity, ph, rainfall):
    """Fallback crop prediction when ML model is not available"""
    # Simple rule-based prediction
    if rainfall > 200 and humidity > 80:
        return 'rice'
    elif temperature < 25 and rainfall < 100:
        return 'wheat'
    elif N > 80 and P > 40:
        return 'maize'
    elif rainfall < 80 and temperature > 25:
        return 'cotton'
    elif humidity > 75 and temperature > 26:
        return 'sugarcane'
    elif P > 60 and rainfall < 150:
        return 'chickpea'
    elif ph > 6.0 and ph < 7.0 and rainfall > 60:
        return 'kidney_beans'
    elif temperature > 26 and humidity > 75:
        return 'banana'
    else:
        return 'maize'  # Default crop

@app.get("/")
async def root():
    return {
        "message": "Crop Advisor - AI-Based Crop Recommendation System API",
        "version": "1.0.0",
        "description": "Smart India Hackathon 2025 - Jharkhand Agriculture App",
        "status": "running",
        "model_loaded": model is not None
    }

@app.post("/recommend-crop", response_model=CropRecommendationResponse)
async def recommend_crop(request: CropRecommendationRequest):
    """
    Recommend the best crop based on soil and climate conditions
    """
    try:
        # Prepare input data
        input_data = np.array([[
            request.N, request.P, request.K, 
            request.temperature, request.humidity, 
            request.ph, request.rainfall
        ]])
        
        # Get prediction
        if model is not None:
            crop_prediction = model.predict(input_data)[0]
            try:
                probabilities = model.predict_proba(input_data)[0]
                confidence = float(np.max(probabilities))
            except:
                confidence = 0.85
        else:
            crop_prediction = fallback_crop_prediction(
                request.N, request.P, request.K, 
                request.temperature, request.humidity, 
                request.ph, request.rainfall
            )
            confidence = 0.75  # Lower confidence for rule-based prediction
        
        # Calculate yield
        base_yield = (request.N + request.P + request.K) / 10 * (request.humidity / 100)
        yield_multipliers = {
            'rice': 1.2, 'wheat': 1.0, 'maize': 1.3, 'cotton': 0.8,
            'sugarcane': 2.5, 'chickpea': 0.7, 'kidney_beans': 0.6,
            'banana': 1.1
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
        
        # Generate recommendations in English with Hindi translations
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
            recommendations.append("Add lime to increase soil pH (मिट्टी का pH बढ़ाने के लिए चूना मिलाएं)")
        elif request.ph > 7.5:
            recommendations.append("Add organic matter to reduce soil pH (मिट्टी का pH कम करने के लिए जैविक खाद मिलाएं)")
            
        if request.N < 40:
            recommendations.append("Use nitrogen-rich fertilizers or compost (नाइट्रोजन युक्त उर्वरक या कंपोस्ट का उपयोग करें)")
        
        return CropRecommendationResponse(
            crop=crop_prediction,
            predicted_yield_kg_per_ha=round(predicted_yield, 2),
            sustainability_score=round(sustainability_score, 2),
            confidence=round(confidence, 3),
            recommendations=recommendations
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")

@app.get("/climate-data/{district}")
async def get_climate_data(district: str):
    """
    Get climate data for a specific district in Jharkhand
    """
    
    # Sample climate data for Jharkhand districts with bilingual names
    climate_data = {
        "Ranchi": {
            "district": "Ranchi",
            "district_hindi": "रांची", 
            "district_bilingual": "Ranchi / रांची",
            "average_temperature": 24,      # Change temperature here (°C)
            "average_rainfall": 1200,       # Change rainfall here (mm/year)
            "average_humidity": 75,         # Change humidity here (%)
            "suitable_crops": ["rice", "maize", "wheat", "sugarcane"]  # Add/remove crops
        },
        "Dhanbad": {
            "district": "Dhanbad",
            "district_hindi": "धनबाद",
            "district_bilingual": "Dhanbad / धनबाद",
            "average_temperature": 26,
            "average_rainfall": 1100,
            "average_humidity": 70,
            "suitable_crops": ["rice", "maize", "cotton"]
        },
        "Jamshedpur": {
            "district": "Jamshedpur",
            "district_hindi": "जमशेदपुर",
            "district_bilingual": "Jamshedpur / जमशेदपुर",
            "average_temperature": 27,
            "average_rainfall": 1300,
            "average_humidity": 75,
            "suitable_crops": ["rice", "maize", "wheat"]
        },
        "Bokaro": {
            "district": "Bokaro",
            "district_hindi": "बोकारो",
            "district_bilingual": "Bokaro / बोकारो",
            "average_temperature": 25,
            "average_rainfall": 1150,
            "average_humidity": 70,
            "suitable_crops": ["rice", "maize", "cotton"]
        },
        "Hazaribagh": {
            "district": "Hazaribagh",
            "district_hindi": "हजारीबाग",
            "district_bilingual": "Hazaribagh / हजारीबाग",
            "average_temperature": 23,
            "average_rainfall": 1000,
            "average_humidity": 75,
            "suitable_crops": ["rice", "wheat", "maize"]
        },
        "Palamu": {
            "district": "Palamu",
            "district_hindi": "पलामू",
            "district_bilingual": "Palamu / पलामू",
            "average_temperature": 25,
            "average_rainfall": 900,
            "average_humidity": 65,
            "suitable_crops": ["wheat", "maize", "cotton"]
        },
        "Garhwa": {
            "district": "Garhwa",
            "district_hindi": "गढ़वा",
            "district_bilingual": "Garhwa / गढ़वा",
            "average_temperature": 24,
            "average_rainfall": 950,
            "average_humidity": 68,
            "suitable_crops": ["wheat", "maize", "cotton"]
        },
        "Koderma": {
            "district": "Koderma",
            "district_hindi": "कोडरमा",
            "district_bilingual": "Koderma / कोडरमा",
            "average_temperature": 24,
            "average_rainfall": 1050,
            "average_humidity": 72,
            "suitable_crops": ["rice", "maize", "wheat"]
        },
        "Deoghar": {
            "district": "Deoghar",
            "district_hindi": "देवघर",
            "district_bilingual": "Deoghar / देवघर",
            "average_temperature": 25,
            "average_rainfall": 1100,
            "average_humidity": 73,
            "suitable_crops": ["rice", "maize", "wheat", "chickpea"]
        },
        "Dumka": {
            "district": "Dumka",
            "district_hindi": "दुमका",
            "district_bilingual": "Dumka / दुमका",
            "average_temperature": 26,
            "average_rainfall": 1250,
            "average_humidity": 78,
            "suitable_crops": ["rice", "maize", "banana", "sugarcane"]
        },
        "Latehar": {
            "district": "Latehar",
            "district_hindi": "लातेहार",
            "district_bilingual": "Latehar / लातेहार",
            "average_rainfall": 900,
            "average_humidity": 70,
            "suitable_crops": ["rice", "maize", "wheat"]
        },
        "Hazaribagh": {
            "district": "Hazaribagh",
            "district_hindi": "हजारीबाग",
            "district_bilingual": "Hazaribagh / हजारीबाग",
            "average_temperature": 26,
            "average_rainfall": 1000,
            "average_humidity": 75,
            "suitable_crops": ["rice", "maize", "wheat"]
        },
        "Kodarma": {
            "district": "Kodarma",
            "district_hindi": "कोडरमा",
            "district_bilingual": "Kodarma / कोडरमा",
            "average_temperature": 27,
            "average_rainfall": 800,
            "average_humidity": 70,
            "suitable_crops": ["rice", "maize", "wheat"]
        }
    }
    
    district_data = climate_data.get(district.capitalize())
    
    if not district_data:
        raise HTTPException(status_code=404, detail="District not found")
    
    return district_data

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

JHARKHAND_CROPS_DATA = {
    'rice': {
        'season': 'Kharif',
        'water_requirement': 'High',
        'investment_per_ha': 45000,
        'avg_price': 25.50,
        'profit_margin': 0.4,
        'suitable_districts': ['Ranchi / रांची', 'Dhanbad / धनबाद', 'Hazaribagh / हजारीबाग']
    },
    # ... other crops data ...
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
        "risk_level": "मध्यम"
    }

@app.get("/health")
async def health_check():
    """
    Health check endpoint
    """
    return {
        "status": "healthy",
        "model_loaded": model is not None,
        "timestamp": datetime.now().isoformat(),
        "message": "Crop Advisor API is running successfully!"
    }

if __name__ == "__main__":
    print("🌾 Starting Crop Advisor API Server...")
    print("📡 API will be available at: http://localhost:8000")
    print("📖 API documentation: http://localhost:8000/docs")
    print("⚡ Press Ctrl+C to stop the server")
    uvicorn.run(app, host="0.0.0.0", port=8000)
