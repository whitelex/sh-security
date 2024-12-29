import { useState, useEffect } from 'react';

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

export function useMediaFiles() {
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadFiles = async () => {
      try {
        const response = await fetch('/feed/feed-list.json');
        if (!response.ok) {
          throw new Error('Failed to fetch media files');
        }
        const data: MediaFile[] = await response.json();
        setMediaFiles(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load media files');
      } finally {
        setLoading(false);
      }
    };

    loadFiles();

    const intervalId = setInterval(loadFiles, 15000); // Re-fetch every 15 seconds

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  const toggleFavorite = (id: string) => {
    setMediaFiles(files =>
      files.map(file =>
        file.id === id ? { ...file, favorite: !file.favorite } : file
      )
    );
  };

  const deleteFile = (id: string) => {
    setMediaFiles(files => files.filter(file => file.id !== id));
  };

  return { mediaFiles, loading, error, toggleFavorite, deleteFile };
}