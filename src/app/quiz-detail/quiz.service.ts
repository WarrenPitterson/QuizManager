import { Quizzes } from "./../models/quizzes";
import { Questions } from "./../models/questions";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
@Injectable()
export class QuizService {
  questionEndpoint: string = "http://localhost:54477/api/questions/";
  quizEndpoint: string = "http://localhost:54477/api/questions/quiz/";
  mainQuizPageEndpoints: string = "http://localhost:54477/api/quizs/";

  quizId: number;
  quizArray: Questions[];

  quizsArray: Quizzes[];

  constructor(private http: HttpClient) {
    this.http = http;
  }

  editQuestion(model: Questions) {
    return this.http
      .put<Questions>(this.questionEndpoint + model.questionId, model)
      .subscribe((data) => {});
  }

  deleteQuestion(questionId: number) {
    return this.http
      .delete<Questions>(this.questionEndpoint + questionId)
      .subscribe((data) => {});
  }

  getQuestionsForQuiz(id: number) {
    return this.http
      .get<Questions[]>(this.quizEndpoint + id)
      .subscribe((data) => {
        this.quizArray = data;
      });
  }

  getAllQuizs() {
    return this.http
      .get<Quizzes[]>(this.mainQuizPageEndpoints)
      .subscribe((data) => {
        this.quizsArray = data;
      });
  }

  deleteQuiz(quizId: number) {
    return this.http
      .delete<Quizzes>(this.mainQuizPageEndpoints + quizId)
      .subscribe((data) => {});
  }

  addQuiz(name: string) {
    return this.http
      .post<Quizzes>(this.mainQuizPageEndpoints, { name })
      .subscribe((data) => {});
  }

  addQuestion(questions: Questions) {
    return this.http
      .post<Questions>(this.questionEndpoint, questions)
      .subscribe((data) => {});
  }
}
