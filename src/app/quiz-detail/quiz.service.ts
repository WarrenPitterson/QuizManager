import { Questions } from "./../models/questions";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
@Injectable()
export class QuizService {
  endpoint: string = "http://localhost:54477/api/questions/";
  quizId: number;

  constructor(private http: HttpClient) {
    this.http = http;
  }

  getQuizDetails() {
    return this.http.get<Questions>(this.endpoint + this.quizId);
  }

  edit(model, quizId: number) {
    return this.http
      .put<Questions>(this.endpoint + quizId, model)
      .subscribe((data) => {
        console.log(data);
      });
  }
}
