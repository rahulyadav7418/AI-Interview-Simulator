function Navbar({ showBack, onBack, started, setStarted }) {
    return (
        <nav className="nav-content">
            {showBack && (
            <button className= "back-btn"
            onClick={onBack}>
             ←
            </button>
           )}

           <div className="navbar-title">
            🤖<b>AI Interview Simulator</b>
            </div>

            {!started && (
                <div className="navbar-links">
                    <a href="/">Home</a>
                    <a href="/interviews">My Interviews</a>
                    <a href="/profile">Profile</a>
                </div>
            )}
            <br />
        </nav>
    );
}

export default Navbar;