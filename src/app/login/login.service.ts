import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../models/user";

@Injectable()
export class LoginService {
  url: string = "http://localhost:54477/api/user/";
  constructor(private http: HttpClient) {
    this.http = http;
  }
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }
}
