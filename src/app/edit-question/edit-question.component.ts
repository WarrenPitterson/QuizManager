import { MatDialogRef } from "@angular/material/dialog";
import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from "@angular/forms";
import { QuizService } from "../quiz-detail/quiz.service";

@Component({
  selector: "edit-question",
  templateUrl: "./edit-question.component.html",
  styleUrls: ["./edit-question.component.scss"],
})
export class EditQuestionComponent implements OnInit {
  editForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: QuizService,
    private dialog: MatDialogRef<EditQuestionComponent>
  ) {
    this.editForm = fb.group({
      question: [""],
      correctAnswer: [""],
      incorrectAnswer1: [""],
      incorrectAnswer2: [""],
      incorrectAnswer3: [""],
    });
  }

  get question(): AbstractControl {
    return this.editForm.controls["question"];
  }
  get correctAnswer(): AbstractControl {
    return this.editForm.controls["correctAnswer"];
  }
  get incorrectAnswer1(): AbstractControl {
    return this.editForm.controls["incorrectAnswer1"];
  }
  get incorrectAnswer2(): AbstractControl {
    return this.editForm.controls["incorrectAnswer2"];
  }
  get incorrectAnswer3(): AbstractControl {
    return this.editForm.controls["incorrectAnswer3"];
  }

  ngOnInit() {}

  private model() {
    return {
      question: this.question.value,
      correctAnswer: this.correctAnswer.value,
      incorrectAnswer1: this.incorrectAnswer1.value,
      incorrectAnswer2: this.incorrectAnswer2.value,
      incorrectAnswer3: this.incorrectAnswer3.value,
      questionId: this.service.quizId,
    };
  }

  save() {
    if (this.editForm.valid) {
      let model = this.model();
      this.service.edit(model, this.service.quizId);
      // this.service.getQuizDetails();
    }
    this.dialog.close();
  }

  close() {
    this.dialog.close();
  }
}
