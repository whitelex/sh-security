import { createServer } from 'http';
import deleteFileHandler from './deleteFile';

const server = createServer((req, res) => {
  if (req.url === '/api/deleteFile' && req.method === 'DELETE') {
    return deleteFileHandler(req, res);
  }

  res.statusCode = 404;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ error: 'Not found' }));
});

server.listen(3000, () => {
  console.log('API server running on http://localhost:3000');
});