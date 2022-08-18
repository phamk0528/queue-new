import "./App.css";
import React from "react";
import { BrowserRouter as Router, Link, useLocation } from "react-router-dom";
import QueueView from "./views/queue";
import { AudioPlayerProvider } from "react-use-audio-player";
function App() {
  return (
    <Router>
      <AudioPlayerProvider>
        <QueueView />
      </AudioPlayerProvider>
    </Router>
  );
}

export default App;
