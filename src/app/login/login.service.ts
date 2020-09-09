import { PermissionLevel } from "./../shared/permissionLevel";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "../models/user";
import { Router } from "@angular/router";

@Injectable()
export class LoginService {
  endpoint: string = "http://localhost:54477/api/user/";
  permission: number;
  invalidUserError: boolean;

  constructor(private http: HttpClient, private route: Router) {
    this.http = http;
  }

  login(userName: string, password: string) {
    return this.http
      .post<User>(this.endpoint + "login", {
        userName,
        password,
      })
      .subscribe(
        (data) => {
          this.permission = data.permission;
          this.route.navigate(["/main-quiz"]);
          this.invalidUserError = false;
        },
        () => {
          this.invalidUserError = true;
        }
      );
  }

  registerUser(userName: string, password: string, permission: number) {
    debugger;

    return this.http
      .post<User>(this.endpoint + "register", {
        userName,
        password,
        permission,
      })
      .subscribe(
        (data) => {
          console.log(data);
          // Add redirect to welcome or login
          // this.route.navigate(["/main-quiz"]);
        },
        () => {}
      );
  }
}
