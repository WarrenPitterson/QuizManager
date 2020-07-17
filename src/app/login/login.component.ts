import { Component, OnInit, OnChanges } from "@angular/core";
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
export class LoginComponent implements OnInit, OnChanges {
  loginForm: FormGroup;
  isAuthenticated = false;
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

  ngOnInit() {
    this.service.getAllUsers().subscribe(
      (response) => (this.user = response)
      //(res) => console.log("HTTP response", res),
      //(err) => console.log("HTTP Error", err),
      // () => console.log("HTTP request completed.")
    );
  }

  ngOnChanges() {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    console.log(this.isAuthenticated);
  }

  private model() {
    return {
      userName: this.userName.value,
      password: this.password.value,
    };
  }

  submit() {
    debugger;
    if (this.userName.valid && this.password.valid) {
      let model = this.model();

      this.user.forEach((user) => {
        if (
          model.password == user.password &&
          model.userName == user.userName
        ) {
          this.isAuthenticated = true;
        }
      });

      // if (
      //   model.username == this.user[0].username &&
      //   model.password == this.user[0].password
      // ) {
      //   this.isAuthenticated = true;
      // }

      //possibly just check the model exists on the database
    }

    // if (this.isAuthenticated) {
    //   //load main page
    // }
    //call login api endpoint with model and check username and password exist in database
  }
}
