# Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)
- A modern web browser
- Git

### Option 1: Run Directly (No Installation)

1. **Visit the Application** (When deployed online)
   ```
   https://your-deployed-app.com
   ```

2. **Upload an Address Image**
   - Click "Choose Image" button
   - Select a photo of a handwritten address

3. **Wait for Processing**
   - OCR processes the image
   - Language is detected
   - Form auto-fills with extracted data

4. **Review and Submit**
   - Edit any incorrect fields
   - Click "Confirm & Submit"

### Option 2: Run Locally

#### Step 1: Clone the Repository
```bash
git clone https://github.com/mjanthony819/post-office-ocr-app.git
cd post-office-ocr-app
```

#### Step 2: Setup Backend
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your API keys (optional for demo mode)
npm start
```
Backend will run on `http://localhost:5000`

#### Step 3: Setup Frontend
```bash
cd ../frontend
npm install
npm start
```
Frontend will open at `http://localhost:3000`

#### Step 4: Test the Application

1. Open `http://localhost:3000` in your browser
2. Upload a test image with an address
3. Watch the magic happen!

## 📁 Project Structure

```
post-office-ocr-app/
├── frontend/
│   ├── index.html           # Main HTML
│   ├── css/
│   │   └── style.css        # Styling
│   └── js/
│       ├── app.js           # Main app logic
│       └── api.js           # API helper
├── backend/
│   ├── server.js            # Express server
│   ├── .env.example         # Environment template
│   └── package.json         # Dependencies
├── README.md                # Project overview
├── DEVELOPMENT.md           # API documentation
└── QUICK_START.md          # This file
```

## 🔧 Configuration

### Environment Variables (.env)

Create a `.env` file in the `backend` folder:

```env
PORT=5000
NODE_ENV=development
GOOGLE_VISION_API_KEY=your_key_here
GOOGLE_TRANSLATE_API_KEY=your_key_here
MONGO_URI=mongodb://localhost:27017/ocr-scanner
```

## 🧪 Testing

### Test with Sample Address (Hindi)
```
राज कुमार
मेन स्ट्रीट 123
बेंगलोर, कर्नाटक
560001
```

### Test with Sample Address (English)
```
John Doe
123 Main Street
Bangalore, Karnataka
560001
```

## 📱 Supported Languages

- Hindi (हिंदी)
- Telugu (తెలుగు)
- Gujarati (ગુજરાતી)
- Marathi (मराठी)
- Bengali (বাংলা)
- Tamil (தமிழ்)
- Kannada (ಕನ್ನಡ)
- English

## 🐛 Troubleshooting

### "Cannot find module 'express'"
```bash
cd backend
npm install
```

### Port 5000 Already in Use
```bash
# Change PORT in .env file
PORT=5001
```

### CORS Error
Make sure backend is running on `http://localhost:5000`

### OCR Not Working
- Check browser console for errors
- Ensure image is clear and readable
- Try with a different image

## 📚 Next Steps

1. **Read** [DEVELOPMENT.md](./DEVELOPMENT.md) for detailed API docs
2. **Explore** the code in `frontend/js/app.js`
3. **Customize** the styling in `frontend/css/style.css`
4. **Integrate** with your preferred OCR/Translation services
5. **Deploy** to cloud (Heroku, AWS, Firebase, etc.)

## 🎯 Key Features to Explore

- ✅ Drag & drop file upload
- ✅ Real-time OCR processing
- ✅ Automatic language detection
- ✅ Instant form population
- ✅ Address validation
- ✅ Response feedback

## 🤝 Support

Need help? Check:
- [README.md](./README.md) - Project overview
- [DEVELOPMENT.md](./DEVELOPMENT.md) - API documentation
- GitHub Issues - Report problems

## 🎉 You're All Set!

Start scanning addresses now!

**Happy Scanning! 📸✨**
