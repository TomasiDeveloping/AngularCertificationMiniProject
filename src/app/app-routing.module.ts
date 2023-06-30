import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./pages/home/home.component";
import {QuizResultComponent} from "./pages/quiz-result/quiz-result.component";
import {NotFoundComponent} from "./pages/errorPages/not-found/not-found.component";

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'result', component: QuizResultComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
