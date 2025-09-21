"""
Script to run the FastAPI backend server
"""

import subprocess
import sys
import os

def install_requirements():
    """Install required packages"""
    print("Installing backend requirements...")
    try:
        subprocess.check_call([sys.executable, "-m", "pip", "install", "-r", "backend/requirements.txt"])
        print("✅ Backend requirements installed successfully!")
    except subprocess.CalledProcessError as e:
        print(f"❌ Error installing requirements: {e}")
        return False
    return True

def run_ml_model():
    """Run the ML model training script"""
    print("Training ML model...")
    try:
        os.chdir("ml_model")
        subprocess.check_call([sys.executable, "simple_crop_model.py"])
        os.chdir("..")
        print("✅ ML model trained successfully!")
    except subprocess.CalledProcessError as e:
        print(f"❌ Error training ML model: {e}")
        return False
    return True

def start_backend():
    """Start the FastAPI backend server"""
    print("Starting FastAPI backend server...")
    try:
        os.chdir("backend")
        # Try the simple app first, fallback to main app
        try:
            subprocess.run([sys.executable, "simple_app.py"])
        except FileNotFoundError:
            subprocess.run([sys.executable, "-m", "uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000", "--reload"])
    except KeyboardInterrupt:
        print("\n🛑 Backend server stopped by user")
    except Exception as e:
        print(f"❌ Error starting backend: {e}")

def main():
    print("🌾 Crop Advisor - AI Crop Recommendation System")
    print("=" * 50)
    
    # Install requirements
    if not install_requirements():
        return
    
    # Train ML model
    if not run_ml_model():
        return
    
    # Start backend server
    print("\n🚀 Starting backend server...")
    print("📡 API will be available at: http://localhost:8000")
    print("📖 API documentation: http://localhost:8000/docs")
    print("\n⚡ Press Ctrl+C to stop the server")
    print("-" * 50)
    
    start_backend()

if __name__ == "__main__":
    main()
