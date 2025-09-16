
# 🌍 TripMateAI

An **AI-powered travel assistant** that helps you plan trips, find destinations, and organize your journey with ease.  
TripMateAI integrates **Flask (Python backend)** with **IBM Watson AI** to provide personalized, multilingual travel recommendations via a modern frontend.  

---

## 🚀 Problem Statement
Planning a trip often requires switching between multiple platforms to search for:
- Routes & transport options  
- Hotels & accommodations  
- Budget planning  
- Weather conditions  
- Sightseeing spots  

This process is **time-consuming and confusing**.  

**TripMateAI** solves this by providing all travel details in **one place**.

---

## ✅ Solution
TripMateAI offers a **chat-based AI travel assistant** that:
1. **Travel Routes & Transport** – Provides self-driving routes, train schedules, and flight details.  
2. **Stay & Accommodation** – Suggests budget-friendly hotels, homestays, and trusted stays.  
3. **Sightseeing & Experiences** – Recommends sightseeing spots, cultural events, and unique local experiences.  

---

## ✨ Features
- All travel needs in one AI platform  
- Personalized recommendations by **budget & preferences**  
- Smart itinerary planning with AI  
- Saves time vs. multiple apps  
- Ready for future upgrades (booking, maps, offline support)  

---

## 🛠️ Tech Stack
- **Frontend**: React.js / React Native  
- **Backend**: Python Flask  
- **AI/ML**: IBM Watson API + LLMs  
- **Database**: MongoDB / PostgreSQL  
- **APIs**: Travel APIs (flights, hotels, maps, weather)  
- **Hosting**: AWS / GCP  

---

## 📦 Installation & Setup

### 🔹 Frontend (React/React Native)

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/tripmateai.git
   cd tripmateai/frontend

2. Install dependencies:

   ```bash
   npm install
   ```   

# or
   ```bash
   yarn install
   ```
3. Run the app:

```bash
npm start
```

---

### 🔹 Backend (Flask + IBM Watson)

1. Go to the backend folder:

   ```bash
   cd tripmateai/backend
   ```

2. Install Python dependencies:

   ```bash
   pip install -r requirements.txt
   ```

3. Create a `.env` file and add your IBM API key:

   ```
   IBM_API_KEY=your_actual_api_key_here
   ```

4. Run the Flask server:

   ```bash
   python app.py
   ```

5. The server will start at:

   ```
   http://localhost:5000
   ```



## 🔌 API Endpoints

### `POST /api/chat`

Send a message to Watson AI.
Example:

```bash
curl -X POST http://localhost:5000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello, how are you?"}'
```

Response:

```json
{
  "response": "I’m doing great! How can I assist with your travel today?"
}
```

### `GET /api/health`

Check server health and configuration.
Example:

```bash
curl http://localhost:5000/api/health
```

Response:

```json
{
  "status": "ok",
  "ibm_watson": "connected"
}
```

---

## 📖 User Manual

* **Start the Chat** → Type your travel query (destination, budget, style).
* **Sign Up / Log In** → Secure login for personalized features.
* **Provide Details** → Dates, interests (adventure, family, solo, etc.).
* **Get Recommendations** → AI suggests travel plan with complete details.
* **Budget Calculator** → Estimate costs for stay, food, transport, etc.
* **Use the Guide** → Follow the personalized plan from start to finish.

---

## 📸 Screenshots


### 🏠 Home Page

![Home Page](https://github.com/CodeSpherreDev/TripMate-AI-Agent/blob/general/Screenshorts/image1.png)

### 💬 Chat Interface

![Chat Interface](https://github.com/CodeSpherreDev/TripMate-AI-Agent/blob/general/Screenshorts/image2.png)

### 📍 Travel Recommendations

![Travel Recommendations](https://github.com/CodeSpherreDev/TripMate-AI-Agent/blob/general/Screenshorts/image3.png)

### 📊 Budget Calculator

![Budget Calculator](https://github.com/CodeSpherreDev/TripMate-AI-Agent/blob/general/Screenshorts/image4.png)

---
## 🛠️ Application Flow  

<div align="center">

### 🌍 User Journey Flow-Chart  

💡 *This diagram illustrates the navigation and functionality flow of **TripMate AI Agent***  

![Flowchart – Home Page](https://github.com/CodeSpherreDev/TripMate-AI-Agent/blob/general/Screenshorts/TripMate%20AI%20Agent%20flowchart.png)

</div>

---


## 🔮 Future Updates

* Integrated Maps → Real-time route visualization
* Booking Options → Train, flight, and hotel bookings inside the app
* Complete Travel Guide → Door-to-door travel support
* Personalization → Smarter AI with user history & preferences
* Alerts & Offline Support → Travel reminders, safety tips, weather alerts

---

## 👨‍💻 Developers  

Meet the awesome minds behind **Team Code Sepherre** ✨  

| Shibam Dey Roy | Abhranil Dutta | Avijit Dey | Nabanita Saha |
|----------------|----------------|------------|---------------|
| <a href="https://github.com/mrdeyroy"><img src="https://avatars.githubusercontent.com/mrdeyroy" width="120" height="120" style="border-radius:50%"></a> | <a href="https://github.com/Abhranil2004"><img src="https://avatars.githubusercontent.com/Abhranil2004" width="120" height="120" style="border-radius:50%"></a> | <a href="https://github.com/AvijitDey255"><img src="https://avatars.githubusercontent.com/AvijitDey255" width="120" height="120" style="border-radius:50%"></a> | <a href="https://github.com/VALKYRE312"><img src="https://avatars.githubusercontent.com/VALKYRE312" width="120" height="120" style="border-radius:50%"></a> |
| [GitHub](https://github.com/mrdeyroy) | [GitHub](https://github.com/Abhranil2004) | [GitHub](https://github.com/AvijitDey255) | [GitHub](https://github.com/VALKYRE312) |


## 🙏 Acknowledgements

* Inspired by the need to make **travel planning simple and stress-free**
* Built with **Flask + IBM Watson AI + React**
* Supported by AI, data-driven insights, and user-first design

---



