import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  MatTreeModule,
  MatIconModule,
  MatButtonModule,
  MatCheckboxModule,
  MatInputModule,
  MatTabsModule,
  MatCardModule,
  MatExpansionModule,
  MatProgressBarModule,
  MatSnackBarModule
} from "@angular/material";
import { MatFormFieldModule } from "@angular/material/form-field";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { MsTreeControlComponent } from "./components/ms-tree-control/ms-tree-control.component";
import { MSTreeComponent } from "./components/ms-tree/ms-tree.component";
import { MsSearchComponent } from "./components/ms-search/ms-search.component";
import { GetTreeService } from "./services/get-tree.service";
import { SearchFilterPipe } from "./pipes/search-filter.pipe";

@NgModule({
  declarations: [
    AppComponent,
    MsTreeControlComponent,
    MSTreeComponent,
    MsSearchComponent,
    SearchFilterPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatTreeModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatCardModule,
    MatExpansionModule,
    MatProgressBarModule,
    MatSnackBarModule
  ],
  providers: [GetTreeService],
  bootstrap: [AppComponent],
  exports: [
    MsTreeControlComponent,
    MSTreeComponent,
    MsSearchComponent,
    SearchFilterPipe
  ]
})
export class AppModule {}
