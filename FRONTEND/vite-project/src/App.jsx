import Navbar from "./Navbar";
import Hero from "./Hero";
import InterviewCard from "./InterviewCard";
import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

// const interviews = [
//   "Frontend Interview",
//   "Backend Interview",
//   "AI Interview",
//   "Java Interview",
// ];

const interviewQuestions = {
  "Frontend Interview": {
    easy: [
      "What is HTML and what is its purpose",
      "What is React?",
      "What is CSS used for?"
    ],
    medium: [
      "What is the Virtual Dom in React?",
      "What is the difference between state and props in React?",
      "What are React hooks? Explain useState and useEffect?"
    ],
    hard: [
      "How does React reconciliation work?",
      "How would you optimize the performance of a React application?",
      "What causes unnecessary re-renders in React, and how can you prevent them?"
    ]
  },

  "Backend Interview": {
    easy: [
      "What is Node.js?",
      "What is Express.js?",
      "What is API?",
    ],
    medium: [
      "What is REST API?",
      "What is middleware in Express.js?",
      "What is the difference between authentication and authorization?"
    ],
    hard: [
      "How does the Node.js event loop work?",
      "How would you design a scalable REST API?",
      "How would you handle authentication securely in a production application?"
    ]

},

  "AI Interview": {
    easy: [
     "What is AI?",
     "What is Machine Learning?",
     "What is Deep Learning?",
    ],
    medium: [
      "What is the difference between supervised and unsupervised learning?",
      "What is overfitting, and how can you prevent it?",
      "What is the difference between classification and regression?" 
    ],
    hard: [
      "Explain the bias-variance tradeoff.",
      "How would you evaluate wheather a machine learning model is performing well?",
      "What is the difference between fine-tuning and prompt enginnering in Generetive AI?"
    ]
  },

  "Java Interview": {
    easy: [
    "What is OOP?",
    "What is Inheritence?",
    "What is Polimorphism?",
    ],
    medium: [
      "What is the difference between an interfece and an abstract class?",
      "What is method Overloading vs method overriding?",
      "What is the differece between ArrayList and LinkedList?"
    ],
    hard: [
      "Explain how HashMap works internally in java",
      "What is the difference between == and .equals() in java?",
      "What is multithreading, and how does synchronization work in Java?"
    ]
  },

  // "AI/ML": [
  //   "What is AI?",
  //   "What is Machine Learning?",
  //   "What is Deep Learning?"
  // ],
};

function
shuffleQuestion(interviewQuestions) {
  return [...interviewQuestions].sort(() =>
  Math.random() - 0.5);
}

function App() {
  const [questionList, setQuestionList] = useState([]);

  const [started, setStarted] = useState(false);
  const [interviewMode, setInterviewMode] = useState("");

  const [score, setScore] = useState(0);

  const [name, setName] = useState("");

  const [interviews, setInterviews] = useState([
    "Frontend Interview",
    "Backend Interview",
    "AI Interview",
    "Java Interview",
  ]);

  const [difficulty, setDifficulty] = useState("");

  const [answer, setAnswer] = useState("");
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/interviews")
      .then((res) => {
        // setInterviews(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // useEffect(() => {
  //   console.log(answers);
  // }, [answers]);

  console.log(interviews);

  const [selectedInterview, setSelectedInterview] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const percentage = selectedInterview && difficulty 
    ? (score / (interviewQuestions[selectedInterview][difficulty].length * 2)) * 100
    : 0;

  const handleNextQuestion = () => {
    if (currentQuestion < questionList.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setAnswer("");
      setSubmitted(false);
    } else {
      // Last question skipped
      setSubmitted(true);
    }
  };
  //console.log(selectedInterview);

  const handleSubmit = () => {
    // console.log("Submit clicked");
    // console.log("Current Question:", currentQuestion);

    if (submitted) return;

    if (answer.trim() === "") {
      alert("Please enter an answer!");
      return;
    }
    setSubmitted(true);
    setScore((prev) => prev + 2);

    setAnswers((prev) => [
      ...prev,
      {
        question: questionList[currentQuestion],
        answer: answer,
      },
    ]);
    setAnswer("");

    setTimeout(() => {
      setCurrentQuestion((prev) => {
        const next = prev + 1;
        if (next >= questionList.length) {
          setSubmitted(true); //or show final screen
          return prev; //stop increasing
        }
        return next;
      });

      setAnswer("");
      setSubmitted(false);
    }, 800);
  };

  const handleStartNew = () => {
    axios
      .post("http://localhost:8080/interviews", {
        name,
        interviewType: selectedInterview,
        answers: answers,
        score: score,
        percentage: percentage.toFixed(0),
      })
      .then(() => {
        console.log("Saved Succefully");
      })
      .catch((err) => {
        console.log(err);
      });

    setName("");
    setStarted(false);
    setSelectedInterview("");
    setCurrentQuestion(0);
    setAnswer("");
    setSubmitted(false);
    setScore(0);
  };

  const interviewCompleted =
    selectedInterview && difficulty &&
    currentQuestion === questionList.length - 1 &&
    submitted;

  return (
    <div>
      <Navbar
        showBack={started || selectedInterview || interviewMode || questionList}
        onBack={() => {
          if (selectedInterview && difficulty) {
            setDifficulty("");
            // setSelectedInterview("");
            setCurrentQuestion(0);
            setAnswer("");
            setSubmitted(false);
            setScore(0);
          } else if (selectedInterview) {
            setSelectedInterview("");
            setCurrentQuestion(0);
            setAnswer("");
            setSubmitted(false);
            setScore(0);
          } else if (interviewMode) {
            setInterviewMode("");
          } else {
            setStarted(false);
            setName("");
          }
        }}
      />

      <>
        <Hero
          name={name}
          setName={setName}
          started={started}
          setStarted={setStarted}
          selectedInterview={selectedInterview}
        />
      </>

      {started && !interviewMode && (
        <div className="mode-container">
          <h2>What type of interview?</h2>

          <div className="mode-options">
            <div
              className="mode-card"
              onClick={() => setInterviewMode("resume")}
            >
              <div className="mode-icon">📄</div>

              <h3>Resume Based Interview</h3>

              <p>
                Upload your resume, skills and projects. Get personalized
                interview questions.
              </p>

              <button>→</button>
            </div>

            <div
              className="mode-card"
              onClick={() => setInterviewMode("skills")}
            >
              <div className="mode-icon">{"</>"}</div>

              <h3>Skills Based Interview</h3>

              <p>
                Choose a specific skill (e.g. JavaScript, React, etc.) and start
                practicing.
              </p>

              <button>→</button>
            </div>
          </div>
        </div>
      )}

      {started &&
        interviewMode === "skills" &&
        !selectedInterview &&
        interviews.map((item, index) => (
          <InterviewCard
            key={index}
            interview={item}
            onSelect={setSelectedInterview}
          />
        ))}

      {selectedInterview && !difficulty && (
        <>
          <h1>Select Difficulty Level :</h1>
          <br />

          <label>Easy</label>
          <input
            type="radio"
            name="difficulty"
            value="easy"
            onChange={(e) => {
              const selectedDifficulty = e.target.value;
              
              setDifficulty(selectedDifficulty);
              const questions = interviewQuestions[selectedInterview][selectedDifficulty];
              setQuestionList(shuffleQuestion(questions));
              setCurrentQuestion(0);
            }}
          />
          <br />
          <br />

          <label>Medium</label>
          <input
            type="radio"
            name="difficulty"
            value="medium"
            onChange={(e) => {
              const selectedDifficulty = e.target.value;
              
              setDifficulty(selectedDifficulty);
              const questions = interviewQuestions[selectedInterview][selectedDifficulty];
              setQuestionList(shuffleQuestion(questions));
              setCurrentQuestion(0);
            }}
          />
          <br />
          <br />

          <label>Hard</label>
          <input
            type="radio"
            name="difficulty"
            value="hard"
            onChange={(e) => {
              const selectedDifficulty = e.target.value;
              
              setDifficulty(selectedDifficulty);
              const questions = interviewQuestions[selectedInterview][selectedDifficulty];
              setQuestionList(shuffleQuestion(questions));
              setCurrentQuestion(0);
            }}
          />
        </>
      )}

      {selectedInterview && difficulty && !interviewCompleted && (
        <h2>{selectedInterview}</h2>
      )}

      {selectedInterview && difficulty && (
        <div>
          {!interviewCompleted && (
            <>
              <h3>
                Question: {currentQuestion + 1} /{" "}
                {questionList.length}
              </h3>

              <p>{questionList[currentQuestion]}</p>
              <br />
            </>
          )}

          {!(
            currentQuestion ===
              interviewQuestions[selectedInterview][difficulty].length - 1 && submitted
          ) && (
            <>
              <input
                className="input"
                type="text"
                placeholder="Type your answer"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />

              <button
                className="submit"
                onClick={handleSubmit}
                disabled={submitted}
              >
                Submit
              </button>
            </>
          )}

          {!interviewCompleted && (
            <button className="next" onClick={handleNextQuestion}>
              Skip
            </button>
          )}

          <div className="message-box">
            {submitted && !interviewCompleted && (
              <p>Answer Submitted Successfully!</p>
            )}
          </div>

          {currentQuestion ===
            questionList.length - 1 &&
            submitted && (
              <>
                <div className="result-box">
                  <h2>🎉 Interview Completed!</h2>
                  <br />
                  <h3>Name: {name} </h3>
                  <p>Interview: {selectedInterview}</p>
                  <p>Difficulty Level: {difficulty}</p>
                  <br />
                  <hr />
                  {/* <h2>Results:</h2> */}
                  <br />
                  <p>
                    Total Questions:{" "}
                    {interviewQuestions[selectedInterview][difficulty].length}
                  </p>
                  <p>Score: {score}</p>
                  <p> Percentage: {percentage.toFixed(0)}% </p>
                  <br />
                  <p>
                    {percentage >= 80
                      ? "Excellent Performance 🚀"
                      : percentage >= 60
                        ? "Good Performance 👍"
                        : "Keep Practicing 💪"}
                  </p>
                  <br />
                  <button onClick={handleStartNew}> Start New </button>
                </div>
              </>
            )}
        </div>
      )}
    </div>
  );
}

export default App;
