import { useState } from "react";

function Hero({name, setName, started, setStarted, selectedInterview}) {
    return (
        <div className="top-content">
        
          {!started && <h1>Mock Interview Platform</h1>}

          {!started && (
           <> 
              <h3>Welcome to you On this Interview plateform</h3>
              <label htmlFor="name" className="name"><b>Name: </b></label>
              <input
                type="text"
                placeholder="Enter your name"
                onChange={(e) => setName(e.target.value)}
               />

               <br /><br />

               <button
               onClick={() => setStarted(true)}
               disabled={!name.trim()}
               >
               Start Interview
               </button>
            </>
          )}

              {started && !selectedInterview && (
                <h2>Welcome {name} 👋</h2>
               )}
  
        </div>
    );
}

export default Hero;