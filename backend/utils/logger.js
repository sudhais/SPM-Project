const pino = require('pino');

const logger = pino({
    transport: {
        target: "pino-pretty",
        opyions: {
            colorize: true,
            translateTime: 'SYS:dd-mm-yyyy HH:MM:ss',
            ignore: "pid,hostname",
        },
    },
});

module.exports= logger;