import { type StatusContext, type UserStatus, AuthorizedSubStatus, UserType } from '@types';
import type { Listener } from '@state/auth/auth.types';

export class AuthState {
  private currentStatus: UserStatus = { type: UserType.UNAUTHORIZED };
  // private currentStatus: UserStatus = {
  //   type: UserType.AUTHORIZED,
  //   subStatus: AuthorizedSubStatus.IN_LOBBY,
  //   context: {},
  // };
  // private currentStatus: UserStatus = {
  //   type: UserType.AUTHORIZED,
  //   subStatus: AuthorizedSubStatus.IN_ROOM,
  //   context: { roomCode: 'ABCD1234' },
  // };
  private listeners = new Set<Listener>();

  public get userStatus(): UserStatus {
    return this.currentStatus;
  }

  public get authorizedContext(): {
    subStatus: AuthorizedSubStatus;
    context?: StatusContext;
  } | null {
    if (this.currentStatus.type === UserType.AUTHORIZED) return this.currentStatus;
    return null;
  }

  public setUserStatus(newStatus: UserStatus): void {
    this.currentStatus = newStatus;
    for (const listener of this.listeners) listener(this.currentStatus);
  }

  public subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
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
