# 🌤️ Climate Configuration Guide - Crop Advisor

## Complete Setup for Climate Data in Jharkhand Districts

---

## 📊 **Current Climate Configuration**

### **🗺️ Configured Districts (10 Total):**

| District | Temperature (°C) | Rainfall (mm) | Humidity (%) | Main Crops |
|----------|------------------|---------------|--------------|------------|
| **Ranchi / रांची** | 24 | 1200 | 75 | Rice, Maize, Wheat, Sugarcane |
| **Dhanbad / धनबाद** | 26 | 1100 | 70 | Rice, Maize, Cotton, Banana |
| **Jamshedpur / जमशेदपुर** | 27 | 1300 | 75 | Rice, Maize, Wheat |
| **Bokaro / बोकारो** | 25 | 1150 | 70 | Rice, Maize, Cotton |
| **Hazaribagh / हजारीबाग** | 23 | 1000 | 75 | Rice, Wheat, Maize, Sugarcane |
| **Palamu / पलामू** | 25 | 900 | 65 | Wheat, Maize, Cotton, Chickpea |
| **Garhwa / गढ़वा** | 24 | 950 | 68 | Wheat, Maize, Cotton, Chickpea |
| **Koderma / कोडरमा** | 24 | 1050 | 72 | Rice, Maize, Wheat |
| **Deoghar / देवघर** | 25 | 1100 | 73 | Rice, Maize, Wheat, Chickpea |
| **Dumka / दुमका** | 26 | 1250 | 78 | Rice, Maize, Banana, Sugarcane |

---

## 🔧 **How to Modify Climate Settings**

### **📍 Step 1: Update Backend Climate Data**

Edit: `backend/simple_app.py` (lines 256-346)

```python
climate_data = {
    "YourDistrict": {
        "district": "YourDistrict",
        "district_hindi": "आपका जिला",
        "district_bilingual": "YourDistrict / आपका जिला",
        "average_temperature": 25,        # °C (15-35 range)
        "average_rainfall": 1000,         # mm/year (400-2000 range)
        "average_humidity": 70,           # % (40-90 range)
        "suitable_crops": ["rice", "wheat", "maize"]  # Available crops
    }
}
```

### **📍 Step 2: Update Offline Climate Data**

Edit: `web_frontend/offline-data.js` (lines 112-192)

```javascript
districts: {
    'YourDistrict': {
        name_en: 'YourDistrict',
        name_hi: 'आपका जिला',
        average_temperature: 25,          // °C
        average_rainfall: 1000,           // mm/year
        average_humidity: 70,             // %
        suitable_crops: ['rice', 'wheat', 'maize']  // Crop list
    }
}
```

### **📍 Step 3: Update Frontend District Lists**

Edit: `web_frontend/index.html` (lines 1339 & 1623)

```javascript
const districts = [
    'Ranchi', 'Dhanbad', 'Jamshedpur', 'Bokaro', 
    'Hazaribagh', 'Palamu', 'Garhwa', 'Koderma', 
    'Deoghar', 'Dumka', 'YourNewDistrict'
];
```

---

## 🌡️ **Climate Parameter Guidelines**

### **🌡️ Temperature Settings**
```javascript
"average_temperature": 18,  // Cool climate (hill areas)
"average_temperature": 24,  // Moderate climate (most areas)
"average_temperature": 30,  // Hot climate (plains)
```

**Crop Suitability by Temperature:**
- **15-20°C**: Wheat, Chickpea, Kidney Beans
- **20-25°C**: Rice, Maize, Wheat (versatile)
- **25-30°C**: Cotton, Sugarcane, Banana
- **30°C+**: Heat-resistant varieties only

### **🌧️ Rainfall Settings**
```javascript
"average_rainfall": 600,    // Low rainfall - drought-prone
"average_rainfall": 1000,   // Moderate rainfall - balanced
"average_rainfall": 1500,   // High rainfall - flood-prone
```

**Crop Suitability by Rainfall:**
- **400-800mm**: Wheat, Chickpea, Cotton (low water)
- **800-1200mm**: Maize, Mixed crops (moderate water)
- **1200mm+**: Rice, Sugarcane, Banana (high water)

### **💧 Humidity Settings**
```javascript
"average_humidity": 50,     // Dry climate
"average_humidity": 70,     // Moderate humidity
"average_humidity": 85,     // High humidity (coastal-like)
```

**Crop Suitability by Humidity:**
- **40-60%**: Wheat, Chickpea (dry-tolerant)
- **60-75%**: Maize, Cotton (moderate)
- **75%+**: Rice, Sugarcane (high humidity)

---

## 🌾 **Crop-Climate Matching**

### **🌾 Rice (धान)**
- **Temperature**: 20-30°C
- **Rainfall**: 1000mm+ 
- **Humidity**: 70%+
- **Season**: Kharif (Monsoon)

### **🌾 Wheat (गेहूं)**
- **Temperature**: 15-25°C
- **Rainfall**: 400-800mm
- **Humidity**: 50-70%
- **Season**: Rabi (Winter)

### **🌽 Maize (मक्का)**
- **Temperature**: 18-28°C
- **Rainfall**: 600-1200mm
- **Humidity**: 60-75%
- **Season**: Kharif/Rabi (Both)

### **🌿 Cotton (कपास)**
- **Temperature**: 21-30°C
- **Rainfall**: 500-1000mm
- **Humidity**: 55-70%
- **Season**: Kharif (Long season)

### **🎋 Sugarcane (गन्ना)**
- **Temperature**: 20-30°C
- **Rainfall**: 1200mm+
- **Humidity**: 75%+
- **Season**: Annual (Long cycle)

### **🫘 Chickpea (चना)**
- **Temperature**: 15-25°C
- **Rainfall**: 400-700mm
- **Humidity**: 50-65%
- **Season**: Rabi (Cool season)

### **🫘 Kidney Beans (राजमा)**
- **Temperature**: 15-24°C
- **Rainfall**: 600-1000mm
- **Humidity**: 60-75%
- **Season**: Rabi (Cool preference)

### **🍌 Banana (केला)**
- **Temperature**: 22-30°C
- **Rainfall**: 1000mm+
- **Humidity**: 75%+
- **Season**: Annual (Tropical)

---

## 🔄 **Testing Climate Changes**

### **Step 1: Restart System**
```bash
# Stop backend (Ctrl+C)
python backend/simple_app.py

# Refresh browser
# Go to: http://localhost:3000
```

### **Step 2: Test Climate Data**
1. Click **🌤️ Climate Data** card
2. Verify new districts appear
3. Check climate values are correct
4. Confirm suitable crops match settings

### **Step 3: Test Crop Recommendations**
1. Use climate values from your district
2. Enter soil parameters
3. Check if recommended crops match climate
4. Verify bilingual district names

---

## 📈 **Real Jharkhand Climate Data**

### **🌡️ Seasonal Temperature Patterns**
- **Winter (Dec-Feb)**: 10-25°C
- **Summer (Mar-May)**: 20-40°C  
- **Monsoon (Jun-Sep)**: 22-32°C
- **Post-Monsoon (Oct-Nov)**: 15-30°C

### **🌧️ Rainfall Distribution**
- **Annual Average**: 800-1400mm
- **Monsoon Months**: 80% of annual rainfall
- **Dry Months**: Nov-May (minimal rain)

### **💧 Humidity Patterns**
- **Monsoon**: 80-90% (very humid)
- **Winter**: 50-70% (comfortable)
- **Summer**: 40-60% (dry)

---

## 🎯 **Best Practices**

### **✅ Do's:**
- Use realistic climate values for Jharkhand
- Match crops to appropriate climate zones
- Keep temperature ranges within 15-35°C
- Set rainfall based on monsoon patterns
- Update both online and offline data

### **❌ Don'ts:**
- Don't use extreme values (temp >40°C or <10°C)
- Don't assign water-intensive crops to dry areas
- Don't forget to update district lists in frontend
- Don't use unrealistic humidity (>95% or <30%)

---

## 🚀 **Ready for SIH 2025!**

The climate configuration is now complete with:
✅ **10 Jharkhand Districts** with accurate climate data  
✅ **Bilingual Support** (English/Hindi district names)  
✅ **Crop-Climate Matching** for optimal recommendations  
✅ **Offline Support** for rural connectivity  
✅ **Professional Interface** for demonstration  

**Your Crop Advisor system is climate-ready!** 🌾🌤️
