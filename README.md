# DG Climatização — Site Institucional

Site institucional moderno, responsivo e de alta performance desenvolvido para a **DG Climatização**, empresa especializada em manutenção preventiva, corretiva e higienização de aparelhos de ar-condicionado no Rio de Janeiro e Região Metropolitana.

---

## 🛠️ Tecnologias Utilizadas

- **React 19** com **TypeScript**
- **Vite** para build ultrarrápido
- **Tailwind CSS** para estilização moderna e responsiva
- **Lucide React** para iconografia técnica
- **JSON-LD / Schema.org** estruturado para SEO local (Google)

---

## 📂 Estrutura do Projeto

```text
├── public/                 # Imagens e recursos públicos estáticos
│   └── assets/aistudio/    # Fotografias reais da equipe e equipamentos
├── src/
│   ├── assets/             # Imagens auxiliares de alta resolução
│   ├── components/         # Componentes modulares do site
│   │   ├── Navbar.tsx            # Cabeçalho com navegação e links rápidos
│   │   ├── Hero.tsx              # Primeira dobra de impacto com foto oficial
│   │   ├── Services.tsx          # Seção de 4 especialidades com modais detalhados
│   │   ├── About.tsx             # Seção institucional e foto de diagnóstico
│   │   ├── Differentials.tsx     # 6 pilares de atendimento
│   │   ├── Gallery.tsx           # Galeria de fotos e visualizador Lightbox
│   │   ├── BeforeAfterSlider.tsx # Slider interativo Antes & Depois
│   │   ├── CtaBanner.tsx         # Chamada para ação com WhatsApp
│   │   ├── Faq.tsx               # Perguntas frequentes em formato acordeão
│   │   ├── Contact.tsx           # Formulário validado com resumo para WhatsApp
│   │   ├── Footer.tsx            # Rodapé institucional e termos LGPD
│   │   ├── FloatingWhatsApp.tsx  # Botão flutuante de WhatsApp
│   │   └── BrandLogo.tsx         # Emblema vetorial fiel da DG Climatização
│   ├── config/
│   │   └── siteData.ts     # Configuração centralizada (telefones, textos, fotos)
│   ├── context/
│   │   └── SiteConfigContext.tsx # Estado global e gerenciamento
│   ├── App.tsx             # Aplicação principal
│   └── index.css           # Estilos globais e animações de fluxo de ar
├── index.html              # HTML com metadados de SEO, OpenGraph e fontes
├── package.json            # Dependências e scripts do projeto
└── vite.config.ts          # Configuração do Vite
```

---

## 🚀 Como Executar Localmente

### 1. Clonar o repositório
```bash
git clone https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git
cd SEU_REPOSITORIO
```

### 2. Instalar dependências
```bash
npm install
```

### 3. Iniciar o servidor de desenvolvimento
```bash
npm run dev
```
O projeto estará acessível em `http://localhost:3000` (ou na porta indicada pelo terminal).

---

## 📦 Como Gerar a Versão de Produção

```bash
npm run build
```
Os arquivos otimizados para publicação na internet serão gerados na pasta `dist/`.

---

## 🌐 Onde Publicar (Hospedagem Gratuita / Rápida)

Você pode publicar a pasta do projeto diretamente em plataformas modernas com deploy contínuo via GitHub:

- **Vercel**: Basta conectar seu repositório no [vercel.com](https://vercel.com).
  - *Build Command*: `npm run build`
  - *Output Directory*: `dist`
- **Netlify**: Conecte o repositório no [netlify.com](https://netlify.com).
  - *Build Command*: `npm run build`
  - *Publish Directory*: `dist`
- **Cloudflare Pages**: Conecte o repositório no painel da Cloudflare.

---

## ⚙️ Como Alterar Informações da Empresa

Todos os dados editáveis (WhatsApp, telefone, e-mail, fotos, textos da história e perguntas frequentes) estão centralizados no arquivo:
👉 `src/config/siteData.ts`

Alterando esse arquivo, todo o site é atualizado automaticamente.
