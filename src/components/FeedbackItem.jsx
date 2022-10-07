import Card from "./shared/Card";

function FeedbackItem({ key, item }) {
  return (
    <Card reverse="true">
      <div className="num-display">{item.rating}</div>
      <div className="text-display">{item.text}</div>
    </Card>
  );
}

export default FeedbackItem;
