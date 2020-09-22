import { MatSnackBar } from "@angular/material/snack-bar";
import { QuizService } from "./quiz-detail/quiz.service";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { HeaderComponent } from "./header/header.component";
import { MainQuizComponent } from "./main-quiz/main-quiz.component";
import { QuizDetailComponent } from "./quiz-detail/quiz-detail.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { ReactiveFormsModule } from "@angular/forms";
import { LoginService } from "./login/login.service";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatDialogModule } from "@angular/material/dialog";
import { EditQuestionComponent } from "./edit-question/edit-question.component";
import { MatSelectModule } from "@angular/material/select";
import { MatTableModule } from "@angular/material/table";
import { MatIconModule } from "@angular/material/icon";
// import { JwtHelperService, JwtModule } from "@auth0/angular-jwt";

export function tokenGetter() {
  return localStorage.getItem("access_token");
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    MainQuizComponent,
    QuizDetailComponent,
    PageNotFoundComponent,
    EditQuestionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatInputModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatDialogModule,
    MatSelectModule,
    MatTableModule,
    MatIconModule,
    // JwtModule.forRoot({
    //   config: {
    //     tokenGetter: tokenGetter,
    //     // allowedDomains: ["example.com"],
    //     // disallowedRoutes: ["http://example.com/examplebadroute/"],
    //   },
    // }),
  ],
  providers: [LoginService, QuizService, HttpClientModule, MatSnackBar],
  entryComponents: [EditQuestionComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
