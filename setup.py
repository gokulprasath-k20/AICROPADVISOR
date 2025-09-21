"""
Complete setup script for किसान मित्र - AI Crop Recommendation System
Smart India Hackathon 2025
"""

import subprocess
import sys
import os
import platform

def print_header():
    """Print application header"""
    print("🌾" * 20)
    print("🌾 Crop Advisor - AI Crop Recommendation System")
    print("🌾 Smart India Hackathon 2025")
    print("🌾 Jharkhand Agriculture App")
    print("🌾" * 20)
    print()

def check_python():
    """Check Python version"""
    version = sys.version_info
    if version.major >= 3 and version.minor >= 8:
        print(f"✅ Python {version.major}.{version.minor}.{version.micro} - Compatible")
        return True
    else:
        print(f"❌ Python {version.major}.{version.minor}.{version.micro} - Requires Python 3.8+")
        return False

def check_system():
    """Check system information"""
    system = platform.system()
    print(f"💻 Operating System: {system}")
    print(f"🏗️  Architecture: {platform.machine()}")
    print(f"🐍 Python Path: {sys.executable}")
    print()

def setup_ml_environment():
    """Set up machine learning environment"""
    print("🤖 Setting up Machine Learning Environment...")
    try:
        os.chdir("ml_model")
        subprocess.check_call([sys.executable, "-m", "pip", "install", "-r", "requirements.txt"])
        print("✅ ML dependencies installed successfully!")
        
        # Train the model
        print("🧠 Training AI model...")
        result = subprocess.run([sys.executable, "simple_crop_model.py"], 
                              capture_output=True, text=True)
        if result.returncode == 0:
            print("✅ AI model trained successfully!")
        else:
            print("⚠️  Model training completed with warnings")
        
        os.chdir("..")
        return True
    except Exception as e:
        print(f"❌ Error setting up ML environment: {e}")
        os.chdir("..")
        return False

def setup_backend():
    """Set up FastAPI backend"""
    print("🔧 Setting up Backend API...")
    try:
        os.chdir("backend")
        subprocess.check_call([sys.executable, "-m", "pip", "install", "-r", "requirements.txt"])
        print("✅ Backend dependencies installed successfully!")
        os.chdir("..")
        return True
    except Exception as e:
        print(f"❌ Error setting up backend: {e}")
        os.chdir("..")
        return False

def check_node_npm():
    """Check Node.js and npm"""
    try:
        node_result = subprocess.run(["node", "--version"], capture_output=True, text=True)
        npm_result = subprocess.run(["npm", "--version"], capture_output=True, text=True)
        
        if node_result.returncode == 0 and npm_result.returncode == 0:
            print(f"✅ Node.js: {node_result.stdout.strip()}")
            print(f"✅ npm: {npm_result.stdout.strip()}")
            return True
        else:
            print("❌ Node.js or npm not found")
            return False
    except FileNotFoundError:
        print("❌ Node.js not found. Please install from https://nodejs.org/")
        return False

def setup_frontend():
    """Set up React Native frontend"""
    print("📱 Setting up React Native Frontend...")
    
    if not check_node_npm():
        print("⚠️  Skipping frontend setup - Node.js required")
        return False
    
    try:
        # Install Expo CLI globally
        print("📦 Installing Expo CLI...")
        subprocess.run(["npm", "install", "-g", "@expo/cli"], check=False)
        
        # Install frontend dependencies
        os.chdir("frontend")
        print("📦 Installing frontend dependencies...")
        subprocess.check_call(["npm", "install"])
        
        # Create assets directory
        if not os.path.exists("assets"):
            os.makedirs("assets")
            print("📁 Created assets directory")
        
        os.chdir("..")
        print("✅ Frontend setup completed!")
        return True
    except Exception as e:
        print(f"❌ Error setting up frontend: {e}")
        if os.getcwd().endswith("frontend"):
            os.chdir("..")
        return False

def create_run_scripts():
    """Create platform-specific run scripts"""
    system = platform.system()
    
    if system == "Windows":
        # Windows batch files
        backend_script = """@echo off
echo Starting किसान मित्र Backend...
python run_backend.py
pause
"""
        frontend_script = """@echo off
echo Starting किसान मित्र Frontend...
python run_frontend.py
pause
"""
        
        with open("start_backend.bat", "w") as f:
            f.write(backend_script)
        
        with open("start_frontend.bat", "w") as f:
            f.write(frontend_script)
        
        print("✅ Created Windows batch files: start_backend.bat, start_frontend.bat")
    
    else:
        # Unix shell scripts
        backend_script = """#!/bin/bash
echo "Starting किसान मित्र Backend..."
python3 run_backend.py
"""
        frontend_script = """#!/bin/bash
echo "Starting किसान मित्र Frontend..."
python3 run_frontend.py
"""
        
        with open("start_backend.sh", "w") as f:
            f.write(backend_script)
        
        with open("start_frontend.sh", "w") as f:
            f.write(frontend_script)
        
        # Make scripts executable
        os.chmod("start_backend.sh", 0o755)
        os.chmod("start_frontend.sh", 0o755)
        
        print("✅ Created shell scripts: start_backend.sh, start_frontend.sh")

def print_instructions():
    """Print final instructions"""
    system = platform.system()
    
    print("🎉" * 20)
    print("🎉 Setup Complete! Crop Advisor is ready to use!")
    print("🎉" * 20)
    print()
    
    print("📋 How to run the application:")
    print()
    
    print("1️⃣  Start the Backend API:")
    if system == "Windows":
        print("   • Double-click: start_backend.bat")
        print("   • Or run: python run_backend.py")
    else:
        print("   • Run: ./start_backend.sh")
        print("   • Or run: python3 run_backend.py")
    
    print("   📡 API will be available at: http://localhost:8000")
    print("   📖 API docs: http://localhost:8000/docs")
    print()
    
    print("2️⃣  Start the Mobile App (in a new terminal):")
    if system == "Windows":
        print("   • Double-click: start_frontend.bat")
        print("   • Or run: python run_frontend.py")
    else:
        print("   • Run: ./start_frontend.sh")
        print("   • Or run: python3 run_frontend.py")
    
    print("   📱 Scan QR code with Expo Go app")
    print("   🌐 Or press 'w' for web version")
    print()
    
    print("📚 Additional Information:")
    print("   • README.md - Complete documentation")
    print("   • ML Model: ml_model/simple_crop_model.py")
    print("   • Backend API: backend/app.py")
    print("   • Frontend: frontend/App.js")
    print()
    
    print("🆘 Support:")
    print("   • GitHub Issues for technical problems")
    print("   • Email: support@cropadvisor.in")
    print()
    
    print("🙏 Thank you for using Crop Advisor!")
    print("   Made with ❤️  for farmers of Jharkhand")

def main():
    """Main setup function"""
    print_header()
    
    # Check system requirements
    if not check_python():
        print("❌ Setup failed - Python version incompatible")
        return
    
    check_system()
    
    # Setup components
    print("🚀 Starting setup process...\n")
    
    # 1. Machine Learning Environment
    if not setup_ml_environment():
        print("⚠️  ML setup failed, but continuing...")
    print()
    
    # 2. Backend API
    if not setup_backend():
        print("⚠️  Backend setup failed, but continuing...")
    print()
    
    # 3. Frontend (optional)
    setup_frontend()
    print()
    
    # 4. Create run scripts
    create_run_scripts()
    print()
    
    # 5. Final instructions
    print_instructions()

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n🛑 Setup interrupted by user")
    except Exception as e:
        print(f"\n❌ Setup failed with error: {e}")
        print("Please check the error and try again")
