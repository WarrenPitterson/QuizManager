import { HttpClient } from "@angular/common/http";
import { Questions } from "./../models/questions";
import { Injectable } from "@angular/core";
@Injectable()
export class QuizDetailService {
  endpoint: string = "http://localhost:54477/api/questions/";
  constructor(private http: HttpClient) {
    this.http = http;
  }

  getQuizDetails(QuizId: number) {
    return this.http.get<Questions[]>(this.endpoint + QuizId);
  }
}
