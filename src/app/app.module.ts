import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MSTreeContainerComponent } from "./components/ms-tree-container/ms-tree-container.component";
import { MSTreeComponent } from "./components/ms-tree/ms-tree.component";
import { GetTreeService } from "./services/get-tree.service";
import {
  MatTreeModule,
  MatIconModule,
  MatButtonModule
} from "@angular/material";

@NgModule({
  declarations: [AppComponent, MSTreeContainerComponent, MSTreeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTreeModule,
    MatIconModule,
    MatButtonModule
  ],
  providers: [GetTreeService],
  bootstrap: [AppComponent]
})
export class AppModule {}
