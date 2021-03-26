import React from 'react';
import '@grapecity/spread-sheets-designer-resources-en';
import * as GC from '@grapecity/spread-sheets';
import '@grapecity/spread-sheets-designer';
import {Designer} from '@grapecity/spread-sheets-designer-react';
import "@grapecity/spread-sheets-designer/styles/gc.spread.sheets.designer.min.css"
import "@grapecity/spread-sheets/styles/gc.spread.sheets.excel2013white.css"

//Apply License
//GC.Spread.Sheets.LicenseKey = 'Your License';
//GC.Spread.Sheets.Designer.LicenseKey = 'Your License';

function App() {
  return (
    <Designer styleInfo = {{width: "100%", height: '98vh'}}  spreadOptions = {{sheetCount: 6}}></Designer>
  );
}

export default App;
