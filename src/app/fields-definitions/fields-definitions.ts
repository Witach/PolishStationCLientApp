import {Validators} from '@angular/forms';

export const fieldsDefs = {
  email: ['', Validators.compose([Validators.required, Validators.email])],
  password: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(32)])],
  username: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_]*$')])]
};
