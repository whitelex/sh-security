import { useMemo } from 'react';
import { MediaFile, ViewMode } from '../types/media';
import MediaCard from './MediaCard';
import EmptyState from './EmptyState';
import { format, isToday, isYesterday } from 'date-fns';

interface MediaGridProps {
  files: MediaFile[];
  viewMode: ViewMode;
  searchQuery: string;
  activeSection: string;
  onDelete: (id: string) => void;
  onFavorite: (id: string) => void;
  onPlay: (file: MediaFile) => void;
}

export default function MediaGrid({
  files,
  viewMode,
  searchQuery,
  activeSection,
  onDelete,
  onFavorite,
  onPlay
}: MediaGridProps) {
  const filteredFiles = useMemo(() => {
    return files.filter(file => {
      const matchesSearch = file.filename.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSection = activeSection === 'All Media' ||
        (activeSection === 'Favorites' && file.favorite) ||
        (activeSection === 'Front Door'); // Include 'Front Door' section
      return matchesSearch && matchesSection;
    });
  }, [files, searchQuery, activeSection]);

  const groupedFiles = useMemo(() => {
    const sortedFiles = [...filteredFiles].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    return sortedFiles.reduce((groups: Record<string, MediaFile[]>, file) => {
      const date = new Date(file.timestamp);
      const dateKey = isToday(date)
        ? 'Today'
        : isYesterday(date)
        ? 'Yesterday'
        : format(date, 'yyyy-MM-dd');
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(file);
      return groups;
    }, {});
  }, [filteredFiles]);

  const handleDelete = async (id: string, filePath: string) => {
    console.log(`Attempting to delete file: ${filePath}`);
    try {
      const response = await fetch('/api/deleteFile', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ filePath }),
      });

      if (!response.ok) {
        throw new Error('Failed to delete file');
      }

      onDelete(id);
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

  if (Object.keys(groupedFiles).length === 0) {
    const message = searchQuery
      ? 'No matching files found'
      : activeSection === 'Favorites'
      ? 'No favorite files yet'
      : 'No media files found';
    
    return <EmptyState message={message} />;
  }

  return (
    <div className="space-y-8">
      {Object.entries(groupedFiles).map(([date, files]) => (
        <div key={date}>
          <h3 className="text-lg font-semibold text-white mb-4">{date}</h3>
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1'
          }`}>
            {files.map(file => (
              <MediaCard
                key={file.id}
                file={{ ...file, filename: format(new Date(file.timestamp), 'HH:mm') }}
                onDelete={() => handleDelete(file.id, file.path)}
                onFavorite={onFavorite}
                onPlay={() => onPlay(file)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}