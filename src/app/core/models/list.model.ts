
import { Person } from './person.model';
import { Group } from './group.model';

export interface List {
  id: string;
  name: string;
  persons: Person[];
  draws: number;
  
  tirageName?: string;  
  groupName?: string[];

  generatedGroups: Group[];  
  groupsSaved?: boolean;
  showSavedGroups?: boolean;
  showGroups?: boolean; 
  errorMessage?: string;  
  criteria?: { mixerAncienDwwm: boolean; mixerAge: boolean };

}
