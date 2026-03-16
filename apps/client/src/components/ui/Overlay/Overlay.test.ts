import { describe, it, expect, vi } from 'vitest';
import { Overlay } from '@components/ui';
import { BaseComponent } from '@ComponentsAPI';
import { app } from '@app';
import { ANIMATION_DURATION } from '@styles';

describe('Overlay Component', () => {
  it('should create an Overlay instance', () => {
    const overlay = new Overlay();
    expect(overlay).toBeInstanceOf(Overlay);
    expect(overlay).toBeInstanceOf(BaseComponent);
  });

  it('should append a child if provided', () => {
    const child = new BaseComponent({ classes: 'child' });
    const overlay = new Overlay(child);
    expect(overlay.children).toContain(child);
  });

  it('show() should append overlay to app', () => {
    const overlay = new Overlay();
    const appendSpy = vi.spyOn(app, 'appendChildren');
    overlay.show();
    expect(appendSpy).toHaveBeenCalledWith(overlay);
  });

  it('hide() should call destroy after ANIMATION_DURATION', async () => {
    vi.useFakeTimers();
    const overlay = new Overlay();
    const destroySpy = vi.spyOn(overlay, 'destroy');
    overlay.hide();
    expect(destroySpy).not.toHaveBeenCalled();
    vi.advanceTimersByTime(ANIMATION_DURATION);
    expect(destroySpy).toHaveBeenCalled();
    vi.useRealTimers();
  });
});
