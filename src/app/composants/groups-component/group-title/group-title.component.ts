import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-group-title',
  standalone: true,
  templateUrl: './group-title.component.html',
  styleUrls: ['./group-title.component.css']
})
export class GroupTitleComponent {
  @Input() title: string = '';
}
