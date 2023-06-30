import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TriviaQuestionModel} from "../../models/triviaQuestion.model";
import {UserAnswerModel} from "../../models/userAnswer.model";

@Component({
  selector: 'app-trivial-question',
  templateUrl: './trivial-question.component.html',
  styleUrls: ['./trivial-question.component.css'],
})
export class TrivialQuestionComponent implements OnInit {

  public clickedButton: number | undefined;
  public answers: string[] = [];
  @Input({required: true}) question?: TriviaQuestionModel;
  @Output() selectedAnswer: EventEmitter<UserAnswerModel> = new EventEmitter<UserAnswerModel>()

  ngOnInit(): void {
    this.answers.push(this.question?.correct_answer!);
    this.question?.incorrect_answers.forEach((question: string): void => {
      this.answers.push(question);
    })
  }

  onClick(index: number, selectedQuestion: TriviaQuestionModel): void {
    this.clickedButton = index;
    const userAnswer: UserAnswerModel = {
      answer: this.answers[index],
      question: selectedQuestion.question!
    }
    this.selectedAnswer.emit(userAnswer);
  }
}
