import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChoosePageComponent } from './components/choose-page/choose-page.component';
import { ClassListComponent } from './components/class-list/class-list.component';
import { ClassesComponent } from './components/classes/classes.component';
import { ProfessionListComponent } from './components/profession-list/profession-list.component';
import { ProfessionsComponent } from './components/professions/professions.component';

const routes: Routes = [
  { path: '', component: ChoosePageComponent },
  { path: 'classes', component: ClassListComponent },
  { path: 'classes/:cls/:spec', component: ClassesComponent },
  { path: 'classes/:cls/:clsbuild/:spec', component: ClassesComponent },
  { path: 'classes/:cls/:clsbuild/:spec/:specbuild', component: ClassesComponent },
  { path: 'classes/:cls/:clsbuild/:spec/:specbuild/:pvpbuild', component: ClassesComponent },
  { path: 'professions', component: ProfessionListComponent },
  { path: 'professions/:prof', component: ProfessionsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
