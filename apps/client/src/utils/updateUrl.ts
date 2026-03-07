export function updateUrl(url: string): void {
  if (globalThis.location.pathname === url) return;
  globalThis.history.pushState({}, '', url);
}
