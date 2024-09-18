import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import quizzQuestions from '../../../../public/assets/data/quizz_questions.json';

@Component({
  selector: 'app-quizz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quizz.component.html',
  styleUrl: './quizz.component.scss',
})
export class QuizzComponent implements OnInit {
  title: string = '';

  questions: any;
  questionSelected: any;

  answers: string[] = [];
  answersSelected: string = '';

  questionIndex: number = 0;
  questionMaxIndex: number = 0;

  finished: boolean = false;

  constructor() {}

  ngOnInit(): void {
    if (quizzQuestions) {
      this.finished = false;
      this.title = quizzQuestions.title;

      this.questions = quizzQuestions.questions;
      this.questionSelected = this.questions[this.questionIndex];

      this.questionIndex = 0;
      this.questionMaxIndex = this.questions.length;
    }
  }

  playerChoose(value: string) {
    this.answers.push(value);
    this.nextStep();
  }

  async nextStep() {
    this.questionIndex += 1;

    if (this.questionMaxIndex > this.questionIndex) {
      this.questionSelected = this.questions[this.questionIndex];
    } else {
      const finalAnswer: string = await this.checkResult(this.answers);
      this.finished = true;
      this.answersSelected =
        quizzQuestions.results[
          finalAnswer as keyof typeof quizzQuestions.results
        ];
    }
  }

  async checkResult(answers: string[]) {
    const result = answers.reduce((previus, current, i, arr) => {
      if (
        arr.filter((item) => item === previus).length >
        arr.filter((item) => item === current).length
      ) {
        return previus;
      } else {
        return current;
      }
    });
    return result;
  }
}
