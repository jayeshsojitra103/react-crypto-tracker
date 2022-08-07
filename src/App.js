
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import './style.css';
import Header from './Component/Header';
import Home from './Pages/Home';
import CoinDetails from './Pages/CoinDetails';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/coin-details/:id' element={<CoinDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
