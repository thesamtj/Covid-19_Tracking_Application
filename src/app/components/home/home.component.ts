import { Component, OnInit, Input } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';
import { GlobalDataSummary } from 'src/app/models/global-data';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  // checker: string;
  totalConfirmed = 0;
  totalActive = 0;
  totalDeaths = 0;
  totalRecovered = 0;
  globalData: GlobalDataSummary[];
  loading = false;
  dataTable = [];
  chart = {
    title: 'Country:Cases',
    PieChart: 'PieChart',
    ColumnChart: 'ColumnChart',
    height: 500,
    options: {
      hAxis: {
        title: 'Countries',
        titleTextStyle: {
          // color: '#007Bff',
          fontName: 'Arial',
          fontSize: 12,
          bold: true,
          italic: false,
        },
        textStyle: {
          // color: '#fff',
          fontSize: 8,
          fontName: 'Arial',
          bold: false,
          italic: true,
        },
      },
      vAxis: {
        title: 'Cases',
        titleTextStyle: {
          // color: '#007Bff',
          fontName: 'Arial',
          fontSize: 12,
          bold: true,
          italic: false,
        },
        textStyle: {
          // color: '#fff',
          fontSize: 8,
          fontName: 'Arial',
          bold: false,
          italic: true,
        },
      },
      animation: {
        duration: 1000,
        easing: 'out',
      },
      is3D: true,
      backgroundColor: '#d1d5d8'
    },
  };

  constructor(private dataService: DataServiceService) {}

  ngOnInit(): void {
    this.dataService.getGlobalData().subscribe({
      next: (result) => {
        // console.log(result);
        this.globalData = result;
        result.forEach((cs) => {
          if (!Number.isNaN(cs.confirmed)) {
            this.totalConfirmed += cs.confirmed;
            this.totalActive += cs.active;
            this.totalDeaths += cs.deaths;
            this.totalRecovered += cs.recovered;
          }
        });
        this.initChart('c');
      },
      complete: () => {
        this.loading = false;
      },
    });
    // this.dataService.sharedData.subscribe(
    //   s => {
    //     console.log("b",s);
    //     this.checker = s;
    //   },
    //   e => {
    //     console.log(e)
    //   }
    // );
  }


  initChart(caseType: string) {
    this.dataTable = [];
    // this.datatable.push(["Country", "Cases"])

    this.globalData.forEach((cs) => {
      let value: number;

      if (caseType == 'c') {
        if (cs.confirmed > 10000) {
          value = cs.confirmed;
        }
      }
      if (caseType == 'r') {
        if (cs.recovered > 5000) {
          value = cs.recovered;
        }
      }
      if (caseType == 'd') {
        if (cs.deaths > 1000) {
          value = cs.deaths;
        }
      }
      if (caseType == 'a') {
        if (cs.active > 2000) {
          value = cs.active;
        }
      }

      this.dataTable.push([cs.country, value]);
    });

    // console.log(`Data table: ${dataTable}`);
  }

 
  updateChart(input: HTMLInputElement) {
    console.log(`Update chart: ${input.value}`);
    this.initChart(input.value);
  }
}
