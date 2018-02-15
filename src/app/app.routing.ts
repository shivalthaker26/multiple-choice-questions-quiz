import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuizComponent } from './quiz/quiz.component';


// Router module enables navigation from one view to the next as the application tasks are performed.
// Here there's only one state needed 'assessment' which is used for navigation
const routes: Routes = [
  { path: '', redirectTo: 'assessment', pathMatch: 'full'},
  { path: 'assessment', component: QuizComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
