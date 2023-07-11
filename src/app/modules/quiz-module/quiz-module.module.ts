import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuizModuleRoutingModule } from './quiz-module-routing.module';
import { QuizComponent } from './components/quiz/quiz.component';
import { ReactiveFormsModule } from '@angular/forms';
import { QuestionComponent } from './components/question/question.component';
import { ResultComponent } from './components/result/result.component';



@NgModule({
  declarations: [
    QuizComponent,
    QuestionComponent,
    ResultComponent
  ],
  imports: [
    CommonModule,
    QuizModuleRoutingModule,
    ReactiveFormsModule
  ]
})
export class QuizModuleModule { }
