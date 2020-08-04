import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';


@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component implements OnInit {

  

  graficos: any = {
    'grafico1': {
        'labels': ['Con frigoles', 'Con Natilla', 'Con Tocino'],
        'data': [24,30, 46],
        'type': 'doughnut',
        'leyenda': 'El Pan se come con'
    },
    'grafico2': {
        'labels': ['Hombres', 'Mujeres'],
        'data': [4500, 6000],
        'type': 'doughnut',
        'leyenda': 'Entrevistados'
    },
    'grafico3': {
        'labels': ['Si', 'No'],
        'data': [95,5],
        'type': 'doughnut',
        'leyenda': '¿Le dan gases los frigoles'
    },
    'grafico4': {
        'labels': ['No', 'Si'],
        'data': [85,15],
        'type': 'doughnut',
        'leyenda': '¿Le importa que le den los gases?'
    }
  }

  constructor() { }

  ngOnInit(): void {
  }

}
