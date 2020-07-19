import { Injectable, EventEmitter, Output } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../models/user";
import { ActivatedRoute, Router } from "@angular/router";

@Injectable()
export class LoginService {
  endpoint: string = "http://localhost:54477/api/user/";
  permission: number;
  invalidUserError: boolean;

  constructor(private http: HttpClient, private route: Router) {
    this.http = http;
  }
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.endpoint);
  }

  login(userName: string, password: string) {
    return this.http
      .post<any>(this.endpoint + "login", {
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
}
