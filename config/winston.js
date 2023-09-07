const winston = require("winston");
const DailyRotateFile = require("winston-daily-rotate-file");
const process = require("process");

const logDir = `${process.cwd()}/logs`;
const { combine, timestamp, label, printf } = winston.format;

// Define log format
const logFormat = printf(info => {
  return `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`;
});

/*
 * Log Level
 * error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
 */
const Logger = dir => {
  let a = winston.createLogger({
    format: combine(
      timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
      }),
      label({label: "RSPPProject"}),
      logFormat
    ),
    transports: [
      new DailyRotateFile({
        level: 'info',
        datePattern: 'YYYY-MM-DD',
        dirname: dir,
        filename: `%DATE%.log`,
        maxFiles: 30,
        zippedArchive: true, 
      }),
      new DailyRotateFile({
        level: 'error',
        datePattern: 'YYYY-MM-DD',
        dirname: dir + '/error',
        filename: `%DATE%.error.log`,
        maxFiles: 30,
        zippedArchive: true,
      }),
    ],
    exceptionHandlers: [
      new DailyRotateFile({
         level: 'error',
         datePattern: 'YYYY-MM-DD',
         dirname: dir,
         filename: `%DATE%.exception.log`,
         maxFiles: 30,
         zippedArchive: true,
      }),
   ],
  });

  // Production 환경이 아닌 경우(dev 등) 
  if (process.env.NODE_ENV !== 'production') {
    a.add(new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),  // 색깔 넣어서 출력
        winston.format.simple(),  // `${info.level}: ${info.message} JSON.stringify({ ...rest })` 포맷으로 출력
      )
    }));
  }
  return a;
}

module.exports = (...dirs) => {
  directory = dirs.length > 0 ? dirs[0] : logDir;
  let logger = Logger(directory);
  return {logger};
}