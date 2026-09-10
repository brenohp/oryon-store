import { Link } from "react-router-dom";

// ==========================================
// MOCK DATA: Seção de Qualidade (Pronto para API)
// ==========================================
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

// Dicionário de Ícones Dinâmicos
const renderIcone = (tipo: string) => {
  const iconClass = "w-6 h-6 text-oryon-red flex-shrink-0";
  switch (tipo) {
    case "tecido":
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c-1.5 0-2.8.8-3.5 2L3 7v5l3-1v10h12V11l3 1V7l-5.5-2c-.7-1.2-2-2-3.5-2z" />
        </svg>
      );
    case "gramatura":
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.97zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.97z" />
        </svg>
      );
    case "modelagem":
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <g transform="rotate(45 12 12)">
            <rect x="3" y="8" width="18" height="8" rx="2" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 8v2.5M12 8v3.5M17 8v2.5" />
          </g>
        </svg>
      );
    case "fio":
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <circle cx="6" cy="6" r="3" />
          <circle cx="6" cy="18" r="3" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M20 4L8.12 15.88M14.48 14.48L20 20M8.12 8.12L12 12" />
        </svg>
      );
    case "composicao":
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
        </svg>
      );
    case "acabamento":
    default:
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
  }
};

export default function Home() {
  return (
    <>
      {/* SEÇÃO 1: HERO */}
      <main className="relative min-h-[calc(100vh-100px)] w-full flex items-center justify-center bg-oryon-offwhite px-6 md:px-12 py-12">
        <div className="w-full max-w-[1400px] grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-center pb-20 md:pb-0">
          
          <div className="flex flex-col items-center md:items-start justify-center order-2 md:order-1 mt-10 md:mt-0">
            <h1 className="animate-fade-up font-[family-name:var(--font-playfair)] text-[90px] md:text-[140px] lg:text-[170px] xl:text-[190px] font-normal leading-[0.95] tracking-tight text-center md:text-left uppercase text-oryon-black flex flex-col items-center md:items-start">
              <span>Seja</span>
              <span className="text-oryon-red">Real</span>
            </h1>

            <p className="animate-fade-up delay-100 font-sans text-base md:text-lg font-medium text-oryon-black mt-4 md:mt-6 tracking-wide text-center md:text-left">
              O que é real para você?
            </p>
            
            <Link to="/loja" className="animate-fade-up delay-200 group mt-10 md:mt-12 flex items-center justify-between border-b border-oryon-black pb-2 w-[240px] hover:border-oryon-red transition-all duration-300">
              <span className="font-sans text-xs font-bold tracking-[0.15em] text-oryon-black group-hover:text-oryon-red transition-colors uppercase">
                Explorar Coleção
              </span>
              <span className="text-oryon-black group-hover:text-oryon-red group-hover:translate-x-2 transition-all text-sm">
                →
              </span>
            </Link>
          </div>

          <div className="flex justify-center md:justify-end items-center order-1 md:order-2">
            <div className="animate-fade-up delay-500 relative w-full max-w-[500px] lg:max-w-[800px] xl:max-w-[1000px] aspect-[4/3] flex flex-col items-center justify-center md:scale-125 lg:scale-[1.45] xl:scale-[1.55] md:translate-x-6 lg:translate-x-10 -translate-y-6 md:-translate-y-8 lg:-translate-y-12">
              <div className="relative w-full h-full z-10">
                <img 
                  src="/logo_oryon_3d_frente_sem_fundo.png" 
                  alt="Elemento 3D Oryøn" 
                  className="w-full h-full object-contain [image-rendering:-webkit-optimize-contrast]" 
                />
              </div>
              <div className="absolute bottom-[26%] left-1/2 -translate-x-1/2 w-[65%] h-[1px] lg:h-[4px] bg-oryon-black/70 blur-[8px] lg:blur-[10px] rounded-[100%] z-0"></div>
              <div className="absolute bottom-[5%] left-1/2 -translate-x-1/2 w-[5%] h-[25px] lg:h-[10px] bg-oryon-black/40 blur-[24px] lg:blur-[32px] rounded-[100%] z-0"></div>
            </div>
          </div>
        </div>

        {/* BARRA INFERIOR */}
        <div className="absolute bottom-6 md:bottom-8 left-0 w-full px-6 md:px-12 flex justify-between items-center">
          <span className="font-sans text-[9px] md:text-[10px] font-bold tracking-[0.2em] uppercase text-oryon-black w-1/3">
            Oryon Collective
          </span>
          <div className="flex items-center justify-center w-1/3">
            <a href="#qualidade" className="animate-bounce flex items-center justify-center p-2 cursor-pointer text-oryon-black/60 hover:text-oryon-black transition-colors">
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

     {/* SEÇÃO 2: QUALIDADE TÉCNICA (AGORA TOTALMENTE DINÂMICA) */}
      <section id="qualidade" className="w-full min-h-[calc(100vh-70px)] bg-oryon-black px-6 md:px-12 py-20 lg:py-28 flex items-center justify-center scroll-smooth">
        <div className="w-full max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 lg:gap-24 items-center">
          
          <div className="w-full flex justify-center lg:justify-start xl:justify-center">
            <div className="animate-fade-up w-full max-w-[400px] xl:max-w-[450px] aspect-square bg-oryon-offwhite border border-oryon-offwhite/10 relative overflow-hidden group flex items-center justify-center">
              <img 
                src={mockQualidadeDestaque.imagem} 
                alt={mockQualidadeDestaque.alt} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
              />
            </div>
          </div>

          <div className="flex flex-col">
            <h2 className="animate-fade-up font-sans text-5xl md:text-7xl font-bold uppercase tracking-tight text-oryon-offwhite leading-none mb-10 md:mb-12">
              {mockQualidadeDestaque.tituloLinha1} <br />
              <span className="text-oryon-red">{mockQualidadeDestaque.tituloDestaque}</span>
            </h2>
            
            <div className="animate-fade-up delay-200 grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-8 border-t border-oryon-offwhite/20 pt-8">
              
              {/* MAPEAMENTO DOS DADOS MOCKADOS AQUI */}
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