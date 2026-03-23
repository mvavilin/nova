export enum LogMessageType {
  RED = 'red',
  BLUE = 'blue',
  SYSTEM = 'system',
}

export type LogMessage = {
  type: LogMessageType;
  message: string;
  info: string | null;
};
