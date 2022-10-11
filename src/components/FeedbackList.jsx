import FeedbackItem from "./FeedbackItem";
import { useContext } from "react";
import GlobalContext from "../context/Context";
import Spinner from "./shared/Spinner";

function FeedbackList() {
  const { feedback, isLoading } = useContext(GlobalContext);

  if ((!feedback || feedback.length === 0) && !isLoading) {
    return <p>No Feedback Yet</p>;
  }

  return isLoading ? (
    <h3>{Spinner}</h3>
  ) : (
    <div className="feedback-list">
      {feedback.map((curr) => (
        <FeedbackItem key={curr.id} item={curr} />
      ))}
    </div>
  );
}

export default FeedbackList;
