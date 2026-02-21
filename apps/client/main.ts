const API_URL = import.meta.env['VITE_API_URL'] || 'http://localhost:10000';

try {
  const response = await fetch(`${API_URL}/api/test`);
  const data = await response.json();

  const app = document.querySelector('#app');
  if (app) {
    app.innerHTML = `
      <p>Server says: ${data.message}</p>
      <p>Status: connected ✅</p>
    `;
  }
} catch (error) {
  const app = document.querySelector('#app');
  if (app) {
    app.innerHTML = `
      <p>Server says: connection failed ❌</p>
      <p>Error: ${error instanceof Error ? error.message : 'Unknown error'}</p>
    `;
  }
}
