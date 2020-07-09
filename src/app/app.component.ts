import { Component } from '@angular/core';
import { ThemeService } from 'src/app/services/theme.service';
import { DataServiceService } from './services/data-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'corona-tracker';

  constructor(private themeService: ThemeService, private dataService: DataServiceService) {}

  ngOnInit(): void {}

  toggleTheme() {
    
    // this.dataService.setSharedData('#343a40');

    if (this.themeService.isDarkTheme()) {
      this.themeService.setLightTheme();
    } else {
      this.themeService.setDarkTheme();
    }
  }

  // onActivate(componentReference) {
  //   console.log(componentReference);
  //   // componentReference.checker = true ? false : true;
  // }
}
