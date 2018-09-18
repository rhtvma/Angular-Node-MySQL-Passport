import {Component, OnInit, ViewChild, AfterViewInit, OnDestroy} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {AuthService} from '../shared/auth/auth.service';
import {ToastrService} from '../shared/services/toastr.service';
import {ActivatedRoute, Router} from '@angular/router';
import {LoginFormComponent} from './form/login-form.component';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    providers: [ToastrService]
})

export class LoginComponent implements OnInit, AfterViewInit, OnDestroy {

    @ViewChild(LoginFormComponent) loginFormData;
    loginForm: any;
    model: any;

    constructor(private _authService: AuthService,
                private router: Router,
                private _toastrService: ToastrService) {
    }

    ngOnInit() {
        this._toastrService.clearToast();
        this._toastrService.dismissToastOnClick(`Username: 12345@gmail.com, Password: 12345`, `Credentials`);
        if (this._authService.isLoggedIn()) {
            this.router.navigate(['home']);
        }
    }

    ngAfterViewInit() {
        this.model = this.loginFormData.myform;
    }

    onSubmit() {
        this.loginFormData.onSubmit();
    }

    ngOnDestroy() {
        this._toastrService.clearToast();
    }

    login() {
        if (!this.model.valid) {
            this.onSubmit();
            console.log("Form is invalid!");
            return;
        }
        if (this._authService.isLoggedIn()) {
            this.router.navigate(['home']);
            return;
        } else {
            let data = this.model["controls"];
            this._authService.signinUser(data.email.value, data.password.value)
                .subscribe(
                    (data: { data: any, response: string, response_message: Array<any> }) => {
                        if (data.response === 'success') {
                            this._toastrService.typeSuccess(data.response_message);
                            this.router.navigate(['home']);
                        }
                    },
                    (error) => {
                        this._toastrService.typeError(error.error.response_message || error.status_text);
                        this.router.navigate(['login']);
                    });
        }
    }
}