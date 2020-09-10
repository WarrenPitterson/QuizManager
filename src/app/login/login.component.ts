import { Component, DoCheck } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from "@angular/forms";
import { LoginService } from "./login.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements DoCheck {
  loginForm: FormGroup;
  invalidUser: boolean;
  newUser: boolean = true;
  title: string;

  dropDown: any[] = [
    { name: "Edit", value: 1 },
    { name: "View", value: 2 },
    { name: "Restricted", value: 3 },
  ];

  constructor(
    private fb: FormBuilder,
    private service: LoginService,
    private snackbar: MatSnackBar
  ) {
    if (this.newUser) {
      this.loginForm = fb.group({
        userName: ["", [Validators.required]],
        password: ["", Validators.required],
        permissionLevel: [""],
      });
    } else {
      this.loginForm = fb.group({
        userName: ["", [Validators.required]],
        password: ["", Validators.required],
      });
    }
  }

  get userName(): AbstractControl {
    return this.loginForm.controls["userName"];
  }

  get password(): AbstractControl {
    return this.loginForm.controls["password"];
  }
  get permissionLevel(): AbstractControl {
    return this.loginForm.controls["permissionLevel"];
  }

  ngDoCheck() {
    this.invalidUser = this.service.invalidUserError;
    this.title = this.newUser == true ? "Register" : "Log In";
  }

  private model() {
    return {
      userName: this.userName.value,
      password: this.password.value,
      permissionLevel: this.permissionLevel.value,
    };
  }

  submit() {
    debugger;
    if (this.loginForm.valid) {
      let model = this.model();
      this.service.login(model.userName, model.password);
    }
  }

  registerUser() {
    if (this.loginForm.valid) {
      let model = this.model();
      this.service.registerUser(
        model.userName,
        model.password,
        model.permissionLevel
      );
      this.snackbar.open("User Registered")._dismissAfter(1000);
    }
  }

  toggleMode() {
    this.newUser = !this.newUser;
  }
}
