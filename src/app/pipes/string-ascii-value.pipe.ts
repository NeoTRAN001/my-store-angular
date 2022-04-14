import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stringAsciiValue'
})
export class StringAsciiValuePipe implements PipeTransform {

  transform(value: string): string {
    return value.split('').map(c => c.charCodeAt(0)).join();
  }

}
