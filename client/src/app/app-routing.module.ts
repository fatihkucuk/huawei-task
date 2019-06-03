import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ToDoListComponent } from './app/components/to-do-list/to-do-list.component';
import { ContentComponent } from './app/components/content/content.component';
import { LoginComponent } from './app/components/login/login.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'dashboard',
    component: ContentComponent,
    children: [
      {
        path: 'list',
        component: ToDoListComponent,
      }
    ]
  }
]
@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
