import { Link } from "react-router-dom";
import { useRef } from "react";

// TODO: [BACKEND] Endpoint sugerido: GET /api/home/qualidade-destaque
// Permitir que o admin gerencie qual produto e quais especificações aparecem na dobra de qualidade.
const mockQualidadeDestaque = {
  imagem: "/blusa-marrom.jpg",
  alt: "Camiseta Oversized Marrom - Oryøn",
  tituloLinha1: "Qualidade que",
  tituloDestaque: "você sente.",
  linkUrl: "/loja",
  linkTexto: "Conhecer a Peça",
  especificacoes: [
    { id: "1", tipoIcone: "tecido", titulo: "Tecido", valor: "Soft Cotton" },
    { id: "2", tipoIcone: "gramatura", titulo: "Gramatura", valor: "200 g/m²" },
    { id: "3", tipoIcone: "modelagem", titulo: "Modelagem", valor: "Oversized Fit" },
    { id: "4", tipoIcone: "fio", titulo: "Fio", valor: "30.1 Penteado" },
    { id: "5", tipoIcone: "composicao", titulo: "Composição", valor: "97% Algodão, 3% Elastano" },
    { id: "6", tipoIcone: "acabamento", titulo: "Acabamento", valor: "Gola Canelada" },
  ]
};

// TODO: [BACKEND] Endpoint sugerido: GET /api/home/produtos-destaque
const mockProdutosDestaque = [
  { id: "1", nome: "Camiseta Oversized Soft Cotton", cor: "Off White", preco: "R$ 149,90", img: "/blusa-offwhite.jpg" },
  { id: "2", nome: "Camiseta Oversized Soft Cotton", cor: "Marrom", preco: "R$ 149,90", img: "/blusa-marrom.jpg" },
  { id: "3", nome: "Camiseta Oversized Soft Cotton", cor: "Preta", preco: "R$ 149,90", img: "/blusa-preta.jpg" },
];

// TODO: [BACKEND] Este array multiplica os itens para simular o efeito de loop infinito no carrossel de UI.
// Quando integrar a API real, avalie manter esta lógica de preenchimento caso a loja tenha poucos produtos cadastrados.
const produtosRotativos = [
  ...mockProdutosDestaque, 
  ...mockProdutosDestaque, 
  ...mockProdutosDestaque, 
  ...mockProdutosDestaque
];

const renderIcone = (tipo: string) => {
  const iconClass = "w-6 h-6 text-oryon-red flex-shrink-0";
  switch (tipo) {
    case "tecido": return <svg className={iconClass} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3c-1.5 0-2.8.8-3.5 2L3 7v5l3-1v10h12V11l3 1V7l-5.5-2c-.7-1.2-2-2-3.5-2z" /></svg>;
    case "gramatura": return <svg className={iconClass} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.97zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.97z" /></svg>;
    case "modelagem": return <svg className={iconClass} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><g transform="rotate(45 12 12)"><rect x="3" y="8" width="18" height="8" rx="2" /><path strokeLinecap="round" strokeLinejoin="round" d="M7 8v2.5M12 8v3.5M17 8v2.5" /></g></svg>;
    case "fio": return <svg className={iconClass} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><circle cx="6" cy="6" r="3" /><circle cx="6" cy="18" r="3" /><path strokeLinecap="round" strokeLinejoin="round" d="M20 4L8.12 15.88M14.48 14.48L20 20M8.12 8.12L12 12" /></svg>;
    case "composicao": return <svg className={iconClass} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" /><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" /></svg>;
    case "acabamento":
    default: return <svg className={iconClass} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
  }
};

export default function Home() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollCarrossel = (direcao: "esquerda" | "direita") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth, scrollWidth } = scrollRef.current;
      const deslocamento = 280; 
      let novoScroll = direcao === "esquerda" ? scrollLeft - deslocamento : scrollLeft + deslocamento;

      if (direcao === "direita" && scrollLeft >= scrollWidth - clientWidth - 10) {
        novoScroll = 0;
      } 
      else if (direcao === "esquerda" && scrollLeft <= 10) {
        novoScroll = scrollWidth;
      }

      scrollRef.current.scrollTo({
        left: novoScroll,
        behavior: "smooth"
      });
    }
  };

  return (
    <>
      <main className="relative min-h-[calc(100vh-80px)] md:min-h-[calc(100vh-100px)] w-full flex items-center justify-center bg-oryon-offwhite px-6 md:px-12 pt-0 pb-16 md:py-12">
        <div className="w-full max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-8 items-center -mt-12 md:mt-0">
          
          <div className="flex flex-col items-center md:items-start justify-center order-2 md:order-1">
            <h1 className="animate-fade-up font-[family-name:var(--font-playfair)] text-[90px] md:text-[140px] lg:text-[170px] xl:text-[190px] font-normal leading-[0.9] md:leading-[0.95] tracking-tight text-center md:text-left uppercase text-oryon-black flex flex-col items-center md:items-start">
              <span>Seja</span>
              <span className="text-oryon-red">Real</span>
            </h1>

            <p className="animate-fade-up delay-100 font-sans text-base md:text-lg font-medium text-oryon-black mt-2 md:mt-6 tracking-wide text-center md:text-left">
              O que é real para você?
            </p>
            
            <Link to="/loja" className="animate-fade-up delay-200 group mt-6 md:mt-12 flex items-center justify-between border-b border-oryon-black pb-2 w-[240px] hover:border-oryon-red transition-all duration-300">
              <span className="font-sans text-xs font-bold tracking-[0.15em] text-oryon-black group-hover:text-oryon-red transition-colors uppercase">
                Explorar Coleção
              </span>
              <span className="text-oryon-black group-hover:text-oryon-red group-hover:translate-x-2 transition-all text-sm">
                →
              </span>
            </Link>
          </div>

          <div className="flex justify-center md:justify-end items-center order-1 md:order-2">
            <div className="animate-fade-up delay-500 relative w-full max-w-[340px] md:max-w-[500px] lg:max-w-[800px] xl:max-w-[1000px] aspect-[4/3] flex flex-col items-center justify-center md:scale-125 lg:scale-[1.45] xl:scale-[1.55] md:translate-x-6 lg:translate-x-10 md:-translate-y-8 lg:-translate-y-12">
              <div className="relative w-full h-full z-10">
                <img src="/logo_oryon_3d_frente_sem_fundo.png" alt="Elemento 3D Oryøn" className="w-full h-full object-contain [image-rendering:-webkit-optimize-contrast]" />
              </div>
              <div className="absolute bottom-[20%] md:bottom-[26%] left-1/2 -translate-x-1/2 w-[65%] h-[2px] md:h-[4px] bg-oryon-black/35 md:bg-oryon-black/70 blur-[6px] md:blur-[10px] rounded-[100%] z-0"></div>
              <div className="absolute bottom-[4%] left-1/2 -translate-x-1/2 w-[35%] md:w-[5%] h-[15px] md:h-[10px] bg-oryon-black/20 md:bg-oryon-black/40 blur-[14px] md:blur-[32px] rounded-[100%] z-0"></div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 md:bottom-8 left-0 w-full px-6 md:px-12 flex justify-between items-center">
          <span className="font-sans text-[9px] md:text-[10px] font-bold tracking-[0.2em] uppercase text-oryon-black w-1/3">
            Oryon Collective
          </span>
          <div className="flex items-center justify-center w-1/3">
            <a href="#destaques" className="animate-bounce flex items-center justify-center p-1 md:p-2 cursor-pointer text-oryon-black/60 hover:text-oryon-black transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </a>
          </div>
          <div className="flex items-center justify-end space-x-3 w-1/3">
            <span className="hidden md:inline font-sans text-xs font-medium lowercase text-oryon-black/70 tracking-normal">
              @oryoncollective
            </span>
            <a href="https://instagram.com/oryoncollective" target="_blank" rel="noopener noreferrer" className="font-sans text-[9px] md:text-[10px] font-bold tracking-[0.15em] uppercase text-oryon-black hover:text-oryon-red transition-colors flex items-center space-x-1.5 group">
              <span>Instagram</span>
              <svg className="w-3 h-3 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            </a>
          </div>
        </div>
      </main>

      <section id="destaques" className="w-full bg-oryon-offwhite px-6 md:px-12 py-16 md:py-24 overflow-hidden border-t border-oryon-black/5 scroll-smooth">
        <div className="w-full max-w-[1400px] mx-auto">
          
          <div className="flex justify-between items-end mb-10 md:mb-12">
            <div>
              <span className="font-sans text-[9px] md:text-[10px] font-bold tracking-[0.25em] uppercase text-oryon-black/50 block mb-2">
                Drop Atual
              </span>
              <h2 className="font-sans text-3xl md:text-5xl font-bold uppercase tracking-tight text-oryon-black">
                Destaques da <span className="text-oryon-red">Coleção</span>
              </h2>
            </div>

            <div className="hidden md:flex items-center space-x-3">
              <button onClick={() => scrollCarrossel("esquerda")} className="w-10 h-10 border border-oryon-black/20 flex items-center justify-center hover:bg-oryon-black hover:text-oryon-offwhite transition-colors cursor-pointer" aria-label="Anterior">←</button>
              <button onClick={() => scrollCarrossel("direita")} className="w-10 h-10 border border-oryon-black/20 flex items-center justify-center hover:bg-oryon-black hover:text-oryon-offwhite transition-colors cursor-pointer" aria-label="Próximo">→</button>
            </div>
          </div>

          <div ref={scrollRef} className="flex space-x-4 md:space-x-6 overflow-x-auto scrollbar-none pb-6 snap-x snap-mandatory" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {produtosRotativos.map((produto, index) => (
              <div key={index} className="w-[200px] sm:w-[220px] md:w-[240px] lg:w-[260px] flex-shrink-0 flex flex-col snap-start group">
                <Link to={`/loja/${produto.id}`} className="relative w-full aspect-[4/5] bg-white/60 border border-oryon-black/10 overflow-hidden mb-4 flex items-center justify-center">
                  <img src={produto.img} alt={produto.nome} className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500 ease-out" />
                  <div className="absolute top-3 right-3 bg-oryon-black text-oryon-offwhite font-sans text-[8px] md:text-[9px] font-bold uppercase tracking-widest px-2 md:px-3 py-1">
                    Novo
                  </div>
                </Link>

                <div className="flex flex-col items-start">
                  <div className="w-full flex justify-between items-start gap-2">
                    <h3 className="font-sans text-xs md:text-sm font-bold uppercase tracking-wide leading-tight">
                      <Link to={`/loja/${produto.id}`} className="text-oryon-black hover:text-oryon-red transition-colors">
                        {produto.nome}
                      </Link>
                    </h3>
                    <span className="font-sans text-xs md:text-sm font-bold text-oryon-black whitespace-nowrap">
                      {produto.preco}
                    </span>
                  </div>
                  <span className="font-sans text-[9px] md:text-[10px] text-oryon-black/50 uppercase tracking-widest block mt-1">
                    Cor: {produto.cor}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex justify-center md:hidden">
            <Link to="/loja" className="w-full text-center border border-oryon-black text-oryon-black py-3 font-sans text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-oryon-black hover:text-oryon-offwhite transition-colors">
              Ver Todos os Produtos →
            </Link>
          </div>

        </div>
      </section>

      <section id="qualidade" className="w-full min-h-[calc(100vh-70px)] bg-oryon-black px-6 md:px-12 py-20 lg:py-28 flex items-center justify-center scroll-smooth">
        <div className="w-full max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 lg:gap-24 items-center">
          
          <div className="w-full flex justify-center lg:justify-start xl:justify-center">
            <div className="animate-fade-up w-full max-w-[400px] xl:max-w-[450px] aspect-square bg-oryon-offwhite border border-oryon-offwhite/10 relative overflow-hidden group flex items-center justify-center">
              <img src={mockQualidadeDestaque.imagem} alt={mockQualidadeDestaque.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
            </div>
          </div>

          <div className="flex flex-col">
            <h2 className="animate-fade-up font-sans text-5xl md:text-7xl font-bold uppercase tracking-tight text-oryon-offwhite leading-none mb-10 md:mb-12">
              {mockQualidadeDestaque.tituloLinha1} <br />
              <span className="text-oryon-red">{mockQualidadeDestaque.tituloDestaque}</span>
            </h2>
            
            <div className="animate-fade-up delay-200 grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-8 border-t border-oryon-offwhite/20 pt-8">
              {mockQualidadeDestaque.especificacoes.map((espec) => (
                <div key={espec.id} className="flex items-start space-x-4">
                  {renderIcone(espec.tipoIcone)}
                  <div>
                    <span className="block font-sans text-[10px] font-bold tracking-[0.2em] text-oryon-offwhite/50 uppercase mb-1">
                      {espec.titulo}
                    </span>
                    <span className="block font-sans text-sm md:text-base font-semibold text-oryon-offwhite tracking-wide">
                      {espec.valor}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <Link to={mockQualidadeDestaque.linkUrl} className="animate-fade-up delay-300 mt-10 group flex items-center space-x-3 w-fit border-b border-oryon-offwhite/30 hover:border-oryon-red pb-1 transition-colors">
              <span className="font-sans text-[10px] font-bold tracking-[0.2em] uppercase text-oryon-offwhite group-hover:text-oryon-red transition-colors">
                {mockQualidadeDestaque.linkTexto}
              </span>
              <span className="text-oryon-offwhite group-hover:text-oryon-red group-hover:translate-x-1 transition-all">↗</span>
            </Link>

          </div>
        </div>
      </section>
    </>
  );
}