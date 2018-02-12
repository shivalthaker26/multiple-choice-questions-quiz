import { TestBed, inject } from '@angular/core/testing';


import {QuizService} from './quiz.service';
import { HttpClientModule } from '@angular/common/http';

describe('AssessmentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuizService],
      imports: [ HttpClientModule ]
    });
  });

  it('should be created', inject([QuizService], (service: QuizService) => {
    expect(service).toBeTruthy();
  }));
});
