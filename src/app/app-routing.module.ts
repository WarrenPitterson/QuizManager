import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MainQuizComponent } from "./main-quiz/main-quiz.component";
import { QuizDetailComponent } from "./quiz-detail/quiz-detail.component";
import { LoginComponent } from "./login/login.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";

const routes: Routes = [
  {
    path: "main-quiz",
    component: MainQuizComponent,
  },
  {
    path: "quiz-detail/:id",
    component: QuizDetailComponent,
  },
  {
    path: "login",
    component: LoginComponent,
    data: { registerMode: false },
  },
  {
    path: "register",
    component: LoginComponent,
    data: { registerMode: true },
  },
  {
    path: "",
    component: LoginComponent,
  },
  {
    path: "**",
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
