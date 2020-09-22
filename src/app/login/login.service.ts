import { JwtHelperService } from "@auth0/angular-jwt";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "../models/user";
import { Router } from "@angular/router";

@Injectable()
export class LoginService {
  endpoint: string = "http://localhost:54477/api/user/";
  decodedToken: any;
  helper: JwtHelperService = new JwtHelperService();

  constructor(private http: HttpClient, private route: Router) {
    this.http = http;
  }

  login(username: string, password: string) {
    return this.http
      .post<User>(this.endpoint + "login", {
        username,
        password,
      })
      .subscribe(
        (data) => {
          localStorage.setItem("token", data.tokenString);

          setTimeout(() => {
            this.route.navigate(["/main-quiz"]);
          }, 200);
        },
        () => {}
      );
  }

  registerUser(username: string, password: string, permission: number) {
    return this.http
      .post<User>(this.endpoint + "register", {
        username,
        password,
        permission,
      })
      .subscribe(
        (data) => {
          console.log(data);
        },
        () => {}
      );
  }

  userTokenExpired() {
    const token = localStorage.getItem("token");
    this.decodedToken = this.helper.decodeToken(token);
    console.log(this.decodedToken.role);
    console.log(this.decodedToken);
    return this.helper.isTokenExpired(token);
  }
}
