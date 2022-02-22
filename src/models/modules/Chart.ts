export interface ChartOptions {
  plugins: {
    legend: {
      position?: string;
      onHover?: Function;
      onLeave?: Function;
      labels?: { boxWidth: number; fontSize: number };
      display?: boolean;
    };
    tooltip?: { callbacks: { label(t: any, d: any): string } };
  };
}

export interface Dataset {
  data: number[];
  backgroundColor: string[];
  hoverBackgroundColor: string[];
  borderRadius: number;
}

export class PieChartData {
  datasets: Dataset[];
  labels: string[];

  constructor(datasets: Dataset[], labels: string[]) {
    this.datasets = datasets;
    this.labels = labels;
  }
}
