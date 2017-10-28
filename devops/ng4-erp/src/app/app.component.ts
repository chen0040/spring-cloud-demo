import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Spring-Erp-Clients';
  errorMessage: string;
  greetings: { [key:string]:string; };

  constructor(
    private _appService : AppService) {

  }

  getKeys(mapData): string[] {
    return Object.keys(mapData);
  }

  ngOnInit(): void {
    this._appService.greet().subscribe(greetings => {
      this.greetings = greetings;
    },
    error => this.errorMessage = <any>error);
  }
}
