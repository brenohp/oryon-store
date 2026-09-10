import { Link } from "react-router-dom";
import { useState } from "react";

// ==========================================
// MOCK DATA: Produtos da Loja (Preparado para Back-End)
// ==========================================
const mockProdutosLoja = [
  {
    id: "1",
    nome: "Camiseta Oversized Soft Cotton",
    categoria: "Camisetas",
    cor: "Off White",
    preco: "R$ 149,90",
    img: "/blusa-offwhite.jpg",
    status: "Exclusivo",
  },
  {
    id: "2",
    nome: "Camiseta Oversized Soft Cotton",
    categoria: "Camisetas",
    cor: "Marrom",
    preco: "R$ 149,90",
    img: "/blusa-marrom.jpg",
    status: "Novo",
  },
  {
    id: "3",
    nome: "Camiseta Oversized Soft Cotton",
    categoria: "Camisetas",
    cor: "Preta",
    preco: "R$ 149,90",
    img: "/blusa-preta.jpg",
    status: "",
  }
];

export default function Loja() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Estado para simular visualmente a seleção de categoria e o botão de adicionar
  const [categoriaAtiva, setCategoriaAtiva] = useState("Todos os Produtos");
  const [addedItem, setAddedItem] = useState<string | null>(null);

  const handleAddToCart = (e: React.MouseEvent, id: string) => {
    e.preventDefault(); 
    setAddedItem(id);
    setTimeout(() => {
      setAddedItem(null);
    }, 2000);
  };

  // Filtro visual dinâmico baseado na categoria escolhida
  const produtosFiltrados = categoriaAtiva === "Todos os Produtos" 
    ? mockProdutosLoja 
    : mockProdutosLoja.filter(p => p.categoria.toLowerCase() === categoriaAtiva.toLowerCase());

  return (
    <main className="min-h-screen w-full bg-oryon-offwhite px-6 md:px-12 pt-12 md:pt-24 pb-32">
      
      <div className="w-full max-w-[1400px] mx-auto">
        
        {/* Cabeçalho da Loja Ajustado (Mais próximo da linha) */}
        <div className="flex flex-col border-b border-oryon-black/20 pb-8 mb-8 relative">
          <div className="flex flex-col md:flex-row md:items-end justify-between">
            <div>
              <h1 className="font-sans text-5xl md:text-7xl font-bold uppercase tracking-tight text-oryon-black leading-none mb-4">
                {categoriaAtiva}
              </h1>
              <p className="font-sans text-xs md:text-sm text-oryon-black/60 max-w-lg tracking-wide leading-relaxed uppercase">
                Peças selecionadas para rotina urbana, editorial de rua e drops com presença visual forte.
              </p>
            </div>
            
            <div className="flex items-center space-x-6 mt-8 md:mt-0 font-sans text-xs font-bold tracking-[0.2em] uppercase">
              <span className="text-oryon-black/40">{produtosFiltrados.length} Produtos</span>
              <button 
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="group flex items-center space-x-2 text-oryon-black border-b border-oryon-black pb-1 hover:border-oryon-red transition-colors cursor-pointer"
              >
                <span className="group-hover:text-oryon-red transition-colors">
                  {isFilterOpen ? "Fechar Filtros -" : "Filtros +"}
                </span>
              </button>
            </div>
          </div>

          {/* Painel de Filtros Retrátil */}
          {isFilterOpen && (
            <div className="absolute top-full left-0 w-full bg-oryon-offwhite border-b border-oryon-black/20 pt-8 pb-12 z-20 animate-in fade-in slide-in-from-top-4 duration-300">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                
                <div className="flex flex-col">
                  <span className="font-sans text-[10px] font-bold tracking-[0.2em] uppercase text-oryon-black/50 mb-4">Categoria</span>
                  <div className="flex flex-col space-y-2 font-sans text-sm text-oryon-black">
                    <button onClick={() => setCategoriaAtiva("Todos os Produtos")} className="text-left hover:text-oryon-red transition-colors cursor-pointer">Todas as Peças</button>
                    <button onClick={() => setCategoriaAtiva("Camisetas")} className="text-left hover:text-oryon-red transition-colors cursor-pointer">Camisetas</button>
                    <button onClick={() => setCategoriaAtiva("Moletons")} className="text-left hover:text-oryon-red transition-colors cursor-pointer">Moletons</button>
                  </div>
                </div>

                <div className="flex flex-col">
                  <span className="font-sans text-[10px] font-bold tracking-[0.2em] uppercase text-oryon-black/50 mb-4">Cor</span>
                  <div className="flex flex-col space-y-2 font-sans text-sm text-oryon-black">
                    <button className="text-left hover:text-oryon-red transition-colors cursor-pointer">Off White</button>
                    <button className="text-left hover:text-oryon-red transition-colors cursor-pointer">Preto</button>
                    <button className="text-left hover:text-oryon-red transition-colors cursor-pointer">Marrom</button>
                  </div>
                </div>

                <div className="flex flex-col">
                  <span className="font-sans text-[10px] font-bold tracking-[0.2em] uppercase text-oryon-black/50 mb-4">Ordenar Por</span>
                  <div className="flex flex-col space-y-2 font-sans text-sm text-oryon-black">
                    <button className="text-left hover:text-oryon-red transition-colors cursor-pointer">Mais Recentes</button>
                    <button className="text-left hover:text-oryon-red transition-colors cursor-pointer">Menor Preço</button>
                    <button className="text-left hover:text-oryon-red transition-colors cursor-pointer">Maior Preço</button>
                  </div>
                </div>

              </div>
            </div>
          )}
        </div>

        {/* Grid de Produtos com Imagens Proporcionais */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {produtosFiltrados.map((produto) => (
            <Link to={`/loja/${produto.id}`} key={produto.id} className="group flex flex-col cursor-pointer">
              
              {/* Container com altura menor (aspect-[4/3]) e status embaixo */}
              <div className="relative w-full aspect-[4/3] bg-white border border-oryon-black/10 overflow-hidden flex items-center justify-center p-4">
                
                {/* Tag de Status na parte inferior esquerda */}
                {produto.status && (
                  <div className={`absolute bottom-0 left-0 z-20 px-3 py-1.5 ${produto.status === 'Exclusivo' ? 'bg-oryon-red' : 'bg-oryon-black'}`}>
                    <span className="font-sans text-[9px] font-bold tracking-widest uppercase text-oryon-offwhite">
                      {produto.status}
                    </span>
                  </div>
                )}
                
                <img 
                  src={produto.img}
                  alt={produto.nome}
                  className="w-full h-full object-contain p-2 z-0 group-hover:scale-105 transition-transform duration-[600ms] ease-out"
                />
              </div>

              <div className="mt-5 flex flex-col">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-sans text-lg font-bold uppercase tracking-wide text-oryon-black group-hover:text-oryon-red transition-colors duration-300 pr-4">
                    {produto.nome}
                  </h3>
                  <span className="font-sans text-sm font-bold text-oryon-black whitespace-nowrap">
                    {produto.preco}
                  </span>
                </div>
                
                <div className="flex justify-between items-center mt-2">
                  <span className="font-sans text-[10px] text-oryon-black/50 uppercase tracking-widest">
                    Cor: {produto.cor}
                  </span>
                  
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button 
                      onClick={(e) => handleAddToCart(e, produto.id)}
                      className="font-sans text-[10px] font-bold tracking-[0.2em] uppercase text-oryon-black hover:text-oryon-red border-b border-oryon-black hover:border-oryon-red pb-1 transition-colors cursor-pointer"
                    >
                      {addedItem === produto.id ? "Adicionado ✓" : "Adicionar +"}
                    </button>
                  </div>
                </div>
              </div>

            </Link>
          ))}
        </div>

        <div className="w-full mt-32 border-t border-oryon-black/10 pt-8 flex justify-center">
          <span className="font-sans text-[10px] font-semibold tracking-[0.3em] uppercase text-oryon-black/30">
            Fim do Catálogo
          </span>
        </div>

      </div>
    </main>
  );
}