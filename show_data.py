"""
Quick Data Display for Crop Advisor
Shows crop prices, investment analysis, and climate data
"""

import requests
import json

def show_crop_prices():
    """Show current crop prices"""
    print("💰 CURRENT CROP PRICES (Jharkhand Markets)")
    print("=" * 60)
    
    try:
        response = requests.get("http://localhost:8000/crop-prices")
        data = response.json()
        
        for price in data['prices']:
            trend = "📈 Rising" if price['market_trend'] == 'up' else "📉 Falling" if price['market_trend'] == 'down' else "➡️ Stable"
            print(f"🌾 {price['crop'].upper():<12} | ₹{price['current_price_per_kg']:>6.2f}/kg | {trend}")
        
        print("\n" + "=" * 60)
    except Exception as e:
        print(f"❌ Error: {e}")

def show_investment_example():
    """Show investment analysis example"""
    print("\n💼 INVESTMENT ANALYSIS EXAMPLE (Rice - 1 hectare)")
    print("=" * 60)
    
    try:
        response = requests.get("http://localhost:8000/investment-analysis/rice?area_hectares=1")
        data = response.json()
        
        print(f"🌾 Crop: {data['crop'].upper()}")
        print(f"📏 Area: {data['area_hectares']} hectare(s)")
        print(f"💸 Total Investment: ₹{data['total_investment']:,}")
        print(f"💹 Expected Revenue: ₹{data['expected_revenue']:,}")
        print(f"💵 Expected Profit: ₹{data['expected_profit']:,}")
        print(f"📊 ROI: {data['roi_percentage']:.1f}%")
        print(f"🌱 Expected Yield: {data['expected_yield_kg']:,} kg")
        
        print("\n📋 Cost Breakdown:")
        for item, cost in data['cost_breakdown'].items():
            percentage = (cost / data['total_investment']) * 100
            print(f"   • {item.title():<12}: ₹{cost:>8,.0f} ({percentage:>4.1f}%)")
        
        print("\n" + "=" * 60)
    except Exception as e:
        print(f"❌ Error: {e}")

def show_climate_data():
    """Show climate data for major districts"""
    print("\n🌤️ CLIMATE DATA (Major Jharkhand Districts)")
    print("=" * 60)
    
    districts = ['Ranchi', 'Dhanbad', 'Hazaribagh', 'Palamu']
    
    for district in districts:
        try:
            response = requests.get(f"http://localhost:8000/climate-data/{district}")
            data = response.json()
            
            print(f"📍 {data['district']:<12} | {data['average_temperature']:>2}°C | {data['average_rainfall']:>4}mm | {data['average_humidity']:>2}% humidity")
            print(f"   🌾 Suitable crops: {', '.join(data['suitable_crops'])}")
            print()
        except Exception as e:
            print(f"❌ Error for {district}: {e}")
    
    print("=" * 60)

def main():
    print("🌾 CROP ADVISOR - DATA OVERVIEW")
    print("Smart India Hackathon 2025")
    print()
    
    # Check API connection
    try:
        response = requests.get("http://localhost:8000/health", timeout=3)
        if response.status_code == 200:
            print("✅ Backend API is running\n")
            
            # Show all data
            show_crop_prices()
            show_investment_example()
            show_climate_data()
            
            print("\n🔗 ACCESS MORE DATA:")
            print("• Web App: http://localhost:3000")
            print("• API Docs: http://localhost:8000/docs")
            print("• Interactive: python view_data.py")
            
        else:
            print("❌ API not responding properly")
    except Exception as e:
        print("❌ Cannot connect to API. Please start backend:")
        print("   python backend/simple_app.py")

if __name__ == "__main__":
    main()
