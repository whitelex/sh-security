import { useRef, useEffect } from 'react';

interface VideoPlayerProps {
  src: string;
  onClose: () => void;
}

export default function VideoPlayer({ src, onClose }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
      <div className="relative w-full max-w-6xl mx-4">
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-gray-300"
        >
          Close
        </button>
        
        <video
          ref={videoRef}
          src={src}
          className="w-full rounded-lg shadow-2xl"
          controls
          autoPlay
        >
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
}