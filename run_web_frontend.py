"""
Simple web server for किसान मित्र Web Frontend
Alternative to React Native when Node.js/Expo setup is complex
"""

import http.server
import socketserver
import webbrowser
import os
import sys
import threading
import time

def start_web_server():
    """Start a simple HTTP server for the web frontend"""
    
    # Change to web_frontend directory
    web_dir = os.path.join(os.getcwd(), 'web_frontend')
    if not os.path.exists(web_dir):
        print("❌ Web frontend directory not found")
        return False
    
    os.chdir(web_dir)
    
    PORT = 3000
    
    class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
        def end_headers(self):
            # Add CORS headers
            self.send_header('Access-Control-Allow-Origin', '*')
            self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
            self.send_header('Access-Control-Allow-Headers', 'Content-Type')
            super().end_headers()
        
        def do_OPTIONS(self):
            self.send_response(200)
            self.end_headers()
    
    try:
        with socketserver.TCPServer(("", PORT), MyHTTPRequestHandler) as httpd:
            print(f"🌐 Web frontend server started at: http://localhost:{PORT}")
            print("📱 Opening in your default browser...")
            
            # Open browser after a short delay
            def open_browser():
                time.sleep(2)
                webbrowser.open(f'http://localhost:{PORT}')
            
            threading.Thread(target=open_browser, daemon=True).start()
            
            print("⚡ Press Ctrl+C to stop the server")
            print("-" * 50)
            
            httpd.serve_forever()
            
    except KeyboardInterrupt:
        print("\n🛑 Web frontend server stopped")
    except Exception as e:
        print(f"❌ Error starting web server: {e}")
        return False
    
    return True

def main():
    print("🌾 Crop Advisor - Web Frontend")
    print("=" * 50)
    print("📝 Note: This is a web-based alternative to the React Native app")
    print("🔧 No Node.js or Expo CLI installation required!")
    print()
    
    # Check if backend is running
    import requests
    try:
        response = requests.get('http://localhost:8000/health', timeout=5)
        if response.status_code == 200:
            print("✅ Backend API is running")
        else:
            print("⚠️  Backend API may not be running properly")
    except:
        print("❌ Backend API is not running!")
        print("   Please start the backend first: python run_backend.py")
        print("   Or run: python backend/simple_app.py")
        print()
        
        choice = input("Continue anyway? (y/n): ").lower()
        if choice != 'y':
            return
    
    print()
    start_web_server()

if __name__ == "__main__":
    main()
