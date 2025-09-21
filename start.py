#!/usr/bin/env python3
"""
Startup script for Crop Advisor Backend
Smart India Hackathon 2025
"""

import sys
import os

# Add backend directory to Python path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'backend'))

# Import and run the FastAPI app
if __name__ == "__main__":
    import uvicorn
    from backend.simple_app import app
    
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
