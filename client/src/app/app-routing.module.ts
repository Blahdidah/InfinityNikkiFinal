import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SketchesComponent } from './sketches/sketches.component';
import { SketchStartComponent } from './sketches/sketch-start/sketch-start.component';
import { CraftListComponent } from './craft-list/craft-list.component';
import { SketchDetailComponent } from './sketches/sketch-detail/sketch-detail.component';
import { SketchEditComponent } from './sketches/sketch-edit/sketch-edit.component';
import { SketchResolverService } from './sketches/sketches-resolver.service';


const routes: Routes = [
  { path: '', redirectTo: '/sketches', pathMatch: 'full' },
  {
    path: 'sketches', component: SketchesComponent, children: [
      { path: '', component: SketchStartComponent },
      { path: 'new', component: SketchEditComponent },
      { path: ':id', component: SketchDetailComponent, resolve: [SketchResolverService]},
      { path: ':id/edit', component: SketchEditComponent, resolve: [SketchResolverService] },
    ]
  },
  {path: 'craft-list', component: CraftListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
