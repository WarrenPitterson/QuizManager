import { MatSnackBar } from "@angular/material/snack-bar";
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
  quizName: string;
  columnsToDisplay: string[];
  permission: string;
  lettersPrefix: string[] = ["A", "B", "C", "D", "E", "F"];

  constructor(
    private route: ActivatedRoute,
    private service: QuizService,
    private loginService: LoginService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar
  ) {
    this.quizId = this.route.snapshot.params.id;
    this.service.quizId = this.quizId;
  }

  ngOnInit() {
    this.quizId = this.route.snapshot.params.id;
    this.service.quizId = this.quizId;
    this.quizName = this.route.snapshot.params.name;

    this.service.getQuestionsForQuiz(this.quizId);
    this.loadQuestion();

    this.loginService.decodeToken();
    this.permission = this.loginService.decodedToken.role;
    this.setColumns();
  }

  get editPermission() {
    return this.permission === "Edit" ? true : false;
  }
  get viewPermission() {
    return this.permission === "View" ? true : false;
  }

  setColumns() {
    if (this.editPermission) {
      this.columnsToDisplay = [
        "id",
        "question",
        "correct",
        "incorrect1",
        "incorrect2",
        "incorrect3",
        "actions",
      ];
    } else if (this.viewPermission) {
      this.columnsToDisplay = [
        "id",
        "question",
        "correct",
        "incorrect1",
        "incorrect2",
        "incorrect3",
      ];
    } else {
      this.columnsToDisplay = ["id", "question"];
    }
  }

  addQuestion() {
    this.dialog.open(EditQuestionComponent, {
      width: "30vw",
    });
  }

  edit(questionId: number) {
    this.dialog.open(EditQuestionComponent, {
      data: questionId,
      width: "30vw",
    });
  }

  delete(questionId: number) {
    this.service.deleteQuestion(questionId);
    this.snackbar.open("Question Deleted, Please Refresh")._dismissAfter(1000);
  }

  loadQuestion() {
    setTimeout(() => {
      this.allQuestions = this.service.quizArray;
    }, 350);
  }
}
