import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "quiz-detail",
  templateUrl: "./quiz-detail.component.html",
  styleUrls: ["./quiz-detail.component.scss"],
})
export class QuizDetailComponent implements OnInit {
  quizId: number;

  constructor(private route: ActivatedRoute) {
    this.quizId = this.route.snapshot.params.id;
  }

  ngOnInit() {
    //load quiz details here
  }
}
