import { Quizzes } from "./../models/quizzes";
import { Questions } from "./../models/questions";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
@Injectable()
export class QuizService {
  questionEndpoint: string = "http://localhost:54477/api/questions/";
  quizEndpoint: string = "http://localhost:54477/api/questions/quiz/";
  quizId: number;
  quizArray: Questions[];

  constructor(private http: HttpClient) {
    this.http = http;
  }

  // getQuestion() {
  //   return this.http.get<Questions>(this.questionEndpoint + this.quizId);
  // }

  editQuestion(model, questionId: number) {
    return this.http
      .put<Questions>(this.questionEndpoint + questionId, model)
      .subscribe((data) => {
        console.log(data);
      });
  }

  getQuiz(id) {
    return this.http
      .get<Questions[]>(this.quizEndpoint + id)
      .subscribe((data) => (data = this.quizArray));
  }
}
