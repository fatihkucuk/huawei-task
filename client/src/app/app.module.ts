import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './app/components/header/header.component';
import { LeftSideBarComponent } from './app/components/left-side-bar/left-side-bar.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ToDoListComponent } from './app/components/to-do-list/to-do-list.component';
import { ContentComponent } from './app/components/content/content.component';
import { LoginComponent } from './app/components/login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LeftSideBarComponent,
    ToDoListComponent,
    ContentComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFontAwesomeModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
