import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MSTreeContainerComponent } from './ms-tree-container/ms-tree-container.component';
import { MSTreeComponent } from './ms-tree/ms-tree.component';

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
