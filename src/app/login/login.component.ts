import { element } from "protractor";
import { Component, DoCheck, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from "@angular/forms";
import { LoginService } from "./login.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";

@Component({
  selector: "login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  invalidUser: boolean;
  registerMode: any;
  title: string;
  // badRequest: boolean;

  dropDown: any[] = [
    { name: "Edit", value: 1 },
    { name: "View", value: 2 },
    { name: "Restricted", value: 3 },
  ];

  constructor(
    private fb: FormBuilder,
    private service: LoginService,
    private snackbar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.registerMode = this.route.snapshot.data["registerMode"];
    this.initialiseForm();
  }

  get username(): AbstractControl {
    return this.loginForm.controls["username"];
  }

  get password(): AbstractControl {
    return this.loginForm.controls["password"];
  }

  get permissionLevel(): AbstractControl {
    return this.loginForm.controls["permissionLevel"];
  }

  ngOnInit() {
    this.title = this.registerMode == true ? "Register" : "Log In";
  }

  get badRequest(): boolean {
    return this.service.badRequest ? true : false;
  }

  initialiseForm() {
    if (this.registerMode) {
      this.loginForm = this.fb.group({
        username: ["", [Validators.required]],
        password: ["", Validators.required],
        permissionLevel: ["", Validators.required],
      });
    } else {
      this.loginForm = this.fb.group({
        username: ["", [Validators.required]],
        password: ["", Validators.required],
      });
    }
  }

  private model() {
    return {
      username: this.username.value,
      password: this.password.value,
      permissionLevel: this.registerMode ? this.permissionLevel.value : null,
    };
  }

  submit() {
    if (this.loginForm.valid) {
      let model = this.model();
      this.service.login(model.username, model.password);
    }
  }

  registerUser() {
    if (this.loginForm.valid) {
      let model = this.model();
      this.service.registerUser(
        model.username,
        model.password,
        model.permissionLevel
      );
      this.snackbar.open("User Registered")._dismissAfter(1000);
      this.router.navigate(["/login"]);
    }
  }
}
