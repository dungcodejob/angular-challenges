import {
  Directive,
  DoCheck,
  EmbeddedViewRef,
  NgIterable,
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
export class NgForEmptyDirective<T> implements DoCheck {
  private readonly _vcr = inject(ViewContainerRef);

  ngForOf = input.required<NgIterable<T>>();
  ngForEmpty = input.required<TemplateRef<unknown>>();

  private ref?: EmbeddedViewRef<unknown>;

  ngDoCheck(): void {
    this.ref?.destroy();

    if (this._isEmpty(this.ngForOf())) {
      this.ref = this._vcr.createEmbeddedView(this.ngForEmpty());
    } else {
      this.ref?.destroy();
    }
  }

  private _isEmpty(value?: NgIterable<T>): boolean {
    if (value) {
      return [...value].length === 0;
    }

    return true;
  }
}
