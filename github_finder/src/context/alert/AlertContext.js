import { useReducer, createContext } from "react";
import alertReducer from "./AlertReducer";

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const initState = null;

  const [state, dispatch] = useReducer(alertReducer, initState);

  const setAlert = (msg, type) => {
    dispatch({ type: "SET_ALERT", payload: [msg, type] });
    setTimeout(() => dispatch({ type: "REMOVE_ALERT" }), 4000);
  };

  return (
    <AlertContext.Provider value={{ alert: state, setAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

export default AlertContext;
