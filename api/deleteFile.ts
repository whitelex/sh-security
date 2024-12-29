import { join } from 'path';
import { unlink } from 'fs/promises';
import { IncomingMessage, ServerResponse } from 'http';

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  if (req.method !== 'DELETE') {
    res.statusCode = 405;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Method not allowed' }));
    return;
  }

  let body = '';
  req.on('data', chunk => {
    body += chunk.toString();
  });

  req.on('end', async () => {
    const { filename } = JSON.parse(body);

    if (!filename) {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: 'Filename is required' }));
      return;
    }

    const filePath = join(process.cwd(), 'public', 'feed', filename);

    try {
      await unlink(filePath);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ message: 'File deleted successfully' }));
    } catch (error) {
      console.error('Error deleting file:', error);
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: 'Failed to delete file' }));
    }
  });
}