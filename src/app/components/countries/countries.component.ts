import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';
import { GlobalDataSummary } from 'src/app/models/global-data';
import { DateWiseData } from 'src/app/models/date-wise-data';
import { merge } from 'rxjs';
import { map } from 'rxjs/operators';

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
  loading = true;
  dataTable = [];
  chart = {
    LineChart: 'LineChart',
    title: 'Date:Cases',
    height: 500,
    options: {
      animation: {
        duration: 1000,
        easing: 'out',
      },
      is3D: true,
    },
  };

  constructor(private dataService: DataServiceService) {}

  ngOnInit(): void {
    merge(
      this.dataService.getDateWiseData().pipe(
        map((result) => {
          this.dateWiseData = result;
        })
      ),
      this.dataService.getGlobalData().pipe(
        map((result) => {
          this.data = result;
          this.data.forEach((cs) => {
            this.countries.push(cs.country);
          });
        })
      )
    ).subscribe({
      complete: () => {
        this.updateValues('Nigeria');
        this.loading = false;
      },
    });
  }

  updateChart() {
    this.dataTable = [];
    // dataTable.push(['Date', 'Cases']);

    this.selectedCountryData.forEach((cs) => {
      this.dataTable.push([cs.date, cs.cases]);
    });

    // console.log(dataTable)
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
    // console.log(this.selectedCountryData)
    this.updateChart();
  }
}
