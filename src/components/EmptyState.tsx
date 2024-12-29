import { FolderOpen } from 'lucide-react';

interface EmptyStateProps {
  message?: string;
}

export default function EmptyState({ message = 'No media files found' }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <FolderOpen className="w-16 h-16 text-gray-600 mb-4" />
      <h3 className="text-xl font-medium text-gray-400 mb-2">{message}</h3>
      <p className="text-gray-500">
        Add .mkv files to the public/feed/YYYY-MM-DD directory to get started
      </p>
    </div>
  );
}