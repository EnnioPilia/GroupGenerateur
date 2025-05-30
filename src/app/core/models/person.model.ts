export interface Person {
  id: string;      
  lastName: string;
  gender: 'masculin' | 'féminin' | 'ne se prononce pas';
  frenchLevel: number;
  isFormerDwwm: boolean;
  technicalLevel: number;
  profile: 'timide' | 'réservé' | 'à l’aise';
  age?: number | null; // l’âge peut être absent ou nul
}
