import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
@Injectable()
export class QuizService {

  constructor(private http: HttpClient) { }

  get() {
    return this.http.get('./assets/data/angularQuestions.json');
  }

}
