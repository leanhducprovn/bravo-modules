import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BravoPictureEditorComponent } from './components/bravo-picture-editor/bravo-picture-editor.component';
import { BravoTabGridLayoutComponent } from './components/bravo-tab-grid-layout/bravo-tab-grid-layout.component';
import { BravoToolbarComponent } from './components/bravo-toolbar/bravo-toolbar.component';
import { ComponentsComponent } from './components/components.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '404',
    component: PageNotFoundComponent,
  },
  {
    path: 'bravo-tab-grid-layout',
    component: BravoTabGridLayoutComponent,
  },
  {
    path: 'components',
    component: ComponentsComponent,
    children: [
      {
        path: 'bravo-picture-editor',
        component: BravoPictureEditorComponent,
      },
      {
        path: 'bravo-toolbar',
        component: BravoToolbarComponent,
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
