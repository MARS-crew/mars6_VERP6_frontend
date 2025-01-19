import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Test from "./pages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Test />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
