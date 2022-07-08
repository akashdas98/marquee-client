import "./App.css";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Search from "./routes/search";
import View from "./routes/view";

function App() {
  return (
    <Router>
      <Routes>
        <Route path={"search"} element={<Search />} />
        <Route path={"view"} element={<View />} />
        <Route path={"/"} element={<Navigate to="/search" />}></Route>
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
