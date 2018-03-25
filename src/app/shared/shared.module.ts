import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import { MatToolbarModule,
  MatSidenavModule,
  MatSelectModule,
  MatIconModule,
  MatButtonModule,
  MatInputModule,
  MatMenuModule,
  MatTableModule,
  MatTabsModule,
  MatExpansionModule,
  MatTooltipModule,
  MatListModule,
  MatSortModule,
  MatCheckboxModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatCardModule,
  MatDialogModule,
  MatRadioModule,
  MatSliderModule,
  MatSlideToggleModule} from '@angular/material';
import {JsmeModule} from './jsme/jsme.module';
import {DirectivesModule} from './directives/directives.module';
import {PipesModule} from './pipe/pipes.module';
import {NgxEchartsModule} from "ngx-echarts";



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    JsmeModule,
    DirectivesModule,
    PipesModule,
    NgxEchartsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatMenuModule,
    MatTableModule,
    MatTabsModule,
    MatExpansionModule,
    MatTooltipModule,
    MatListModule,
    MatSortModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatCardModule,
    MatDialogModule,
    MatSelectModule,
    MatRadioModule,
    MatSliderModule,
    MatSlideToggleModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    JsmeModule,
    DirectivesModule,
    PipesModule,
    NgxEchartsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatMenuModule,
    MatTableModule,
    MatTabsModule,
    MatExpansionModule,
    MatTooltipModule,
    MatListModule,
    MatSortModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatCardModule,
    MatDialogModule,
    MatSelectModule,
    MatRadioModule,
    MatSliderModule,
    MatSlideToggleModule,
  ],
  declarations: []
})
export class SharedModule { }
