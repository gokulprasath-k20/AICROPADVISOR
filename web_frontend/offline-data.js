// Offline Data for Crop Advisor
// This contains all the essential data for offline functionality

const OFFLINE_CROP_DATA = {
    crops: {
        'rice': {
            name_en: 'Rice',
            name_hi: 'धान',
            emoji: '🌾',
            season: 'Kharif / खरीफ',
            water_requirement: 'High / उच्च',
            investment_per_ha: 45000,
            expected_revenue_per_ha: 75000,
            expected_profit_per_ha: 30000,
            profit_margin: '40%',
            current_market_price: 25.50,
            suitable_districts: ['Ranchi / रांची', 'Dhanbad / धनबाद', 'Jamshedpur / जमशेदपुर', 'Bokaro / बोकारो']
        },
        'wheat': {
            name_en: 'Wheat',
            name_hi: 'गेहूं',
            emoji: '🌾',
            season: 'Rabi / रबी',
            water_requirement: 'Medium / मध्यम',
            investment_per_ha: 28000,
            expected_revenue_per_ha: 35000,
            expected_profit_per_ha: 7000,
            profit_margin: '25%',
            current_market_price: 22.0,
            suitable_districts: ['Palamu / पलामू', 'Garhwa / गढ़वा', 'Latehar / लातेहार']
        },
        'maize': {
            name_en: 'Maize',
            name_hi: 'मक्का',
            emoji: '🌽',
            season: 'Kharif/Rabi / खरीफ/रबी',
            water_requirement: 'Medium / मध्यम',
            investment_per_ha: 25000,
            expected_revenue_per_ha: 33750,
            expected_profit_per_ha: 8750,
            profit_margin: '35%',
            current_market_price: 18.0,
            suitable_districts: ['Ranchi / रांची', 'Hazaribagh / हजारीबाग', 'Koderma / कोडरमा']
        },
        'cotton': {
            name_en: 'Cotton',
            name_hi: 'कपास',
            emoji: '🌿',
            season: 'Kharif / खरीफ',
            water_requirement: 'Medium / मध्यम',
            investment_per_ha: 40000,
            expected_revenue_per_ha: 56000,
            expected_profit_per_ha: 16000,
            profit_margin: '40%',
            current_market_price: 45.0,
            suitable_districts: ['Palamu / पलामू', 'Garhwa / गढ़वा']
        },
        'sugarcane': {
            name_en: 'Sugarcane',
            name_hi: 'गन्ना',
            emoji: '🎋',
            season: 'Annual / वार्षिक',
            water_requirement: 'High / उच्च',
            investment_per_ha: 60000,
            expected_revenue_per_ha: 87000,
            expected_profit_per_ha: 27000,
            profit_margin: '45%',
            current_market_price: 3.5,
            suitable_districts: ['Ranchi / रांची', 'Hazaribagh / हजारीबाग']
        },
        'chickpea': {
            name_en: 'Chickpea',
            name_hi: 'चना',
            emoji: '🫘',
            season: 'Rabi / रबी',
            water_requirement: 'Low / कम',
            investment_per_ha: 20000,
            expected_revenue_per_ha: 30000,
            expected_profit_per_ha: 10000,
            profit_margin: '50%',
            current_market_price: 55.0,
            suitable_districts: ['Palamu / पलामू', 'Garhwa / गढ़वा', 'Latehar / लातेहार']
        },
        'kidney_beans': {
            name_en: 'Kidney Beans',
            name_hi: 'राजमा',
            emoji: '🫘',
            season: 'Rabi / रबी',
            water_requirement: 'Medium / मध्यम',
            investment_per_ha: 22000,
            expected_revenue_per_ha: 35200,
            expected_profit_per_ha: 13200,
            profit_margin: '60%',
            current_market_price: 80.0,
            suitable_districts: ['Ranchi / रांची', 'Hazaribagh / हजारीबाग']
        },
        'banana': {
            name_en: 'Banana',
            name_hi: 'केला',
            emoji: '🍌',
            season: 'Annual / वार्षिक',
            water_requirement: 'High / उच्च',
            investment_per_ha: 45000,
            expected_revenue_per_ha: 63000,
            expected_profit_per_ha: 18000,
            profit_margin: '40%',
            current_market_price: 15.0,
            suitable_districts: ['Ranchi / रांची', 'Dhanbad / धनबाद']
        }
    },

    districts: {
        'Ranchi': {
            name_en: 'Ranchi',
            name_hi: 'रांची',
            average_temperature: 24,        // Change temperature (°C)
            average_rainfall: 1200,         // Change rainfall (mm/year)  
            average_humidity: 75,           // Change humidity (%)
            suitable_crops: ['rice', 'maize', 'wheat', 'sugarcane', 'kidney_beans', 'banana']  // Modify crops
        },
        'Dhanbad': {
            name_en: 'Dhanbad',
            name_hi: 'धनबाद',
            average_temperature: 26,
            average_rainfall: 1100,
            average_humidity: 70,
            suitable_crops: ['rice', 'maize', 'cotton', 'banana']
        },
        'Jamshedpur': {
            name_en: 'Jamshedpur',
            name_hi: 'जमशेदपुर',
            average_temperature: 27,
            average_rainfall: 1300,
            average_humidity: 75,
            suitable_crops: ['rice', 'maize', 'wheat']
        },
        'Bokaro': {
            name_en: 'Bokaro',
            name_hi: 'बोकारो',
            average_temperature: 25,
            average_rainfall: 1150,
            average_humidity: 70,
            suitable_crops: ['rice', 'maize', 'cotton']
        },
        'Hazaribagh': {
            name_en: 'Hazaribagh',
            name_hi: 'हजारीबाग',
            average_temperature: 23,
            average_rainfall: 1000,
            average_humidity: 75,
            suitable_crops: ['rice', 'wheat', 'maize', 'sugarcane', 'kidney_beans']
        },
        'Palamu': {
            name_en: 'Palamu',
            name_hi: 'पलामू',
            average_temperature: 25,
            average_rainfall: 900,
            average_humidity: 65,
            suitable_crops: ['wheat', 'maize', 'cotton', 'chickpea']
        },
        'Garhwa': {
            name_en: 'Garhwa',
            name_hi: 'गढ़वा',
            average_temperature: 24,
            average_rainfall: 950,
            average_humidity: 68,
            suitable_crops: ['wheat', 'maize', 'cotton', 'chickpea']
        },
        'Koderma': {
            name_en: 'Koderma',
            name_hi: 'कोडरमा',
            average_temperature: 24,
            average_rainfall: 1050,
            average_humidity: 72,
            suitable_crops: ['rice', 'maize', 'wheat']
        },
        'Deoghar': {
            name_en: 'Deoghar',
            name_hi: 'देवघर',
            average_temperature: 25,
            average_rainfall: 1100,
            average_humidity: 73,
            suitable_crops: ['rice', 'maize', 'wheat', 'chickpea']
        },
        'Dumka': {
            name_en: 'Dumka',
            name_hi: 'दुमका',
            average_temperature: 26,
            average_rainfall: 1250,
            average_humidity: 78,
            suitable_crops: ['rice', 'maize', 'banana', 'sugarcane']
        }
    },

    market_prices: [
        {
            crop_name: 'Rice',
            crop_name_hindi: 'धान',
            price_per_kg: 25.50,
            market_trend: 'Stable demand, good prices',
            last_updated: '2025-01-21'
        },
        {
            crop_name: 'Wheat',
            crop_name_hindi: 'गेहूं', 
            price_per_kg: 22.00,
            market_trend: 'High demand, rising prices',
            last_updated: '2025-01-21'
        },
        {
            crop_name: 'Maize',
            crop_name_hindi: 'मक्का',
            price_per_kg: 18.00,
            market_trend: 'Moderate demand, stable prices',
            last_updated: '2025-01-21'
        },
        {
            crop_name: 'Cotton',
            crop_name_hindi: 'कपास',
            price_per_kg: 85.00,
            market_trend: 'High demand, premium prices',
            last_updated: '2025-01-21'
        },
        {
            crop_name: 'Sugarcane',
            crop_name_hindi: 'गन्ना',
            price_per_kg: 3.80,
            market_trend: 'Steady demand, fair prices',
            last_updated: '2025-01-21'
        },
        {
            crop_name: 'Chickpea',
            crop_name_hindi: 'चना',
            price_per_kg: 65.00,
            market_trend: 'High demand, good returns',
            last_updated: '2025-01-21'
        },
        {
            crop_name: 'Kidney Beans',
            crop_name_hindi: 'राजमा',
            price_per_kg: 120.00,
            market_trend: 'Premium crop, excellent prices',
            last_updated: '2025-01-21'
        },
        {
            crop_name: 'Banana',
            crop_name_hindi: 'केला',
            price_per_kg: 15.00,
            market_trend: 'Consistent demand, stable prices',
            last_updated: '2025-01-21'
        }
    ],

    // Enhanced offline crop recommendation logic - supports decimal inputs
    getCropRecommendation: function(N, P, K, temperature, humidity, ph, rainfall) {
        // Convert all inputs to numbers to ensure decimal support
        N = parseFloat(N) || 0;
        P = parseFloat(P) || 0;
        K = parseFloat(K) || 0;
        temperature = parseFloat(temperature) || 0;
        humidity = parseFloat(humidity) || 0;
        ph = parseFloat(ph) || 0;
        rainfall = parseFloat(rainfall) || 0;
        
        // Calculate crop scores based on multiple factors
        const cropScores = {};
        
        // Rice scoring - prefers high rainfall, humidity, temperature
        cropScores.rice = 0;
        if (rainfall >= 150) cropScores.rice += 30;
        else if (rainfall >= 100) cropScores.rice += 20;
        else if (rainfall >= 50) cropScores.rice += 10;
        
        if (humidity >= 70) cropScores.rice += 25;
        else if (humidity >= 60) cropScores.rice += 15;
        
        if (temperature >= 22 && temperature <= 30) cropScores.rice += 20;
        if (ph >= 5.5 && ph <= 7.0) cropScores.rice += 15;
        if (N >= 80) cropScores.rice += 10;
        
        // Wheat scoring - prefers cooler temperatures, moderate rainfall
        cropScores.wheat = 0;
        if (temperature >= 15 && temperature <= 25) cropScores.wheat += 30;
        if (rainfall >= 50 && rainfall <= 150) cropScores.wheat += 25;
        if (humidity >= 50 && humidity <= 70) cropScores.wheat += 20;
        if (ph >= 6.0 && ph <= 7.5) cropScores.wheat += 15;
        if (N >= 60) cropScores.wheat += 10;
        
        // Maize scoring - versatile crop
        cropScores.maize = 0;
        if (temperature >= 20 && temperature <= 30) cropScores.maize += 25;
        if (rainfall >= 80 && rainfall <= 200) cropScores.maize += 25;
        if (humidity >= 55 && humidity <= 75) cropScores.maize += 20;
        if (ph >= 5.8 && ph <= 7.8) cropScores.maize += 15;
        if (P >= 40) cropScores.maize += 10;
        if (K >= 40) cropScores.maize += 5;
        
        // Cotton scoring - warm weather, moderate water
        cropScores.cotton = 0;
        if (temperature >= 25 && temperature <= 35) cropScores.cotton += 30;
        if (rainfall >= 60 && rainfall <= 120) cropScores.cotton += 25;
        if (humidity >= 60 && humidity <= 80) cropScores.cotton += 20;
        if (ph >= 5.8 && ph <= 8.0) cropScores.cotton += 15;
        if (K >= 50) cropScores.cotton += 10;
        
        // Sugarcane scoring - high water, warm climate
        cropScores.sugarcane = 0;
        if (temperature >= 24 && temperature <= 32) cropScores.sugarcane += 25;
        if (rainfall >= 120) cropScores.sugarcane += 30;
        else if (rainfall >= 80) cropScores.sugarcane += 20;
        if (humidity >= 70) cropScores.sugarcane += 20;
        if (ph >= 6.0 && ph <= 7.5) cropScores.sugarcane += 15;
        if (N >= 100) cropScores.sugarcane += 10;
        
        // Chickpea scoring - drought tolerant, cool season
        cropScores.chickpea = 0;
        if (temperature >= 18 && temperature <= 28) cropScores.chickpea += 25;
        if (rainfall >= 30 && rainfall <= 100) cropScores.chickpea += 30;
        if (humidity >= 40 && humidity <= 65) cropScores.chickpea += 20;
        if (ph >= 6.2 && ph <= 7.8) cropScores.chickpea += 15;
        if (P >= 30) cropScores.chickpea += 10;
        
        // Kidney beans scoring
        cropScores.kidney_beans = 0;
        if (temperature >= 20 && temperature <= 28) cropScores.kidney_beans += 25;
        if (rainfall >= 80 && rainfall <= 150) cropScores.kidney_beans += 25;
        if (humidity >= 60 && humidity <= 75) cropScores.kidney_beans += 20;
        if (ph >= 6.0 && ph <= 7.5) cropScores.kidney_beans += 15;
        if (P >= 45) cropScores.kidney_beans += 10;
        if (K >= 45) cropScores.kidney_beans += 5;
        
        // Banana scoring - tropical conditions
        cropScores.banana = 0;
        if (temperature >= 26 && temperature <= 32) cropScores.banana += 30;
        if (rainfall >= 100) cropScores.banana += 25;
        if (humidity >= 75) cropScores.banana += 20;
        if (ph >= 6.0 && ph <= 7.5) cropScores.banana += 15;
        if (K >= 60) cropScores.banana += 10;
        
        // Find the crop with highest score
        let bestCrop = 'chickpea';
        let maxScore = cropScores.chickpea || 0;
        
        for (const [crop, score] of Object.entries(cropScores)) {
            if (score > maxScore) {
                maxScore = score;
                bestCrop = crop;
            }
        }
        
        // Calculate confidence based on score
        const confidence = Math.min(0.95, Math.max(0.60, maxScore / 100));
        
        // Calculate yield based on conditions and crop type
        const yieldMultipliers = {
            rice: 3500, wheat: 2800, maize: 3200, cotton: 1200,
            sugarcane: 8000, chickpea: 1800, kidney_beans: 1600, banana: 4000
        };
        
        const baseYield = yieldMultipliers[bestCrop] || 2000;
        const conditionFactor = Math.min(1.3, Math.max(0.7, maxScore / 80));
        const predictedYield = Math.round(baseYield * conditionFactor);
        
        // Calculate sustainability score
        let sustainabilityScore = 5.0;
        if (rainfall < 200) sustainabilityScore += 1.5; // Water conservation
        if (N < 100) sustainabilityScore += 1.0; // Lower fertilizer use
        if (ph >= 6.0 && ph <= 7.5) sustainabilityScore += 1.5; // Optimal pH
        if (bestCrop === 'chickpea' || bestCrop === 'kidney_beans') sustainabilityScore += 1.0; // Nitrogen fixing
        sustainabilityScore = Math.min(10, sustainabilityScore);
        
        // Generate crop-specific recommendations
        const cropData = this.crops[bestCrop];
        const recommendations = [];
        
        if (cropData) {
            recommendations.push(`Best season for ${cropData.name_en}: ${cropData.season}`);
            recommendations.push(`Water requirement: ${cropData.water_requirement}`);
            recommendations.push(`Expected investment: ₹${cropData.investment_per_ha.toLocaleString()} per hectare`);
            recommendations.push(`Suitable districts: ${cropData.suitable_districts.join(', ')}`);
        }
        
        // Add condition-specific recommendations
        if (ph < 6.0) {
            recommendations.push('Consider adding lime to increase soil pH / मिट्टी का pH बढ़ाने के लिए चूना मिलाएं');
        } else if (ph > 7.5) {
            recommendations.push('Consider adding organic matter to reduce soil pH / मिट्टी का pH कम करने के लिए जैविक पदार्थ मिलाएं');
        }
        
        if (N < 40) {
            recommendations.push('Consider nitrogen-rich fertilizers / नाइट्रोजन युक्त उर्वरक का उपयोग करें');
        }
        
        if (P < 30) {
            recommendations.push('Add phosphorus fertilizers for better root development / जड़ों के बेहतर विकास के लिए फास्फोरस उर्वरक मिलाएं');
        }
        
        return {
            crop: bestCrop,
            predicted_yield_kg_per_ha: predictedYield,
            sustainability_score: Math.round(sustainabilityScore * 10) / 10,
            confidence: Math.round(confidence * 1000) / 1000,
            recommendations: recommendations
        };
    },

    // Generate market prices (simulated for offline)
    getMarketPrices: function() {
        const prices = [];
        const currentDate = new Date();
        
        Object.keys(this.crops).forEach(cropKey => {
            const crop = this.crops[cropKey];
            // Simulate small price variations (±8%)
            const variation = (Math.random() - 0.5) * 0.16;
            const currentPrice = crop.current_market_price * (1 + variation);
            
            // More realistic trend distribution
            const trendRandom = Math.random();
            let trend;
            if (trendRandom < 0.35) trend = 'up';
            else if (trendRandom < 0.70) trend = 'stable';
            else trend = 'down';
            
            prices.push({
                crop: cropKey,
                current_price_per_kg: Math.round(currentPrice * 100) / 100,
                market_trend: trend,
                last_updated: currentDate.toISOString()
            });
        });
        
        return { prices: prices };
    },

    // Generate investment analysis
    getInvestmentAnalysis: function(cropName, areaHectares = 1.0) {
        const crop = this.crops[cropName];
        if (!crop) return null;
        
        const totalInvestment = crop.investment_per_ha * areaHectares;
        const expectedRevenue = crop.expected_revenue_per_ha * areaHectares;
        const expectedProfit = crop.expected_profit_per_ha * areaHectares;
        const roiPercentage = (expectedProfit / totalInvestment) * 100;
        
        // Cost breakdown (percentages)
        const costBreakdown = {
            seeds: Math.round(totalInvestment * 0.15),
            fertilizers: Math.round(totalInvestment * 0.25),
            pesticides: Math.round(totalInvestment * 0.10),
            irrigation: Math.round(totalInvestment * 0.20),
            labor: Math.round(totalInvestment * 0.20),
            machinery: Math.round(totalInvestment * 0.10)
        };
        
        const expectedYield = Math.round((expectedRevenue / crop.current_market_price));
        const breakEvenPrice = totalInvestment / expectedYield;
        
        return {
            crop: cropName,
            area_hectares: areaHectares,
            season: crop.season,
            total_investment: totalInvestment,
            expected_revenue: expectedRevenue,
            expected_profit: expectedProfit,
            roi_percentage: roiPercentage,
            cost_breakdown: costBreakdown,
            expected_yield_kg: expectedYield,
            break_even_price_per_kg: breakEvenPrice,
            risk_level: roiPercentage > 40 ? 'Low' : roiPercentage > 20 ? 'Medium' : 'High'
        };
    }
};

// Export for use in main application
if (typeof module !== 'undefined' && module.exports) {
    module.exports = OFFLINE_CROP_DATA;
}
