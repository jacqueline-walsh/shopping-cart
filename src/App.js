import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Cart from './components/Cart';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/shopping-cart/" exact element={<Home />} />
        <Route path="/shopping-cart/cart" element={<Cart />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
