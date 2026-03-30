import { expect, it, vi } from 'vitest';
import { startServer } from '../index.ts';
import server from '../app.ts';

it('should start server on correct port', () => {
  const port = '3001';
  const spy = vi.spyOn(server, 'listen');
  const s = startServer(port);
  expect(spy).toHaveBeenCalledWith(port, expect.any(Function));

  s.close();
});
