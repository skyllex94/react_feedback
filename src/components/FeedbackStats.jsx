import { useContext } from "react";
import GlobalContext from "../context/Context";

function FeedbackStats() {
  const { feedback } = useContext(GlobalContext);

  let averageRating =
    feedback.reduce((accumulator, curr) => {
      return accumulator + curr.rating;
    }, 0) / feedback.length;

  averageRating = averageRating.toFixed(1).replace(/[.,]0$/, "");

  return (
    <div className="feedback-stats">
      <h4>Reviews: {feedback.length}</h4>
      <h4>Average Rating: {isNaN(averageRating) ? 0 : averageRating}</h4>
    </div>
  );
}

export default FeedbackStats;
