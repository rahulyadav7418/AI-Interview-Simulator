function Navbar({ showBack, onBack, started, setStarted }) {
    return (
        <nav>
            {showBack && (
            <button className= "back-btn"
            onClick={onBack}>
            ← Back
            </button>
           )}
            {!started && <h2 className="title">AI Interview Simulator</h2>}
            <br />
        </nav>
    );
}

export default Navbar;