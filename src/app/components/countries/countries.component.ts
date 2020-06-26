import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';
import { GlobalDataSummary } from 'src/app/models/global-data';
import { DateWiseData } from 'src/app/models/date-wise-data';
import { GoogleChartInterface } from 'ng2-google-charts';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss'],
})
export class CountriesComponent implements OnInit {
  data: GlobalDataSummary[];
  countries: string[] = [];
  totalConfirmed = 0;
  totalActive = 0;
  totalDeaths = 0;
  totalRecovered = 0;
  selectedCountryData: DateWiseData[];
  dateWiseData;
  lineChart: GoogleChartInterface = {
    chartType: 'LineChart',
  };

  constructor(private dataService: DataServiceService) {}

  ngOnInit(): void {
    this.dataService.getDateWiseData().subscribe((result) => {
      this.dateWiseData = result;
      this.updateChart();
      // console.log(result);
    });

    this.dataService.getGlobalData().subscribe((result) => {
      this.data = result;
      this.data.forEach((cs) => {
        this.countries.push(cs.country);
      });
    });
  }

  updateChart() {

    let dataTable = [];
    dataTable.push(['Cases', 'Date']);

    this.selectedCountryData.forEach((cs) => {
      dataTable.push([cs.cases, cs.date])
    });

    this.lineChart = {
      chartType: 'LineChart',
      dataTable: dataTable,
      //firstRowIsData: true,
      options: {
        title: 'Cases: Date',
        height: 500,
      },
    };

   }

  updateValues(country: string) {
    // console.log(country);
    this.data.forEach((cs) => {
      if (country == cs.country) {
        this.totalConfirmed += cs.confirmed;
        this.totalActive += cs.active;
        this.totalDeaths += cs.deaths;
        this.totalRecovered += cs.recovered;
      }
    });

    this.selectedCountryData = this.dateWiseData[country];
    this.updateChart();
  }
}
