import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,NgIf,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  formIsSubmitted = false; 
  handelSubmit(form: any) {
    this.formIsSubmitted = true;
    if (form.valid) {
      console.log('Form Submitted!', form.value);
    } else {
      console.log('Form is invalid');
    }
  }
}
