import { useState } from 'react';
import { Heart, Folder, Trash2, Play } from 'lucide-react';
import { MediaFile } from '../types/media';

interface MediaCardProps {
  file: MediaFile;
  onDelete: (id: string) => void;
  onFavorite: (id: string) => void;
  onPlay: () => void;
}

export default function MediaCard({ file, onDelete, onFavorite, onPlay }: MediaCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const thumbnailSrc = file.path.replace('.mkv', '.jpg');

  return (
    <div 
      className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800 transition-transform hover:scale-[1.02]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className="relative aspect-video bg-gray-800 cursor-pointer"
        onClick={onPlay}
      >
        <img src={thumbnailSrc} alt={file.filename} className="w-full h-full object-cover" />
        {isHovered && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <Play className="w-16 h-16 text-white" />
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h4 className="font-medium text-white mb-1">{file.filename}</h4>
        <p className="text-sm text-gray-400 mb-3">
          {file.timestamp.toLocaleString()}
        </p>
        
        <div className="flex gap-2">
          <button 
            onClick={() => onFavorite(file.id)}
            className={`p-2 rounded-lg transition-colors ${
              file.favorite 
                ? 'text-red-500 bg-red-500/10 hover:bg-red-500/20' 
                : 'text-gray-400 hover:bg-gray-800'
            }`}
          >
            <Heart className="w-4 h-4" fill={file.favorite ? 'currentColor' : 'none'} />
          </button>
          
          <button className="p-2 rounded-lg text-gray-400 hover:bg-gray-800">
            <Folder className="w-4 h-4" />
          </button>
          
          <button 
            onClick={() => onDelete(file.id)}
            className="p-2 rounded-lg text-red-400 hover:bg-red-500/10"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}