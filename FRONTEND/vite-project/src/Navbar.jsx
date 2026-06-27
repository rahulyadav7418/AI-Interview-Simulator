function Navbar({ showBack, onBack, started, setStarted }) {
    return (
        <nav className="nav-content">
            {showBack && (
            <button className= "back-btn"
            onClick={onBack}>
             ←
            </button>
           )}
            {!started && <h2 className="title">AI Interview Simulator</h2>}
            <br />
        </nav>
    );
}

export default Navbar;