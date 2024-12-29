export interface MediaFile {
  id: number;
  title: string;
  timestamp: Date;
  type: 'video' | 'photo';
  favorite: boolean;
  thumbnail?: string;
}

export type ViewMode = 'grid' | 'list';