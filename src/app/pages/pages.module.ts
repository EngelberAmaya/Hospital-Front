import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
// Modulos
import { SharedModule } from '../shared/shared.module';
// Rutas
import { PAGES_ROUTES } from './pages.routes';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// temporal
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';

import { ChartsModule } from 'ng2-charts';
import { GraficoDonaComponent } from '../components/grafico-dona/grafico-dona.component';


@NgModule({
  declarations: [
  	DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    IncrementadorComponent,
    GraficoDonaComponent
  ],
  exports: [
  	DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    IncrementadorComponent,
    GraficoDonaComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PAGES_ROUTES,
    FormsModule,
    ChartsModule
  ]
})
export class PagesModule { }
