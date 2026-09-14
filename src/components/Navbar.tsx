import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const mockUserLogado = false;

// ==========================================
// MOCK DATA: Carrinho
// ==========================================
const initialCartItems = [
  {
    id: "1",
    nome: "Camiseta Oversized Soft Cotton",
    cor: "Off White",
    tamanho: "M",
    precoStr: "R$ 149,90",
    precoNum: 149.90,
    img: "/blusa-offwhite.jpg",
    quantidade: 1
  },
  {
    id: "2",
    nome: "Camiseta Oversized Soft Cotton",
    cor: "Marrom",
    tamanho: "G",
    precoStr: "R$ 149,90",
    precoNum: 149.90,
    img: "/blusa-marrom.jpg",
    quantidade: 1
  },
  {
    id: "3",
    nome: "Camiseta Oversized Soft Cotton",
    cor: "Preta",
    tamanho: "GG",
    precoStr: "R$ 149,90",
    precoNum: 149.90,
    img: "/blusa-preta.jpg",
    quantidade: 1
  },
];

const mockCategorias = [
  { id: "todos", titulo: "Todos os Produtos", url: "/loja" },
  { id: "lancamentos", titulo: "Lançamentos", url: "/loja/lancamentos" },
  { 
    id: "vestuario", 
    titulo: "Vestuário", 
    subcategorias: [
      { id: "camisetas", titulo: "Camisetas", url: "/loja/camisetas" },
      { id: "calcas", titulo: "Calças", url: "/loja/calcas" },
      { id: "casacos", titulo: "Casacos", url: "/loja/casacos" }
    ]
  },
  { 
    id: "acessorios", 
    titulo: "Acessórios", 
    subcategorias: [
      { id: "bones", titulo: "Bonés", url: "/loja/bones" },
      { id: "bags", titulo: "Bags", url: "/loja/bags" }
    ]
  },
  { id: "ofertas", titulo: "Ofertas", url: "/loja/ofertas" }
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false); 
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false); // Corrigido dentro do escopo do componente
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  // ==========================================
  // ESTADO INTERATIVO DO CARRINHO
  // ==========================================
  const [cartItems, setCartItems] = useState(initialCartItems);

  const removerItem = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const aumentarQuantidade = (id: string) => {
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantidade: item.quantidade + 1 } : item
    ));
  };

  const diminuirQuantidade = (id: string) => {
    setCartItems(cartItems.map(item => 
      item.id === id && item.quantidade > 1 
        ? { ...item, quantidade: item.quantidade - 1 } 
        : item
    ));
  };

  // Soma para o Subtotal
  const subtotal = cartItems.reduce((acc, item) => acc + (item.precoNum * item.quantidade), 0);
  
  const formatarMoeda = (valor: number) => {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleCategory = (id: string) => {
    setExpandedCategory(expandedCategory === id ? null : id);
  };

  return (
    <>
      <header 
        className={`sticky top-0 left-0 w-full z-40 px-6 md:px-12 flex items-center justify-between transition-all duration-500 border-b ${
          isScrolled 
            ? "h-[70px] bg-oryon-offwhite/80 backdrop-blur-md border-oryon-black/20" 
            : "h-[100px] bg-oryon-offwhite border-transparent"
        }`}
      >
        
        {isSearchOpen ? (
          <div className="w-full flex items-center justify-between animate-in fade-in duration-300">
            <div className="flex items-center flex-grow mr-6">
              <svg className="w-5 h-5 text-oryon-black/50 mr-3 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              <input 
                type="text" 
                placeholder="Digite o que procura e aperte Enter..." 
                className="w-full bg-transparent font-sans text-sm md:text-base text-oryon-black focus:outline-none placeholder:text-oryon-black/40 uppercase tracking-wide"
                autoFocus
              />
            </div>
            <button 
              onClick={() => setIsSearchOpen(false)}
              className="cursor-pointer font-sans text-xs font-bold tracking-[0.2em] uppercase text-oryon-black hover:text-oryon-red transition-colors flex-shrink-0"
            >
              ✕ Fechar
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center w-1/3">
              <button 
                onClick={() => setIsMenuOpen(true)}
                className="cursor-pointer text-oryon-black hover:text-oryon-red transition-colors flex items-center justify-center p-1 mr-4 md:mr-6"
                aria-label="Abrir Menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              </button>

              <Link to="/" className="relative flex items-center h-[80px] w-[280px] md:h-[100px] md:w-[400px]">
                <img 
                  src="/logo-oryon.png" 
                  alt="Logo ORYØN" 
                  className="w-full h-full object-contain object-left" 
                />
              </Link>
            </div>

            <div className="hidden md:flex w-1/3"></div>

            <div className="flex items-center justify-end space-x-7 md:space-x-8 w-1/3">
              <button 
                onClick={() => setIsSearchOpen(true)}
                className="cursor-pointer text-oryon-black hover:text-oryon-red transition-colors flex items-center justify-center p-1"
                aria-label="Pesquisar"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              </button>

              {/* Menu de Conta com Suporte a Hover (Desktop) e Clique (Mobile) */}
              <div className="relative flex items-center group">
                <Link 
                  to={mockUserLogado ? "/perfil" : "/login"} 
                  onClick={(e) => {
                    if (window.innerWidth < 768) {
                      e.preventDefault();
                      setIsUserMenuOpen(!isUserMenuOpen);
                    }
                  }}
                  className="text-oryon-black group-hover:text-oryon-red transition-colors flex items-center justify-center p-1 cursor-pointer" 
                  aria-label="Conta"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                </Link>

                <div className={`absolute top-full right-0 mt-4 w-48 bg-oryon-offwhite border border-oryon-black/10 shadow-lg transition-all duration-300 z-50 flex flex-col py-2 before:absolute before:-top-4 before:right-0 before:w-full before:h-4 ${
                  isUserMenuOpen ? "opacity-100 visible" : "opacity-0 invisible md:group-hover:opacity-100 md:group-hover:visible"
                }`}>
                  {mockUserLogado ? (
                    <>
                      <div className="px-5 py-3 border-b border-oryon-black/10 mb-2">
                        <span className="block font-sans text-[9px] font-bold tracking-widest text-oryon-black/50 uppercase">Autenticado como</span>
                        <span className="block font-sans text-sm font-bold text-oryon-black truncate mt-1">Breno Padovan</span>
                      </div>
                      <Link to="/perfil" onClick={() => setIsUserMenuOpen(false)} className="px-5 py-2.5 font-sans text-[11px] font-bold tracking-[0.15em] uppercase text-oryon-black hover:text-oryon-red hover:bg-oryon-black/5 transition-colors">Meu Perfil</Link>
                      <Link to="/perfil" onClick={() => setIsUserMenuOpen(false)} className="px-5 py-2.5 font-sans text-[11px] font-bold tracking-[0.15em] uppercase text-oryon-black hover:text-oryon-red hover:bg-oryon-black/5 transition-colors">Minha Conta</Link>
                      <Link to="/perfil" onClick={() => setIsUserMenuOpen(false)} className="px-5 py-2.5 font-sans text-[11px] font-bold tracking-[0.15em] uppercase text-oryon-black hover:text-oryon-red hover:bg-oryon-black/5 transition-colors">Meus Pedidos</Link>
                    </>
                  ) : (
                    <>
                      <Link to="/login" onClick={() => setIsUserMenuOpen(false)} className="px-5 py-3 font-sans text-[11px] font-bold tracking-[0.15em] uppercase text-oryon-black hover:text-oryon-red hover:bg-oryon-black/5 transition-colors">Fazer Login</Link>
                      <Link to="/cadastro" onClick={() => setIsUserMenuOpen(false)} className="px-5 py-3 font-sans text-[11px] font-bold tracking-[0.15em] uppercase text-oryon-black hover:text-oryon-red hover:bg-oryon-black/5 transition-colors">Criar Conta</Link>
                    </>
                  )}
                </div>
              </div>

              <button 
                onClick={() => setIsCartOpen(true)}
                className="relative flex items-center p-1 cursor-pointer group" 
                aria-label="Carrinho"
              >
                <svg className="w-5 h-5 text-oryon-black group-hover:text-oryon-red transition-colors flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.120-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.993zM8.25 10.5h7.5" />
                </svg>
                <span className="absolute -top-1 -right-2 bg-oryon-red text-oryon-offwhite font-sans text-[9px] font-bold w-[18px] h-[18px] flex items-center justify-center rounded-full shadow-sm">
                  {cartItems.reduce((acc, item) => acc + item.quantidade, 0)}
                </span>
              </button>
            </div>
          </>
        )}
      </header>

      {/* 1. MENU LATERAL ESQUERDO */}
      <div className={`fixed inset-0 z-50 flex transition-all duration-300 ${isMenuOpen ? "pointer-events-auto" : "pointer-events-none"}`}>
        <div 
          className={`fixed inset-0 bg-oryon-black/40 backdrop-blur-sm transition-opacity duration-300 ${isMenuOpen ? "opacity-100" : "opacity-0"}`}
          onClick={() => setIsMenuOpen(false)}
        ></div>

        <div className={`relative w-full max-w-sm bg-oryon-offwhite h-full shadow-2xl p-8 md:p-10 flex flex-col z-10 transition-transform duration-300 ease-out ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}>
          
          <div className="flex justify-between items-center mb-10 border-b border-oryon-black/20 pb-5">
            <span className="font-sans text-xs font-bold tracking-[0.2em] uppercase text-oryon-black">Catálogo</span>
            <button onClick={() => setIsMenuOpen(false)} className="font-sans text-xs font-bold tracking-[0.2em] uppercase text-oryon-black hover:text-oryon-red transition-colors cursor-pointer">
              ✕ Fechar
            </button>
          </div>

          <nav className="flex flex-col flex-1 overflow-y-auto pr-2">
            {mockCategorias.map((categoria) => (
              <div key={categoria.id} className="flex flex-col border-b border-oryon-black/10 last:border-0">
                {categoria.subcategorias ? (
                  <>
                    <button 
                      onClick={() => toggleCategory(categoria.id)}
                      className="w-full py-5 flex justify-between items-center group cursor-pointer"
                    >
                      <span className="font-sans text-sm font-bold tracking-[0.15em] uppercase text-oryon-black group-hover:text-oryon-red transition-colors">
                        {categoria.titulo}
                      </span>
                      <span className={`font-sans text-sm transition-transform duration-300 ${expandedCategory === categoria.id ? "rotate-90 text-oryon-red" : "group-hover:translate-x-1"}`}>
                        →
                      </span>
                    </button>
                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${expandedCategory === categoria.id ? "max-h-60 opacity-100 mb-4" : "max-h-0 opacity-0"}`}>
                      <div className="flex flex-col space-y-4 pl-4 border-l-2 border-oryon-black/10 ml-1 py-2">
                        {categoria.subcategorias.map((sub) => (
                          <Link 
                            key={sub.id} 
                            to={sub.url} 
                            onClick={() => setIsMenuOpen(false)}
                            className="font-sans text-[11px] font-bold tracking-[0.15em] uppercase text-oryon-black/60 hover:text-oryon-red transition-colors"
                          >
                            {sub.titulo}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link 
                    to={categoria.url} 
                    onClick={() => setIsMenuOpen(false)} 
                    className="w-full py-5 flex justify-between items-center group"
                  >
                    <span className="font-sans text-sm font-bold tracking-[0.15em] uppercase text-oryon-black group-hover:text-oryon-red transition-colors">
                      {categoria.titulo}
                    </span>
                    <span className="font-sans text-sm group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </Link>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>

      {/* 2. MENU LATERAL DIREITO (CARRINHO) */}
      <div className={`fixed inset-0 z-50 flex justify-end transition-all duration-300 ${isCartOpen ? "pointer-events-auto" : "pointer-events-none"}`}>
        
        <div 
          className={`fixed inset-0 bg-oryon-black/40 backdrop-blur-sm transition-opacity duration-300 ${isCartOpen ? "opacity-100" : "opacity-0"}`}
          onClick={() => setIsCartOpen(false)}
        ></div>

        <div className={`relative w-full max-w-md bg-oryon-offwhite h-full shadow-2xl flex flex-col z-10 transition-transform duration-300 ease-out ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}>
          
          <div className="p-8 pb-5 flex justify-between items-center border-b border-oryon-black/10">
            <span className="font-sans text-xs font-bold tracking-[0.2em] uppercase text-oryon-black">
              Carrinho de Compras
            </span>
            <button onClick={() => setIsCartOpen(false)} className="font-sans text-xs font-bold tracking-[0.2em] uppercase text-oryon-black hover:text-oryon-red transition-colors cursor-pointer">
              ✕ Fechar
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-8 flex flex-col space-y-8">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div key={item.id} className="flex items-start space-x-5 group/item">
                  
                  <div className="relative w-20 h-24 bg-white/50 border border-oryon-black/5 flex-shrink-0 flex items-center justify-center overflow-hidden">
                    <img 
                      src={item.img} 
                      alt={item.nome} 
                      className="w-full h-full object-contain p-1" 
                    />
                  </div>
                  
                  <div className="flex flex-col flex-grow pt-1">
                    <h4 className="font-sans text-sm font-bold uppercase tracking-wide text-oryon-black leading-tight pr-4">
                      {item.nome}
                    </h4>
                    <span className="font-sans text-[10px] text-oryon-black/50 uppercase tracking-widest mt-1">
                      {item.cor} / Tam: {item.tamanho}
                    </span>
                    
                    <div className="flex justify-between items-end mt-4">
                      <div className="flex items-center border border-oryon-black/20">
                        <button 
                          onClick={() => diminuirQuantidade(item.id)}
                          className="px-2.5 py-1 font-sans text-xs font-medium text-oryon-black/50 hover:text-oryon-black hover:bg-oryon-black/5 transition-colors"
                        >
                          -
                        </button>
                        <span className="font-sans text-xs font-bold w-5 text-center">
                          {item.quantidade}
                        </span>
                        <button 
                          onClick={() => aumentarQuantidade(item.id)}
                          className="px-2.5 py-1 font-sans text-xs font-medium text-oryon-black/50 hover:text-oryon-black hover:bg-oryon-black/5 transition-colors"
                        >
                          +
                        </button>
                      </div>

                      <div className="flex items-center space-x-4">
                        <span className="font-sans text-sm font-bold text-oryon-black">
                          {formatarMoeda(item.precoNum * item.quantidade)}
                        </span>
                        
                        <button 
                          onClick={() => removerItem(item.id)}
                          className="text-oryon-black/40 hover:text-oryon-red transition-colors mb-0.5"
                          aria-label="Remover item"
                        >
                          <svg className="w-[15px] h-[15px]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                          </svg>
                        </button>
                      </div>

                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-oryon-black/40 font-sans">
                <span className="text-sm uppercase tracking-widest">Seu carrinho está vazio.</span>
              </div>
            )}
          </div>

          <div className="p-8 border-t border-oryon-black/10 bg-oryon-offwhite">
            <div className="flex justify-between items-center mb-6">
              <span className="font-sans text-xs uppercase tracking-widest text-oryon-black/60">Subtotal</span>
              <span className="font-sans text-base font-bold text-oryon-black">
                {formatarMoeda(subtotal)}
              </span>
            </div>
            
            <Link 
              to="/carrinho" 
              onClick={() => setIsCartOpen(false)}
              className={`w-full flex items-center justify-center py-4 transition-colors duration-300 mb-4 group ${
                cartItems.length > 0 
                ? "bg-oryon-black text-oryon-offwhite hover:bg-oryon-red" 
                : "bg-oryon-black/20 text-oryon-black/50 pointer-events-none"
              }`}
            >
              <span className="font-sans text-[10px] font-bold tracking-[0.2em] uppercase">Finalizar Pedido</span>
              <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </Link>

            <button 
              onClick={() => setIsCartOpen(false)}
              className="w-full flex justify-center py-2"
            >
              <span className="font-sans text-[10px] text-oryon-black/50 hover:text-oryon-black uppercase tracking-widest border-b border-transparent hover:border-oryon-black transition-colors pb-1">
                Continuar Comprando
              </span>
            </button>
          </div>

        </div>
      </div>
    </>
  );
}