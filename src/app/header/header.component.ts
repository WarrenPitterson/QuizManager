import { LoginService } from "./../login/login.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  constructor(private route: Router, private loginService: LoginService) {}

  get loggedIn(): boolean {
    return !this.loginService.isUserTokenExpired();
  }

  ngOnInit(): void {}

  logout() {
    localStorage.removeItem("token");
    this.route.navigate(["/login"]);
  }
}
