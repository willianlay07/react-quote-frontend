import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddQuote from "./pages/AddQuote";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addquote" element={<AddQuote />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
