import { Link } from "react-router-dom";
import { useState } from "react";

export default function Cadastro() {
  const [cpf, setCpf] = useState("");
  const [cep, setCep] = useState("");

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 11) value = value.slice(0, 11);
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    setCpf(value);
  };

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 8) value = value.slice(0, 8);
    value = value.replace(/(\d{5})(\d)/, "$1-$2");
    setCep(value);
  };

  // TODO: [BACKEND] Capturar dados do form e enviar para endpoint de registro de usuário
  const handleCadastro = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <main className="min-h-[calc(100vh-100px)] w-full bg-oryon-offwhite px-6 md:px-12 py-12 md:py-24 flex items-center justify-center">
      <div className="w-full max-w-[1200px] grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
        
        <div className="flex flex-col order-2 md:order-1">
          <h1 className="animate-fade-up font-sans text-6xl md:text-8xl font-bold uppercase tracking-tight text-oryon-black leading-none mb-4">
            Novo <br/>
            <span className="text-oryon-red">Acesso</span>
          </h1>
          
          <p className="animate-fade-up delay-100 font-sans text-xs md:text-sm text-oryon-black/60 tracking-wide uppercase mb-10">
            Seja real e tenha acesso a drops exclusivos.
          </p>

          <form className="animate-fade-up delay-200 flex flex-col space-y-8" onSubmit={handleCadastro}>
            
            <div className="flex flex-col relative group">
              <label htmlFor="nome" className="font-sans text-[10px] font-bold tracking-[0.2em] uppercase text-oryon-black/50 mb-2 transition-colors group-focus-within:text-oryon-red">
                Nome Completo
              </label>
              <input id="nome" type="text" required className="bg-transparent border-b border-oryon-black/30 pb-2 font-sans text-sm text-oryon-black focus:outline-none focus:border-oryon-red transition-colors" placeholder="Seu nome completo" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col relative group">
                <label htmlFor="cpf" className="font-sans text-[10px] font-bold tracking-[0.2em] uppercase text-oryon-black/50 mb-2 transition-colors group-focus-within:text-oryon-red">
                  CPF
                </label>
                <input id="cpf" type="text" required value={cpf} onChange={handleCpfChange} className="bg-transparent border-b border-oryon-black/30 pb-2 font-sans text-sm text-oryon-black focus:outline-none focus:border-oryon-red transition-colors" placeholder="000.000.000-00" />
              </div>

              <div className="flex flex-col relative group">
                <label htmlFor="cep" className="font-sans text-[10px] font-bold tracking-[0.2em] uppercase text-oryon-black/50 mb-2 transition-colors group-focus-within:text-oryon-red">
                  CEP
                </label>
                <input id="cep" type="text" required value={cep} onChange={handleCepChange} className="bg-transparent border-b border-oryon-black/30 pb-2 font-sans text-sm text-oryon-black focus:outline-none focus:border-oryon-red transition-colors" placeholder="00000-000" />
              </div>
            </div>

            <div className="flex flex-col relative group">
              <label htmlFor="email" className="font-sans text-[10px] font-bold tracking-[0.2em] uppercase text-oryon-black/50 mb-2 transition-colors group-focus-within:text-oryon-red">
                E-mail
              </label>
              <input id="email" type="email" required className="bg-transparent border-b border-oryon-black/30 pb-2 font-sans text-sm text-oryon-black focus:outline-none focus:border-oryon-red transition-colors" placeholder="seu@email.com" />
            </div>

            <div className="flex flex-col relative group">
              <label htmlFor="senha" className="font-sans text-[10px] font-bold tracking-[0.2em] uppercase text-oryon-black/50 mb-2 transition-colors group-focus-within:text-oryon-red">
                Senha
              </label>
              <input id="senha" type="password" required minLength={6} className="bg-transparent border-b border-oryon-black/30 pb-2 font-sans text-sm text-oryon-black focus:outline-none focus:border-oryon-red tracking-widest transition-colors" placeholder="••••••••" />
            </div>

            <button type="submit" className="w-full mt-4 group flex items-center justify-center space-x-4 bg-oryon-black text-oryon-offwhite py-4 hover:bg-oryon-red transition-colors duration-300 cursor-pointer">
              <span className="font-sans text-xs font-bold tracking-[0.2em] uppercase transition-colors">
                Criar Conta
              </span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </form>

          <div className="animate-fade-up delay-300 mt-8 flex justify-center">
            <Link to="/login" className="font-sans text-[10px] text-oryon-black/50 hover:text-oryon-black uppercase tracking-widest border-b border-transparent hover:border-oryon-black transition-colors pb-1">
              Já possui conta? Faça Login
            </Link>
          </div>
        </div>

        <div className="hidden md:flex animate-fade-up delay-500 justify-center items-center order-1 md:order-2 mb-12 md:mb-0">
          <div className="relative w-full max-w-[400px] aspect-square opacity-90 mix-blend-multiply md:mix-blend-normal">
            <img src="/logo_oryon_3d_lateral_sem_fundo.png" alt="Oryøn 3D" className="w-full h-full object-contain drop-shadow-2xl" />
          </div>
        </div>

      </div>
    </main>
  );
}