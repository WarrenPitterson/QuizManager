import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  AbstractControl,
} from "@angular/forms";

@Component({
  selector: "login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.loginForm = fb.group({
      username: ["", [Validators.required]],
      password: ["", Validators.required],
    });
  }

  get username(): AbstractControl {
    return this.loginForm.controls["username"];
  }

  get password(): AbstractControl {
    return this.loginForm.controls["password"];
  }

  ngOnInit() {}

  private model() {
    return {
      username: this.username.value,
      password: this.password.value,
    };
  }

  submit() {
    if (this.username.valid && this.password.valid) {
      let model = this.model();
    }
    //call login api endpoint with model and check username and password exist in database
  }
}
