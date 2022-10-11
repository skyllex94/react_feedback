import { createContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const GlobalContext = createContext();

export const ContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = async () => {
    const response = await fetch(`/feedback?_sort=id&order=desc`);
    const data = await response.json();
    setFeedback(data);
    setIsLoading(false);
  };

  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  });

  const addFeedback = async (newFeedback) => {
    const response = await fetch("/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newFeedback),
    });

    const data = await response.json();
    setFeedback([...feedback, data]);
  };

  const deleteFeedback = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      await fetch(`/feedback/${id}`, {
        method: "DELETE",
      });
      setFeedback(feedback.filter((curr) => curr.id !== id));
    }
  };

  const editFeedback = (itemToBeEditted) => {
    setFeedbackEdit({
      item: itemToBeEditted,
      edit: true,
    });
  };

  const updateFeedItem = async (id, updatedItem) => {
    const response = await fetch(`/feedback/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedItem),
    });

    const data = await response.json();

    setFeedback(
      feedback.map((curr) => (curr.id === id ? { ...curr, ...data } : curr))
    );
  };

  return (
    <GlobalContext.Provider
      value={{
        feedback,
        feedbackEdit,
        isLoading,
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedItem,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
