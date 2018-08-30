import { AfterViewInit, Component, Input, OnChanges } from '@angular/core';
import { Chart, ChartPoint } from 'chart.js';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
})
export class ChartComponent implements AfterViewInit, OnChanges {

  @Input() data: ChartPoint[] = [
    { t: new Date(0), y: 1400, },
    { t: new Date(1), y: 1350, },
    { t: new Date(2), y: 1300, },
  ];

  chart: Chart;

  private canvas: any;
  private ctx: any;

  ngAfterViewInit() {
    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.chart = new Chart(this.ctx, {
      type: 'line',
      data: {
        datasets: [
          {
            data: this.data,
            borderColor: 'rgba(63, 81, 181, 0.5)',
            pointBackgroundColor: 'rgba(63, 81, 181, 0.3)',
            pointBorderColor: 'rgba(63, 81, 181, 0.7)',
            pointHoverBackgroundColor: 'rgba(63, 81, 181, 1)',
            pointHoverBorderColor: 'rgba(63, 81, 181, 1)',
            fill: false,
          },
        ]
      },
      options: {
        legend: { display: false },
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          xAxes: [{
            display: true,
            type: 'time',
          }],
          yAxes: [{
            display: true,
            type: 'linear',
          }],
        }
      }
    });
    this.chart.render();
  }

  ngOnChanges() {
    if (this.chart) {
      this.chart.data.datasets[0].data = this.data;
      this.chart.update();
    }
  }

}
