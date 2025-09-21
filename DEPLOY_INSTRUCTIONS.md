# 🚀 Manual Deployment Instructions - Crop Advisor Backend

## Your backend is ready to deploy! Here's exactly what to do:

---

## 🎯 **Option 1: Railway (Easiest - 5 minutes)**

### **Step 1: Go to Railway**
1. Visit: https://railway.app
2. Sign up with GitHub
3. Click "New Project"
4. Select "Deploy from GitHub repo"

### **Step 2: Configure**
- **Repository**: Select your crop-advisor repository
- **Root Directory**: Leave empty
- **Start Command**: `python start.py`
- **Build Command**: `pip install -r requirements.txt`

### **Step 3: Environment Variables**
Add this environment variable:
```
WEATHER_API_KEY=de236423c4ad7273b25f3a6f4cfc4196
```

### **Step 4: Deploy**
- Click "Deploy"
- Wait 2-3 minutes
- Get your URL: `https://crop-advisor-backend-sih2025.up.railway.app`

---

## 🎯 **Option 2: Render (Free Alternative)**

### **Step 1: Go to Render**
1. Visit: https://render.com
2. Sign up with GitHub
3. Click "New +" → "Web Service"
4. Connect your GitHub repository

### **Step 2: Configure**
- **Name**: crop-advisor-backend
- **Environment**: Python 3
- **Build Command**: `pip install -r requirements.txt`
- **Start Command**: `python start.py`

### **Step 3: Environment Variables**
```
WEATHER_API_KEY=de236423c4ad7273b25f3a6f4cfc4196
```

### **Step 4: Deploy**
- Click "Create Web Service"
- Wait for deployment
- Get your URL: `https://crop-advisor-backend.onrender.com`

---

## 🎯 **Option 3: Heroku (Traditional)**

### **Step 1: Install Heroku CLI**
Download from: https://devcenter.heroku.com/articles/heroku-cli

### **Step 2: Deploy**
```bash
# Login to Heroku
heroku login

# Create app
heroku create crop-advisor-backend-sih2025

# Set environment variable
heroku config:set WEATHER_API_KEY=de236423c4ad7273b25f3a6f4cfc4196

# Deploy
git add .
git commit -m "Deploy backend"
git push heroku main
```

---

## 🔧 **After Backend Deployment**

### **Step 1: Get Your Backend URL**
After deployment, you'll get a URL like:
- Railway: `https://crop-advisor-backend-sih2025.up.railway.app`
- Render: `https://crop-advisor-backend.onrender.com`
- Heroku: `https://crop-advisor-backend-sih2025.herokuapp.com`

### **Step 2: Update Frontend**
Replace this line in `web_frontend/index.html`:
```javascript
const API_BASE_URL = 'https://your-backend-url.railway.app';
```

With your actual backend URL:
```javascript
const API_BASE_URL = 'https://crop-advisor-backend-sih2025.up.railway.app';
```

### **Step 3: Redeploy Frontend**
1. Go to your Netlify dashboard
2. Drag and drop the updated `web_frontend` folder
3. Your frontend will update automatically

---

## ✅ **Test Your Deployment**

### **Backend Tests:**
- Visit: `https://your-backend-url/health`
- Should return: `{"status": "healthy"}`
- API Docs: `https://your-backend-url/docs`

### **Frontend Tests:**
- Visit your Netlify URL
- Test crop recommendation form
- Check if climate data loads
- Verify market prices work

---

## 🎉 **Your Complete SIH 2025 Setup**

After both deployments:

✅ **Frontend**: `https://your-app.netlify.app`
✅ **Backend**: `https://your-api.railway.app` 
✅ **Weather API**: Integrated with your key
✅ **Offline Mode**: Working
✅ **Mobile Ready**: Responsive design
✅ **Bilingual**: English/Hindi support

---

## 🆘 **Need Help?**

If you get stuck:
1. Check the deployment logs
2. Verify environment variables are set
3. Make sure `requirements.txt` is in the root
4. Confirm `start.py` exists

**Your Crop Advisor system is ready for Smart India Hackathon 2025! 🌾🏆**
