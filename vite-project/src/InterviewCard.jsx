function InterviewCard({ title, onSelect}) {
    return (
        <div>
            <h2>{ title }</h2>
            <button onClick={() => onSelect(title)}>
                Select
            </button>
        </div>
    );
}
export default InterviewCard;