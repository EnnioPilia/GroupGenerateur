
import { Person } from './person.model';
import { Group } from './group.model';

export interface List {
  id: string;
  name: string;
  persons: Person[];
  draws: number;
  generatedGroups?: Group[];  // <-- ici generatedGroups est de type Group[]
  groupsSaved?: boolean;
  groupNames?: string[];
  showSavedGroups?: boolean;
    showGroups?: boolean; // ✅ Ajouté ici
  errorMessage?: string;  // <-- ajout ici

}
