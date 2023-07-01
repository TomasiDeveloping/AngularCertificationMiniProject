import {Component, inject, OnInit} from '@angular/core';
import {TriviaCategoryModel} from "../../models/triviaCategory.model";
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {TriviaService} from "../../services/trivia.service";
import {TriviaQuestionModel} from "../../models/triviaQuestion.model";
import {UserAnswerModel} from "../../models/userAnswer.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public hasError: boolean = false;
  public errorMessage: string = '';
  public title: string = 'Quiz Maker';
  public difficulties: string[] = ['Easy', 'Medium', 'Hard'];
  public categories: TriviaCategoryModel[] = [];
  public questions: TriviaQuestionModel[] = [];
  public userAnswers: UserAnswerModel[] = [];
  public quizCreateForm: FormGroup = new FormGroup({
    category: new FormControl<string>('', [Validators.required]),
    difficulty: new FormControl<string>('', [Validators.required])
  });

  private readonly _triviaService: TriviaService = inject(TriviaService);
  private readonly _router: Router = inject(Router);

  get categoryControl(): AbstractControl | null {
    return this.quizCreateForm.get('category');
  }

  get difficultyControl(): AbstractControl | null {
    return this.quizCreateForm.get('difficulty');
  }

  ngOnInit(): void {
    this.hasError = false;
    this._triviaService.getCategories().subscribe({
      next: ((response: TriviaCategoryModel[]): void => {
        this.categories = response;
      }),
      error: error => {
        console.log(error);
        this.hasError = true;
        this.errorMessage = 'Could not load Categories';
      }
    });
  }

  public onCreate(): void {
    if (this.quizCreateForm.invalid) {
      return;
    }
    this.userAnswers = [];
    const difficulty: string = this.difficultyControl?.value;
    const categoryId: number = this.categoryControl?.value;
    this.hasError = false;
    this._triviaService.getQuestions(categoryId, difficulty).subscribe({
      next: ((response: TriviaQuestionModel[]): void => {
        this.questions = response;
        sessionStorage.setItem('quiz', JSON.stringify(this.questions));
      }),
      error: error => {
        console.log(error);
        this.hasError = true;
        this.errorMessage = 'Could not load questions';
      }
    });
  }

  public onSelectAnswer(userAnswer: UserAnswerModel): void {
    if (!this.userAnswers.some(userAnswerModel => userAnswerModel.question === userAnswer.question)) {
      this.userAnswers.push(userAnswer);
    } else {
      const index: number = this.userAnswers.findIndex(userAnswerModel => userAnswerModel.question === userAnswer.question);
      this.userAnswers[index].answer = userAnswer.answer;
    }
  }

  public onSubmit(): void {
    this._router.navigate(['/result'], {state: {data: this.userAnswers}}).then();
  }
}
