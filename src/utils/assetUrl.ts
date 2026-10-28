/**
 * Resolve caminhos de imagens e arquivos estáticos para que funcionem em qualquer ambiente:
 * - Subpastas do GitHub Pages (ex: maxcosta1972.github.io/dgclimatizacao/ ou /dgclimatizacao)
 * - Domínios próprios (ex: dgclimatizacao.com.br)
 * - Vercel / Netlify / Cloud Run / AI Studio
 * - Abertura local offline (file://)
 */
export function resolveAssetUrl(url: string | null | undefined): string {
  if (!url) return '';
  
  // Se for data URL (base64) ou URL externa completa (https://...)
  if (url.startsWith('data:') || url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }

  let clean = url.trim();

  // Limpeza de referências antigas ou com prefixos redundantes
  if (clean.startsWith('public/')) {
    clean = clean.replace(/^public\//, '');
  }
  if (clean.startsWith('/public/')) {
    clean = clean.replace(/^\/public\//, '');
  }
  if (clean.startsWith('/src/assets/images/')) {
    clean = 'assets/images/' + clean.replace('/src/assets/images/', '');
  } else if (clean.startsWith('src/assets/images/')) {
    clean = 'assets/images/' + clean.replace('src/assets/images/', '');
  }

  // Remove barra inicial
  if (clean.startsWith('/')) {
    clean = clean.slice(1);
  }

  // Remove ./ inicial se existir
  if (clean.startsWith('./')) {
    clean = clean.slice(2);
  }

  // Resolução inteligente baseada no ambiente de execução
  if (typeof window !== 'undefined') {
    // Caso 1: Abertura local via duplo clique em arquivo (file://)
    if (window.location.protocol === 'file:') {
      return './' + clean;
    }

    // Caso 2: Execução em servidor web (GitHub Pages, domínio próprio, AI Studio)
    const pathname = window.location.pathname;
    let dir = pathname;
    
    // Se o pathname aponta para um arquivo (ex: /index.html ou /dgclimatizacao/index.html)
    if (dir.endsWith('.html')) {
      dir = dir.substring(0, dir.lastIndexOf('/') + 1);
    } else if (!dir.endsWith('/')) {
      // Se não termina com barra (ex: /dgclimatizacao), adiciona para virar diretório
      dir = dir + '/';
    }

    return dir + clean;
  }

  const base = import.meta.env.BASE_URL || './';
  const prefix = base.endsWith('/') ? base : base + '/';
  return prefix + clean;
}
