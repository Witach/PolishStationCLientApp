import {Validators} from '@angular/forms';

export const fieldsDefs = {
  email: ['', Validators.compose([Validators.required, Validators.email])],
  password: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(32)])],
  username: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_]*$')])],
  town: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(32)])],
  street: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(32)])],
  streetNumber: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(32)])],
  name: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(32)])],
  dkn: ['', Validators.compose([Validators.pattern('^[0-9]+$')])],
  postalCode: ['', Validators.compose([Validators.required, Validators.pattern('\\d{2}-\\d{3}')])],
  province: [''],
};
