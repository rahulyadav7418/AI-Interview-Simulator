function InterviewCard({ interview, onSelect}) {
    return (
        <div className="card-container">
        <div className="card">
            <h2> {interview} </h2>
            <button onClick={() => {
                // console.log("Button clicked");
                // console.log(interview);
                onSelect(interview)}}>
                Select
            </button>
        </div>
        </div>
    );
}
export default InterviewCard;