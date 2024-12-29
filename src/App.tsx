import { useState } from 'react';
import { Search, Grid, List } from 'lucide-react';
import { ViewMode, MediaFile } from './types/media';
import { useMediaFiles } from './hooks/useMediaFiles';
import Sidebar from './components/Sidebar';
import MediaGrid from './components/MediaGrid';
import DeleteModal from './components/DeleteModal';
import VideoPlayer from './components/VideoPlayer';

export default function App() {
  const { mediaFiles, loading, error, toggleFavorite, deleteFile } = useMediaFiles();
  const [activeSection, setActiveSection] = useState('All Media');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [playingFile, setPlayingFile] = useState<MediaFile | null>(null);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-950 text-gray-100">
        <p>Loading media files...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-950 text-gray-100">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  const handleDelete = (id: string) => setDeleteId(id);
  
  const confirmDelete = () => {
    if (deleteId) {
      deleteFile(deleteId);
      setDeleteId(null);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-950 text-gray-100">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      
      <main className="flex-1 p-6">
        <div className="flex justify-between items-center mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="search"
              placeholder="Search media files..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-80 bg-gray-900 border border-gray-800 rounded-lg 
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg ${
                viewMode === 'grid' ? 'bg-gray-800 text-white' : 'text-gray-400'
              }`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg ${
                viewMode === 'list' ? 'bg-gray-800 text-white' : 'text-gray-400'
              }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>

        <MediaGrid
          files={mediaFiles}
          viewMode={viewMode}
          searchQuery={searchQuery}
          activeSection={activeSection}
          onDelete={handleDelete}
          onFavorite={toggleFavorite}
          onPlay={setPlayingFile}
        />
      </main>

      <DeleteModal
        isOpen={deleteId !== null}
        onClose={() => setDeleteId(null)}
        onConfirm={confirmDelete}
      />

      {playingFile && (
        <VideoPlayer
          src={playingFile.path}
          onClose={() => setPlayingFile(null)}
        />
      )}
    </div>
  );
}