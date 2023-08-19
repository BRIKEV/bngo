import { join } from 'path';
import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();

const config = {
  env: process.env.NODE_ENV || 'local',
  redis: {
    URL: process.env.REDIS_URL || 'local',
    expire: 20800,
  },
  game: {
    userOptionsLength: 16,
    boardLength: 49
  },
  socket: {
    interval: 14000,
    endGameTimeout: 16000,
    tokenSecret: process.env.JWT_SECRET || 'secreto',
    tokenOptions: { expiresIn: '2h' },
  },
  swagger: {
    info: {
      version: '1.0.0',
      title: 'Foodai API',
      license: {
        name: 'MIT',
      },
    },
    security: {
      BasicAuth: {
        type: 'http',
        scheme: 'basic',
      },
    },
    baseDir: join(__dirname, '..'),
    // Glob pattern to find your jsdoc files (multiple patterns can be added in an array)
    filesPattern: ['./routes/**/*.{ts,js}', './routes/schemas/*.{ts,js}'],
    // URL where SwaggerUI will be rendered
    swaggerUIPath: '/api-docs',
  },
};

export default config;
