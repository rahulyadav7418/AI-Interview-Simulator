function InterviewCard({ interview, onSelect, difficulty }) {
  return (
    <div className="card">
      <h2>{interview}</h2>

      <button
        onClick={() => {
          onSelect(interview);
        }}
      >
        Select
      </button>
    </div>
  );
}

export default InterviewCard;