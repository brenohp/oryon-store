import { useState } from "react";
import { Link, useParams } from "react-router-dom";

// TODO: [BACKEND] Substituir 'mockProduto' pela requisição GET /api/produtos/:id utilizando o ID extraído da URL.
const mockProduto = {
  id: "1",
  nome: "Camiseta Oversized Soft Cotton",
  precoStr: "R$ 149,90",
  precoNum: 149.90,
  descricao: "A essência do minimalismo. Desenvolvida em algodão premium com modelagem oversized autêntica, proporcionando caimento estruturado e conforto absoluto.",
  cor: "Off White",
  imagens: ["/blusa-offwhite.jpg"],
  tamanhos: ["P", "M", "G", "GG"],
  detalhes: [
    "Composição: 97% Algodão, 3% Elastano",
    "Gramatura pesada: 200 g/m²",
    "Gola canelada de 3cm",
    "Modelagem Unissex"
  ]
};

export default function Produto() {
  const { id } = useParams(); 
  const [tamanhoSelecionado, setTamanhoSelecionado] = useState<string | null>(null);

  const handleAdicionarAoCarrinho = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tamanhoSelecionado) {
      alert("Por favor, selecione um tamanho antes de adicionar ao carrinho.");
      return;
    }
    // TODO: [BACKEND] Disparar Action (Zustand/Redux/Context) para injetar o produto no estado global do Carrinho.
    alert(`Mock: Adicionado ao carrinho! ID: ${id} | Tam: ${tamanhoSelecionado}`);
  };

  return (
    <main className="w-full min-h-[calc(100vh-100px)] bg-oryon-offwhite px-6 md:px-12 py-12 md:py-20">
      <div className="w-full max-w-[1400px] mx-auto">
        
        <nav className="flex items-center space-x-2 font-sans text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-oryon-black/50 mb-10">
          <Link to="/" className="hover:text-oryon-black transition-colors">Home</Link>
          <span>/</span>
          <Link to="/loja" className="hover:text-oryon-black transition-colors">Loja</Link>
          <span>/</span>
          <span className="text-oryon-black truncate max-w-[150px] md:max-w-none">{mockProduto.nome}</span>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-start">
          
          {/* AQUI FOI FEITO O AJUSTE DE TAMANHO DA IMAGEM */}
          <div className="w-full flex justify-center md:sticky md:top-32">
            <div className="relative w-full max-w-[500px] aspect-[4/5] bg-white/60 border border-oryon-black/10 overflow-hidden flex items-center justify-center p-4">
              <img src={mockProduto.imagens[0]} alt={mockProduto.nome} className="w-full h-full object-contain" />
            </div>
          </div>

          <div className="flex flex-col animate-fade-up">
            
            <div className="border-b border-oryon-black/10 pb-8 mb-8">
              <h1 className="font-sans text-3xl md:text-5xl font-bold uppercase tracking-tight text-oryon-black leading-none mb-4">
                {mockProduto.nome}
              </h1>
              <span className="block font-sans text-xl md:text-2xl font-bold text-oryon-black">
                {mockProduto.precoStr}
              </span>
            </div>

            <p className="font-sans text-sm text-oryon-black/70 leading-relaxed tracking-wide mb-10">
              {mockProduto.descricao}
            </p>

            <form onSubmit={handleAdicionarAoCarrinho} className="flex flex-col space-y-10 border-b border-oryon-black/10 pb-10 mb-10">
              <div className="flex flex-col space-y-4">
                <span className="font-sans text-[10px] font-bold tracking-[0.2em] uppercase text-oryon-black/50">
                  Cor Selecionada: <span className="text-oryon-black">{mockProduto.cor}</span>
                </span>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-[#f4f4f0] border-2 border-oryon-black cursor-pointer"></div>
                </div>
              </div>

              <div className="flex flex-col space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-sans text-[10px] font-bold tracking-[0.2em] uppercase text-oryon-black/50">
                    Selecione o Tamanho
                  </span>
                  <button type="button" className="font-sans text-[10px] font-bold tracking-widest text-oryon-black hover:text-oryon-red underline transition-colors">
                    Guia de Medidas
                  </button>
                </div>
                
                <div className="grid grid-cols-4 gap-3">
                  {mockProduto.tamanhos.map((tamanho) => (
                    <button
                      key={tamanho}
                      type="button"
                      onClick={() => setTamanhoSelecionado(tamanho)}
                      className={`py-3 font-sans text-xs font-bold uppercase transition-all duration-300 border ${
                        tamanhoSelecionado === tamanho 
                        ? "bg-oryon-black text-oryon-offwhite border-oryon-black" 
                        : "bg-transparent text-oryon-black border-oryon-black/20 hover:border-oryon-black"
                      }`}
                    >
                      {tamanho}
                    </button>
                  ))}
                </div>
              </div>

              <button type="submit" className="w-full group flex items-center justify-center space-x-4 bg-oryon-black text-oryon-offwhite py-5 hover:bg-oryon-red transition-colors duration-300 cursor-pointer">
                <span className="font-sans text-xs font-bold tracking-[0.2em] uppercase transition-colors">
                  Adicionar à Sacola
                </span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </form>

            <div className="flex flex-col space-y-4">
              <span className="font-sans text-[10px] font-bold tracking-[0.2em] uppercase text-oryon-black/50">
                Detalhes do Produto
              </span>
              <ul className="flex flex-col space-y-2">
                {mockProduto.detalhes.map((detalhe, idx) => (
                  <li key={idx} className="font-sans text-xs text-oryon-black/70 flex items-start">
                    <span className="mr-2 text-oryon-red">•</span>
                    {detalhe}
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}