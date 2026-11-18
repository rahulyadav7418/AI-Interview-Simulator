# 🤖 AI Interview Simulator
### AI-Powered Technical Interview Preparation Platform

An AI-powered technical interview preparation platform built using the **MERN stack**, integrating **OpenRouter AI** for automated answer evaluation and **JWT authentication** for user access management.

The platform enables candidates to practice technical interviews across multiple domains, answer skill-based questions, and receive AI-generated scores and feedback to evaluate their technical knowledge.

<p align="center">
  <b>Practice • Evaluate • Improve</b>
</p>

---

## 🚀 Project Overview

Preparing for technical interviews requires consistent practice, understanding of concepts, and meaningful feedback.

The AI Interview Simulator aims to make this process more accessible by providing an interactive interview environment where candidates can:

- Practice technical interviews based on specific skills.
- Select questions according to difficulty levels.
- Submit answers and receive AI-powered evaluations.
- Understand their performance through scores and feedback.
- Create accounts and access authenticated application features.
- Store completed interview results in MongoDB.

**Project Status:** 🚧 Actively Under Development

---

## ✨ Key Features

### 🔐 1. User Authentication & Authorization

Implemented an authentication system using JWT and bcrypt.

- User registration and login.
- Password hashing using bcrypt.
- JWT-based authentication.
- Token management using browser session storage.
- Authentication middleware.
- Protected API endpoints.
- Bearer token authorization.

### 🎯 2. Skill-Based Interview Practice

Users can select a technical domain and practice relevant interview questions.

**Currently Supported Domains:**

| Domain | Description |
|---|---|
| Java | Core Java and programming fundamentals |
| Frontend | Frontend development concepts |
| Backend | Backend development concepts |
| AI | Artificial Intelligence fundamentals |

### 📊 3. Multiple Difficulty Levels

Each interview supports three difficulty levels:

- 🌱 **Easy:** Fundamentals and basic concepts.
- ⚡ **Medium:** Practical concepts and deeper understanding.
- 🔥 **Hard:** Advanced concepts and challenging questions.

Questions are randomly selected from the available question set for the selected skill and difficulty.

### 🧠 4. AI-Powered Answer Evaluation

Integrated the OpenRouter API to evaluate user-submitted answers.

**Evaluation Process:**

- User submits an answer.
- Backend processes the question and response.
- Backend communicates with the OpenRouter AI API.
- AI evaluates the submitted answer.
- Evaluation results are returned to the frontend.

**Evaluation Output:**

- Score out of 10.
- AI-generated feedback.

### 📈 5. Interview Performance Report

After completing an interview, users can view a performance report containing:

- Candidate name.
- Interview type.
- Difficulty level.
- Overall score.
- Percentage.
- Individual question scores.
- Submitted answers.
- AI-generated feedback.

### 💾 6. MongoDB Result Management

Integrated MongoDB using Mongoose to persist completed interview results.

Stored information includes:

- Candidate details.
- Interview category and difficulty.
- Questions and answers.
- Individual evaluation scores.
- AI-generated feedback.
- Overall score and percentage.

### ⚡ 7. Interactive Interview Experience

The interview interface includes:

- Question navigation.
- Current question tracking.
- Progress indicator.
- Answer submission.
- AI evaluation status.
- Score and feedback display.
- Final interview summary.

---

## 🏗️ System Architecture

The application follows a client-server architecture.

```text
                 USER
                  |
                  ▼
          REACT FRONTEND
                  |
          Axios / REST API
                  |
                  ▼
          EXPRESS BACKEND
                  |
       ┌──────────┼───────────┐
       |          |           |
       ▼          ▼           ▼
  Authentication AI Service  Interview
       |          |           |
       ▼          ▼           ▼
     JWT      OpenRouter    Mongoose
       |          |           |
       |          |           ▼
       |          |        MongoDB
       |          |           |
       └──────────┴───────────┘
                  |
                  ▼
           JSON RESPONSE
                  |
                  ▼
           REACT FRONTEND
                  |
                  ▼
         RESULTS & FEEDBACK
```

### Authentication Flow

```text
             REACT FRONTEND
                    |
             ┌──────┴──────┐
             ▼             ▼
           SIGNUP         LOGIN
             |             |
             ▼             ▼
        POST /signup   POST /login
             |             |
             ▼             ▼
         EXPRESS BACKEND
                    |
                    ▼
            USER VALIDATION
                    |
              ┌─────┴─────┐
              ▼           ▼
          HASH PASSWORD  VERIFY PASSWORD
              |           |
              └─────┬─────┘
                    ▼
                 MongoDB
                    |
                    ▼
             GENERATE JWT
                    |
                    ▼
           RETURN TOKEN TO REACT
                    |
                    ▼
            sessionStorage
                    |
                    ▼
          PROTECTED API REQUEST
                    |
                    ▼
         AUTHENTICATION MIDDLEWARE
                    |
                    ▼
               VERIFY JWT
                    |
             ┌──────┴──────┐
             ▼             ▼
         VALID TOKEN   INVALID TOKEN
             |             |
             ▼             ▼
        ALLOW ACCESS   401 RESPONSE
```

---

## 🔄 AI Evaluation Workflow

The application uses an external AI service to evaluate submitted interview answers.

```text
User Submits Answer
        |
        ▼
React Frontend
        |
        ▼
POST /evaluate
        |
        ▼
Express Backend
        |
        ▼
OpenRouter API
        |
        ▼
AI Answer Evaluation
        |
        ▼
Score + Feedback
        |
        ▼
Express Backend
        |
        ▼
React Frontend
        |
        ▼
Display Evaluation
        |
        ▼
Update Interview Progress
        |
        ▼
Generate Final Result
        |
        ▼
Save Result in MongoDB
```

---

## 🛠️ Technology Stack

| Category | Technologies |
|---|---|
| Frontend | React.js, JavaScript, HTML5, CSS3 |
| API Communication | Axios, REST APIs |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Authentication | JWT, bcrypt |
| AI Integration | OpenRouter API |
| Development Tools | VS Code, Git, GitHub |
| Database Tools | MongoDB Community Server |

---

## 📁 Project Structure

```text
AI-Interview-Simulator/
│
├── FRONTEND/
│   └── vite-project/
│       ├── src/
│       │   ├── components/
│       │   │   ├── Login.jsx
│       │   │   ├── Signup.jsx
│       │   │   ├── Navbar.jsx
│       │   │   ├── Hero.jsx
│       │   │   └── InterviewCard.jsx
│       │   │
│       │   ├── App.jsx
│       │   ├── App.css
│       │   └── ...
│       │
│       ├── package.json
│       └── ...
│
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   └── Interview.js
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── .gitignore
└── README.md
```

*Note: The structure highlights the main application components. Verify the backend folder and filenames against the actual repository before publishing.*

---

## 🔌 API Documentation

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/signup` | Register a new user |
| POST | `/login` | Authenticate an existing user |
| POST | `/evaluate` | Evaluate an interview answer using AI |
| GET | `/interviews` | Retrieve interview results |
| POST | `/interviews` | Save completed interview results |

### Authentication Header

Protected endpoints use JWT Bearer authentication.

```http
Authorization: Bearer <JWT_TOKEN>
```

### Example: Login Request

```json
{
  "email": "candidate@example.com",
  "password": "your_password"
}
```

### Example: AI Evaluation Request

```json
{
  "question": "What is React?",
  "answer": "React is a JavaScript library used for building user interfaces."
}
```

### Example: Interview Result

```json
{
  "name": "Candidate Name",
  "interviewType": "Java Interview",
  "difficulty": "Medium",
  "answers": [],
  "score": 25,
  "percentage": 83
}
```

---

## ⚙️ Getting Started

Follow these instructions to run the project locally.

### Prerequisites

- Node.js and npm.
- MongoDB Community Server or a MongoDB connection.
- OpenRouter API key.
- Git.

### 1. Clone Repository

```bash
git clone https://github.com/rahulyadav7418/AI-Interview-Simulator.git

cd AI-Interview-Simulator
```

### 2. Install Frontend Dependencies

```bash
cd FRONTEND/vite-project
npm install
```

### 3. Install Backend Dependencies

Open another terminal and navigate to the backend directory:

```bash
cd backend
npm install
```

### 4. Configure Environment Variables

Create a `.env` file inside the backend directory.

```env
OPENROUTER_API_KEY=your_openrouter_api_key
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Use the exact variable names configured in your backend code.

**Security:** Never commit API keys, database credentials, or JWT secrets to GitHub.

### 5. Start Backend

```bash
npm start
```

Use the start command configured in your backend `package.json`.

### 6. Start Frontend

Inside the frontend directory:

```bash
npm run dev
```

The application will be available at the local Vite development URL shown in your terminal.

---

## 📌 Development Progress

| Feature | Status |
|---|---|
| MERN Application Setup | ✅ Completed |
| Skill-Based Interviews | ✅ Completed |
| Difficulty Selection | ✅ Completed |
| Question Navigation | ✅ Completed |
| AI Answer Evaluation | ✅ Completed |
| Interview Result Generation | ✅ Completed |
| MongoDB Result Storage | ✅ Completed |
| User Registration | ✅ Implemented |
| User Login | ✅ Implemented |
| Password Hashing | ✅ Implemented |
| JWT Authentication | ✅ Implemented |
| Authentication Middleware | ✅ Implemented |
| Protected API Integration | ✅ Implemented |
| User Dashboard | 🔨 Planned |
| Profile Management | 🔨 Planned |
| Resume-Based Interviews | 🔨 Planned |
| Adaptive AI Interviews | 🔨 Planned |
| Performance Analytics | 🔨 Planned |
| Voice-Based Interviews | 🔨 Planned |
| Deployment | 🔨 Planned |

---

## 🔮 Future Roadmap

### 📊 Personalized Dashboard
- Interview history.
- Average and highest scores.
- Skill-wise performance.
- Previous interview reports.

### 📄 Resume-Based Interviews
- Resume upload.
- Resume content analysis.
- Personalized technical questions.
- Project and experience-based questions.

### 🧠 Adaptive AI Interviewer
- Dynamic question generation.
- AI-generated follow-up questions.
- Difficulty adaptation.
- Detailed performance recommendations.

### 📈 Performance Analytics
- Identify weak technical areas.
- Track improvement over time.
- Skill-wise performance analysis.
- Personalized learning recommendations.

### 🎙️ Voice-Based Interviews
Introduce voice interaction to simulate a more realistic technical interview environment.

### ☁️ Deployment
Deploy the application to make the platform accessible to users online.

---

## 🎯 What I Learned

Building this project has helped me gain practical experience with:

- Developing full-stack applications using the MERN stack.
- Designing REST APIs using Express.js.
- Integrating frontend and backend services using Axios.
- Implementing JWT-based authentication.
- Understanding password hashing and authentication middleware.
- Managing application data using MongoDB and Mongoose.
- Integrating external AI services through APIs.
- Handling asynchronous API requests and responses.
- Structuring React components and managing application state.
- Debugging and integrating multiple application modules.

---

## 👨‍💻 Developer

**Rahul Yadav**

B.Tech — Computer Science and Engineering (AI)

GitHub: [rahulyadav7418](https://github.com/rahulyadav7418)

---

## ⭐ Project

If you find this project interesting, consider giving it a star on GitHub!

**Repository:**  
https://github.com/rahulyadav7418/AI-Interview-Simulator

---

<p align="center">
  <b>Built with curiosity, consistency, and a passion for learning.</b>
</p>