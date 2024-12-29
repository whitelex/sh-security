import { readdir, stat } from 'fs/promises';
import { join } from 'path';

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

export async function getMediaFiles(): Promise<MediaFile[]> {
  try {
    const feedDir = join(process.cwd(), 'public', 'feed');
    const files = await readdir(feedDir);
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

    return mediaFiles;
  } catch (error) {
    console.error('Error scanning media files:', error);
    throw new Error('Unable to load media files. Please ensure the media directory exists.');
  }
}