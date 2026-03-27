import { LogMessageType } from '@repo/shared/src/types/logMessage';

export const isRedTeam = (team: LogMessageType): boolean => team === LogMessageType.RED;
