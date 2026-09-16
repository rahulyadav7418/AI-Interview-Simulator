# 🤖 AI Interview Simulator

An AI-powered technical interview practice platform built with the MERN stack.

The application allows users to practice technical interviews based on different technical skills and difficulty levels, submit their answers, and receive AI-powered evaluation, scores, and feedback.

---

## 🚀 Project Status

🚧 **Currently in Development**

The core skill-based interview flow, AI-powered answer evaluation, result generation, and MongoDB result storage have been implemented.

Additional features such as authentication, dashboard, profile, and resume-based interviews are planned.

---

## ✨ Features

### 🎯 Skill-Based Interviews

Users can choose a technical skill and practice interview questions based on that skill.

Currently supported:

- Java
- Frontend
- Backend
- AI

---

### 📊 Difficulty Levels

Each skill-based interview provides three difficulty levels:

- 🌱 Easy — Fundamentals and basic concepts
- ⚡ Medium — Practical concepts and deeper understanding
- 🔥 Hard — Advanced concepts and challenging questions

Questions are randomly selected from the available question set for the selected skill and difficulty.

---

### 🤖 AI-Powered Answer Evaluation

After submitting an answer, the application sends the question and user's answer to the backend.

The backend uses an AI model through the OpenRouter API to evaluate the answer.

The AI provides:

- Score out of 10
- Feedback on the answer

---

### 📈 Interview Results

After completing the interview, users can view their performance report.

The result page displays:

- Candidate name
- Interview type
- Difficulty level
- Overall score
- Percentage
- Individual question scores
- User's answers
- AI-generated feedback

---

### 💾 MongoDB Result Storage

Completed interview results can be stored in MongoDB.

Each interview record contains information such as:

- Candidate name
- Interview type
- Difficulty
- Questions
- Answers
- Individual scores
- AI feedback
- Overall score
- Percentage

---

### 📊 Question Progress

The interview interface provides:

- Current question number
- Total number of questions
- Progress bar
- Answer submission
- AI evaluation status
- Next question navigation

---

## 🔄 Application Flow

```text
                Enter Name
                    ↓
           Choose Interview Mode
                    ↓
          Skills Based Interview
                    ↓
             Choose Skill
                    ↓
          Choose Difficulty
                    ↓
            Start Interview
                    ↓
             Answer Question
                    ↓
             Submit Answer
                    ↓
             React Frontend
                    ↓
             Express Backend
                    ↓
             OpenRouter AI
                    ↓
          AI Score + Feedback
                    ↓
             Display Result
                    ↓
             Next Question
                    ↓
           Complete Interview
                    ↓
             Result Page
                    ↓
             Save Result
                    ↓
               MongoDB

_________________________________________________________________

🧠 How AI Evaluation Works

The answer evaluation process works as follows:

The user enters an answer in the React frontend.
React sends the question and answer to the Express backend.
The Express backend receives the request.
The backend sends the question and answer to the OpenRouter AI API.
The AI evaluates the answer.
The AI returns a score from 0–10 and feedback.
The backend sends the evaluation back to React.
React displays the score and feedback.
The evaluation is added to the interview's answer history.
The final interview result can be stored in MongoDB.

__________________________________________________________________

🛠️ Tech Stack
- Frontend
- React.js
- JavaScript
- HTML
- CSS
- Axios
- Backend
- Node.js
- Express.js
- Axios
- REST API
- Database
- MongoDB
- Mongoose
- AI
- OpenRouter API
- Tools
- Git
- GitHub
- VS Code
- MongoDB

____________________________________________________________________

📁 Project Structure

AI-Interview-Simulator/
│
├── frontend/
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── Hero.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── InterviewCard.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── ...
│   │
│   ├── package.json
│   └── ...
│
├── backend/
│   │
│   ├── models/
│   │   └── Interview.js
│   │
│   ├── server.js
│   ├── package.json
│   └── ...
│
├── .gitignore
└── README.md

__________________________________________________________________
🔌 API Endpoints

Evaluate Interview Answer
POST /evaluate

Used to send an interview question and user's answer to the backend for AI evaluation.

Example request:

{
  "question": "What is React?",
  "answer": "React is a JavaScript library used for building user interfaces."
}

The backend processes the request through the OpenRouter API and returns the AI evaluation.
____________________________________________________________________________
## Save Interview Result

POST /interviews

Used to save completed interview results to MongoDB.

The stored data includes:

{
  "name": "Candidate Name",
  "interviewType": "Java Interview",
  "difficulty": "Medium",
  "answers": [],
  "score": 25,
  "percentage": 83
}
____________________________________________________________________________
🔐 Environment Variables

The backend requires an OpenRouter API key.

Create a .env file inside the backend directory:

OPENROUTER_API_KEY=your_api_key_here
Important

Never upload your .env file or API key to GitHub.

Make sure .env is included in .gitignore.
______________________________________________________________________________
⚙️ Installation & Setup

1. Clone the Repository
git clone https://github.com/rahulyadav7418/AI-Interview-Simulator.git

2. Navigate to the Project
cd AI-Interview-Simulator

3. Install Frontend Dependencies
cd frontend
npm install

4. Install Backend Dependencies
Open another terminal:
cd backend
npm install

5. Configure Environment Variables

Create:
backend/.env

Add:
OPENROUTER_API_KEY=your_api_key_here

6. Start the Backend
npm start
or use the command configured in your package.json.

7. Start the Frontend

Inside the frontend directory:
npm run dev
The exact command may depend on the frontend setup.
______________________________________________________________
🎨 User Interface

The application currently includes:

- Landing page
- Name input
- Interview mode selection
- Skill selection
- Difficulty selection
- Interview question interface
- Question progress indicator
- Answer input
- AI evaluation display
- Score display
- Feedback display
- Interview result page
- Interview result breakdown
- Save result functionality
________________________________________________________________
🔮 Future Improvements

The project is actively being developed.

Planned features include:

🔐 Authentication

- User signup
- User login
- Password hashing
- Authentication
- Authorization
- Protected routes
- Logout

📊 User Dashboard

- Interview history
- Average score
- Best score
- Skill-wise performance
- Previous interview results
- Performance tracking

👤 Profile

- User profile
- Personal information
- Skills
- Interview statistics

📄 Resume-Based Interview

Users will be able to upload their resume and receive personalized interview questions based on:

- Skills
- Projects
- Experience
- Resume content

🧠 Adaptive AI Interview

The AI interviewer will eventually be improved to:

- Generate dynamic questions
- Ask follow-up questions
- Adapt questions based on previous answers
- Provide more detailed interview feedback

📈 Performance Analytics

Future versions may include:

- Skill-wise analysis
- Weak topic identification
- Performance trends
- Personalized improvement suggestions

🎙️ Voice Interview
A future version may support voice-based technical interviews.

☁️ Deployment
The application will be deployed so that users can access it online.
____________________________________________________________________
🧪 Current Development Focus

The current development roadmap is:

Core Interview Flow          ✅
Skill-Based Interviews      ✅
Difficulty Levels            ✅
AI Evaluation                ✅
Result Page                  ✅
MongoDB Storage              ✅
Authentication               🔨
Authorization                🔨
Dashboard                    🔨
Profile                      🔨
Resume-Based Interview       🔨
Adaptive AI Interview       🔨
Deployment                   🔨
______________________________________________________________________
🎯 Project Goal

The long-term goal of this project is to build an AI-powered interview preparation platform that helps candidates practice technical interviews, understand their strengths and weaknesses, and improve their interview readiness through personalized AI feedback.
______________________________________________________________________
👨‍💻 Author

Rahul Yadav

GitHub:
https://github.com/rahulyadav7418