import { Component, OnInit, DoCheck } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from "@angular/forms";
import { LoginService } from "./login.service";
import { User } from "../models/user";

@Component({
  selector: "login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements DoCheck {
  loginForm: FormGroup;
  invalidUser: boolean;
  user: User[] = [];

  constructor(private fb: FormBuilder, private service: LoginService) {
    this.loginForm = fb.group({
      userName: ["", [Validators.required]],
      password: ["", Validators.required],
    });
  }

  get userName(): AbstractControl {
    return this.loginForm.controls["userName"];
  }

  get password(): AbstractControl {
    return this.loginForm.controls["password"];
  }

  ngDoCheck() {
    this.invalidUser = this.service.invalidUserError;
  }

  private model() {
    return {
      userName: this.userName.value,
      password: this.password.value,
    };
  }

  submit() {
    if (this.userName.valid && this.password.valid) {
      let model = this.model();
      this.service.login(model.userName, model.password);
    }
  }
}
