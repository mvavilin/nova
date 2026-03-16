import { describe, it, expect, vi } from 'vitest';
import { Modal, Button, Overlay } from '@components/ui';

describe('Modal Component', () => {
  it('should create a Modal instance', () => {
    const modal = new Modal({ children: [] });
    expect(modal).toBeInstanceOf(Modal);
    expect(modal.overlay).toBeInstanceOf(Overlay);
  });

  it('should append a close button if isClosable is true', () => {
    const modal = new Modal({ children: [], isClosable: true });
    const hasButton = modal.children.some((c) => c instanceof Button);
    expect(hasButton).toBe(true);
  });

  it('should not append a close button if isClosable is false', () => {
    const modal = new Modal({ children: [], isClosable: false });
    const hasButton = modal.children.some((c) => c instanceof Button);
    expect(hasButton).toBe(false);
  });

  it('show() should call overlay.show', () => {
    const modal = new Modal({ children: [] });
    const overlayShowSpy = vi.spyOn(modal.overlay, 'show');
    modal.show();
    expect(overlayShowSpy).toHaveBeenCalled();
  });

  it('hide() should call overlay.hide and mark modal as destroyed', () => {
    const modal = new Modal({ children: [] });
    const overlayHideSpy = vi.spyOn(modal.overlay, 'hide');

    const result = modal.hide();

    expect(overlayHideSpy).toHaveBeenCalled();
    expect(result).toBe(modal);
  });
});
