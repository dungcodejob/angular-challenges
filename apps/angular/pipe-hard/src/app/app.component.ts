import { NgFor } from '@angular/common';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FunctionPipe } from './function.pipe';
import { PersonUtilsPipe } from './person.pipe';
import { PersonUtils } from './person.utils';

@Component({
  standalone: true,
  imports: [NgFor, FunctionPipe, PersonUtilsPipe],
  selector: 'app-root',
  template: `
    <div *ngFor="let activity of activities">
      {{ activity.name }} :
      <div
        *ngFor="let person of persons; let index = index; let isFirst = first">
        {{ showName | function: [person.name, index] }}
        {{ isAllowed | function: [person.age, isFirst, activity.minimumAge] }}
        {{ test | function }}
      </div>
    </div>

    <div *ngFor="let activity of activities">
      {{ activity.name }} :
      <div
        *ngFor="let person of persons; let index = index; let isFirst = first">
        {{ person.name | person: 'showName' : index }}
        {{ person.age | person: 'isAllowed' : isFirst : activity.minimumAge }}
      </div>
    </div>

    <button (click)="onClick()">click</button>
  `,
})
export class AppComponent {
  private readonly _cdr = inject(ChangeDetectorRef);

  onClick() {
    this._cdr.markForCheck();
  }
  persons = [
    { name: 'Toto', age: 10 },
    { name: 'Jack', age: 15 },
    { name: 'John', age: 30 },
  ];

  activities = [
    { name: 'biking', minimumAge: 12 },
    { name: 'hiking', minimumAge: 25 },
    { name: 'dancing', minimumAge: 1 },
  ];
  test() {
    return 1123123123;
  }
  showName = PersonUtils.showName;

  isAllowed = PersonUtils.isAllowed;
}
