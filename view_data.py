"""
Crop Advisor - Data Viewer
Shows all available crop prices, investment data, and climate information
"""

import requests
import json
from datetime import datetime

API_BASE = "http://localhost:8000"

def show_crop_prices():
    """Display current crop prices"""
    print("💰 CROP PRICES - Jharkhand Markets")
    print("=" * 50)
    
    try:
        response = requests.get(f"{API_BASE}/crop-prices")
        if response.status_code == 200:
            data = response.json()
            
            print(f"📅 Last Updated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
            print(f"📊 Total Crops: {len(data['prices'])}")
            print()
            
            for price in data['prices']:
                trend_emoji = "📈" if price['market_trend'] == 'up' else "📉" if price['market_trend'] == 'down' else "➡️"
                print(f"🌾 {price['crop'].upper()}")
                print(f"   💵 Price: ₹{price['current_price_per_kg']}/kg")
                print(f"   {trend_emoji} Trend: {price['market_trend']}")
                print(f"   🕒 Updated: {price['last_updated']}")
                print()
        else:
            print("❌ Could not fetch crop prices")
    except Exception as e:
        print(f"❌ Error: {e}")

def show_investment_analysis(crop="rice", area=1.0):
    """Display investment analysis for a specific crop"""
    print(f"💼 INVESTMENT ANALYSIS - {crop.upper()}")
    print("=" * 50)
    
    try:
        response = requests.get(f"{API_BASE}/investment-analysis/{crop}?area_hectares={area}")
        if response.status_code == 200:
            data = response.json()
            
            print(f"🌾 Crop: {data['crop'].upper()}")
            print(f"📏 Area: {data['area_hectares']} hectares")
            print(f"🏷️ Season: {data['season']}")
            print()
            
            print("💰 FINANCIAL BREAKDOWN:")
            print(f"   💸 Total Investment: ₹{data['total_investment']:,}")
            print(f"   💹 Expected Revenue: ₹{data['expected_revenue']:,}")
            print(f"   💵 Expected Profit: ₹{data['expected_profit']:,}")
            print(f"   📊 ROI: {data['roi_percentage']:.1f}%")
            print(f"   ⚖️ Break-even Price: ₹{data['break_even_price_per_kg']:.2f}/kg")
            print()
            
            print("📋 COST BREAKDOWN:")
            for category, amount in data['cost_breakdown'].items():
                percentage = (amount / data['total_investment']) * 100
                print(f"   • {category.title()}: ₹{amount:,.0f} ({percentage:.1f}%)")
            print()
            
            print(f"🌱 Expected Yield: {data['expected_yield_kg']:,} kg")
            print(f"⚠️ Risk Level: {data['risk_level']}")
            
        else:
            print(f"❌ Could not fetch investment data for {crop}")
    except Exception as e:
        print(f"❌ Error: {e}")

def show_crop_details(crop="rice"):
    """Display detailed crop information"""
    print(f"📋 CROP DETAILS - {crop.upper()}")
    print("=" * 50)
    
    try:
        response = requests.get(f"{API_BASE}/crop-info/{crop}")
        if response.status_code == 200:
            data = response.json()
            
            print(f"🌾 Crop: {data['crop'].upper()}")
            print(f"🗓️ Season: {data['season']}")
            print(f"💧 Water Requirement: {data['water_requirement']}")
            print()
            
            print("💰 ECONOMICS:")
            print(f"   💸 Investment per hectare: ₹{data['investment_per_ha']:,}")
            print(f"   💹 Expected revenue per hectare: ₹{data['expected_revenue_per_ha']:,}")
            print(f"   💵 Expected profit per hectare: ₹{data['expected_profit_per_ha']:,}")
            print(f"   📊 Profit margin: {data['profit_margin']}")
            print(f"   🏷️ Current market price: ₹{data['current_market_price']}/kg")
            print()
            
            print("🗺️ SUITABLE DISTRICTS:")
            for district in data['suitable_districts']:
                print(f"   • {district}")
            
        else:
            print(f"❌ Could not fetch details for {crop}")
    except Exception as e:
        print(f"❌ Error: {e}")

def show_climate_data():
    """Display climate information for Jharkhand districts"""
    print("🌤️ CLIMATE DATA - Jharkhand Districts")
    print("=" * 50)
    
    # Get list of districts first
    districts = ['Ranchi', 'Dhanbad', 'Jamshedpur', 'Bokaro', 'Hazaribagh', 'Palamu', 'Garhwa', 'Koderma']
    
    for district in districts:
        try:
            response = requests.get(f"{API_BASE}/climate-data/{district}")
            if response.status_code == 200:
                data = response.json()
                
                print(f"📍 {data['district']}")
                print(f"   🌡️ Average Temperature: {data['average_temperature']}°C")
                print(f"   🌧️ Average Rainfall: {data['average_rainfall']}mm")
                print(f"   💧 Average Humidity: {data['average_humidity']}%")
                print(f"   🌾 Suitable Crops: {', '.join(data['suitable_crops'])}")
                print()
        except Exception as e:
            print(f"❌ Error fetching data for {district}: {e}")

def show_all_available_crops():
    """Show all crops available in the system"""
    print("🌾 AVAILABLE CROPS")
    print("=" * 50)
    
    crops = ['rice', 'wheat', 'maize', 'cotton', 'sugarcane', 'chickpea', 'kidney_beans', 'banana']
    
    print("You can get detailed information for any of these crops:")
    for i, crop in enumerate(crops, 1):
        print(f"{i}. {crop.upper()}")
    print()

def interactive_menu():
    """Interactive menu to explore data"""
    while True:
        print("\n🌾 CROP ADVISOR - DATA EXPLORER")
        print("=" * 40)
        print("1. 💰 View Crop Prices")
        print("2. 💼 Investment Analysis")
        print("3. 📋 Crop Details")
        print("4. 🌤️ Climate Data")
        print("5. 🌾 Available Crops")
        print("6. 🚪 Exit")
        print()
        
        choice = input("Select option (1-6): ").strip()
        
        if choice == '1':
            print("\n")
            show_crop_prices()
        elif choice == '2':
            print("\n")
            crop = input("Enter crop name (default: rice): ").strip() or "rice"
            area = input("Enter area in hectares (default: 1): ").strip() or "1"
            try:
                area = float(area)
                show_investment_analysis(crop.lower(), area)
            except ValueError:
                print("❌ Invalid area. Using 1 hectare.")
                show_investment_analysis(crop.lower(), 1.0)
        elif choice == '3':
            print("\n")
            crop = input("Enter crop name (default: rice): ").strip() or "rice"
            show_crop_details(crop.lower())
        elif choice == '4':
            print("\n")
            show_climate_data()
        elif choice == '5':
            print("\n")
            show_all_available_crops()
        elif choice == '6':
            print("👋 Thank you for using Crop Advisor!")
            break
        else:
            print("❌ Invalid choice. Please select 1-6.")
        
        input("\nPress Enter to continue...")

def main():
    """Main function"""
    print("🌾 CROP ADVISOR - DATA VIEWER")
    print("Smart India Hackathon 2025")
    print("=" * 50)
    
    # Check if API is running
    try:
        response = requests.get(f"{API_BASE}/health", timeout=5)
        if response.status_code == 200:
            print("✅ API is running")
            print()
            interactive_menu()
        else:
            print("❌ API is not responding properly")
    except Exception as e:
        print("❌ Cannot connect to API. Please ensure backend is running:")
        print("   python backend/simple_app.py")
        print()
        print("Then run this script again.")

if __name__ == "__main__":
    main()
