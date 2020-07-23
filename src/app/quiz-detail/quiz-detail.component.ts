import { PermissionLevel } from "./../shared/permissionLevel";
import { EditQuestionComponent } from "../edit-question/edit-question.component";
import { Questions } from "./../models/questions";
import { QuizService } from "./quiz.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { LoginService } from "../login/login.service";

@Component({
  selector: "quiz-detail",
  templateUrl: "./quiz-detail.component.html",
  styleUrls: ["./quiz-detail.component.scss"],
})
export class QuizDetailComponent implements OnInit {
  quizId: number;
  allQuestions: Questions[];
  quiz: Questions;

  constructor(
    private route: ActivatedRoute,
    private service: QuizService,
    private loginService: LoginService,
    private dialog: MatDialog
  ) {
    this.quizId = this.route.snapshot.params.id;
    this.service.quizId = this.quizId;
  }

  get fullPermission() {
    return this.loginService.permission == PermissionLevel.full;
  }
  get partialPermission() {
    return this.loginService.permission == PermissionLevel.partial;
  }
  get minimumPermission() {
    return this.loginService.permission == PermissionLevel.minimum;
  }

  ngOnInit() {
    this.loadQuizDetails();
    this.allQuestions = this.service.quizArray;
    // this.service
    //   .getQuizDetails()
    //   .subscribe((response) => (this.quiz = response));
  }

  edit() {
    this.dialog.open(EditQuestionComponent, {
      data: this.quiz.questionId,
      width: "30vw",
    });
  }

  loadQuizDetails() {
    this.service.getQuiz(this.quizId);
  }
}
