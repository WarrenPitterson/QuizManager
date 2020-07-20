import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Component, OnInit, Inject } from "@angular/core";
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
  questionId: number;

  constructor(
    private fb: FormBuilder,
    private service: QuizService,
    private dialog: MatDialogRef<EditQuestionComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.editForm = fb.group({
      question: ["", Validators.required],
      correctAnswer: ["", Validators.required],
      incorrectAnswer1: ["", Validators.required],
      incorrectAnswer2: ["", Validators.required],
      incorrectAnswer3: ["", Validators.required],
    });
    this.questionId = data;
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
      questionId: this.questionId,
      quizId: this.service.quizId,
    };
  }

  save() {
    if (this.editForm.valid) {
      let model = this.model();
      this.service.editQuestion(model, this.questionId);
      this.dialog.close();
    }
  }

  close() {
    this.dialog.close();
  }
}
