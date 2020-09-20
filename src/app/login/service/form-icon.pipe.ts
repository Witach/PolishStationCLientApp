import {Pipe, PipeTransform} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Pipe({
  name: 'validFormIcon',
  pure: false
})
export class ValidFormIconPipe implements PipeTransform {

  successIcon = 'sentiment_very_satisfied';
  failIcon = 'sentiment_very_dissatisfied';

  transform(value: FormGroup, fieldName: string): string {
    return value.controls[fieldName].valid ? this.successIcon : this.failIcon;
  }

}
