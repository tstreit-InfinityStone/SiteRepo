const BASE_URL = import.meta.env.BASE_URL || '/';
const NORMALIZED_BASE = BASE_URL === '/' ? '' : BASE_URL.replace(/\/$/, '');

export function withBase(path: string) {
  if (
    !path ||
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('mailto:') ||
    path.startsWith('tel:') ||
    path.startsWith('#')
  ) {
    return path;
  }

  if (path === '/') {
    return NORMALIZED_BASE ? `${NORMALIZED_BASE}/` : '/';
  }

  return path.startsWith('/') ? `${NORMALIZED_BASE}${path}` : `${NORMALIZED_BASE}/${path}`;
}

export function stripBase(path: string) {
  if (!NORMALIZED_BASE || !path.startsWith(NORMALIZED_BASE)) {
    return path;
  }

  const stripped = path.slice(NORMALIZED_BASE.length);
  return stripped || '/';
}
