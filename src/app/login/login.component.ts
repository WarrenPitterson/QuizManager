import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: "login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    username: new FormControl(""),
    password: new FormControl(""),
  });

  constructor() {}

  ngOnInit(): void {}

  submit() {
    //call login api endpoint
  }
}
