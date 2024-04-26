import {
  Directive,
  NgIterable,
  OnInit,
  TemplateRef,
  ViewContainerRef,
  inject,
  input,
} from '@angular/core';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[ngForEmpty]',
  standalone: true,
})
export class NgForEmptyDirective<T> implements OnInit {
  private readonly _vcr = inject(ViewContainerRef);

  ngForOf = input.required<NgIterable<T>>();
  ngForEmpty = input.required<TemplateRef<unknown>>();

  ngOnInit(): void {
    if (this._isEmpty(this.ngForOf())) {
      this._vcr.createEmbeddedView(this.ngForEmpty());
    }
  }

  private _isEmpty(value: NgIterable<T>): boolean {
    return [...value].length === 0;
  }
}
