import { Pipe, type PipeTransform } from '@angular/core';

type Args<T = unknown> = T[];
type FunctionWithArgs<T extends Args, R> = (...args: T) => R;
type FunctionWithoutArgs<R> = () => R;
type Function<T extends unknown[], R> =
  | FunctionWithArgs<T, R>
  | FunctionWithoutArgs<R>;

@Pipe({
  name: 'function',
  standalone: true,
})
export class FunctionPipe implements PipeTransform {
  transform<R>(fn: FunctionWithoutArgs<R>): R;
  transform<T extends Args, R>(fn: FunctionWithArgs<T, R>, data: T): R;
  transform<T extends Args, R>(fn: Function<T, R>, data?: T): R {
    if (data) {
      return fn(...data);
    }
    return fn();
  }
}
