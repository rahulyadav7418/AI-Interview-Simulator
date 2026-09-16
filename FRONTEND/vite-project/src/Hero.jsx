function Hero({ name, setName, started, setStarted }) {
  return (
    <div className="hero-section">

      {!started && (
        <>
          <div className="hero-badge">
            ✨ Next-Gen Technical Interview Readiness
          </div>

          <h1 className="hero-title">
            Practice Interviews.
            <br />
            Build Confidence.
            <br />
            Get Hired.
          </h1>

          <p className="hero-description">
            Simulate realistic technical interviews with AI-powered evaluation,
            <br />
            personalized feedback, and performance tracking.
          </p>

          <div className="name-card">
            <div className="name-card-header">
              <span className="name-icon">👋</span>

              <div>
                <h3>Let's get started</h3>
                <p>Enter your name to begin your interview.</p>
              </div>
            </div>

            <label htmlFor="name">Your Name</label>

            <input
              id="name"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <button
              className="startInterview-btn"
              onClick={() => setStarted(true)}
              disabled={!name.trim()}
            >
              Start Interview
              <span>→</span>
            </button>
          </div>

          <div className="hero-features">
            <div>
              <span>🤖</span>
              <p>AI Evaluation</p>
            </div>

            <div>
              <span>🎯</span>
              <p>Skill-Based Practice</p>
            </div>

            <div>
              <span>📊</span>
              <p>Track Performance</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Hero;