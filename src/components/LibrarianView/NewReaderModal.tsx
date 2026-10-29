import React, { useState } from 'react';
import { X, UserPlus, CheckCircle, ShieldCheck, Award } from 'lucide-react';

interface NewReaderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegister: (data: { name: string; grade: string }) => void;
}

export const NewReaderModal: React.FC<NewReaderModalProps> = ({
  isOpen,
  onClose,
  onRegister,
}) => {
  const [name, setName] = useState('');
  const [grade, setGrade] = useState('6º Ano A');
  const [customGrade, setCustomGrade] = useState('');
  const [isCustomGrade, setIsCustomGrade] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const finalGrade = isCustomGrade ? customGrade.trim() || 'Turma Geral' : grade;
    onRegister({
      name: name.trim(),
      grade: finalGrade,
    });

    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setName('');
      setGrade('6º Ano A');
      setIsCustomGrade(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1c1712]/50 backdrop-blur-xs animate-fade-in">
      <div className="relative w-full max-w-md bg-[#fcf8ef] border border-[#d4c9b2] shadow-[0_4px_28px_rgba(28,23,18,0.18)] p-6 sm:p-7">
        
        {/* Moldura dupla clássica Ex-Libris */}
        <div className="absolute inset-2 border border-[#d4c9b2] pointer-events-none" />

        {/* Faixa superior tricolor */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#b89155] via-[#556b2f] to-[#b89155]" />

        {/* Botão fechar */}
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 z-20 text-[#877b69] hover:text-[#a8563c] transition-colors cursor-pointer"
          title="Fechar"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Cabeçalho */}
        <div className="relative z-10 text-center pb-4 border-b border-[#d4c9b2] mb-5">
          <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-[#ede6d6] border border-[#b89155] grid place-items-center text-[#556b2f] shadow-[inset_0_0_0_3px_#fcf8ef]">
            <UserPlus className="w-5 h-5" />
          </div>
          <span className="font-sans-custom text-[9px] tracking-[0.35em] uppercase text-[#8f6f3e] block mb-0.5">
            Ficha de Matrícula · Ex Libris
          </span>
          <h2 className="font-serif-vintage text-xl font-normal text-[#1c1712]">
            Cadastrar Novo Leitor
          </h2>
          <p className="font-serif-vintage italic text-xs text-[#877b69] mt-0.5">
            Inscreva um novo aluno no acervo do Colégio Unidade Polo
          </p>
        </div>

        {isSuccess ? (
          <div className="relative z-10 py-8 text-center space-y-2 animate-fade-in">
            <CheckCircle className="w-10 h-10 text-[#556b2f] mx-auto" />
            <h3 className="font-serif-vintage text-lg text-[#1c1712]">
              Leitor(a) Cadastrado(a) com Sucesso!
            </h3>
            <p className="font-serif-vintage italic text-xs text-[#877b69]">
              Ficha emitida com 100 pontos e selo Leitor Iniciante.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="relative z-10 space-y-4">
            
            {/* Nome Completo */}
            <div>
              <label className="block font-serif-vintage text-xs text-[#1c1712] mb-1">
                Nome Completo do Leitor / Aluno: <span className="text-[#a8563c]">*</span>
              </label>
              <input
                type="text"
                required
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Gabriel Mendonça Alves"
                className="w-full px-3 py-2 bg-[#f6f1e8] border border-[#d4c9b2] text-xs text-[#1c1712] placeholder-[#877b69] focus:outline-none focus:border-[#556b2f] shadow-[inset_0_1px_2px_rgba(0,0,0,0.05)]"
              />
            </div>

            {/* Turma / Ano Letivo */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="font-serif-vintage text-xs text-[#1c1712]">
                  Turma / Série:
                </label>
                <button
                  type="button"
                  onClick={() => setIsCustomGrade(!isCustomGrade)}
                  className="text-[10px] text-[#556b2f] hover:underline cursor-pointer font-serif-vintage italic"
                >
                  {isCustomGrade ? 'Escolher da lista' : '+ Outra turma/cargo'}
                </button>
              </div>

              {isCustomGrade ? (
                <input
                  type="text"
                  required
                  value={customGrade}
                  onChange={(e) => setCustomGrade(e.target.value)}
                  placeholder="Ex: 3º Ano EM B ou Professores"
                  className="w-full px-3 py-2 bg-[#f6f1e8] border border-[#d4c9b2] text-xs text-[#1c1712] placeholder-[#877b69] focus:outline-none focus:border-[#556b2f]"
                />
              ) : (
                <select
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  className="w-full px-3 py-2 bg-[#f6f1e8] border border-[#d4c9b2] text-xs text-[#1c1712] focus:outline-none focus:border-[#556b2f]"
                >
                  <optgroup label="Ensino Fundamental II">
                    <option value="6º Ano A">6º Ano A</option>
                    <option value="6º Ano B">6º Ano B</option>
                    <option value="6º Ano C">6º Ano C</option>
                    <option value="7º Ano A">7º Ano A</option>
                    <option value="7º Ano B">7º Ano B</option>
                    <option value="8º Ano A">8º Ano A</option>
                    <option value="8º Ano B">8º Ano B</option>
                    <option value="9º Ano A">9º Ano A</option>
                    <option value="9º Ano B">9º Ano B</option>
                  </optgroup>
                  <optgroup label="Ensino Médio">
                    <option value="1º Ano EM">1º Ano Ensino Médio</option>
                    <option value="2º Ano EM">2º Ano Ensino Médio</option>
                    <option value="3º Ano EM">3º Ano Ensino Médio</option>
                  </optgroup>
                  <optgroup label="Corpo Docente & Outros">
                    <option value="Professores">Corpo Docente / Professores</option>
                    <option value="Comunidade Escolar">Comunidade Escolar / Funcionários</option>
                  </optgroup>
                </select>
              )}
            </div>

            {/* Benefícios Iniciais & Gamificação Integrada */}
            <div className="p-3 bg-[#edf3e4] border border-[#c2d2b0] space-y-2">
              <div className="flex items-center gap-2 text-xs font-serif-vintage text-[#556b2f] font-semibold">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>Pontos Iniciais: 100 de Responsabilidade</span>
              </div>
              <p className="text-[11px] font-serif-vintage text-[#4a3f33] leading-relaxed">
                Cada leitor começa com pontuação máxima para retirar livros no balcão imediatamente. Devoluções no prazo mantêm ou restauram a pontuação.
              </p>
              <div className="flex items-center gap-1.5 text-[10px] text-[#556b2f] pt-1 border-t border-[#c2d2b0]/60">
                <Award className="w-3.5 h-3.5 shrink-0" />
                <span>Selo automático: <strong>Leitor Iniciante</strong></span>
              </div>
            </div>

            {/* Botões de Ação */}
            <div className="pt-2 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={onClose}
                className="px-3.5 py-2 text-xs font-serif-vintage text-[#877b69] hover:text-[#1c1712] transition-colors cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-[#556b2f] hover:bg-[#3c4d1f] text-[#fcf8ef] font-serif-vintage text-xs tracking-wider uppercase transition-colors shadow-xs cursor-pointer flex items-center gap-1.5"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Emitir Ficha de Leitor</span>
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
