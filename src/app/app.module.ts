import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import {
  MatTreeModule,
  MatIconModule,
  MatButtonModule,
  MatCheckboxModule,
  MatInputModule,
  MatTabsModule,
  MatCardModule,
  MatExpansionModule
} from "@angular/material";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { MSMainComponent } from "./app.component";
import { MSTreeContainerComponent } from "./components/ms-tree-container/ms-tree-container.component";
import { MSTreeComponent } from "./components/ms-tree/ms-tree.component";
import { GetTreeService } from "./services/get-tree.service";
import { SearchFilterPipe } from "./pipes/search-filter.pipe";
import { MsSearchComponent } from "./components/ms-search/ms-search.component";
import { MsShowSelectedComponent } from "./components/ms-show-selected/ms-show-selected.component";
import { MsSearchedNodeComponent } from "./components/ms-searched-node/ms-searched-node.component";

@NgModule({
  declarations: [
    MSMainComponent,
    MSTreeContainerComponent,
    MSTreeComponent,
    MsSearchComponent,
    SearchFilterPipe,
    MsShowSelectedComponent,
    MsSearchedNodeComponent
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
    MatAutocompleteModule,
    MatTabsModule,
    MatCardModule,
    MatExpansionModule
  ],
  providers: [GetTreeService],
  bootstrap: [MSMainComponent]
})
export class AppModule {}
