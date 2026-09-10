import { Link } from "react-router-dom";
import { useState } from "react";

// ==========================================
// MOCK DATA: Carrinho Oficial
// ==========================================
const initialCarrinho = [
  {
    id: "1",
    nome: "Camiseta Oversized Soft Cotton",
    cor: "Off White",
    tamanho: "M",
    precoStr: "R$ 149,90",
    precoNum: 149.90,
    quantidade: 1,
    img: "/blusa-offwhite.jpg"
  },
  {
    id: "2",
    nome: "Camiseta Oversized Soft Cotton",
    cor: "Marrom",
    tamanho: "G",
    precoStr: "R$ 149,90",
    precoNum: 149.90,
    quantidade: 1,
    img: "/blusa-marrom.jpg"
  },
  {
    id: "3",
    nome: "Camiseta Oversized Soft Cotton",
    cor: "Preta",
    tamanho: "GG",
    precoStr: "R$ 149,90",
    precoNum: 149.90,
    quantidade: 1,
    img: "/blusa-preta.jpg"
  },
];

export default function Carrinho() {
  const [itensCarrinho, setItensCarrinho] = useState(initialCarrinho);

  // Funções de Aumento, Diminuição e Exclusão
  const aumentarQuantidade = (id: string) => {
    setItensCarrinho(itensCarrinho.map(item => 
      item.id === id ? { ...item, quantidade: item.quantidade + 1 } : item
    ));
  };

  const diminuirQuantidade = (id: string) => {
    setItensCarrinho(itensCarrinho.map(item => 
      item.id === id && item.quantidade > 1 
        ? { ...item, quantidade: item.quantidade - 1 } 
        : item
    ));
  };

  const removerItem = (id: string) => {
    setItensCarrinho(itensCarrinho.filter(item => item.id !== id));
  };

  // Cálculos matemáticos do subtotal
  const subtotal = itensCarrinho.reduce((acc, item) => acc + (item.precoNum * item.quantidade), 0);
  const totalPecas = itensCarrinho.reduce((acc, item) => acc + item.quantidade, 0);

  const formatarMoeda = (valor: number) => {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  return (
    <main className="min-h-screen w-full bg-oryon-offwhite px-6 md:px-12 pt-12 md:pt-24 pb-32">
      <div className="w-full max-w-[1400px] mx-auto">
        
        {/* Cabeçalho do Carrinho */}
        <div className="border-b border-oryon-black/20 pb-8 mb-12">
          <h1 className="font-sans text-5xl md:text-7xl font-bold uppercase tracking-tight text-oryon-black">
            Seu <span className="text-oryon-red">Carrinho</span>
          </h1>
          <p className="font-sans text-xs md:text-sm text-oryon-black/60 mt-4 tracking-wide uppercase">
            {totalPecas} {totalPecas === 1 ? "Item selecionado" : "Itens selecionados"}
          </p>
        </div>

        {itensCarrinho.length > 0 ? (
          <div className="flex flex-col lg:flex-row gap-16">
            
            {/* Coluna Esquerda: Lista de Produtos */}
            <div className="w-full lg:w-2/3 flex flex-col space-y-8">
              {itensCarrinho.map((item) => (
                <div key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center py-6 border-b border-oryon-black/10 relative group">
                  
                  {/* Foto Real do Produto */}
                  <div className="relative w-24 h-32 md:w-32 md:h-40 bg-white/50 border border-oryon-black/5 flex-shrink-0 flex items-center justify-center mr-6 overflow-hidden">
                    <img 
                      src={item.img} 
                      alt={item.nome} 
                      className="w-full h-full object-contain p-2" 
                    />
                  </div>

                  {/* Detalhes do Produto */}
                  <div className="flex flex-col flex-grow w-full mt-4 sm:mt-0">
                    <div className="flex justify-between items-start w-full">
                      <h3 className="font-sans text-xl md:text-2xl font-bold uppercase tracking-wide text-oryon-black pr-4">
                        {item.nome}
                      </h3>
                      <span className="font-sans text-sm md:text-base font-bold text-oryon-black whitespace-nowrap">
                        {formatarMoeda(item.precoNum * item.quantidade)}
                      </span>
                    </div>
                    
                    <div className="flex space-x-6 mt-2 mb-6">
                      <span className="font-sans text-[10px] md:text-xs text-oryon-black/50 uppercase tracking-widest">
                        Cor: {item.cor}
                      </span>
                      <span className="font-sans text-[10px] md:text-xs text-oryon-black/50 uppercase tracking-widest">
                        Tam: {item.tamanho}
                      </span>
                    </div>

                    {/* Controles de Quantidade e Lixeira */}
                    <div className="flex items-center space-x-6">
                      <div className="flex items-center border border-oryon-black/20">
                        <button 
                          onClick={() => diminuirQuantidade(item.id)}
                          className="px-3 py-1 font-sans text-sm text-oryon-black/50 hover:text-oryon-black hover:bg-oryon-black/5 transition-colors cursor-pointer"
                        >
                          -
                        </button>
                        <span className="font-sans text-xs font-bold w-6 text-center">{item.quantidade}</span>
                        <button 
                          onClick={() => aumentarQuantidade(item.id)}
                          className="px-3 py-1 font-sans text-sm text-oryon-black/50 hover:text-oryon-black hover:bg-oryon-black/5 transition-colors cursor-pointer"
                        >
                          +
                        </button>
                      </div>

                      {/* Botão com Ícone de Lixeira */}
                      <button 
                        onClick={() => removerItem(item.id)}
                        className="flex items-center space-x-2 font-sans text-[10px] font-bold tracking-[0.2em] uppercase text-oryon-black/40 hover:text-oryon-red transition-colors group/trash cursor-pointer"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                        <span>Remover</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Coluna Direita: Resumo do Pedido */}
            <div className="w-full lg:w-1/3">
              <div className="bg-oryon-black text-oryon-offwhite p-8 md:p-10 flex flex-col sticky top-8">
                <h2 className="font-sans text-xs font-bold tracking-[0.3em] uppercase mb-8 text-oryon-offwhite/50">
                  Resumo do Pedido
                </h2>

                <div className="flex justify-between items-center mb-6 font-sans text-sm">
                  <span className="text-oryon-offwhite/80 uppercase tracking-wider">Subtotal</span>
                  <span className="font-bold">{formatarMoeda(subtotal)}</span>
                </div>
                
                <div className="flex justify-between items-center mb-8 font-sans text-sm border-b border-oryon-offwhite/20 pb-8">
                  <span className="text-oryon-offwhite/80 uppercase tracking-wider">Frete</span>
                  <span className="text-oryon-offwhite/50 text-[10px] uppercase tracking-widest">Calculado na próxima etapa</span>
                </div>

                <div className="flex justify-between items-center mb-12 font-sans text-3xl font-bold uppercase">
                  <span>Total</span>
                  <span className="text-oryon-red">{formatarMoeda(subtotal)}</span>
                </div>

                <button className="w-full group flex items-center justify-center space-x-4 border border-oryon-offwhite py-4 hover:bg-oryon-offwhite hover:text-oryon-black transition-colors duration-300 cursor-pointer">
                  <span className="font-sans text-xs font-bold tracking-[0.2em] uppercase transition-colors">
                    Finalizar Compra
                  </span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </button>

                <Link to="/loja" className="w-full text-center mt-6">
                  <span className="font-sans text-[10px] text-oryon-offwhite/50 hover:text-oryon-offwhite uppercase tracking-widest border-b border-transparent hover:border-oryon-offwhite transition-colors pb-1">
                    Continuar Comprando
                  </span>
                </Link>
              </div>
            </div>

          </div>
        ) : (
          /* Estado Vazio */
          <div className="flex flex-col items-center justify-center py-24 space-y-6">
            <span className="font-sans text-lg uppercase tracking-widest text-oryon-black/60">Sua sacola está vazia.</span>
            <Link to="/loja" className="bg-oryon-black text-oryon-offwhite px-8 py-4 font-sans text-xs font-bold tracking-[0.2em] uppercase hover:bg-oryon-red transition-colors">
              Explorar Coleção
            </Link>
          </div>
        )}

      </div>
    </main>
  );
}