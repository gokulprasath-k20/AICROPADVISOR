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

    // Simple offline crop recommendation logic - supports decimal inputs
    getCropRecommendation: function(N, P, K, temperature, humidity, ph, rainfall) {
        // Convert all inputs to numbers to ensure decimal support
        N = parseFloat(N) || 0;
        P = parseFloat(P) || 0;
        K = parseFloat(K) || 0;
        temperature = parseFloat(temperature) || 0;
        humidity = parseFloat(humidity) || 0;
        ph = parseFloat(ph) || 0;
        rainfall = parseFloat(rainfall) || 0;
        
        // Basic rule-based prediction for offline use - works with decimals
        if (rainfall > 200.0 && humidity > 80.0 && temperature > 23.0) {
            return {
                crop: 'rice',
                predicted_yield_kg_per_ha: 3500,
                sustainability_score: 8.5,
                confidence: 0.85,
                recommendations: [
                    'Best season for rice: Kharif / धान के लिए सबसे अच्छा मौसम: खरीफ',
                    'Water requirement: High / पानी की आवश्यकता: उच्च',
                    'Expected investment: ₹45,000 per hectare / अपेक्षित निवेश: ₹45,000 प्रति हेक्टेयर',
                    'Suitable districts: Ranchi, Dhanbad, Jamshedpur, Bokaro'
                ]
            };
        } else if (temperature < 25.0 && rainfall < 100.0 && ph > 6.5) {
            return {
                crop: 'wheat',
                predicted_yield_kg_per_ha: 2800,
                sustainability_score: 7.5,
                confidence: 0.80,
                recommendations: [
                    'Best season for wheat: Rabi / गेहूं के लिए सबसे अच्छा मौसम: रबी',
                    'Water requirement: Medium / पानी की आवश्यकता: मध्यम',
                    'Expected investment: ₹28,000 per hectare / अपेक्षित निवेश: ₹28,000 प्रति हेक्टेयर',
                    'Suitable districts: Palamu, Garhwa, Latehar'
                ]
            };
        } else if (temperature > 22.0 && temperature < 28.0 && rainfall > 100.0 && rainfall < 200.0) {
            return {
                crop: 'maize',
                predicted_yield_kg_per_ha: 3200,
                sustainability_score: 8.0,
                confidence: 0.88,
                recommendations: [
                    'Best season for maize: Kharif/Rabi / मक्का के लिए सबसे अच्छा मौसम: खरीफ/रबी',
                    'Water requirement: Medium / पानी की आवश्यकता: मध्यम',
                    'Expected investment: ₹25,000 per hectare / अपेक्षित निवेश: ₹25,000 प्रति हेक्टेयर',
                    'Suitable districts: Ranchi, Hazaribagh, Koderma'
                ]
            };
        } else {
            return {
                crop: 'chickpea',
                predicted_yield_kg_per_ha: 1800,
                sustainability_score: 9.0,
                confidence: 0.75,
                recommendations: [
                    'Best season for chickpea: Rabi / चना के लिए सबसे अच्छा मौसम: रबी',
                    'Water requirement: Low / पानी की आवश्यकता: कम',
                    'Expected investment: ₹20,000 per hectare / अपेक्षित निवेश: ₹20,000 प्रति हेक्टेयर',
                    'Suitable districts: Palamu, Garhwa, Latehar'
                ]
            };
        }
    },

    // Generate market prices (simulated for offline)
    getMarketPrices: function() {
        const prices = [];
        const currentDate = new Date();
        
        Object.keys(this.crops).forEach(cropKey => {
            const crop = this.crops[cropKey];
            // Simulate small price variations
            const variation = (Math.random() - 0.5) * 0.1; // ±5% variation
            const currentPrice = crop.current_market_price * (1 + variation);
            
            prices.push({
                crop: cropKey,
                current_price_per_kg: currentPrice,
                market_trend: Math.random() > 0.5 ? 'up' : Math.random() > 0.3 ? 'stable' : 'down',
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
