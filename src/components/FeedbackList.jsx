import React from "react";
import FeedbackItem from "./FeedbackItem";

function FeedbackList({ feedback, deleteItem }) {
  if (!feedback || feedback.length === 0) {
    return <p>No Feedback Yet</p>;
  }
  return (
    <div className="feedback-list">
      {feedback.map((curr, index) => (
        <FeedbackItem key={curr.id} item={curr} deleteItem={deleteItem} />
      ))}
    </div>
  );
}

export default FeedbackList;
