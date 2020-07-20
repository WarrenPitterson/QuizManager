import { LoginService } from "./../login/login.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  constructor(private service: LoginService) {}

  get loggedIn(): boolean {
    return this.service.permission != null ? true : false;
  }

  ngOnInit(): void {}
}
