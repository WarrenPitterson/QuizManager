import { Quizzes } from "./../models/quizzes";
import { QuizService } from "./../quiz-detail/quiz.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "main-quiz",
  templateUrl: "./main-quiz.component.html",
  styleUrls: ["./main-quiz.component.scss"],
})
export class MainQuizComponent implements OnInit {
  allQuizs: Quizzes[];

  constructor(private service: QuizService) {
    this.service.getAllQuizs();
  }

  ngOnInit(): void {}
}
