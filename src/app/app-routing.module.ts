import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BravoPictureEditorComponent } from './components/bravo-picture-editor/bravo-picture-editor.component';
import { ComponentsComponent } from './components/components.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '404',
    component: PageNotFoundComponent,
  },
  {
    path: 'components',
    component: ComponentsComponent,
    children: [
      {
        path: 'bravo-picture-editor',
        component: BravoPictureEditorComponent,
      },
    ],
  },
  {
    path: '',
    component: HomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
