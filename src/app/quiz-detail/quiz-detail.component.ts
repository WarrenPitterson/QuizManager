import { EditQuestionComponent } from "../edit-question/edit-question.component";
import { Questions } from "./../models/questions";
import { QuizDetailService } from "./quiz-detail.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";

@Component({
  selector: "quiz-detail",
  templateUrl: "./quiz-detail.component.html",
  styleUrls: ["./quiz-detail.component.scss"],
})
export class QuizDetailComponent implements OnInit {
  quizId: number;
  quiz: Questions[] = [];

  constructor(
    private route: ActivatedRoute,
    private service: QuizDetailService,
    private dialog: MatDialog
  ) {
    this.quizId = this.route.snapshot.params.id;
  }

  ngOnInit() {
    this.service
      .getQuizDetails(this.quizId)
      .subscribe((response) => (this.quiz = response));
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    this.dialog.open(EditQuestionComponent, dialogConfig);
  }

  edit() {
    this.dialog.open(EditQuestionComponent);
  }
}
