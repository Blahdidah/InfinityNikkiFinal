import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import { SketchesComponent } from './sketches/sketches.component';
import { SketchListComponent } from './sketches/sketch-list/sketch-list.component';
import { SketchStartComponent } from './sketches/sketch-start/sketch-start.component';
import { SketchDetailComponent } from './sketches/sketch-detail/sketch-detail.component';
import { SketchItemComponent } from './sketches/sketch-list/sketch-item/sketch-item.component';
import { SketchesService } from './sketches/sketches.service';
import { SketchEditComponent } from './sketches/sketch-edit/sketch-edit.component';

import { CraftingListService } from './craft-list/craft-list.service';
import { CraftListComponent } from './craft-list/craft-list.component';
import { CraftEditComponent } from './craft-list/craft-edit/craft-edit.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SketchEditComponent,
    CraftListComponent,
    CraftEditComponent,
    SketchListComponent,
    SketchStartComponent,
    SketchDetailComponent,
    SketchItemComponent,
    SketchesComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [SketchesService, CraftingListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
