import { TasklistComponent } from './components/tasklist/tasklist.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'tasklist-component', component: TasklistComponent },
  { path: '', redirectTo: 'tasklist-component', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
