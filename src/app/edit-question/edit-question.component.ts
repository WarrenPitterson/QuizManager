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
  dataForm: FormGroup;
  questionId: number;
  editMode: boolean;
  title: string;

  constructor(
    private fb: FormBuilder,
    private service: QuizService,
    private dialog: MatDialogRef<EditQuestionComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.dataForm = fb.group({
      question: ["", Validators.required],
      correctAnswer: ["", Validators.required],
      incorrectAnswer1: ["", Validators.required],
      incorrectAnswer2: ["", Validators.required],
      incorrectAnswer3: ["", Validators.required],
    });
    this.questionId = data;
    this.editMode = data ? true : false;
  }

  get question(): AbstractControl {
    return this.dataForm.controls["question"];
  }
  get correctAnswer(): AbstractControl {
    return this.dataForm.controls["correctAnswer"];
  }
  get incorrectAnswer1(): AbstractControl {
    return this.dataForm.controls["incorrectAnswer1"];
  }
  get incorrectAnswer2(): AbstractControl {
    return this.dataForm.controls["incorrectAnswer2"];
  }
  get incorrectAnswer3(): AbstractControl {
    return this.dataForm.controls["incorrectAnswer3"];
  }

  ngOnInit() {
    this.title = this.editMode ? "Edit" : "Create";
    this.dialog.disableClose = true;
  }

  private model() {
    return {
      question: this.question.value,
      correctAnswer: this.correctAnswer.value,
      incorrectAnswer1: this.incorrectAnswer1.value,
      incorrectAnswer2: this.incorrectAnswer2.value,
      incorrectAnswer3: this.incorrectAnswer3.value,
      questionId: this.questionId ?? 0,
      quizId: this.service.quizId,
    };
  }

  save() {
    if (this.dataForm.valid) {
      const model = this.model();
      if (this.editMode) {
        this.service.editQuestion(model);
      } else {
        this.service.addQuestion(model);
      }
      this.dialog.close();
    }
  }

  close() {
    this.dialog.close();
  }
}
