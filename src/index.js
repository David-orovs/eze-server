/* eslint-disable no-console */
import 'dotenv/config';
import app from './app';

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log('App running on port', port, '🚀');
});

process.on('SIGTERM', () => {
  console.log('SIGTERM SIGNAL RECEIVED 👋 Shutting down gracefully...');
  server.close(() => console.log('💥 Process terminated!'));
});
