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

  quizsEndpoint: string = "http://localhost:54477/api/quizs/";
  quizsArray: Quizzes[];

  constructor(private http: HttpClient) {
    this.http = http;
  }

  editQuestion(model, questionId: number) {
    return this.http
      .put<Questions>(this.questionEndpoint + questionId, model)
      .subscribe((data) => {
        console.log(data);
      });
  }

  deleteQuestion(questionId: number) {
    return this.http
      .delete<Questions>(this.questionEndpoint + questionId)
      .subscribe((data) => {
        console.log(data);
      });
  }

  getQuestionsForQuiz(id: number) {
    return this.http
      .get<Questions[]>(this.quizEndpoint + id)
      .subscribe((data) => {
        this.quizArray = data;
      });
  }

  getAllQuizs() {
    debugger;
    return this.http.get<Quizzes[]>(this.quizsEndpoint).subscribe((data) => {
      this.quizsArray = data;
    });
  }
}
