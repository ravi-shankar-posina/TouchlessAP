import "./App.css";
import LoginPage from "./Pages/LoginPage";
import Cards from "./Pages/Home";
import Process from "./Pages/Process";
import Settings from "./Pages/Settings";
import Header from "./Pages/Header";
import Protected from "./components/protected";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import InputPage from "./Pages/InputPage";
import { POProvider } from "./Pages/POContext";

function App() {
  return (
    <POProvider>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<LoginPage />} />
          </Routes>
          <div style={{ display: "flex" }}>
            <div style={{ width: "100%" }}>
              <Routes>
                <Route
                  path="/home"
                  element={
                    <Protected>
                      <Cards />
                    </Protected>
                  }
                />
                {/* <Route
                  path="/tlprocess"
                  element={
                    <Protected>
                      <Process />
                    </Protected>
                  }
                /> */}
                <Route
                  path="/header"
                  element={
                    <Protected>
                      <Header />
                    </Protected>
                  }
                />
                <Route
                  path="/settings"
                  element={
                    <Protected>
                      <Settings />
                    </Protected>
                  }
                />
                <Route path="/ponumber" element={<InputPage />} />
              </Routes>
            </div>
          </div>
        </Router>
      </div>
    </POProvider>
  );
}

export default App;
