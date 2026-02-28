import type { StatusContext, UserStatus } from '@types';
import { AuthorizedSubStatus, UserType } from '@types';
import type { Listener } from '@state/auth/auth.types';

export class AuthState {
  private currentStatus: UserStatus = { type: UserType.UNAUTHORIZED };
  private listeners = new Set<Listener>();

  public get userStatus(): UserStatus {
    return this.currentStatus;
  }

  public setUserStatus(newStatus: UserStatus): void {
    this.currentStatus = newStatus;
    for (const listener of this.listeners) listener(this.currentStatus);
  }

  public subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    listener(this.currentStatus);
    return () => this.listeners.delete(listener);
  }

  public logout(): void {
    this.setUserStatus({ type: UserType.UNAUTHORIZED });
  }

  public login(subStatus: AuthorizedSubStatus, context: StatusContext = {}): void {
    this.setUserStatus({ type: UserType.AUTHORIZED, subStatus, context });
  }
}

export const authState = new AuthState();
