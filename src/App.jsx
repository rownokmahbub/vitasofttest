import "./App.css";

import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from "./pages/MainPage";
import CreateTodo from "./components/CreateTodo";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/createetodo" element={<CreateTodo />} />
          
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
