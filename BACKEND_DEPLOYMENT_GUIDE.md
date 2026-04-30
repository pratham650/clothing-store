# 🚀 Backend Deployment Guide - Railway + Netlify + Hostinger

## 📋 **Complete Deployment Checklist**

### **Your Current Setup:**
- ✅ Frontend: Deployed on Netlify
- ✅ Domain: Connected via Hostinger
- ⏳ Backend: Needs deployment
- ⏳ Database: MongoDB Atlas (not set up yet)

---

## 🎯 **Option 1: Railway.app (RECOMMENDED)**

### **Why Railway?**
- ✅ FREE $5/month credit (enough for small apps)
- ✅ No credit card required to start
- ✅ Auto-deploy from GitHub
- ✅ Built-in environment variables
- ✅ HTTPS automatically enabled
- ✅ Perfect for Node.js/Express

---

## 📝 **Step-by-Step: Deploy Backend on Railway**

### **Phase 1: Prepare Backend for Production**

#### 1. **Update CORS in index.js**
Already done! Your backend accepts dynamic URLs from `.env`

#### 2. **Create `.gitignore` for Backend**
Make sure sensitive files aren't uploaded:

```bash
# In backend folder
node_modules
.env
.DS_Store
*.log
```

#### 3. **Update package.json Scripts**
Railway needs a start script:

```json
{
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
  }
}
```

✅ Already configured in your project!

---

### **Phase 2: Deploy to Railway**

#### **Step 1: Push Code to GitHub**

```bash
# From project root
git add .
git commit -m "Ready for production deployment"
git push origin main
```

#### **Step 2: Create Railway Account**

1. Go to [https://railway.app](https://railway.app)
2. Click **"Start a New Project"**
3. Sign up with GitHub (recommended) or email

#### **Step 3: Deploy Backend**

1. Click **"+ New Project"**
2. Select **"Deploy from GitHub repo"**
3. Choose your clothing-store repository
4. Railway will auto-detect it's a Node.js app

#### **Step 4: Configure Environment Variables**

In Railway dashboard, go to your project → **Variables** tab

Add these variables:

```env
NODE_ENV=production
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/clothing-store
JWT_SECRET=your_super_secure_random_string_here_abc123xyz789!@#
CLIENT_URL=https://your-domain.com
PORT=5000
```

**How to get each:**
- **MONGO_URI:** Follow `MONGODB_ATLAS_SETUP.md` guide
- **JWT_SECRET:** Generate with this command:
  ```bash
  node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
  ```
- **CLIENT_URL:** Your actual domain (e.g., `https://fashionstore.com`)

#### **Step 5: Wait for Deployment**

Railway will:
1. Install dependencies (`npm install`)
2. Start your server (`npm start`)
3. Give you a public URL: `https://your-app.up.railway.app`

⏱️ Takes 2-5 minutes

#### **Step 6: Test Backend API**

Visit your Railway URL + `/api/auth/login`:
```
https://your-app.up.railway.app/api/auth/login
```

You should see: JSON response (not an error)

---

### **Phase 3: Connect Frontend to Backend**

#### **Step 1: Update Frontend API Calls**

Currently, your frontend uses: `http://localhost:5000`

**Option A: Environment Variable (Recommended)**

Create `frontend/.env`:
```env
VITE_API_URL=https://your-app.up.railway.app
```

Update all axios calls in frontend components:

**Example - Login.jsx:**
```javascript
// Before:
const { data } = await axios.post("http://localhost:5000/api/auth/login", form);

// After:
const API_URL = import.meta.env.VITE_API_URL;
const { data } = await axios.post(`${API_URL}/api/auth/login`, form);
```

**Files to update:**
- `frontend/src/pages/Login.jsx`
- `frontend/src/pages/Register.jsx`
- `frontend/src/pages/AdminDashboard.jsx`
- `frontend/src/pages/UserManagement.jsx`
- `frontend/src/pages/Buy.jsx`
- `frontend/src/context/CartContext.jsx` (if exists)
- Any other file with `localhost:5000`

**Option B: Quick Fix (Less Maintenance)**

Use find & replace in VS Code:
1. Press `Ctrl+Shift+H` (Find in Files)
2. Find: `http://localhost:5000`
3. Replace: `https://your-app.up.railway.app`
4. Replace All

⚠️ You'll need to manually change back when developing locally

#### **Step 2: Redeploy Frontend to Netlify**

```bash
cd frontend
npm run build
# Drag dist folder to Netlify drop zone
# OR push to GitHub for auto-deploy
```

---

### **Phase 4: Connect Custom Domain (Hostinger)**

#### **Step 1: Add Domain to Railway**

1. In Railway dashboard → Settings → Domains
2. Click **"Add Custom Domain"**
3. Enter: `api.your-domain.com` (or `backend.your-domain.com`)
4. Railway will show DNS records to add

#### **Step 2: Update DNS in Hostinger**

1. Login to Hostinger → hPanel
2. Go to **Domains** → Select your domain
3. Click **"DNS / Nameservers"**
4. Add CNAME record:

```
Type: CNAME
Name: api
Value: your-app.up.railway.app
TTL: 14400
```

Or if using root domain for backend:
```
Type: A
Name: @
Value: [Railway's IP address]
TTL: 14400
```

#### **Step 3: Wait for DNS Propagation**

⏱️ Takes 15 minutes to 24 hours (usually <1 hour)

Test: 
```bash
ping api.your-domain.com
```

---

## 🎯 **Option 2: Render.com (Alternative)**

### **Steps:**

1. Go to [https://render.com](https://render.com)
2. Sign up with GitHub
3. Click **"New +"** → **"Web Service"**
4. Connect your repository
5. Configure:
   - **Name:** clothing-store-backend
   - **Environment:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `node index.js`
6. Add environment variables (same as Railway)
7. Click **"Create Web Service"**

⏱️ Deployment takes 5-10 minutes

**Free Tier Limitations:**
- ⚠️ Server sleeps after 15 min inactivity
- ⚠️ First request after sleep takes 30 seconds
- ⚠️ 750 hours/month bandwidth limit

---

## 🎯 **Option 3: Vercel (Serverless)**

### **Restructure Backend for Vercel:**

Create `backend/api/index.js`:
```javascript
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');

const productRoutes = require('../routes/productRoutes');
const authRoutes = require('../routes/authRoutes');
const orderRoutes = require('../routes/orderRoutes');
const adminRoutes = require('../routes/adminRoutes');

const app = express();

app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(mongoSanitize());
app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.json({ message: "E-Commerce API Running" });
});

module.exports = app;
```

Create `backend/vercel.json`:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "api/index.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "api/index.js"
    }
  ]
}
```

Deploy:
```bash
npm i -g vercel
cd backend
vercel --prod
```

---

## 🔧 **Post-Deployment Testing**

### **Test Checklist:**

1. **Backend Health Check:**
   ```
   GET https://api.your-domain.com/
   Expected: {"message": "E-Commerce API Running"}
   ```

2. **Auth Routes:**
   ```
   POST https://api.your-domain.com/api/auth/register
   POST https://api.your-domain.com/api/auth/login
   ```

3. **Product Routes:**
   ```
   GET https://api.your-domain.com/api/products
   ```

4. **Frontend Connection:**
   - Open your website: `https://your-domain.com`
   - Try logging in
   - Try browsing products
   - Try placing an order

5. **Admin Panel:**
   - Login as admin
   - Access `/admin`
   - Check if orders load
   - Check user management

---

## 💡 **Pro Tips:**

### **1. Keep Local Development Working**

Create `frontend/.env.development`:
```env
VITE_API_URL=http://localhost:5000
```

Create `frontend/.env.production`:
```env
VITE_API_URL=https://api.your-domain.com
```

Vite will auto-select based on mode!

### **2. Monitor Your Backend**

- **Railway:** Built-in logs in dashboard
- **Render:** Logs tab in dashboard
- **Uptime Monitoring:** Use [UptimeRobot](https://uptimerobot.com) (free)

### **3. Backup Your Database**

MongoDB Atlas free tier includes automatic backups for 7 days!

### **4. Secure Your Admin Routes**

Consider adding IP whitelisting for `/admin/*` routes in production.

---

## 🆘 **Troubleshooting**

### **Issue: CORS errors after deployment**
**Fix:** 
- Check `CLIENT_URL` in Railway matches your Netlify domain exactly
- Include `https://` prefix
- No trailing slash

### **Issue: "Cannot connect to database"**
**Fix:**
- Verify MongoDB Atlas connection string
- Check IP whitelist allows Railway servers (use `0.0.0.0/0` for testing)
- Ensure database name is correct

### **Issue: Frontend can't reach backend**
**Fix:**
- Check if backend URL is accessible: visit in browser
- Verify no typos in API calls
- Check browser console for exact error

### **Issue: 404 on API routes**
**Fix:**
- Verify route paths match exactly
- Check if Express router is mounted correctly
- Test with Postman first

---

## 🎉 **Final Architecture:**

```
User → Hostinger DNS → Netlify (Frontend) → Railway (Backend API) → MongoDB Atlas (Database)
```

**All HTTPS, all secure, all FREE!** 🚀

---

## 📞 **Need Help?**

If you get stuck during deployment:
1. Check Railway logs (dashboard → Logs tab)
2. Check Netlify deploy logs
3. Test backend directly: `https://your-railway-url.up.railway.app`
4. Verify environment variables are set correctly

**Most issues are solved by:**
- ✅ Correct environment variables
- ✅ Proper CORS settings
- ✅ MongoDB Atlas IP whitelist
- ✅ No typos in URLs

Good luck with your deployment! 🚀
