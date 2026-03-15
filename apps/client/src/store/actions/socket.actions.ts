export enum SocketActionTypes {
  SOCKET_REQUEST_SESSION_TOKEN = 'SOCKET/REQUEST_SESSION_TOKEN',
  SOCKET_AUTH_FAILED = 'SOCKET/AUTH_FAILED',
}

type SocketRequestSessionToken = {
  type: SocketActionTypes.SOCKET_REQUEST_SESSION_TOKEN;
  payload: { authToken: string | null };
};

type SocketAuthFailed = {
  type: SocketActionTypes.SOCKET_AUTH_FAILED;
  payload: { error: unknown };
};

export type SocketActions = SocketRequestSessionToken | SocketAuthFailed;
