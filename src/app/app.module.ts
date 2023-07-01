import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import {HomeComponent} from './pages/home/home.component';
import {TrivialQuestionComponent} from './pages/trivial-question/trivial-question.component';
import {QuizResultComponent} from './pages/quiz-result/quiz-result.component';
import {BackgroundColorPipe} from './pipes/backgroun-color.pipe';
import {NotFoundComponent} from './pages/errorPages/not-found/not-found.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {SpinnerInterceptor} from "./interceptors/spinner.interceptor";
import {NgxSpinnerModule} from "ngx-spinner";
import {ErrorBoxComponent} from './components/error-box/error-box.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TrivialQuestionComponent,
    QuizResultComponent,
    BackgroundColorPipe,
    NotFoundComponent,
    ErrorBoxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgxSpinnerModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
