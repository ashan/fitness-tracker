import { Directive } from "@angular/core";
import { NG_VALIDATORS, Validator, AbstractControl } from "@angular/forms";

@Directive({
  selector: "[passwordValidator][ngModel]",
  providers: [
    { provide: NG_VALIDATORS, useExisting: PasswordValidator, multi: true }
  ]
})
export class PasswordValidator implements Validator {
  validate(c: AbstractControl): { [key: string]: any } {
    if (!c.dirty) return null;
    var pwd = c.value;
    if (
      pwd.length < 6 ||
      pwd.replace(/[^0-9]/g, "").length == 0 ||
      pwd.replace(/[^A-Z]/g, "").length == 0
    ) {
      return {
        password: {
          errorMessage:
            "Password has to be 6 characters long with at least one capital letter and a number"
        }
      };
    }
    return null;
  }

  constructor() {}
}
