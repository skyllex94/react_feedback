import React from "react";
import Header from "./components/Header";
import FeedbackList from "./components/FeedbackList";
import { useState } from "react";
import { FeedbackData } from "./data/FeedbackData";
import FeedbackStats from "./components/FeedbackStats";

function App() {
  const [feedback, setFeedback] = useState(FeedbackData);

  const deleteFeedback = (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      setFeedback(feedback.filter((curr) => curr.id !== id));
    }
  };

  return (
    <React.Fragment>
      <Header />
      <FeedbackStats feedback={feedback} />
      <FeedbackList feedback={feedback} deleteItem={deleteFeedback} />
    </React.Fragment>
  );
}

export default App;
