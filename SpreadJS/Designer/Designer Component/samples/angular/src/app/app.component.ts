import { Component, ViewEncapsulation } from '@angular/core';
import '@grapecity/spread-sheets-designer-resources-en';
import * as GC from '@grapecity/spread-sheets';
import '@grapecity/spread-sheets-designer';

//Apply License
//GC.Spread.Sheets.LicenseKey = 'Your License';
//(GC.Spread.Sheets as any).Designer.LicenseKey = 'Your License';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'en';
  props = {
    styleInfo: "width: 100%; height: 98vh; margin-top: 10px",
    config: null,
    spreadOptions: {sheetCount: 6}
  };
}
