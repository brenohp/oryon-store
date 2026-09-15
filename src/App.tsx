import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Loja from './pages/Loja';
import Login from './pages/Login';
import Carrinho from './pages/Carrinho';
import Cadastro from './pages/Cadastro';
import Produto from './pages/Produto';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      
      <div className="flex flex-col min-h-screen w-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/loja" element={<Loja />} />
          <Route path="/login" element={<Login />} />
          <Route path="/carrinho" element={<Carrinho />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/loja/:id" element={<Produto />} /> 
        </Routes>
      </div>

      <Footer />
    </BrowserRouter>
  );
}