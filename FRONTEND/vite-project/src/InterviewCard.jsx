function InterviewCard({ title, onSelect}) {
    return (
        <div className="card-container">
        <div className="card">
            <h2>{ title }</h2>
            <button onClick={() => onSelect(title)}>
                Select
            </button>
        </div>
        </div>
    );
}
export default InterviewCard;