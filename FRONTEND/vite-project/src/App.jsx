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
    Easy: [
      "What is HTML and what is its purpose",
      "What is React?",
      "What is CSS used for?",
    ],
    Medium: [
      "What is the Virtual Dom in React?",
      "What is the difference between state and props in React?",
      "What are React hooks? Explain useState and useEffect?",
    ],
    Hard: [
      "How does React reconciliation work?",
      "How would you optimize the performance of a React application?",
      "What causes unnecessary re-renders in React, and how can you prevent them?",
    ],
  },

  "Backend Interview": {
    Easy: ["What is Node.js?", "What is Express.js?", "What is API?"],
    Medium: [
      "What is REST API?",
      "What is middleware in Express.js?",
      "What is the difference between authentication and authorization?",
    ],
    Hard: [
      "How does the Node.js event loop work?",
      "How would you design a scalable REST API?",
      "How would you handle authentication securely in a production application?",
    ],
  },

  "AI Interview": {
    Easy: [
      "What is AI?",
      "What is Machine Learning?",
      "What is Deep Learning?",
    ],
    Medium: [
      "What is the difference between supervised and unsupervised learning?",
      "What is overfitting, and how can you prevent it?",
      "What is the difference between classification and regression?",
    ],
    Hard: [
      "Explain the bias-variance tradeoff.",
      "How would you evaluate wheather a machine learning model is performing well?",
      "What is the difference between fine-tuning and prompt enginnering in Generetive AI?",
    ],
  },

  "Java Interview": {
    Easy: ["What is OOP?", "What is Inheritence?", "What is Polimorphism?"],
    Medium: [
      "What is the difference between an interfece and an abstract class?",
      "What is method Overloading vs method overriding?",
      "What is the differece between ArrayList and LinkedList?",
    ],
    Hard: [
      "Explain how HashMap works internally in java",
      "What is the difference between == and .equals() in java?",
      "What is multithreading, and how does synchronization work in Java?",
    ],
  },
};

function shuffleQuestion(interviewQuestions) {
  return [...interviewQuestions].sort(() => Math.random() - 0.5);
}

function App() {
  const [evaluation, setEvaluation] = useState("");
  const [evaluating, setEvaluating] = useState(false);
  const [interviewFinished, setInterviewFinished] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const [finalSubmitted, setFinalSubmitted] = useState(false);

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

  const percentage =
    selectedInterview && difficulty
      ? (score /
          (interviewQuestions[selectedInterview][difficulty].length * 10)) *
        100
      : 0;

  const handleNextQuestion = () => {
    if (currentQuestion < questionList.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setAnswer("");
      setSubmitted(false);
      setEvaluation("");
    }
  };

  const handleSubmit = async () => {
    if (submitted) return;

    if (answer.trim() === "") {
      alert("Please enter an answer!");
      return;
    }

    setEvaluating(true);

    const currentAnswer = answer;
    const currentQuestionText = questionList[currentQuestion];

    try {
      const res = await axios.post("http://localhost:8080/evaluate", {
        question: currentQuestionText,
        answer: currentAnswer,
      });

      console.log("AI Evaluation:", res.data.evaluation);

      const evaluationData = JSON.parse(res.data.evaluation);

      setEvaluation(evaluationData);
      setScore((prev) => prev + evaluationData.score);

      setAnswers((prev) => [
        ...prev,
        {
          question: currentQuestionText,
          answer: currentAnswer,
          score: evaluationData.score,
          feedback: evaluationData.feedback,
        },
      ]);

      if (currentQuestion === questionList.length - 1) {
        setInterviewFinished(true);
      }

      setEvaluating(false);
      setSubmitted(true);
      setAnswer("");
    } catch (err) {
      console.log("AI Evaluation Error:", err);
      setEvaluating(false);
    }
  };

  const handleStartNew = () => {
    setName("");
    setStarted(false);
    setSelectedInterview("");
    setCurrentQuestion(0);
    setAnswer("");
    setSubmitted(false);
    setScore(0);
    setFinalSubmitted(false);

    setAnswers([]);
    setDifficulty("");
    setQuestionList([]);
    setInterviewFinished(false);
    setShowResult(false);
    setEvaluation("");
  };

  const finalSubmition = () => {
    if (finalSubmitted) return;

    axios
      .post("http://localhost:8080/interviews", {
        name,
        interviewType: selectedInterview,
        difficulty: difficulty,
        answers: answers,
        score: score,
        percentage: percentage.toFixed(0),
      })
      .then(() => {
        console.log("Saved Successfully");
        setFinalSubmitted(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const interviewCompleted =
    selectedInterview &&
    difficulty &&
    currentQuestion === questionList.length - 1 &&
    interviewFinished;

  // console.log({
  //   started,
  //   interviewMode,
  //   selectedInterview,
  //   difficulty,
  // }); //it is checking that rare case

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
            setEvaluation("");
            setInterviewFinished(false);
            setShowResult(false);
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
            // setName("");
          }
        }}
      />

      {!started && (
        <Hero
          name={name}
          setName={setName}
          started={started}
          setStarted={setStarted}
          selectedInterview={selectedInterview}
        />
      )}

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

      {started && interviewMode === "skills" && !selectedInterview && (
        <>
          <div className="interview-selection-header">
            <h2>What type of interview?</h2>
            <p>Choose a skill and start practicing.</p>
          </div>

          <div className="card-container">
            {interviews.map((item, index) => (
              <InterviewCard
                key={index}
                interview={item}
                onSelect={setSelectedInterview}
              />
            ))}
          </div>
        </>
      )}

      {selectedInterview && !difficulty && (
        <div className="difficulty-container">
          <div className="difficulty-header">
            <h1>Select Difficulty Level</h1>
            <p>Choose a difficulty level for your {selectedInterview}.</p>
          </div>

          <div className="difficulty-options">
            {/* Easy */}
            <label className="difficulty-card">
              <input
                type="radio"
                name="difficulty"
                value="Easy"
                onChange={(e) => {
                  const selectedDifficulty = e.target.value;

                  setDifficulty(selectedDifficulty);

                  const questions =
                    interviewQuestions[selectedInterview][selectedDifficulty];

                  setQuestionList(shuffleQuestion(questions));
                  setCurrentQuestion(0);
                }}
              />

              <div className="difficulty-icon">🌱</div>

              <div className="difficulty-content">
                <h3>Easy</h3>
                <p>Fundamentals and basic concepts.</p>
              </div>

              <span className="difficulty-arrow">→</span>
            </label>

            {/* Medium */}
            <label className="difficulty-card">
              <input
                type="radio"
                name="difficulty"
                value="Medium"
                onChange={(e) => {
                  const selectedDifficulty = e.target.value;

                  setDifficulty(selectedDifficulty);

                  const questions =
                    interviewQuestions[selectedInterview][selectedDifficulty];

                  setQuestionList(shuffleQuestion(questions));
                  setCurrentQuestion(0);
                }}
              />

              <div className="difficulty-icon">⚡</div>

              <div className="difficulty-content">
                <h3>Medium</h3>
                <p>Practical concepts and deeper understanding.</p>
              </div>

              <span className="difficulty-arrow">→</span>
            </label>

            {/* Hard */}
            <label className="difficulty-card">
              <input
                type="radio"
                name="difficulty"
                value="Hard"
                onChange={(e) => {
                  const selectedDifficulty = e.target.value;

                  setDifficulty(selectedDifficulty);

                  const questions =
                    interviewQuestions[selectedInterview][selectedDifficulty];

                  setQuestionList(shuffleQuestion(questions));
                  setCurrentQuestion(0);
                }}
              />

              <div className="difficulty-icon">🔥</div>

              <div className="difficulty-content">
                <h3>Hard</h3>
                <p>Advanced concepts and challenging questions.</p>
              </div>

              <span className="difficulty-arrow">→</span>
            </label>
          </div>
        </div>
      )}

      {selectedInterview && difficulty && !showResult && (
        <div className="interview-page">
          {/* Interview Header */}
          <div className="interview-header">
            <div>
              <p className="interview-label">{selectedInterview}</p>

              <h2>Technical Interview</h2>
            </div>

            <div className="difficulty-badge">{difficulty}</div>
          </div>

          {/* Progress */}
          <div className="question-progress">
            <div className="progress-info">
              <span>Question {currentQuestion + 1}</span>
              <span>{questionList.length} Questions</span>
            </div>

            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{
                  width: `${
                    ((currentQuestion + 1) / questionList.length) * 100
                  }%`,
                }}
              ></div>
            </div>
          </div>

          {/* Question */}
          <div className="question-card">
            <div className="question-number">
              Question {currentQuestion + 1}
            </div>

            <h3>{questionList[currentQuestion]}</h3>
          </div>

          {/* Answer Area */}
          {!(currentQuestion === questionList.length - 1 && submitted) && (
            <div className="answer-section">
              <label htmlFor="answer">Your Answer</label>

              <textarea
                id="answer"
                className="answer-input"
                placeholder="Type your answer here..."
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                disabled={submitted || evaluating}
              />

              <div className="answer-actions">
                <button
                  className="submit-answer-btn"
                  onClick={handleSubmit}
                  disabled={submitted || evaluating}
                >
                  {evaluating ? "🤖 Evaluating..." : "Submit Answer →"}
                </button>

                {!submitted && (
                  <button
                    className="skip-btn"
                    onClick={handleNextQuestion}
                    disabled={evaluating}
                  >
                    Skip Question
                  </button>
                )}
              </div>
            </div>
          )}

          {/* AI Evaluation */}
          {evaluation && !showResult && (
            <div className="evaluation-box">
              <div className="evaluation-header">
                <div className="evaluation-icon">🤖</div>

                <div>
                  <h3>AI Evaluation</h3>
                  <p>Here's how your answer performed</p>
                </div>
              </div>

              <div className="evaluation-score">
                <span>Score</span>

                <strong>
                  {evaluation.score}
                  <small>/10</small>
                </strong>
              </div>

              <div className="evaluation-feedback">
                <h4>Feedback</h4>

                <p>{evaluation.feedback}</p>
              </div>
            </div>
          )}

          {/* Next Question */}
          {submitted && !interviewFinished && (
            <button className="next-question-btn" onClick={handleNextQuestion}>
              Next Question →
            </button>
          )}

          {/* Finish Interview */}
          {interviewFinished && (
            <button
              className="finish-interview-btn"
              onClick={() => setShowResult(true)}
            >
              Finish Interview →
            </button>
          )}
        </div>
      )}

      {showResult && (
        <div className="result-page">
          {/* Result Header */}
          <div className="result-header">
            <div className="result-icon">🎉</div>

            <h1>Interview Completed!</h1>

            <p>Here's your AI-powered interview performance report.</p>
          </div>

          {/* Candidate Info */}
          <div className="candidate-card">
            <div className="candidate-info">
              <span className="info-label">Candidate</span>
              <strong>{name}</strong>
            </div>

            <div className="candidate-info">
              <span className="info-label">Interview</span>
              <strong>{selectedInterview}</strong>
            </div>

            <div className="candidate-info">
              <span className="info-label">Difficulty</span>
              <span className="result-difficulty">{difficulty}</span>
            </div>
          </div>

          {/* Score Section */}
          <div className="score-card">
            <div className="score-main">
              <span>Overall Score</span>

              <strong>
                {score}
                <small> / {questionList.length * 10}</small>
              </strong>
            </div>

            <div className="percentage-circle">
              <span>{percentage.toFixed(0)}%</span>
              <small>Score</small>
            </div>
          </div>

          {/* Performance */}
          <div className="performance-card">
            <div className="performance-icon">
              {percentage >= 80 ? "🚀" : percentage >= 60 ? "👍" : "💪"}
            </div>

            <div>
              <h3>
                {percentage >= 80
                  ? "Excellent Performance"
                  : percentage >= 60
                    ? "Good Performance"
                    : "Keep Practicing"}
              </h3>

              <p>
                {percentage >= 80
                  ? "You demonstrated strong technical understanding."
                  : percentage >= 60
                    ? "You have a good foundation. Keep improving your weak areas."
                    : "Keep practicing the fundamentals and strengthen your concepts."}
              </p>
            </div>
          </div>

          {/* Question Breakdown */}
          <div className="breakdown-card">
            <div className="breakdown-header">
              <h2>Question Breakdown</h2>
              <span>{answers.length} Answers</span>
            </div>

            <div className="answer-list">
              {answers.map((item, index) => (
                <div className="answer-result" key={index}>
                  <div className="answer-result-top">
                    <span className="question-index">Q{index + 1}</span>

                    <span className="question-score">{item.score}/10</span>
                  </div>

                  <h4>{item.question}</h4>

                  <p className="user-answer">
                    <strong>Your Answer:</strong> {item.answer}
                  </p>

                  <p className="ai-feedback">
                    <strong>AI Feedback:</strong> {item.feedback}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="result-actions">
            <button className="start-new-btn" onClick={handleStartNew}>
              Start New Interview
            </button>

            <button
              className="save-result-btn"
              onClick={finalSubmition}
              disabled={finalSubmitted}
            >
              {finalSubmitted ? "Saved ✓" : "Save Interview Result"}
            </button>
          </div>

          {/* Saved Message */}
          {finalSubmitted && (
            <p className="saved-message">
              Your interview performance has been saved successfully ✅
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
