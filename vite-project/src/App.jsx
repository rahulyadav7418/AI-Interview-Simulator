import Navbar from "./Navbar";
import Hero from "./Hero";
import InterviewCard from "./InterviewCard";
import { useState } from "react";
const interviews = ["Frontend Interview", "Backend Interview", "AI Interview", "Java Interview"];

function App() {
  const [selectedInterview, setSelectedInterview] = useState("");
  return (
    <div>
      <Navbar />
      <Hero />
      {
        interviews.map((item, index) => (
          <InterviewCard key = { index }
          title = { item } 
          onSelect = { setSelectedInterview }
          />
        ))
      }

      <h2>Selected Interview: { selectedInterview }</h2>

    </div>
  );
}

export default App;