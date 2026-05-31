import Navbar from "./Navbar";
import Hero from "./Hero";
import InterviewCard from "./InterviewCard";
const interviews = ["Frontend Interview", "Backend Interview", "AI Interview", "Java Interview"];

function App() {
  return (
    <div>
      <Navbar />
      <Hero />
      {
        interviews.map((item, index) => (
          <InterviewCard key = { index }
          title = { item } />
        ))
      }
    </div>
  );
}

export default App;