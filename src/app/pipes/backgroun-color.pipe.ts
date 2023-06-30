import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'backgroundColor'
})
export class BackgroundColorPipe implements PipeTransform {

  transform(value: number): string {
    if (value >= 4) {
      return 'green';
    }
    if (value >= 2) {
      return 'yellow';
    } else {
      return 'red';
    }
  }

}
