
import { Person } from './person.model';
import { Group } from './group.model';

export interface List {
  id: string;
  name: string;
  persons: Person[];
  draws: number;
  tirageName?: string;  
  generatedGroups: Group[];  
  groupsSaved?: boolean;
  groupNames?: string[];
  showSavedGroups?: boolean;
  showGroups?: boolean; 
  errorMessage?: string;  
    criteria?: { mixerAncienDwwm: boolean; mixerAge: boolean };

}
