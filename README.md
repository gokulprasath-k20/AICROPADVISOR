# Crop Advisor - AI-Based Crop Recommendation System

## Smart India Hackathon 2025 - Jharkhand Agriculture App

### 🌾 Project Overview

**Crop Advisor** is an AI-powered mobile application designed specifically for farmers in Jharkhand, India. The app provides intelligent crop recommendations, real-time market prices, weather information, and investment analysis to help farmers make informed decisions and maximize their agricultural productivity.

### ✨ Key Features

#### 🤖 AI-Powered Crop Recommendation
- Advanced machine learning model trained on soil and climate data
- Considers N, P, K levels, temperature, humidity, pH, and rainfall
- Provides yield predictions and sustainability scores
- Supports 10+ major crops grown in Jharkhand

#### 📱 Multilingual Support
- Primary language: Hindi (हिंदी)
- Secondary support: English, Santhali
- Voice input and text-to-speech capabilities
- Culturally appropriate UI with agriculture themes

#### 🌤️ Weather Integration
- Real-time weather data for Jharkhand districts
- 5-day weather forecast
- Agricultural advice based on weather conditions
- Weather alerts and warnings

#### 💰 Market Intelligence
- Live crop prices from major markets
- Price trend analysis
- Investment and profit calculations
- Break-even analysis

#### 📊 Investment Analysis
- Detailed cost breakdown (seeds, fertilizers, labor, etc.)
- ROI calculations
- Risk assessment
- Profitability predictions

#### 🌐 Offline Capability
- Core features work without internet
- Cached data for essential information
- Sync when connection is available

### 🏗️ Technical Architecture

#### Machine Learning Backend
- **Framework**: Python with scikit-learn, XGBoost
- **Model**: Random Forest Classifier (optimized)
- **Features**: 7 input parameters (N, P, K, temperature, humidity, pH, rainfall)
- **Accuracy**: 95%+ on test data
- **Deployment**: FastAPI REST API

#### Mobile Frontend
- **Framework**: React Native with Expo
- **UI Library**: React Native Paper
- **Navigation**: React Navigation v6
- **State Management**: React Hooks
- **Offline Storage**: AsyncStorage

#### Backend API
- **Framework**: FastAPI (Python)
- **Database**: SQLite (for offline capability)
- **Authentication**: JWT tokens
- **API Documentation**: Swagger/OpenAPI

### 📁 Project Structure

```
HACKATHON/
├── ml_model/                 # Machine Learning Model
│   ├── crop_recommendation_model.py
│   ├── simple_crop_model.py
│   ├── requirements.txt
│   └── best_crop_recommendation_model.pkl
├── backend/                  # FastAPI Backend
│   ├── app.py
│   └── requirements.txt
├── frontend/                 # React Native App
│   ├── src/
│   │   ├── screens/
│   │   ├── components/
│   │   └── theme/
│   ├── App.js
│   ├── package.json
│   └── app.json
└── README.md
```

### 🚀 Getting Started

#### Prerequisites
- Python 3.8+
- Node.js 16+
- Expo CLI
- Android Studio / Xcode (for device testing)

#### Backend Setup
```bash
cd backend
pip install -r requirements.txt
python app.py
```

#### Frontend Setup
```bash
cd frontend
npm install
expo start
```

#### ML Model Training
```bash
cd ml_model
pip install -r requirements.txt
python simple_crop_model.py
```

### 📱 App Screenshots

#### Home Screen
- Personalized greeting in Hindi
- Quick access to all features
- Weather widget
- Today's agricultural tips

#### Crop Recommendation
- Input soil and climate parameters
- AI-powered crop suggestions
- Yield predictions
- Sustainability scoring

#### Market Prices
- Real-time crop prices
- Price trend indicators
- Market analysis

#### Investment Analysis
- Detailed cost breakdown
- ROI calculations
- Profitability analysis

### 🎯 Target Users

#### Primary Users
- Small and marginal farmers in Jharkhand
- Agricultural extension workers
- Cooperative society members

#### Secondary Users
- Agricultural researchers
- Government officials
- NGO workers in agriculture

### 🌍 Impact Areas

#### Economic Impact
- Increased farmer income through better crop selection
- Reduced input costs through optimization
- Better market timing decisions

#### Environmental Impact
- Sustainable farming practices
- Reduced water usage
- Optimal fertilizer application

#### Social Impact
- Technology adoption in rural areas
- Improved food security
- Knowledge sharing among farmers

### 🔧 Technical Specifications

#### Machine Learning Model
- **Algorithm**: Random Forest with hyperparameter tuning
- **Input Features**: 7 parameters
- **Output**: Crop recommendation + yield + sustainability score
- **Training Data**: 2,300+ samples across 10 crops
- **Validation**: 80/20 train-test split with cross-validation

#### API Endpoints
- `POST /recommend-crop` - Get crop recommendation
- `GET /crop-prices` - Current market prices
- `GET /crop-info/{crop}` - Detailed crop information
- `GET /climate-data/{district}` - District climate data
- `GET /investment-analysis/{crop}` - Investment analysis

#### Mobile App Features
- Responsive design for all screen sizes
- Offline data caching
- Voice input support
- Multi-language interface
- Push notifications for alerts

### 🏆 Innovation Highlights

1. **AI-Driven Recommendations**: Advanced ML model specifically trained for Jharkhand's agricultural conditions
2. **Multilingual Voice Interface**: Supports local languages with voice input/output
3. **Offline Functionality**: Core features work without internet connectivity
4. **Comprehensive Analysis**: Beyond recommendations - includes financial analysis and sustainability scoring
5. **Real-time Integration**: Live weather and market price integration
6. **Cultural Sensitivity**: UI/UX designed for rural Indian farmers

### 📈 Future Enhancements

#### Phase 2 Features
- Satellite imagery integration
- Pest and disease identification
- Soil testing recommendations
- Community forums

#### Phase 3 Features
- IoT sensor integration
- Drone-based monitoring
- Blockchain for supply chain
- AI chatbot for 24/7 support

### 🤝 Team

**Smart India Hackathon 2025 Team**
- AI/ML Development
- Full-Stack Development
- UI/UX Design
- Agricultural Domain Expertise

### 📞 Support

For technical support or queries:
- Email: support@kisanmitra.in
- Phone: 1800-180-1551 (Toll-free)
- Website: www.kisanmitra.in

### 📄 License

This project is developed for Smart India Hackathon 2025 and is intended for educational and social impact purposes.

---

**Made with ❤️ for the farmers of Jharkhand**

*"Technology bridging the gap between traditional farming and modern agriculture"*

---

## 🔄 **Recent Updates**

✅ **Application Name**: Changed from "Kisan Mitra" to "Crop Advisor"  
✅ **Language Priority**: English primary, Hindi secondary  
✅ **Professional Interface**: Suitable for international presentations  
✅ **Cultural Sensitivity**: Maintained Hindi support for local farmers
