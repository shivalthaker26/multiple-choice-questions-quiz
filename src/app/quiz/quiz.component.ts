import { Component, OnInit } from '@angular/core';
import { QuizService } from '../services/quiz.service';
import { Option, Question, Quiz, QuizConfig } from '../models/index';
import {Router} from '@angular/router';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
  providers: [QuizService]
})
export class QuizComponent implements OnInit {
  //Initialize all the variables going to be used throughout the component.

  quiz: Quiz = new Quiz(null);
  step = 'quiz';
  quizName: string;
  optionValue: any;
  scoreValue = []
  config: QuizConfig = {
    'allowBack': true,
    'allowReview': true,
    'autoMove': false,  // if true, it will move to next question automatically when answered.
  };

  pager = {
    index: 0,
    size: 1,
    count: 1
  };

  constructor(private quizService: QuizService, private router: Router) { }

  ngOnInit() {
    this.startQuiz();
  }

  // method when called at the end of the quiz, will again start the quiz.
  restartQuiz() {
    this.router.navigate(['/assessment']);
    this.startQuiz();
    this.pager = {
      index: 0,
      size: 1,
      count: 1
    };
  }

  startQuiz() {

    // get the list of questions by calling get method from quizService service component.
    return this.quizService.get().subscribe((results: any) => {
      this.quiz = new Quiz(results);
      this.pager.count = this.quiz.questions.length;
      this.step = 'quiz';
      });
  }


  // get all the questions received from the observable service call from startQuiz() method
  get getAllQuestions() {
    return (this.quiz.questions) ?
      this.quiz.questions.slice(this.pager.index, this.pager.index + this.pager.size) : [];
  }

  // get the info of the question and option selected from the view and store the information inside an array to get list
  // of all the selected options and other meta data info.
  onSelect(question: Question, option: Option) {
    if (question.questionTypeId === 1) {

      this.optionValue = option;
      question.options.forEach((x) => { if (x.id !== option.id)
        {x.selected = false;}
      });

      // calculate the score value from the options selected
      for (let i = 0; i < this.quiz.questions.length; i++) {
        for (let j = 0; j < this.quiz.questions[i].options.length; j++) {
          if (this.quiz.questions[i].options[j].id === this.optionValue.id ) {
            this.scoreValue.push({'optionId' : this.optionValue.id, 'score' : this.quiz.questions[i].options[j].score});
          }
        }
      }
    }
    if (this.config.autoMove) {
      this.goTo(this.pager.index + 1);
    }
  }

  goTo(index: number) {
    if (index >= 0 && index < this.pager.count) {
      this.pager.index = index;
      this.step = 'quiz';
    }
  }

  // get the total calculated score and show it on the view.
  get score()
     {
      let score = 0;
      for (let i = 0; i < this.scoreValue.length; i++ ) {
        score += this.scoreValue[i].score;
      }
      return score;
  }

  onSubmit() {
    this.step = 'result';
  }
}
