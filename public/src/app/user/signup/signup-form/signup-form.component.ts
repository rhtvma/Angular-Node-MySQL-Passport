/**
 * Created by rohit on 2018-09-18.
 */
import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
    selector: 'signup-form',
    templateUrl: './signup-form.component.html',
    styleUrls: ['./signup-form.component.css']
})

export class SignupFormComponent implements OnInit {

    signupForm: FormGroup;
    firstname: FormControl;
    lastname: FormControl;
    email: FormControl;
    password: FormControl;
    cpassword: FormControl;
    username: FormControl;

    ngOnInit() {
        this.createFormControls();
        this.createForm();
    }

    createFormControls() {
        this.firstname = new FormControl('', [
            Validators.required,
            Validators.pattern("[^ @]*@[^ @]*")
        ]);
        this.lastname = new FormControl('', [
            Validators.required,
            Validators.pattern("[^ @]*@[^ @]*")
        ]);
        this.email = new FormControl('', [
            Validators.required,
            Validators.pattern("[^ @]*@[^ @]*")
        ]);
        this.password = new FormControl('', [
            Validators.required,
            Validators.minLength(5)
        ]);
        this.cpassword = new FormControl('', [
            Validators.required,
            Validators.minLength(5)
        ]);
        this.username = new FormControl('', [
            Validators.required
        ]);
    }

    createForm() {
        this.signupForm = new FormGroup({
            firstname: this.firstname,
            lastname: this.lastname,
            email: this.email,
            password: this.password,
            cpassword: this.cpassword,
            username: this.username
        });
    }

    onSubmit() {
        console.log('you submitted value: ', this.signupForm.value);
        const formData = this.signupForm["controls"];
        formData['email'].markAsTouched();
        formData['password'].markAsTouched();
    }
}
