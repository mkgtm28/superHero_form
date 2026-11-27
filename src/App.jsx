import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./page/Style.css";
import SuperheroForm from "./page/SuperheroForm.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SuperheroForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;