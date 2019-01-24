import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MSTreeContainerComponent } from './components/ms-tree-container/ms-tree-container.component';
import { MSTreeComponent } from './components/ms-tree/ms-tree.component';

@NgModule({
  declarations: [
    AppComponent,
    MSTreeContainerComponent,
    MSTreeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
