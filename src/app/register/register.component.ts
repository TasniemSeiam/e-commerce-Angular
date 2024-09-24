import { NgFor, NgForOf, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormArray,
  ReactiveFormsModule,
  Validators,
  ValidatorFn,
} from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink,NgIf,NgForOf,NgFor ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {

  registerForm: FormGroup;
  formSubmitted = false;

  constructor() {
    this.registerForm = new FormGroup(
      {
        email: new FormControl('', [Validators.required, Validators.email]),
        name: new FormControl('', [Validators.required]),
        username: new FormControl('', [
          Validators.required,
          this.noSpaceValidator,
        ]),
        password: new FormControl('', [
          Validators.required,
          this.passwordValidator,
        ]),
        confirmPassword: new FormControl('', [Validators.required]),
        addresses: new FormArray([this.createAddressGroup()]), // FormArray for addresses
      },
      {
        validators: this.passwordMatchValidator,
      }
    );
  }

  // Method to create an address FormGroup
  createAddressGroup(): FormGroup {
    return new FormGroup({
      address: new FormControl('', Validators.required),
      street: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
    });
  }

  // Getter to access the addresses FormArray
  get addresses(): FormArray {
    return this.registerForm.get('addresses') as FormArray;
  }

  // Method to add a new address to the FormArray
  addAddress(): void {
    this.addresses.push(this.createAddressGroup());
  }

  // Method to remove an address from the FormArray by index
  removeAddress(index: number): void {
    if (this.addresses.length > 1) {
      this.addresses.removeAt(index);
    }
  }

  // Validator to check for spaces in the username
  noSpaceValidator(control: AbstractControl): { [key: string]: any } | null {
    return control.value && control.value.indexOf(' ') !== -1
      ? { containsSpace: true }
      : null;
  }

  // Validator for password strength
  passwordValidator(control: AbstractControl): { [key: string]: any } | null {
    const password = control.value;
    const pattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return pattern.test(password) ? null : { weakPassword: true };
  }

  // Validator to match password and confirm password
  passwordMatchValidator: ValidatorFn = (
    group: AbstractControl
  ): { [key: string]: any } | null => {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  };

  // Submit handler for the form
  handelSubmit() {
    this.formSubmitted = true;
    if (this.registerForm.valid) {
      console.log('Form Submitted!', this.registerForm.value);
    } else {
      console.log('Form is invalid');
    }
  }
}
