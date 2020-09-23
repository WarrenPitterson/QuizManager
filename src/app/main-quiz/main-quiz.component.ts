import { MatSnackBar } from "@angular/material/snack-bar";
import { LoginService } from "./../login/login.service";
import { Quizzes } from "./../models/quizzes";
import { QuizService } from "./../quiz-detail/quiz.service";
import { Component, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";

@Component({
  selector: "main-quiz",
  templateUrl: "./main-quiz.component.html",
  styleUrls: ["./main-quiz.component.scss"],
})
export class MainQuizComponent implements OnInit {
  allQuizs: Quizzes[];
  dataForm: FormGroup;
  username: string;
  permission: string;

  columnsToDisplay: string[];

  constructor(
    private service: QuizService,
    private fb: FormBuilder,
    private loginService: LoginService,
    private snackbar: MatSnackBar
  ) {
    this.service.getAllQuizs();
    this.loadData();
    this.dataForm = fb.group({
      name: ["", [Validators.required]],
    });
  }

  get name(): AbstractControl {
    return this.dataForm.controls["name"];
  }

  get editPermission() {
    return this.permission === "Edit" ? true : false;
  }

  model() {
    return {
      name: this.name.value,
    };
  }

  delete(quizId: number) {
    this.service.deleteQuiz(quizId);
    this.snackbar.open("Quiz Deleted, Please Refresh")._dismissAfter(1000);
  }

  add() {
    if (this.dataForm.valid) {
      this.service.addQuiz(this.model().name);
      this.snackbar.open("Quiz Added, Please Refresh")._dismissAfter(1000);
    } else {
      this.snackbar
        .open("Please name the Quiz, if you wish to Add")
        ._dismissAfter(1000);
    }
  }

  loadData() {
    setTimeout(() => {
      this.allQuizs = this.service.quizsArray;
    }, 350);
  }

  ngOnInit() {
    this.loginService.decodeToken();
    this.permission = this.loginService.decodedToken.role;
    this.columnsToDisplay = this.editPermission
      ? ["id", "name", "actions"]
      : ["id", "name"];
  }
}
