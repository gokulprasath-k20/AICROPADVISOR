"""
Script to run the React Native frontend
"""

import subprocess
import sys
import os
import json

def check_node():
    """Check if Node.js is installed"""
    try:
        result = subprocess.run(["node", "--version"], capture_output=True, text=True)
        if result.returncode == 0:
            print(f"✅ Node.js version: {result.stdout.strip()}")
            return True
        else:
            print("❌ Node.js not found. Please install Node.js from https://nodejs.org/")
            return False
    except FileNotFoundError:
        print("❌ Node.js not found. Please install Node.js from https://nodejs.org/")
        return False

def check_expo():
    """Check if Expo CLI is installed"""
    try:
        result = subprocess.run(["expo", "--version"], capture_output=True, text=True)
        if result.returncode == 0:
            print(f"✅ Expo CLI version: {result.stdout.strip()}")
            return True
    except FileNotFoundError:
        pass
    
    # Try to install Expo CLI
    print("📱 Installing Expo CLI...")
    try:
        subprocess.check_call(["npm", "install", "-g", "@expo/cli"])
        print("✅ Expo CLI installed successfully!")
        return True
    except FileNotFoundError:
        print("❌ npm not found. Please install Node.js and npm first.")
        print("   Download from: https://nodejs.org/")
        return False
    except subprocess.CalledProcessError as e:
        print(f"❌ Failed to install Expo CLI: {e}")
        print("   Try running as administrator or install manually:")
        print("   npm install -g @expo/cli")
        return False

def install_dependencies():
    """Install frontend dependencies"""
    print("📦 Installing frontend dependencies...")
    try:
        os.chdir("frontend")
        subprocess.check_call(["npm", "install"])
        os.chdir("..")
        print("✅ Frontend dependencies installed successfully!")
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ Error installing dependencies: {e}")
        return False

def create_assets():
    """Create basic asset files if they don't exist"""
    assets_dir = "frontend/assets"
    if not os.path.exists(assets_dir):
        os.makedirs(assets_dir)
    
    # Create placeholder files (in a real project, you'd have actual images)
    placeholder_files = [
        "icon.png",
        "splash.png",
        "adaptive-icon.png",
        "favicon.png"
    ]
    
    for file in placeholder_files:
        file_path = os.path.join(assets_dir, file)
        if not os.path.exists(file_path):
            # Create empty file
            with open(file_path, 'w') as f:
                f.write("")
    
    print("✅ Asset files created")

def start_frontend():
    """Start the React Native frontend"""
    print("🚀 Starting React Native frontend...")
    try:
        os.chdir("frontend")
        subprocess.run(["expo", "start"])
    except KeyboardInterrupt:
        print("\n🛑 Frontend stopped by user")
    except Exception as e:
        print(f"❌ Error starting frontend: {e}")

def main():
    print("📱 Crop Advisor - React Native Frontend")
    print("=" * 50)
    
    # Check prerequisites
    if not check_node():
        return
    
    if not check_expo():
        return
    
    # Install dependencies
    if not install_dependencies():
        return
    
    # Create assets
    create_assets()
    
    # Start frontend
    print("\n🚀 Starting React Native development server...")
    print("📱 Scan QR code with Expo Go app on your phone")
    print("🌐 Or press 'w' to open in web browser")
    print("\n⚡ Press Ctrl+C to stop the server")
    print("-" * 50)
    
    start_frontend()

if __name__ == "__main__":
    main()
