function InterviewCard({ interview, onSelect}) {
    return (
        <div className="card-container">
        <div className="card">
            <h2> {interview.interviewType} </h2>
            <button onClick={() => {
                console.log("Button clicked");
                console.log(interview);
                onSelect(interview.interviewType)}}>
                Select
            </button>
        </div>
        </div>
    );
}
export default InterviewCard;