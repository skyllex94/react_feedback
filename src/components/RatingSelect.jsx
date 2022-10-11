import React, { useEffect, useState } from "react";
import { useContext } from "react";
import GlobalContext from "../context/Context";

function RatingSelect({ select }) {
  const [selected, setSelected] = useState(5);
  const { feedbackEdit } = useContext(GlobalContext);

  const arrayOfRadioButtons = [
    "num1",
    "num2",
    "num3",
    "num4",
    "num5",
    "num6",
    "num7",
    "num8",
    "num9",
    "num10",
  ];

  useEffect(() => {
    if (feedbackEdit.edit === true) {
      setSelected(feedbackEdit.item.rating);
    }
  }, [feedbackEdit]);

  function handleChange(e) {
    setSelected(+e.currentTarget.value);
    select(+e.currentTarget.value);
  }

  return (
    <ul className="rating">
      {arrayOfRadioButtons.map((curr, index) => (
        <React.Fragment>
          <label htmlFor={curr}>{index + 1}</label>
          <li>
            <input
              type="radio"
              id={curr}
              name="rating"
              value={index + 1}
              onChange={handleChange}
              checked={selected === index + 1}
            />
          </li>
        </React.Fragment>
      ))}
    </ul>
  );
}

export default RatingSelect;
