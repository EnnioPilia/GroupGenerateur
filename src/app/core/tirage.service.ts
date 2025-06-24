import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Group } from '../core/models/group.model';
import { List } from '../core/models/list.model';



// mettre la logique du parents group ( archivage ) dans ce service
  










// @Injectable({
//   providedIn: 'root'
// })
// export class TirageService {
//   private historySubject = new BehaviorSubject<{ list: List, groups: Group[] }[]>([]);
//   history$ = this.historySubject.asObservable();

//   addToHistory(list: List, groups: Group[]) {
//     const current = this.historySubject.value;
//     this.historySubject.next([...current, { list, groups }]);
//   }
//   getHistory(listId: string): { list: List; groups: Group[] }[] {
//   // exemple fictif :
//   return [
//     {
//       list: { id: listId, tirageName: 'Tirage 1', ... },
//       groups: [[...], [...]]
//     },
//     {
//       list: { id: listId, tirageName: 'Tirage 2', ... },
//       groups: [[...], [...]]
//     }
//   ];
// }


