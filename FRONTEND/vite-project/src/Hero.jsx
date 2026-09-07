import { useState } from "react";

function Hero({name, setName, started, setStarted, selectedInterview}) {
    return (
        <div className="top-content">
        
          {/* {!started && <h1>Mock Interview Platform</h1>} */}

          {!started && (
           <> 
              <h4>✨Next-Gen Technical Interview Readiness</h4>
              <h1>Practice Interviews. Build <br /><br />Confidence. Get Hired.</h1>
              <p>Simulate realistic technical and behavioral interviews with structured<br /> instant feedback, curated domain questions, and score tracking.</p>
              <br /><br /><br />
              <div className="name-card">
                <label htmlFor="name" className="name"><b>Name: </b></label>
                <input
                type="text"
                placeholder="Enter your name"
                onChange={(e) => setName(e.target.value)}
               />

               <br /><br />

               <button 
               className="startInterview-btn"
               onClick={() => setStarted(true)}
               disabled={!name.trim()}
               >
               Start Interview
               </button>
              </div>
            </>
          )} <br /><br /><br /><br />

              {started && !selectedInterview && (
                <h2>Welcome {name} 👋</h2>
               )}
  
        </div>
    );
}

export default Hero;