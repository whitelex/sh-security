import { MediaFile } from '../types';

export const sampleMediaFiles: MediaFile[] = [
  {
    id: 1,
    title: 'Front Door - Motion Detected',
    timestamp: new Date(),
    type: 'video',
    favorite: false,
    thumbnail: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 2,
    title: 'Backyard - Person Detected',
    timestamp: new Date(Date.now() - 3600000),
    type: 'video',
    favorite: true,
    thumbnail: 'https://images.unsplash.com/photo-1587614298171-a01562f6a72c?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 3,
    title: 'Garage - Vehicle Detected',
    timestamp: new Date(Date.now() - 7200000),
    type: 'photo',
    favorite: false,
    thumbnail: 'https://images.unsplash.com/photo-1570129476815-ba368ac77013?auto=format&fit=crop&q=80&w=400'
  }
];