import { FormGroup } from '@angular/forms';
export function containsNumberCharacterValidator(form: FormGroup){
  const specialChars = /\d/;

  const password = form.get('password')?.value ?? '';

  if(!specialChars.test(password)){
    form.get('password').setErrors(containsNumberCharacterValidator);
    return {doesntHaveNumberCharacter: true}
  } else {
    return null;
  }
}
