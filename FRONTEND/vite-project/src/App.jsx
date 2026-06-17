import Navbar from "./Navbar";
import Hero from "./Hero";
import InterviewCard from "./InterviewCard";
import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

const interviews = ["Frontend Interview", "Backend Interview", "AI Interview", "Java Interview"];
const interviewQuestions = {
  "Frontend Interview": [
    "What is React?",
    "What is JSX?",
    "What is Virtual Dom?"
  ],

  "Backend Interview": [
    "What is Node.js?",
    "What is Express.js?",
    "What is API?"
  ],

  "AI Interview": [
    "What is AI?",
    "What is Machine Learning?",
    "What is Deep Learning?"
  ],

  "Java Interview": [
    "What is OOP?",
    "What is Inheritence?",
    "What is Polimorphism?"
  ],

  // "AI/ML": [
  //   "What is AI?",
  //   "What is Machine Learning?",
  //   "What is Deep Learning?"
  // ],

};

function App() {

  const [score, setScore] = useState(0);

  const [name, setName] = useState("");

  const [interviews, setInterviews] = useState([
    "Frontend Interview", "Backend Interview", "AI Interview", "Java Interview"
  ]);

  useEffect(() => {
    axios.get("http://localhost:8080/interviews")
    .then((res) => {
      // setInterviews(res.data);
    }).catch((err) => {
      console.log(err);
    });
  }, []);

  console.log(interviews);

  const [selectedInterview, setSelectedInterview] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answer, setAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleNextQuestion = () => {
    if(currentQuestion < interviewQuestions[selectedInterview].length - 1)
    {
    setCurrentQuestion(prev => prev + 1);
    setAnswer("");
    setSubmitted(false);
    }
  };
  console.log(selectedInterview);

  const handleSubmit = () => {
    if(submitted) return;

    if(answer.trim() === "") {
      alert("Please enter an answer!");
      return;
    }
    setSubmitted(true);
    setScore(prev => prev + 2);
    setAnswer("");

    setTimeout(() => {
      setCurrentQuestion(prev => {
        if(prev + 1 >= interviewQuestions[selectedInterview].length) {
          setSubmitted(true); //or show final screen
          return prev; //stop increasing
        }
        return prev + 1;
      });

      setAnswer("");
      setSubmitted(false);
    }, 200);
  }

  return (
    <div>
      <Navbar />
      <>
      <Hero name={name} setName={setName}/>
      </>
      {
        interviews.map((item, index) => (
          <InterviewCard key = { index }
          interview = { item } 
          onSelect = { setSelectedInterview }
          />
        ))
      }

      { selectedInterview && ( <h2> Selected Interview: {selectedInterview}</h2>
      )}

      {
        selectedInterview && (
          <div>
            
            <h3>Question: { currentQuestion + 1 } / { interviewQuestions[selectedInterview].length}</h3>

            <p>
            { interviewQuestions [selectedInterview] [currentQuestion] }
            </p>
            <br />
            
            {
              !(currentQuestion === interviewQuestions[selectedInterview].length - 1
                && submitted) && (
                <>
                  <input className="input" type="text"
                    placeholder="Type your answer"
                    value = { answer }
                    onChange = {(e) => setAnswer(e.target.value)} />
                  
                  <button className="submit"
                  onClick={ handleSubmit }
                  disabled={ submitted }>
                    Submit
                  </button>
            
                </>
              )
            }

            {
              submitted && <p className="submitted">Answer Submitted Successfully!</p>
            }

            {/* {
              currentQuestion < interviewQuestions[selectedInterview].length - 1 && (
                <button className="next" onClick={ handleNextQuestion }>
                  Next
                </button>
              )
            } */}

            {
              currentQuestion === interviewQuestions[selectedInterview].length - 1
              &&
              submitted && (
                <>
              <h3>Interview Completed!</h3>
              <p>Total Questions: {interviewQuestions[selectedInterview].length}</p>
              <h2>Score: {score}</h2>

              <button onClick={() => {
                axios.post("http://localhost:8080/interviews", {
                  name,
                  interviewType: selectedInterview,
                  score: score
                  
                }).then(() => {
                  console.log("Saved Succefully");

                }).catch((err) => {
                  console.log(err);
                });
            
                setSelectedInterview("");
                setCurrentQuestion(0);
                setAnswer("");
                setSubmitted(false);
                setScore(0);
              }}> Start New </button>
              </>
              )
            }
            
             
          </div>
        )
      }

    </div>
  );
}

export default App;