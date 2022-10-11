import Card from "./shared/Card";
import { FaTimes, FaEdit } from "react-icons/fa";
import { useContext } from "react";
import GlobalContext from "../context/Context";

function FeedbackItem({ item }) {
  const { deleteFeedback, editFeedback } = useContext(GlobalContext);

  return (
    <Card>
      <div className="num-display">{item.rating}</div>

      <button className="edit" onClick={() => editFeedback(item)}>
        <FaEdit color="purple" />
      </button>

      <button
        onClick={() => {
          deleteFeedback(item.id);
        }}
        className="close"
      >
        <FaTimes color="purple" />
      </button>
      <div className="text-display">{item.text}</div>
    </Card>
  );
}

export default FeedbackItem;
