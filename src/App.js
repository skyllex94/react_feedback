import React from "react";
import Header from "./components/Header";
import FeedbackList from "./components/FeedbackList";
import FeedbackStats from "./components/FeedbackStats";
import FeedbackForm from "./components/FeedbackForm";
import About from "./pages/About";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AboutIconLink from "./components/AboutIconLink";
import { ContextProvider } from "./context/Context";

function App() {
  return (
    <Router>
      <Header />
      <div className="container">
        <Routes>
          <Route
            exact
            path="/"
            element={
              <ContextProvider>
                <FeedbackForm />
                <FeedbackStats />
                <FeedbackList />
              </ContextProvider>
            }
          />

          <Route path="/about" element={<About />} />
        </Routes>
      </div>
      <AboutIconLink />
    </Router>
  );
}

export default App;
