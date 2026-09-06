import Navbar from "./Navbar";
import Hero from "./Hero";
import InterviewCard from "./InterviewCard";
import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

const interviews = [
  "Frontend Interview",
  "Backend Interview",
  "AI Interview",
  "Java Interview",
];
const interviewQuestions = {
  "Frontend Interview": [
    "What is React?",
    "What is JSX?",
    "What is Virtual Dom?",
  ],

  "Backend Interview": [
    "What is Node.js?",
    "What is Express.js?",
    "What is API?",
  ],

  "AI Interview": [
    "What is AI?",
    "What is Machine Learning?",
    "What is Deep Learning?",
  ],

  "Java Interview": [
    "What is OOP?",
    "What is Inheritence?",
    "What is Polimorphism?",
  ],

  // "AI/ML": [
  //   "What is AI?",
  //   "What is Machine Learning?",
  //   "What is Deep Learning?"
  // ],
};

function App() {
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

  const percentage = selectedInterview
    ? (score / (interviewQuestions[selectedInterview].length * 2)) * 100
    : 0;

  const handleNextQuestion = () => {
    if (currentQuestion < interviewQuestions[selectedInterview].length - 1) {
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
        question: interviewQuestions[selectedInterview][currentQuestion],
        answer: answer,
      },
    ]);
    setAnswer("");

    setTimeout(() => {
      setCurrentQuestion((prev) => {
        const next = prev + 1;
        if (next >= interviewQuestions[selectedInterview].length) {
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
    selectedInterview &&
    currentQuestion === interviewQuestions[selectedInterview].length - 1 &&
    submitted;

  return (
    <div>
      <Navbar
        showBack={started || selectedInterview || interviewMode}
        onBack={() => {
          if (selectedInterview && difficulty) {
            setDifficulty("");
            // setSelectedInterview("");
            setCurrentQuestion(0);
            setAnswer("");
            setSubmitted(false);
            setScore(0);

          } else if(selectedInterview) {
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
                Interview questions based on your resume, skills and projects.
              </p>

              <button>Start →</button>
            </div>

            <div
              className="mode-card"
              onClick={() => setInterviewMode("skills")}
            >
              <div className="mode-icon">💻</div>

              <h3>Skills Based Interview</h3>

              <p>
                Practice interview questions based on a specific technical
                skill.
              </p>

              <button>Start →</button>
            </div>
          </div>
        </div>
      )}

      {started && interviewMode === "skills" &&
      !selectedInterview &&
      interviews.map((item, index) => (
        <InterviewCard
        key={index}
        interview={item}
        onSelect={setSelectedInterview}
        />
      ))}

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
        <h1>Select Difficulty Level :</h1><br />
      
          <label>Easy</label>
          <input
            type="radio"
            name="difficulty"
            value="easy"
            onChange={(e) => setDifficulty(e.target.value)}
          /><br /><br />

          <label>Medium</label>
          <input
            type="radio"
            name="difficulty"
            value="medium"
            onChange={(e) => setDifficulty(e.target.value)}
          /><br /><br />

          <label>Hard</label>
          <input
            type="radio"
            name="difficulty"
            value="hard"
            onChange={(e) => setDifficulty(e.target.value)}
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
                {interviewQuestions[selectedInterview].length}
              </h3>

              <p>{interviewQuestions[selectedInterview][currentQuestion]}</p>
              <br />
            </>
          )}

          {!(
            currentQuestion ===
              interviewQuestions[selectedInterview].length - 1 && submitted
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
            interviewQuestions[selectedInterview].length - 1 &&
            submitted && (
              <>
                <div className="result-box">
                  <h2>🎉 Interview Completed!</h2>
                  <br />
                  <h3>Name: {name} </h3>
                  <p>Interview: {selectedInterview}</p>
                  <br />
                  <hr />
                  {/* <h2>Results:</h2> */}
                  <br />
                  <p>
                    Total Questions:{" "}
                    {interviewQuestions[selectedInterview].length}
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
