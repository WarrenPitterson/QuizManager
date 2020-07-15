import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Users } from "../models/user";

@Injectable()
export class UserService {
  public api = "http://localhost:8080/api";
  public usersApi = `${this.api}/users`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Array<Users>> {
    return this.http.get<Array<Users>>(this.usersApi);
  }

  get(id: string) {
    return this.http.get(`${this.usersApi}/${id}`);
  }

  save(users: Users): Observable<Users> {
    let result: Observable<Users>;
    if (users.id) {
      result = this.http.put<Users>(`${this.usersApi}/${users.id}`, users);
    } else {
      result = this.http.post<Users>(this.usersApi, users);
    }
    return result;
  }

  delete(id: number) {
    return this.http.delete(`${this.usersApi}/${id.toString()}`);
  }
}
