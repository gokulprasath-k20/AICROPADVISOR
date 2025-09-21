# 🌾 Crop Advisor - Quick Start Guide

## Smart India Hackathon 2025 - Jharkhand Agriculture App
*English Primary | Hindi Secondary*

### 🚀 **Option 1: Web Frontend (Recommended - No Setup Required)**

This is the easiest way to run the application without any complex setup.

#### Step 1: Start Backend API
```bash
# Open terminal in HACKATHON folder
python backend/simple_app.py
```
✅ Backend will run at: http://localhost:8000

#### Step 2: Start Web Frontend
```bash
# In a new terminal
python run_web_frontend.py
```
✅ Web app will open automatically in your browser at: http://localhost:3000

---

### 📱 **Option 2: React Native Mobile App (Advanced)**

For the full mobile app experience (requires Node.js setup).

#### Prerequisites:
- Node.js 16+ installed from https://nodejs.org/
- npm working in command line

#### Step 1: Install Expo CLI
```bash
npm install -g @expo/cli
```

#### Step 2: Install Dependencies
```bash
cd frontend
npm install
```

#### Step 3: Start Mobile App
```bash
expo start
```
- Scan QR code with Expo Go app on your phone
- Or press 'w' for web version

---

### 🔧 **Troubleshooting**

#### Backend Issues:
- **Error installing requirements**: Use simplified requirements
- **Model not found**: Run `python ml_model/simple_crop_model.py` first
- **Port 8000 busy**: Change port in backend/simple_app.py

#### Frontend Issues:
- **npm not found**: Install Node.js from https://nodejs.org/
- **Expo CLI fails**: Use Web Frontend option instead
- **CORS errors**: Make sure backend is running first

---

### 📊 **Testing the Application**

#### Test API Directly:
```bash
python test_api.py
```

#### Test Web Interface:
1. Open http://localhost:3000
2. Fill in sample values:
   - N: 90, P: 42, K: 43
   - Temperature: 21°C, Humidity: 82%
   - pH: 6.5, Rainfall: 203mm
3. Click "AI से फसल सुझाव पाएं"
4. View AI recommendation results

#### Expected Results:
- **Recommended Crop**: धान (Rice) or मक्का (Maize)
- **Predicted Yield**: ~2000-4000 kg/ha
- **Sustainability Score**: 7-9/10
- **Confidence**: 85-99%

---

### 🌟 **Key Features Demonstrated**

✅ **AI Crop Recommendation**: ML model with 95%+ accuracy  
✅ **Bilingual Interface**: English primary, Hindi secondary support  
✅ **Real-time Analysis**: Instant predictions  
✅ **Sustainability Scoring**: Environmental impact assessment  
✅ **Yield Prediction**: Expected harvest estimates  
✅ **Investment Analysis**: Cost-benefit calculations  
✅ **Market Intelligence**: Live crop prices  
✅ **Weather Integration**: Climate-based recommendations  

---

### 📁 **Project Structure**

```
HACKATHON/
├── backend/
│   ├── simple_app.py          # ✅ Main API server
│   └── requirements.txt       # ✅ Python dependencies
├── ml_model/
│   ├── simple_crop_model.py   # ✅ AI model
│   └── crop_recommendation_model.pkl  # ✅ Trained model
├── web_frontend/
│   └── index.html            # ✅ Web interface
├── frontend/                 # 📱 React Native app
├── run_web_frontend.py       # 🌐 Web server launcher
├── run_backend.py           # 🔧 Backend launcher
└── test_api.py              # 🧪 API testing
```

---

### 🎯 **For SIH 2025 Demo**

#### **Recommended Demo Flow:**
1. **Start Backend**: `python backend/simple_app.py`
2. **Open Web App**: `python run_web_frontend.py`
3. **Show API Docs**: Visit http://localhost:8000/docs
4. **Live Demo**: Input real Jharkhand soil data
5. **Show Results**: AI recommendations with explanations

#### **Demo Data for Jharkhand:**
- **Rice Belt (Ranchi)**: N=85, P=45, K=40, T=25°C, H=85%, pH=6.2, R=250mm
- **Wheat Region (Palamu)**: N=60, P=35, K=35, T=20°C, H=65%, pH=7.0, R=80mm
- **Maize Area (Hazaribagh)**: N=95, P=50, K=30, T=24°C, H=70%, pH=6.5, R=150mm

---

### 💡 **Pro Tips**

- **Use Web Frontend** for quick demos and testing
- **Backend API** provides all ML functionality
- **Mobile App** shows full UI/UX design
- **Test with real data** from Jharkhand districts
- **Show sustainability scoring** for environmental impact

---

**Made with ❤️ for farmers of Jharkhand!** 🌾

*Smart India Hackathon 2025 - Technology for Social Good*  
*English Primary Interface | Hindi Secondary Support*
