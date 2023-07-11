import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Category, CategoryResponse } from '../models/category';
import { catchError, map} from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Question, QuestionParams, QuestionResponse } from '../models/question';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  private categoryApiUrl = environment.OPEN_API_URL + 'api_category.php';
  private questionApiUrl = environment.OPEN_API_URL + 'api.php';
  questionLevels = ['Easy', 'Medium', 'Hard'];
  questionAmountTotal = 5;
  questionType = 'multiple';

  constructor(private httpClient: HttpClient) { }


  getCategoryList(): Observable<Category[]> {
    return this.httpClient.get<CategoryResponse>(this.categoryApiUrl).pipe(
        map((response) => { return response.trivia_categories  }),
        catchError(this.handleErrorOnApil)
    );
  }

  getQuestionList(questionParams: QuestionParams): Observable<Question[]> {
      console.log(questionParams.category);
      const params = new HttpParams()
        .set('amount', this.questionAmountTotal)
        .set('cateogry', questionParams.category.toLowerCase())
        .set('difficulty', questionParams.difficulty.toLowerCase())
        .set('type', this.questionType);

      return this.httpClient.get<QuestionResponse>(this.questionApiUrl, { params }).pipe(
          map((response) => { return this.transformQuestionResponse(response) }),
          catchError(this.handleErrorOnApil)
      );

  }

  private randomOrderArr(arr: string[]) {
    const shuffledArray = [...arr];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  }

  private transformQuestionResponse(response: QuestionResponse): Question[] {
    return response.results.map(question => {
      question.answers_options = this.randomOrderArr([...question.incorrect_answers, question.correct_answer]);
      return {...question};
    });
  }

  private handleErrorOnApil(error: HttpErrorResponse) {
    console.log(error);
    // As per our requirement you can set error message other wise also you can use error object and get error message
    return throwError('Something went wrong, Please try again after sometime.')
  }
  
}
