import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
@Injectable()
export class QuizService {

  constructor(private http: HttpClient) { }

  // get service call method to get list of all the questions for the quiz
  // Listed inside JSON format.
  get() {
    return this.http.get('./assets/data/angularQuestions.json');
  }

}
