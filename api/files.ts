import { readdir, stat, access } from 'fs/promises';
import { join } from 'path';
import { NextApiRequest, NextApiResponse } from 'next';

// Define the MediaFile type directly in this file
type MediaFile = {
  id: string;
  path: string;
  filename: string;
  date: string;
  timestamp: string;
  favorite: boolean;
  type: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const feedDir = join(process.cwd(), 'public', 'feed');
    console.log('Feed directory:', feedDir);

    // Check if the directory exists
    try {
      await access(feedDir);
    } catch (error) {
      console.error('Feed directory does not exist:', feedDir);
      return res.status(500).json({ error: 'Feed directory does not exist.' });
    }

    const files = await readdir(feedDir);
    console.log('Files in feed directory:', files);
    const mediaFiles: MediaFile[] = [];

    for (const file of files) {
      const filePath = join(feedDir, file);
      const fileStats = await stat(filePath);

      if (fileStats.isFile() && file.endsWith('.mkv')) {
        const mediaFile: MediaFile = {
          id: filePath,
          path: `/feed/${file}`,
          filename: file,
          date: '2024-03-20', // You may want to extract the date from the filename or another source
          timestamp: new Date('2024-03-20T00:00:00').toISOString(), // Adjust the timestamp as needed
          favorite: false,
          type: 'video'
        };
        mediaFiles.push(mediaFile);
      }
    }

    res.status(200).json(mediaFiles);
  } catch (error) {
    console.error('Error scanning media files:', error);
    res.status(500).json({ error: 'Unable to load media files. Please ensure the media directory exists.' });
  }
}