export interface PlayerStats {
  username: string;
  level: number;
  gold: number;
  diamonds: number;
  server: string;
}

export interface SongInfo {
  title: string;
  artist: string;
  bpm: number;
  difficulty: number;
  duration: string;
  current: string;
}

export interface GameMode {
  id: string;
  title: string;
  subtitle: string;
  color: 'primary' | 'secondary' | 'tertiary';
}