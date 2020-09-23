import { JwtHelperService } from "@auth0/angular-jwt";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "../models/user";
import { Router } from "@angular/router";

@Injectable()
export class LoginService {
  endpoint: string = "http://localhost:54477/api/user/";
  helper: JwtHelperService = new JwtHelperService();
  token: string;
  decodedToken: any;
  badRequest: boolean;

  constructor(private http: HttpClient, private route: Router) {
    this.http = http;
    this.token = localStorage.getItem("token");
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
        () => {
          this.badRequest = true;
        }
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

  isUserTokenExpired() {
    const token = localStorage.getItem("token");
    return this.helper.isTokenExpired(token);
  }

  decodeToken() {
    const token = localStorage.getItem("token");
    this.decodedToken = this.helper.decodeToken(token);
  }
}
