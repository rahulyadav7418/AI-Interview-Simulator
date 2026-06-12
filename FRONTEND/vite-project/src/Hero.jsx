import { useState } from "react";

function Hero({name, setName}) {
    // const [name, setName] = useState("");
    const [started, setStarted] = useState(false);
    return (
        <div>
        <h1>Mock Interview Platform</h1>
        <input type="text" placeholder="Enter your name" onChange={(e) => setName(e.target.value)}/>
        <br /><br />
        <h2>Welcome { name }</h2>
        <button onClick={() => setStarted(true)}>
            Start Interview</button>
        {started && <h3>Interview running</h3>}
        </div>
    );
}

export default Hero;