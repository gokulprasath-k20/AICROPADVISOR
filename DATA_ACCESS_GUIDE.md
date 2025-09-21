# 🌾 Crop Advisor - Data Access Guide

## Where to Find Crop Prices, Investment Analysis & Climate Data

---

## 🌐 **Web Application (Easiest)**

### **Current Status**: ✅ Running at http://localhost:3000

**What you can see:**
1. **Crop Recommendation Form** - Input soil/climate data
2. **AI Results Display** - Shows:
   - 🌾 Recommended crop
   - 📊 Predicted yield (kg/ha)
   - 🌱 Sustainability score (1-10)
   - 💡 Recommendations with investment info

**How to use:**
- Fill in the form with sample data
- Click "Get AI Crop Recommendation"
- View comprehensive results

---

## 📊 **API Endpoints (Direct Data Access)**

### **Base URL**: http://localhost:8000

### **1. Crop Prices** 💰
```
GET /crop-prices
```
**Shows**: Live market prices for all crops in Jharkhand
- Current price per kg
- Market trend (up/down/stable)
- Last updated timestamp

### **2. Investment Analysis** 💼
```
GET /investment-analysis/{crop}?area_hectares=1
```
**Example**: `/investment-analysis/rice?area_hectares=2`

**Shows**:
- Total investment required
- Expected revenue and profit
- ROI percentage
- Cost breakdown (seeds, fertilizers, labor, etc.)
- Break-even price
- Risk assessment

### **3. Crop Details** 📋
```
GET /crop-info/{crop}
```
**Example**: `/crop-info/wheat`

**Shows**:
- Season information
- Water requirements
- Investment per hectare
- Suitable districts
- Current market price

### **4. Climate Data** 🌤️
```
GET /climate-data/{district}
```
**Example**: `/climate-data/Ranchi`

**Shows**:
- Average temperature
- Average rainfall
- Average humidity
- Suitable crops for the district

---

## 🛠️ **Tools to View Data**

### **Option 1: API Documentation**
Visit: http://localhost:8000/docs
- Interactive Swagger interface
- Test all endpoints directly
- See response formats

### **Option 2: Data Viewer Script**
```bash
python view_data.py
```
**Features**:
- Interactive menu
- View all crop prices
- Investment analysis for any crop
- Climate data for all districts
- User-friendly display

### **Option 3: Quick Data Display**
```bash
python show_data.py
```
**Shows**:
- Current crop prices
- Sample investment analysis
- Climate data overview
- Quick summary format

---

## 📱 **Sample Data Available**

### **Crops Covered** (8 major crops):
1. **Rice** (धान) - ₹25-28/kg
2. **Wheat** (गेहूं) - ₹22-24/kg  
3. **Maize** (मक्का) - ₹18-20/kg
4. **Cotton** (कपास) - ₹45-48/kg
5. **Sugarcane** (गन्ना) - ₹3.5-4/kg
6. **Chickpea** (चना) - ₹55-60/kg
7. **Kidney Beans** (राजमा) - ₹80-85/kg
8. **Banana** (केला) - ₹15-17/kg

### **Districts Covered** (8 major districts):
- **Ranchi** - 24°C, 1200mm rainfall
- **Dhanbad** - 26°C, 1100mm rainfall
- **Jamshedpur** - 27°C, 1300mm rainfall
- **Bokaro** - 25°C, 1150mm rainfall
- **Hazaribagh** - 23°C, 1000mm rainfall
- **Palamu** - 25°C, 900mm rainfall
- **Garhwa** - 24°C, 950mm rainfall
- **Koderma** - 24°C, 1050mm rainfall

### **Investment Data** (per hectare):
- **Seeds**: 15% of total cost
- **Fertilizers**: 25% of total cost
- **Pesticides**: 10% of total cost
- **Irrigation**: 20% of total cost
- **Labor**: 20% of total cost
- **Machinery**: 10% of total cost

---

## 🎯 **Quick Demo Steps**

### **Step 1: View Crop Prices**
```bash
# Open browser to:
http://localhost:8000/crop-prices
```

### **Step 2: Check Investment for Rice (2 hectares)**
```bash
# Open browser to:
http://localhost:8000/investment-analysis/rice?area_hectares=2
```

### **Step 3: See Climate Data for Ranchi**
```bash
# Open browser to:
http://localhost:8000/climate-data/Ranchi
```

### **Step 4: Get Crop Recommendation**
1. Go to: http://localhost:3000
2. Fill form with sample data:
   - N: 85, P: 45, K: 40
   - Temperature: 25°C, Humidity: 85%
   - pH: 6.2, Rainfall: 250mm
3. Click "Get AI Crop Recommendation"
4. View complete analysis

---

## 🔍 **What Each Data Source Shows**

### **Web App Results**:
- ✅ AI crop recommendation
- ✅ Yield prediction
- ✅ Sustainability score
- ✅ Investment recommendations
- ✅ Suitable districts

### **API Endpoints**:
- ✅ Live market prices
- ✅ Detailed investment breakdown
- ✅ ROI calculations
- ✅ Climate data by district
- ✅ Crop-specific information

### **Data Scripts**:
- ✅ Formatted data display
- ✅ Interactive exploration
- ✅ Comparison tools
- ✅ Export capabilities

---

## 🚀 **For SIH 2025 Demo**

### **Recommended Demo Flow**:
1. **Start with Web App** - Show AI recommendation
2. **Show API Documentation** - Demonstrate data richness
3. **Run Data Viewer** - Interactive exploration
4. **Highlight Key Features**:
   - Real-time price data
   - Investment analysis
   - Climate-based recommendations
   - Multi-district coverage

### **Key Data Points to Highlight**:
- 📊 **8 major crops** with live pricing
- 🗺️ **8 Jharkhand districts** with climate data
- 💰 **Detailed investment analysis** with ROI
- 🌱 **Sustainability scoring** for environmental impact
- 📈 **Market trend analysis** for timing decisions

---

**All data is live and accessible through multiple interfaces!** 🌾📊

*The Crop Advisor system provides comprehensive agricultural intelligence for informed farming decisions.*
