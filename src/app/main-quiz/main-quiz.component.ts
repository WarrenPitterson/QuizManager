import { Quizzes } from "./../models/quizzes";
import { QuizService } from "./../quiz-detail/quiz.service";
import { Component, OnInit } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: "main-quiz",
  templateUrl: "./main-quiz.component.html",
  styleUrls: ["./main-quiz.component.scss"],
})
export class MainQuizComponent {
  allQuizs: Quizzes[];
  dataForm: FormGroup;

  columnsToDisplay = ["id", "name", "actions"];

  constructor(private service: QuizService, private fb: FormBuilder) {
    this.service.getAllQuizs();
    this.loadData();
    this.dataForm = fb.group({
      name: ["", []],
    });
  }

  get name(): AbstractControl {
    return this.dataForm.controls["name"];
  }

  model() {
    return {
      name: this.name.value,
    };
  }

  edit(questionId: number) {
    console.log(questionId);
  }

  delete(quizId: number) {
    this.service.deleteQuiz(quizId);
  }

  add() {
    this.service.addQuiz(this.model().name);
  }

  loadData() {
    setTimeout(() => {
      this.allQuizs = this.service.quizsArray;
    }, 200);
  }
}
