import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {map} from "rxjs";
import {UserAnswerModel} from "../../models/userAnswer.model";
import {TriviaQuestionModel} from "../../models/triviaQuestion.model";

@Component({
  selector: 'app-quiz-result',
  templateUrl: './quiz-result.component.html',
  styleUrls: ['./quiz-result.component.css']
})
export class QuizResultComponent implements OnInit, OnDestroy {

  public currentUserAnswers: UserAnswerModel[] = [];
  public currentQuestions: TriviaQuestionModel[] = [];
  public scored: number = 0;
  private readonly _activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.currentQuestions = JSON.parse(sessionStorage.getItem('quiz')!);
    this._activatedRoute.paramMap
      .pipe(map(() => window.history.state)).subscribe({
      next: ((result): void => {
        this.currentUserAnswers = result.data as UserAnswerModel[];
        this.calculateScore(this.currentUserAnswers, this.currentQuestions);
      })
    });
  }

  GetColor(question: TriviaQuestionModel, currentAnswer: string): 'btn-danger' | 'btn-outline-success' {
    const userAnswer: UserAnswerModel = this.currentUserAnswers.find((userAnswerModel: UserAnswerModel): boolean => userAnswerModel.question === question.question)!;
    if (currentAnswer === userAnswer?.answer) {
      return 'btn-danger';
    } else {
      return 'btn-outline-success';
    }
  }

  calculateScore(userAnswers: UserAnswerModel[], questions: TriviaQuestionModel[]): void {
    questions.forEach((question: TriviaQuestionModel): void => {
      const userAnswer: UserAnswerModel = userAnswers.find((userAnswerModel: UserAnswerModel): boolean => userAnswerModel.question === question.question)!;
      if (userAnswer?.answer === question.correct_answer) {
        this.scored++
      }
    });
  }
  ngOnDestroy(): void {
    sessionStorage.removeItem('quiz');
  }
}
