import { PermissionLevel } from "./../shared/permissionLevel";
import { EditQuestionComponent } from "../edit-question/edit-question.component";
import { Questions } from "./../models/questions";
import { QuizService } from "./quiz.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
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
  columnsToDisplay = [
    "id",
    "question",
    "correct",
    "incorrect1",
    "incorrect2",
    "incorrect3",
    "actions",
  ];
  indexArray: number[] = [1, 2, 3, 4];
  model: number;
  count = 0;

  constructor(
    private route: ActivatedRoute,
    private service: QuizService,
    private loginService: LoginService,
    private dialog: MatDialog
  ) {
    this.quizId = this.route.snapshot.params.id;
    this.service.quizId = this.quizId;
    this.service.getQuestionsForQuiz(this.quizId);
    this.loadQuestion();
  }

  get editPermission() {
    return this.loginService.permission == PermissionLevel.edit;
  }
  get restrictedPermission() {
    return this.loginService.permission == PermissionLevel.restricted;
  }

  ngOnInit() {
    // this.service.getQuiz(this.quizId);
    // this.loadQuestion();
  }

  test() {
    for (let i = 0, len = this.allQuestions.length; i < len; i++) {
      // this.model = this.indexArray[i];
    }
  }

  addQuestion() {
    console.log("add to be implemented");
  }

  edit(questionId: number) {
    this.dialog.open(EditQuestionComponent, {
      data: this.allQuestions[0].questionId,
      width: "30vw",
    });
  }

  delete(questionId: number) {
    this.service.deleteQuestion(questionId);
  }

  loadQuestion() {
    setTimeout(() => {
      this.allQuestions = this.service.quizArray;
    }, 100);
  }
}
