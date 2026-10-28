/**
 * Configuração Centralizada da DG Climatização
 * 
 * Permite editar facilmente dados de contato, redes sociais, imagens,
 * serviços, perguntas frequentes e textos institucionais sem mexer na estrutura do layout.
 */

export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  iconName: 'ShieldCheck' | 'Wrench' | 'Sparkles' | 'SearchCheck';
  benefits: string[];
  recommendedFrequency: string;
  indicativeSymptoms?: string[];
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'higienizacao' | 'preventiva' | 'corretiva' | 'todos';
  imageSrc: string;
  alt: string;
  description: string;
  isRealPhoto: boolean;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface PillarItem {
  id: string;
  title: string;
  description: string;
  iconName: 'CheckCircle2' | 'Shield' | 'UserCheck' | 'MessageSquareQuote' | 'Award' | 'Gauge';
}

export interface SiteConfig {
  company: {
    name: string;
    tradeName: string;
    tagline: string;
    slogan: string;
    logoSrc: string | null;
  };
  contact: {
    whatsappNumber: string;
    whatsappFormatted: string;
    whatsappDefaultMessage: string;
    isWhatsappConfigured: boolean;

    phoneNumber: string;
    phoneFormatted: string;
    isPhoneConfigured: boolean;

    email: string;
    isEmailConfigured: boolean;

    addressCity: string;
    addressState: string;
    coverageAreas: string[];
    isAddressConfigured: boolean;

    businessHours: {
      weekdays: string;
      saturday: string;
      sunday: string;
    };

    social: {
      instagramUrl?: string;
      facebookUrl?: string;
      youtubeUrl?: string;
    };
  };
  hero: {
    titleHighlight: string;
    titleRest: string;
    subtitle: string;
    primaryCtaText: string;
    secondaryCtaText: string;
    imageSrc: string;
    imageAlt: string;
    badges: string[];
  };
  services: ServiceItem[];
  about: {
    title: string;
    subtitle: string;
    paragraphs: string[];
    imageSrc: string;
    imageAlt: string;
    commitments: {
      title: string;
      description: string;
    }[];
  };
  differentials: PillarItem[];
  beforeAfter: {
    title: string;
    subtitle: string;
    description: string;
    beforeImage: string;
    beforeAlt: string;
    beforeLabel: string;
    afterImage: string;
    afterAlt: string;
    afterLabel: string;
  };
  gallery: GalleryItem[];
  ctaBanner: {
    title: string;
    text: string;
    buttonText: string;
  };
  faq: FaqItem[];
}

export const initialSiteConfig: SiteConfig = {
  company: {
    name: "DG Climatização",
    tradeName: "DG Climatização Manutenção & Serviços",
    tagline: "Especialistas em Manutenção e Higienização de Ar-Condicionado",
    slogan: "AR-CONDICIONADO EM DIA. CONFORTO EM CADA AMBIENTE.",
    logoSrc: null, // Usa o monograma oficial em vetor fiel às fotos
  },
  contact: {
    // Número Oficial Real da DG Climatização extraído da foto oficial DG_3
    whatsappNumber: "5521979056031",
    whatsappFormatted: "(21) 97905-6031",
    whatsappDefaultMessage: "Olá! Conheci a DG Climatização pelo site e gostaria de solicitar informações sobre manutenção de ar-condicionado.",
    isWhatsappConfigured: true,

    phoneNumber: "21979056031",
    phoneFormatted: "(21) 97905-6031",
    isPhoneConfigured: true,

    email: "dgclimatizacao806@gmail.com",
    isEmailConfigured: true,

    addressCity: "Rio de Janeiro",
    addressState: "RJ",
    coverageAreas: [
      "Rio de Janeiro e Região Metropolitana",
      "Atendimento Residencial e Predial",
      "Comércios, Consultórios e Escritórios",
      "Instalação e Manutenção Elétrica",
      "Reparos e Adequações de Sistemas"
    ],
    isAddressConfigured: true,

    businessHours: {
      weekdays: "Segunda a Sexta: 08:00 às 18:00",
      saturday: "Sábados: 08:00 às 15:00",
      sunday: "Atendimento emergencial sob consulta"
    },

    social: {
      instagramUrl: "https://www.instagram.com/dg_climatizacao_7584?xtok=Y2dnbDN2dnB5OWo4",
      facebookUrl: "https://www.facebook.com/share/1DwoAqsKRu/",
      youtubeUrl: "https://youtube.com/@dgclimatizacao-z1j?si=3o-cPtBR3ns2MU2C"
    }
  },
  hero: {
    titleHighlight: "AR-CONDICIONADO EM DIA.",
    titleRest: "CONFORTO EM CADA AMBIENTE.",
    subtitle: "A DG Climatização cuida do seu ar-condicionado com atenção aos detalhes, manutenção profissional e compromisso com o seu conforto.",
    primaryCtaText: "Solicitar orçamento",
    secondaryCtaText: "Conheça nossos serviços",
    // Foto oficial DG 3: Técnico em uniforme oficial, logo na parede e contato oficial
    imageSrc: "assets/aistudio/DG_3_36c9ef75.jpeg",
    imageAlt: "DG Climatização - Atendimento e Manutenção Especializada de Ar-Condicionado (21) 97905-6031",
    badges: [
      "Atendimento Técnico Especializado",
      "Residencial e Predial",
      "Atendimento Rápido e Confiável"
    ]
  },
  services: [
    {
      id: "preventiva",
      title: "Manutenção preventiva",
      shortDesc: "Cuidados periódicos para acompanhar as condições do equipamento e ajudar a prevenir falhas.",
      fullDesc: "Acompanhamento técnico programado para verificar pressões operacionais, consumo elétrico, fixações, integridade dos componentes e limpeza de filtros. Reduz paradas inesperadas e conserva a vida útil do seu ar-condicionado.",
      iconName: "ShieldCheck",
      recommendedFrequency: "A cada 6 meses (residencial) ou mensal (ambientes comerciais)",
      benefits: [
        "Prevenção de falhas mecânicas e elétricas",
        "Preservação da eficiência energética do aparelho",
        "Aumento da durabilidade dos componentes internos",
        "Relatório técnico claro sobre o estado do equipamento"
      ],
      indicativeSymptoms: [
        "Aparelho há mais de 6 meses sem revisão",
        "Queda gradual no rendimento do resfriamento",
        "Consumo elétrico acima do habitual"
      ]
    },
    {
      id: "corretiva",
      title: "Manutenção corretiva",
      shortDesc: "Diagnóstico e atendimento de problemas de funcionamento, conforme as necessidades identificadas.",
      fullDesc: "Intervenção técnica precisa quando o equipamento apresenta ruídos anormais, vazamento de água, falta de refrigeração ou erros no painel. Identificação da causa raiz para um conserto definitivo e seguro.",
      iconName: "Wrench",
      recommendedFrequency: "Sob demanda imediata ao perceber falhas no funcionamento",
      benefits: [
        "Diagnóstico transparente antes de qualquer troca de peças",
        "Substituição de componentes com especificações corretas",
        "Eliminação de vazamentos e gotejamentos na unidade interna",
        "Testes de segurança elétrica e estanqueidade"
      ],
      indicativeSymptoms: [
        "Ar-condicionado pingando água no ambiente",
        "Aparelho liga, mas não gela nem aquece",
        "Barulho estranho no ventilador ou compressor",
        "Desligamento repentino ou luz piscando"
      ]
    },
    {
      id: "higienizacao",
      title: "Limpeza e higienização",
      shortDesc: "Cuidados com os componentes do ar-condicionado para auxiliar na conservação e no funcionamento adequado do sistema.",
      fullDesc: "Higienização profunda com aplicação de produtos específicos e capa coletora protetora, lavando serpentina, turbina de ventilação, bandeja de condensado e filtros sem sujar as paredes ou o chão do seu imóvel.",
      iconName: "Sparkles",
      recommendedFrequency: "A cada 3 a 6 meses conforme o uso e presença de pets/alergias",
      benefits: [
        "Remoção de fungos, ácaros, poeira e odores desagradáveis",
        "Desobstrução da serpentina para circulação livre de ar",
        "Proteção da saúde respiratória de toda a família ou equipe",
        "Trabalho limpo com proteção total de pisos e mobílias"
      ],
      indicativeSymptoms: [
        "Odor de mofo ou umidade ao ligar o aparelho",
        "Poeira aparente na saída de ar ou aletas",
        "Crises alérgicas frequentes no ambiente climatizado",
        "Vazão de ar visivelmente fraca"
      ]
    },
    {
      id: "inspecao",
      title: "Inspeção e diagnóstico",
      shortDesc: "Avaliação técnica para identificar sinais de falhas, perda de desempenho ou necessidade de manutenção.",
      fullDesc: "Check-up completo com termômetros digitais, manifold eletrônico e amperímetro. Medição da carga de fluido refrigerante, superaquecimento, sub-resfriamento e estado das conexões elétricas.",
      iconName: "SearchCheck",
      recommendedFrequency: "Antes do início de estações de calor intenso ou na compra de imóveis",
      benefits: [
        "Avaliação exata da eficiência térmica do aparelho",
        "Verificação de microvazamentos de gás refrigerante",
        "Conferência de isolamentos térmicos e tubulações",
        "Orientação sincera e sem empurrar serviços desnecessários"
      ],
      indicativeSymptoms: [
        "Dúvida sobre a real capacidade de resfriamento",
        "Aparelho herdado em imóvel novo ou recém-alugado",
        "Preparação do sistema para os períodos de verão"
      ]
    }
  ],
  about: {
    title: "MAIS DO QUE CLIMATIZAÇÃO. COMPROMISSO COM O SEU CONFORTO.",
    subtitle: "Trabalho técnico com cuidado, respeito ao seu espaço e compromisso com o resultado.",
    paragraphs: [
      "A DG Climatização nasceu do compromisso em oferecer um serviço de manutenção, instalação e adequação de ar-condicionado baseado na transparência, na precisão técnica e no zelo absoluto pelo ambiente de cada cliente.",
      "Entendemos que o ar-condicionado não é apenas um eletrodoméstico: ele é o responsável pelo seu bem-estar diário, pelo conforto térmico da sua família e pela produtividade do seu espaço de trabalho. Por isso, cada atendimento é conduzido com calma, ferramentas apropriadas e respeito às boas práticas do setor.",
      "Nosso foco não é a pressa, mas sim a entrega de um serviço bem-feito, com explicações claras sobre o estado do seu equipamento e orientações honestas sobre o que realmente precisa ser realizado."
    ],
    // Foto oficial DG 1: Técnico apontando para a estrutura do compressor e conexões
    imageSrc: "assets/aistudio/DG_1_83cbc04d.jpeg",
    imageAlt: "Técnico especialista da DG Climatização em uniforme oficial demonstrando manutenção do compressor de ar-condicionado",
    commitments: [
      {
        title: "Proteção do seu ambiente",
        description: "Utilizamos capas coletoras e lonas de proteção para que todo o procedimento seja realizado sem respingos ou sujeira no seu piso ou parede."
      },
      {
        title: "Ferramental adequado",
        description: "Instrumentos de medição calibrados e produtos específicos para higienização e manutenção em sistemas de refrigeração."
      },
      {
        title: "Comunicação transparente",
        description: "Sem termos confusos ou orçamentos surpresa. Explicamos com clareza o que foi detectado e quais os caminhos recomendados."
      },
      {
        title: "Foco na conservação",
        description: "Priorizamos a manutenção preventiva para proteger seu investimento e evitar despesas elevadas com trocas precoces de peças."
      }
    ]
  },
  differentials: [
    {
      id: "detalhes",
      title: "Atenção aos detalhes",
      description: "Verificação cuidadosa de aletas, bandejas, conexões elétricas e isolamentos térmicos para garantir o funcionamento correto de cada elemento.",
      iconName: "CheckCircle2"
    },
    {
      id: "cuidado",
      title: "Cuidado com os equipamentos",
      description: "Manuseio zeloso das carenagens e travas plásticas do aparelho, evitando avarias estéticas e preservando a integridade original.",
      iconName: "Shield"
    },
    {
      id: "profissional",
      title: "Atendimento profissional",
      description: "Pontualidade, postura ética, apresentação adequada em uniforme oficial e atendimento atencioso do início ao fim.",
      iconName: "UserCheck"
    },
    {
      id: "orientacao",
      title: "Orientação clara ao cliente",
      description: "Explicamos o funcionamento do seu aparelho, como utilizar os modos de forma eficiente e quando é recomendável fazer a próxima revisão.",
      iconName: "MessageSquareQuote"
    },
    {
      id: "qualidade",
      title: "Compromisso com a qualidade do serviço",
      description: "Cada etapa é executada seguindo rigorosos padrões técnicos, sem atalhos que comprometam a segurança ou o resultado final.",
      iconName: "Award"
    },
    {
      id: "eficiencia",
      title: "Busca por eficiência e conservação dos aparelhos",
      description: "Um equipamento limpo e regulado opera com fluxo livre de ar, auxiliando na estabilidade térmica e na conservação do compressor.",
      iconName: "Gauge"
    }
  ],
  beforeAfter: {
    title: "O PODER DA HIGIENIZAÇÃO PROFISSIONAL",
    subtitle: "Compare o estado das aletas da serpentina antes e após o procedimento de limpeza profunda.",
    description: "Com o passar dos meses, poeira, ácaros e fungos se acumulam nas micro-aletas da evaporadora, bloqueando o fluxo de ar e comprometendo a qualidade do ar que você respira. Arraste o controle deslizante para ver a restauração do equipamento.",
    beforeImage: "assets/images/hvac_before_after_dirty_1792518165782.jpg",
    beforeAlt: "Serpentina de ar-condicionado com acúmulo de poeira e sujeira antes da limpeza",
    beforeLabel: "Antes da Higienização",
    afterImage: "assets/images/hvac_clean_filter_coil_1792518166146.jpg",
    afterAlt: "Serpentina de ar-condicionado perfeitamente limpa e higienizada com fluxo livre",
    afterLabel: "Depois da Limpeza Especializada"
  },
  gallery: [
    {
      id: "g-novo-1",
      title: "Técnico Oficial e Oficina Especializada",
      category: "corretiva",
      imageSrc: "assets/aistudio/hero_hvac_technician_1792518164085_bead8dc4.jpg",
      alt: "Técnico da DG Climatização em uniforme oficial com cinto de ferramentas e unidade condensadora",
      description: "Atendimento técnico padrão com ferramentas de ponta, diagnósticos elétricos e manutenções precisas.",
      isRealPhoto: true
    },
    {
      id: "g-novo-2",
      title: "Entrega Técnica e Conforto Térmico",
      category: "preventiva",
      imageSrc: "assets/aistudio/hvac_outdoor_condenser_1792518165774_dda1f8f3.jpg",
      alt: "Técnico da DG Climatização demonstrando aparelho de ar-condicionado split higienizado",
      description: "Instalação e manutenção finalizadas com garantia de eficiência e ambiente agradável.",
      isRealPhoto: true
    },
    {
      id: "g-oficial-1",
      title: "Equipe Oficial DG Climatização",
      category: "preventiva",
      imageSrc: "assets/aistudio/DG_3_36c9ef75.jpeg",
      alt: "Técnico da DG Climatização em uniforme oficial com ferramentas e oficina técnica",
      description: "Profissional qualificado com uniforme oficial, ferramentas de ponta e cinto de intervenção rápida.",
      isRealPhoto: true
    },
    {
      id: "g-oficial-2",
      title: "Inspeção e Reparo de Componentes",
      category: "corretiva",
      imageSrc: "assets/aistudio/DG_1_83cbc04d.jpeg",
      alt: "Técnico apontando e demonstrando a estrutura do compressor e conexões",
      description: "Análise minuciosa de circuitos elétricos, compressores e componentes para diagnóstico preciso.",
      isRealPhoto: true
    },
    {
      id: "g-oficial-3",
      title: "Instalação e Conforto no Ambiente",
      category: "preventiva",
      imageSrc: "assets/aistudio/DG_2_f5a24816.jpeg",
      alt: "Aparelho de ar-condicionado split instalado e revisado em ambiente climatizado",
      description: "Verificação da vazão de ar e climatização homogênea no espaço do cliente.",
      isRealPhoto: true
    },
    {
      id: "g-oficial-4",
      title: "Sistemas Split, Condensadoras e Cassete",
      category: "todos",
      imageSrc: "assets/aistudio/CASSETE-4-VIAS-5-Copia_954a3529.jpg",
      alt: "Aparelho de ar-condicionado Cassete de 4 vias instalado no teto em ambiente sofisticado",
      description: "Instalação, revisão e manutenção de modelos Cassete 4 vias, Split Hi-Wall e condensadoras comerciais e residenciais.",
      isRealPhoto: true
    },
    {
      id: "g-deep-clean",
      title: "Higienização profunda com bolsa coletora",
      category: "higienizacao",
      imageSrc: "assets/aistudio/hvac_deep_cleaning_1792518165270_1f7636b7.jpg",
      alt: "Técnico da DG Climatização realizando higienização da serpentina com bolsa coletora protetora e pulverizador",
      description: "Procedimento seguro com bolsa coletora e produtos bactericidas homologados, removendo fungos e ácaros sem respingos no ambiente.",
      isRealPhoto: true
    },
    {
      id: "g-clean-fins",
      title: "Filtros e aletas desobstruídos",
      category: "higienizacao",
      imageSrc: "assets/images/hvac_clean_filter_coil_1792518166146.jpg",
      alt: "Filtro micro-mesh e serpentina de alumínio limpos e esterilizados",
      description: "Restabelecimento da vazão máxima de ar limpo e livre de microrganismos nocivos.",
      isRealPhoto: true
    }
  ],
  ctaBanner: {
    title: "SEU AR-CONDICIONADO PRECISA DE ATENÇÃO?",
    text: "Entre em contato com a DG Climatização e converse conosco sobre a manutenção do seu equipamento.",
    buttonText: "Quero solicitar um orçamento"
  },
  faq: [
    {
      id: "freq-manutencao",
      question: "Com que frequência devo realizar a manutenção do ar-condicionado?",
      answer: "Para ambientes residenciais, a recomendação geral de revisão preventiva e higienização profunda é a cada 6 meses, além da lavagem mensal dos filtros de tela pelo próprio usuário. Em ambientes comerciais, consultórios ou locais com alta circulação e animais de estimação, o intervalo recomendado costuma ser de 1 a 3 meses para preservar a qualidade do ar e atender às normas sanitárias."
    },
    {
      id: "sinais-manutencao",
      question: "Quais sinais indicam que meu aparelho precisa de manutenção?",
      answer: "Os sinais mais frequentes incluem: ar que demora muito para gelar ou não refrigera como antes, odores desagradáveis (cheiro de mofo ou umidade ao ligar), pingamento ou vazamento de água pela parte frontal, ruídos anormais (estalos, zumbidos ou vibração excessiva) e aumento incomum na conta de energia elétrica."
    },
    {
      id: "importancia-limpeza",
      question: "A limpeza do ar-condicionado é importante?",
      answer: "Sim, é fundamental. O ar-condicionado recircula o ar presente no cômodo. Quando a serpentina e os filtros estão sujos, o aparelho se torna um meio propício para a proliferação de ácaros, bactérias e fungos, agravando rinites e crises alérgicas. Além disso, a sujeira força o compressor a trabalhar sob maior esforço, elevando o consumo e reduzindo a vida útil do sistema."
    },
    {
      id: "solicitar-orcamento",
      question: "Como posso solicitar um orçamento?",
      answer: "Você pode solicitar um orçamento diretamente pelo formulário de contato do site ou pelo nosso canal oficial de WhatsApp no (21) 97905-6031. Basta nos informar a quantidade de aparelhos, a marca ou tipo (Split, Inverter, Janela, Cassete, etc.) e o tipo de serviço que você precisa (limpeza, conserto ou revisão preventiva)."
    },
    {
      id: "tipos-aparelhos",
      question: "Quais tipos de aparelhos a DG Climatização atende?",
      answer: "Atendemos os principais modelos do mercado residencial e predial: aparelhos Split Hi-Wall (convencionais e Inverter), Multi-Split, Piso Teto e Cassete das principais marcas atuantes no Brasil (Samsung, LG, Daikin, Midea, Gree, Carrier, Fujitsu, Elgin, entre outras)."
    },
    {
      id: "regioes-atendidas",
      question: "Em quais regiões a empresa realiza atendimentos?",
      answer: "Realizamos atendimentos no Rio de Janeiro e Região Metropolitana, tanto para residências quanto para edifícios prediais, clínicas e estabelecimentos comerciais. Fale conosco pelo WhatsApp (21) 97905-6031 informando seu bairro para agendar a visita da equipe."
    }
  ]
};
