import { Questions } from "../models/questions";
import {
  MatDialog,
  MatDialogConfig,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from "@angular/material/dialog";
import { Component, OnInit, Inject } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";

@Component({
  selector: "edit-question",
  templateUrl: "./edit-question.component.html",
  styleUrls: ["./edit-question.component.scss"],
})
export class EditQuestionComponent implements OnInit {
  editForm: FormGroup;
  QuestionEdit: string;

  constructor(
    private dialog: MatDialogRef<EditQuestionComponent>,
    private matdialog: MatDialog,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data
  ) {}

  ngOnInit() {}

  openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = "test";

    let dialogRef = this.matdialog.open(EditQuestionComponent, dialogConfig);
  }

  close() {
    this.dialog.close();
  }
}
