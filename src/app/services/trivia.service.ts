import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {TriviaCategoryModel} from "../models/triviaCategory.model";
import {TriviaQuestionModel} from "../models/triviaQuestion.model";

@Injectable({
  providedIn: 'root'
})
export class TriviaService {

  private readonly _questionAmount: number = 5;
  private readonly _httpClient: HttpClient = inject(HttpClient);
  private readonly _apiBaseUrl: string = 'https://opentdb.com';

  getCategories(): Observable<TriviaCategoryModel[]> {
    return this._httpClient.get(this._apiBaseUrl + '/api_category.php')
      .pipe(map((result: any) => <TriviaCategoryModel[]>result.trivia_categories));
  }

  getQuestions(categoryId: number, difficulty: string): Observable<TriviaQuestionModel[]> {
    let params: HttpParams = new HttpParams();
    params = params.append('amount', this._questionAmount);
    params = params.append('category', categoryId);
    params = params.append('difficulty', difficulty);
    params = params.append('type', 'multiple');
    return this._httpClient.get(this._apiBaseUrl + '/api.php', {params: params})
      .pipe(map((result: any) => <TriviaQuestionModel[]>result.results));
  }
}
