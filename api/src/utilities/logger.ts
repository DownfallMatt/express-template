const Morgan = require('morgan')
const Winston = require('winston')

const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
}

const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'blue',
    http: 'magenta',
    debug: 'white',
}
  
Winston.addColors(colors)

const errorFilter = Winston.format((info: any, opts: []) => {
    return info.level === 'error' ? info : false;
});
const infoFilter = Winston.format((info: any, opts: []) => {
    return info.level === 'info' ? info : false;
});
const warnFilter = Winston.format((info: any, opts: []) => {
    return info.level === 'warn' ? info : false;
});

// const myFormat = Winston.format.printf( ({ level, message, timestamp , ...metadata}) => {
//     let msg = `${timestamp} [${level}] : ${message} `  
//     if(metadata) {
//       msg += JSON.stringify(metadata)
//     }
//     return msg
// });

const Logger = Winston.createLogger({
    defaultMeta: { service: 'user-service' },
    'transports': [
        new Winston.transports.Console(),
        new Winston.transports.File({ level: 'info', filename: './src/logging/info.log', format: Winston.format.combine(Winston.format.colorize(), infoFilter(), Winston.format.colorize({ all: true}), Winston.format.timestamp({format: 'YYYY-MM-DD hh:mm:ss.SSS A'}), Winston.format.printf((info: any) => `${info.level}: ${[info.timestamp]}: ${info.message}`))}),
        new Winston.transports.File({ level: 'error', filename: './src/logging/error.log', format: Winston.format.combine( Winston.format.colorize({ all: true}), errorFilter(), Winston.format.timestamp({format: 'YYYY-MM-DD hh:mm:ss.SSS A'}), Winston.format.printf((info: any) => `${info.level}: ${[info.timestamp]}: ${info.message}`))}),
        new Winston.transports.File({ level: 'warn', filename: './src/logging/warning.log', format: Winston.format.combine(warnFilter(), Winston.format.colorize({ all: true}), Winston.format.timestamp({format: 'YYYY-MM-DD hh:mm:ss.SSS A'}), Winston.format.printf((info: any) => `${info.level}: ${[info.timestamp]}: ${info.message}`))}),
        new Winston.transports.File({ level: 'http', filename: './src/logging/http.log', format: Winston.format.combine(warnFilter(), Winston.format.colorize({ all: true}), Winston.format.timestamp({format: 'YYYY-MM-DD hh:mm:ss.SSS A'}), Winston.format.printf((info: any) => `${info.level}: ${[info.timestamp]}: ${info.message}`))}),
    ],
})

export default Logger