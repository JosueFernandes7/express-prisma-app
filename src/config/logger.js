import { createLogger, format, transports } from 'winston';

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
    })
  ),
  transports: [
    // Exibe logs no console
    new transports.Console(),
    // Salva logs em arquivo
    new transports.File({ filename: 'logs/server.log', level: 'info' }),
    new transports.File({ filename: 'logs/errors.log', level: 'error' }),
  ],
});

export default logger;
