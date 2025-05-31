
import { Injectable } from '@angular/core';
import { Group } from './models/group.model';
import { Person } from './models/person.model';

@Injectable({ providedIn: 'root' })
export class GroupsService {
    constructor() { }
    generateGroups(
        persons: Person[],
        numberOfGroups: number,
        criteria: { mixerAncienDwwm: boolean; mixerAge: boolean },
        listId: string
    ): Group[] {
        const groups: Group[] = Array.from({ length: numberOfGroups }, (_, i) => ({
            id: `${listId}-group-${i + 1}`, // id obligatoire
            name: `Groupe ${i + 1}`,
            persons: []
        }));

        if (!persons || persons.length === 0) {
            return groups;
        }

        if (persons.length < numberOfGroups) {
            persons.forEach((person, idx) => {
                groups[idx].persons.push(person);
            });
            return groups;
        }

        if (!criteria.mixerAncienDwwm && !criteria.mixerAge) {
            return this.generateWithoutCriteria(persons, numberOfGroups);
        }

        if (criteria.mixerAncienDwwm) {
            return this.generateByAncienDwwm(persons, numberOfGroups);
        }

        if (criteria.mixerAge) {
            return this.generateByAgeOnly(persons, numberOfGroups);
        }

        return groups;
    }

    private generateWithoutCriteria(persons: Person[], numberOfGroups: number): Group[] {
        const shuffled = this.shuffleArray([...persons]);
        const groups = this.initEmptyGroups(numberOfGroups);
        this.zigzagDistribute(shuffled, groups);
        return groups;
    }

    private generateByAncienDwwm(persons: Person[], numberOfGroups: number): Group[] {
        const anciens = persons.filter(p => p.isFormerDwwm);
        const autres = persons.filter(p => !p.isFormerDwwm);
        const groups = this.initEmptyGroups(numberOfGroups);

        this.zigzagDistribute(this.shuffleArray(anciens), groups);

        const sortedAutres = autres.sort((a, b) => {
            const ageA = a.age ?? 0;
            const ageB = b.age ?? 0;
            return ageA - ageB;
        });
        const offset = Math.floor(Math.random() * numberOfGroups);

        sortedAutres.forEach((p, i) => {
            groups[(i + offset) % numberOfGroups].persons.push(p);
        });


        return groups;
    }

    private generateByAgeOnly(persons: Person[], numberOfGroups: number): Group[] {
        const sorted = persons.sort((a, b) => {
            const ageA = a.age ?? 0;
            const ageB = b.age ?? 0;
            return ageA - ageB;
        });
        const buckets: Person[][] = Array.from({ length: numberOfGroups }, () => []);

        sorted.forEach((p, i) => {
            buckets[i % numberOfGroups].push(p);
        });

        const flat = this.shuffleArray(buckets.flat());
        const groups = this.initEmptyGroups(numberOfGroups);

        flat.forEach((p, i) => {
            groups[i % numberOfGroups].persons.push(p);
        });

        return groups;
    }

    private zigzagDistribute(persons: Person[], groups: Group[]) {
        let i = 0, dir = 1;
        for (const p of persons) {
            groups[i].persons.push(p);
            i += dir;
            if (i === groups.length) { dir = -1; i = groups.length - 2; }
            else if (i < 0) { dir = 1; i = 1; }
        }
    }

    private initEmptyGroups(number: number): Group[] {
        return Array.from({ length: number }, (_, i) => ({
            id: `group-${i + 1}`,
            name: `Groupe ${i + 1}`,
            persons: []
        }));
    }

    private shuffleArray<T>(arr: T[]): T[] {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

    saveGroupsToHistory(listId: string, groups: Group[]) {
        const history = JSON.parse(localStorage.getItem(`groups-${listId}`) || '[]');
        history.push(groups);
        localStorage.setItem(`groups-${listId}`, JSON.stringify(history));
    }

    getHistory(listId: string): Group[][] {
        return JSON.parse(localStorage.getItem(`groups-${listId}`) || '[]');
    }

    clearHistory(listId: string) {
        localStorage.removeItem(`groups-${listId}`);
    }

    updateCustomGroupName(listId: string, index: number, name: string) {
        const key = `groups-names-${listId}`;
        const data = JSON.parse(localStorage.getItem(key) || '{}');
        data[index] = name;
        localStorage.setItem(key, JSON.stringify(data));
    }

    getCustomGroupNames(listId: string): { [key: number]: string } {
        return JSON.parse(localStorage.getItem(`groups-names-${listId}`) || '{}');
    }
    deleteTirage(listId: string, indexToDelete: number): void {
        const history: Group[][] = JSON.parse(localStorage.getItem(`groups-${listId}`) || '[]');
        history.splice(indexToDelete, 1);

        localStorage.setItem(`groups-${listId}`, JSON.stringify(history));

        const customNames: { [key: number]: string } = JSON.parse(localStorage.getItem(`groups-names-${listId}`) || '{}');
        delete customNames[indexToDelete];

        const reorderedNames: { [key: number]: string } = {};
        Object.keys(customNames).forEach(key => {
            const num = +key;
            if (num > indexToDelete) {
                reorderedNames[num - 1] = customNames[num];
            } else if (num < indexToDelete) {
                reorderedNames[num] = customNames[num];
            }
        });

        localStorage.setItem(`groups-names-${listId}`, JSON.stringify(reorderedNames));
    }

}
