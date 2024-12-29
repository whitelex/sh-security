import { MediaFile } from '../types/media';

export async function scanMediaFiles(): Promise<MediaFile[]> {
  try {
    const response = await fetch('/api/files');
    if (!response.ok) {
      throw new Error('Failed to fetch media files');
    }

    const text = await response.text();
    try {
      const mediaFiles: MediaFile[] = JSON.parse(text);
      return mediaFiles;
    } catch (error) {
      throw new Error('Invalid JSON response: ' + text);
    }
  } catch (error) {
    console.error('Error scanning media files:', error);
    throw new Error('Unable to load media files. Please ensure the media directory exists.');
  }
}