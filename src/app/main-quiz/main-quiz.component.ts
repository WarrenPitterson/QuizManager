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
    private loginService: LoginService
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
  }

  add() {
    if (this.dataForm.valid) {
      this.service.addQuiz(this.model().name);
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
