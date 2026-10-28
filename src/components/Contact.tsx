import React, { useState, useEffect } from 'react';
import {
  Send,
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle,
  AlertCircle,
  Copy,
  ExternalLink,
  Instagram,
  Facebook,
  Youtube
} from 'lucide-react';
import { useSiteConfig } from '../context/SiteConfigContext';

export const Contact: React.FC = () => {
  const { config, getWhatsAppUrl, selectedServiceForQuote, setSelectedServiceForQuote } = useSiteConfig();

  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [serviceType, setServiceType] = useState('Manutenção preventiva');
  const [propertyType, setPropertyType] = useState('Residencial');
  const [description, setDescription] = useState('');
  const [privacyAgreed, setPrivacyAgreed] = useState(true);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedSummary, setCopiedSummary] = useState(false);

  useEffect(() => {
    if (selectedServiceForQuote) {
      setServiceType(selectedServiceForQuote);
    }
  }, [selectedServiceForQuote]);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!fullName.trim() || fullName.trim().length < 3) {
      newErrors.fullName = 'Por favor, informe seu nome completo (ao menos 3 caracteres).';
    }

    const cleanPhone = phoneNumber.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      newErrors.phoneNumber = 'Informe um número de telefone com DDD válido (ao menos 10 dígitos).';
    }

    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = 'Informe um endereço de e-mail válido.';
    }

    if (!description.trim() || description.trim().length < 10) {
      newErrors.description = 'Descreva brevemente a necessidade ou condição do aparelho (ao menos 10 caracteres).';
    }

    if (!privacyAgreed) {
      newErrors.privacy = 'É necessário concordar com a política de privacidade para prosseguir.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitted(true);
  };

  const getFormattedSummaryText = () => {
    return `*Solicitação de Orçamento - DG Climatização*\n\n` +
      `• *Nome:* ${fullName}\n` +
      `• *Telefone:* ${phoneNumber}\n` +
      (email ? `• *E-mail:* ${email}\n` : '') +
      `• *Serviço de interesse:* ${serviceType}\n` +
      `• *Tipo de imóvel:* ${propertyType}\n` +
      `• *Descrição da necessidade:* ${description}\n\n` +
      `_Enviado através do site institucional da DG Climatização._`;
  };

  const handleCopySummary = () => {
    navigator.clipboard.writeText(getFormattedSummaryText());
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2500);
  };

  const handleSendViaWhatsApp = () => {
    const text = getFormattedSummaryText();
    const url = getWhatsAppUrl(text);
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleResetForm = () => {
    setFullName('');
    setPhoneNumber('');
    setEmail('');
    setDescription('');
    setIsSubmitted(false);
    setSelectedServiceForQuote('');
  };

  const whatsappDirectUrl = getWhatsAppUrl();

  return (
    <section id="contato" className="py-24 bg-[#101820] relative overflow-hidden border-t border-slate-800">
      {/* Luz ambiente sutil */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-[#FFC928]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Cabeçalho da Seção */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#FFC928] mb-3">
            <span>Fale Conosco</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-slate-400">Atendimento Personalizado</span>
          </div>

          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight mb-4"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            SOLICITE SEU ORÇAMENTO
          </h2>

          <p className="text-base text-slate-300 leading-relaxed">
            Preencha os dados abaixo com as informações do seu ar-condicionado.
            Nossa equipe técnica analisará sua necessidade para orientar o procedimento adequado.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Formulário de Orçamento (7 colunas) */}
          <div className="lg:col-span-7 bg-[#080D12] border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl">
            
            {isSubmitted ? (
              <div className="py-8 text-center space-y-6">
                <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
                  <CheckCircle className="w-8 h-8" />
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Solicitação Registrada com Sucesso!
                  </h3>
                  <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                    Obrigado por entrar em contato com a DG Climatização, <strong className="text-white">{fullName}</strong>.
                  </p>
                </div>

                {/* Resumo Formatado do Pedido */}
                <div className="bg-[#101820] border border-slate-800 rounded-2xl p-5 text-left text-xs text-slate-300 space-y-2 max-w-lg mx-auto">
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-slate-500">Serviço:</span>
                    <span className="font-semibold text-white">{serviceType}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-slate-500">Imóvel:</span>
                    <span className="text-white">{propertyType}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-slate-500">Contato:</span>
                    <span className="text-white">{phoneNumber}</span>
                  </div>
                  <div className="pt-1">
                    <span className="text-slate-500 block mb-1">Descrição:</span>
                    <p className="text-slate-300 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                      {description}
                    </p>
                  </div>
                </div>

                {/* Opções de Transmissão */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleSendViaWhatsApp}
                    className="w-full sm:w-auto px-5 py-3 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Prosseguir no WhatsApp com esses dados</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleCopySummary}
                    className="w-full sm:w-auto px-4 py-3 text-xs font-semibold text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copiedSummary ? 'Copiado!' : 'Copiar Resumo'}</span>
                  </button>
                </div>

                <div className="pt-4 border-t border-slate-800/80">
                  <button
                    type="button"
                    onClick={handleResetForm}
                    className="text-xs text-slate-400 hover:text-[#FFC928] underline underline-offset-4"
                  >
                    Enviar outra solicitação
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                
                {/* Nome Completo */}
                <div>
                  <label htmlFor="fullName" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                    Nome Completo <span className="text-[#FFC928]">*</span>
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Seu nome ou nome da empresa"
                    className={`w-full px-4 py-3 bg-[#101820] border rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#FFC928] transition-colors ${
                      errors.fullName ? 'border-red-500' : 'border-slate-800 hover:border-slate-700'
                    }`}
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.fullName}</span>
                    </p>
                  )}
                </div>

                {/* Grid Telefone e E-mail */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phoneNumber" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                      Telefone / WhatsApp <span className="text-[#FFC928]">*</span>
                    </label>
                    <input
                      id="phoneNumber"
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="(DDD) 90000-0000"
                      className={`w-full px-4 py-3 bg-[#101820] border rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#FFC928] transition-colors ${
                        errors.phoneNumber ? 'border-red-500' : 'border-slate-800 hover:border-slate-700'
                      }`}
                    />
                    {errors.phoneNumber && (
                      <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.phoneNumber}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                      E-mail <span className="text-slate-500 font-normal lowercase">(opcional)</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="seuemail@exemplo.com"
                      className={`w-full px-4 py-3 bg-[#101820] border rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#FFC928] transition-colors ${
                        errors.email ? 'border-red-500' : 'border-slate-800 hover:border-slate-700'
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Seleção de Serviço */}
                <div>
                  <label htmlFor="serviceType" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                    Tipo de Serviço Desejado <span className="text-[#FFC928]">*</span>
                  </label>
                  <select
                    id="serviceType"
                    value={serviceType}
                    onChange={(e) => setServiceType(e.target.value)}
                    className="w-full px-4 py-3 bg-[#101820] border border-slate-800 hover:border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#FFC928]"
                  >
                    {config.services.map((s) => (
                      <option key={s.id} value={s.title}>
                        {s.title}
                      </option>
                    ))}
                    <option value="Outro / Preciso de avaliação técnica">Outro / Preciso de avaliação técnica</option>
                  </select>
                </div>

                {/* Tipo de Imóvel */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                    Tipo de Imóvel
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['Residencial', 'Comercial', 'Consultório / Escritório'].map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setPropertyType(type)}
                        className={`py-2 px-2 text-xs font-medium rounded-lg border transition-all text-center truncate ${
                          propertyType === type
                            ? 'bg-[#FFC928]/15 border-[#FFC928] text-[#FFC928]'
                            : 'bg-[#101820] border-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Descrição da Necessidade */}
                <div>
                  <label htmlFor="description" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                    Descrição da Necessidade / Modelo do Aparelho <span className="text-[#FFC928]">*</span>
                  </label>
                  <textarea
                    id="description"
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Ex: Ar-condicionado split 12.000 BTUs há 1 ano sem limpeza. Está com cheiro de mofo ao ligar e pingando algumas gotas na sala."
                    className={`w-full px-4 py-3 bg-[#101820] border rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#FFC928] transition-colors resize-none ${
                      errors.description ? 'border-red-500' : 'border-slate-800 hover:border-slate-700'
                    }`}
                  />
                  {errors.description && (
                    <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.description}</span>
                    </p>
                  )}
                </div>

                {/* Aviso de Privacidade LGPD */}
                <div className="pt-2">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={privacyAgreed}
                      onChange={(e) => setPrivacyAgreed(e.target.checked)}
                      className="mt-1 rounded bg-slate-900 border-slate-700 text-[#FFC928] focus:ring-[#FFC928] w-4 h-4 cursor-pointer"
                    />
                    <span className="text-xs text-slate-400 leading-relaxed">
                      Concordo com o tratamento dos dados informados exclusivamente para fins de contato e elaboração do orçamento da DG Climatização, em conformidade com as diretrizes de privacidade.
                    </span>
                  </label>
                  {errors.privacy && (
                    <p className="mt-1 text-xs text-red-400">{errors.privacy}</p>
                  )}
                </div>

                {/* Botão de Envio */}
                <button
                  type="submit"
                  className="w-full py-4 text-sm font-bold text-[#101820] bg-[#FFC928] hover:bg-[#e5b21d] active:scale-[0.99] rounded-xl shadow-lg shadow-[#FFC928]/20 transition-all flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC928]"
                >
                  <Send className="w-4 h-4" />
                  <span>Solicitar Atendimento Técnico</span>
                </button>

              </form>
            )}
          </div>

          {/* Coluna de Contatos Oficiais & Cobertura (5 colunas) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Card de Canais Oficiais */}
            <div className="bg-[#080D12] border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
              <h3
                className="text-lg font-bold text-white pb-4 border-b border-slate-800 flex items-center gap-2"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                <span>Canais Oficiais DG Climatização</span>
              </h3>

              {/* WhatsApp Oficial */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 block">WhatsApp de Atendimento</span>
                  <a
                    href={whatsappDirectUrl || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-bold text-white hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                  >
                    <span>{config.contact.whatsappFormatted}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                  </a>
                </div>
              </div>

              {/* Telefone Fixo / Celular */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-[#FFC928] shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 block">Contato Telefônico</span>
                  <a
                    href={`tel:${config.contact.phoneNumber}`}
                    className="text-sm font-bold text-white hover:text-[#FFC928] transition-colors"
                  >
                    {config.contact.phoneFormatted}
                  </a>
                </div>
              </div>

              {/* E-mail Comercial */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-[#FFC928] shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 block">E-mail Comercial</span>
                  <a
                    href={`mailto:${config.contact.email}`}
                    className="text-sm font-bold text-white hover:text-[#FFC928] transition-colors break-all"
                  >
                    {config.contact.email}
                  </a>
                </div>
              </div>

              {/* Redes Sociais Oficiais */}
              <div className="pt-2 border-t border-slate-800 space-y-2.5">
                <span className="text-xs font-semibold text-slate-300 block uppercase tracking-wider">
                  Redes Sociais & Conteúdo
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {config.contact.social.instagramUrl && (
                    <a
                      href={config.contact.social.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-[#FFC928] flex items-center gap-2 text-xs text-slate-300 hover:text-white transition-colors"
                    >
                      <Instagram className="w-4 h-4 text-[#FFC928] shrink-0" />
                      <span className="truncate">Instagram</span>
                    </a>
                  )}

                  {config.contact.social.youtubeUrl && (
                    <a
                      href={config.contact.social.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-red-500 flex items-center gap-2 text-xs text-slate-300 hover:text-white transition-colors"
                    >
                      <Youtube className="w-4 h-4 text-red-500 shrink-0" />
                      <span className="truncate">YouTube</span>
                    </a>
                  )}

                  {config.contact.social.facebookUrl && (
                    <a
                      href={config.contact.social.facebookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-blue-500 flex items-center gap-2 text-xs text-slate-300 hover:text-white transition-colors"
                    >
                      <Facebook className="w-4 h-4 text-blue-500 shrink-0" />
                      <span className="truncate">Facebook</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Horário de Atendimento */}
              <div className="flex items-start gap-3 pt-2 border-t border-slate-800">
                <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="text-xs space-y-1">
                  <span className="text-slate-400 block font-medium">Horário de Operação</span>
                  <p className="text-slate-300">{config.contact.businessHours.weekdays}</p>
                  <p className="text-[#FFC928] font-semibold">{config.contact.businessHours.saturday}</p>
                  <p className="text-slate-500">{config.contact.businessHours.sunday}</p>
                </div>
              </div>

              {/* Áreas de Atendimento */}
              <div className="flex items-start gap-3 pt-2 border-t border-slate-800">
                <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="text-xs space-y-1.5">
                  <span className="text-slate-400 block font-medium">Segmentos & Locais Atendidos</span>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {config.contact.coverageAreas.map((area, i) => (
                      <span key={i} className="text-[11px] text-slate-300 bg-slate-900 px-2.5 py-1 rounded-md border border-slate-800">
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

            </div>

            {/* Selo de Proteção e Segurança */}
            <div className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800/80 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-[#FFC928] shrink-0 mt-0.5" />
              <div className="text-xs text-slate-400 leading-relaxed">
                <strong className="text-slate-300 block mb-0.5">Segurança & Privacidade:</strong>
                Seus dados não são compartilhados com terceiros. A DG Climatização utiliza suas informações estritamente para retorno de contato e agendamento.
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
