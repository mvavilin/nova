import { vi } from 'vitest';
import { mockClientUser } from '@__mocks__/store/clientUserState';

export const mockClientUserStore = {
  getState: vi.fn(() => ({ ...mockClientUser })),
  dispatch: vi.fn(),
  subscribe: vi.fn(),
};
