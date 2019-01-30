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
  // MatAutocompleteModule,
  // MatBadgeModule,
  // MatBottomSheetModule,
  // MatButtonToggleModule,
  // MatCardModule,
  // MatCheckboxModule,
  // MatChipsModule,
  // MatStepperModule,
  // MatDatepickerModule,
  // MatDialogModule,
  // MatDividerModule,
  // MatExpansionModule,
  // MatGridListModule,
  // MatInputModule,
  // MatListModule,
  // MatMenuModule,
  // MatNativeDateModule,
  // MatPaginatorModule,
  // MatProgressBarModule,
  // MatProgressSpinnerModule,
  // MatRadioModule,
  // MatRippleModule,
  // MatSelectModule,
  // MatSidenavModule,
  // MatSliderModule,
  // MatSlideToggleModule,
  // MatSnackBarModule,
  // MatSortModule,
  // MatTableModule,
  // MatTabsModule,
  // MatToolbarModule,
  // MatTooltipModule
} from "@angular/material";
// import { A11yModule } from "@angular/cdk/a11y";
// import { CdkTableModule } from "@angular/cdk/table";
// import { CdkTreeModule } from "@angular/cdk/tree";
// import { ScrollingModule } from "@angular/cdk/scrolling";
// import { DragDropModule } from "@angular/cdk/drag-drop";

@NgModule({
  declarations: [AppComponent, MSTreeContainerComponent, MSTreeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTreeModule,
    MatIconModule,
    MatButtonModule

    // A11yModule,
    // CdkTableModule,
    // CdkTreeModule,
    // DragDropModule,
    // MatAutocompleteModule,
    // MatBadgeModule,
    // MatBottomSheetModule,
    // MatButtonModule,
    // MatButtonToggleModule,
    // MatCardModule,
    // MatCheckboxModule,
    // MatChipsModule,
    // MatStepperModule,
    // MatDatepickerModule,
    // MatDialogModule,
    // MatDividerModule,
    // MatExpansionModule,
    // MatGridListModule,
    // MatIconModule,
    // MatInputModule,
    // MatListModule,
    // MatMenuModule,
    // MatNativeDateModule,
    // MatPaginatorModule,
    // MatProgressBarModule,
    // MatProgressSpinnerModule,
    // MatRadioModule,
    // MatRippleModule,
    // MatSelectModule,
    // MatSidenavModule,
    // MatSliderModule,
    // MatSlideToggleModule,
    // MatSnackBarModule,
    // MatSortModule,
    // MatTableModule,
    // MatTabsModule,
    // MatToolbarModule,
    // MatTooltipModule,
    // MatTreeModule,
    // ScrollingModule
  ],
  providers: [GetTreeService],
  bootstrap: [AppComponent]
})
export class AppModule {}
