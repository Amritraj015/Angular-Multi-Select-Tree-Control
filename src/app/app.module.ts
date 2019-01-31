import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import {
  MatTreeModule,
  MatIconModule,
  MatButtonModule,
  MatCheckboxModule
} from "@angular/material";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatAutocompleteModule } from "@angular/material/autocomplete";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MSTreeContainerComponent } from "./components/ms-tree-container/ms-tree-container.component";
import { MSTreeComponent } from "./components/ms-tree/ms-tree.component";
import { GetTreeService } from "./services/get-tree.service";
import { MsSearchComponent } from "./components/ms-search/ms-search.component";

@NgModule({
  declarations: [
    AppComponent,
    MSTreeContainerComponent,
    MSTreeComponent,
    MsSearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTreeModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatAutocompleteModule
  ],
  providers: [GetTreeService],
  bootstrap: [AppComponent]
})
export class AppModule {}
