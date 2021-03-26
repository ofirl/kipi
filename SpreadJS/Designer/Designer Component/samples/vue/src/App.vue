<template>
  <div id="app">
    <gc-spread-sheets-designer
    :styleInfo='styleInfo'
    :config='config'
    :spreadOptions='spreadOptions'
    @designerInitialized="designerInitialized">
    </gc-spread-sheets-designer>
  </div>
</template>

<script>

import '@grapecity/spread-sheets/styles/gc.spread.sheets.excel2013white.css'
import '@grapecity/spread-sheets-designer/styles/gc.spread.sheets.designer.min.css'
import '@grapecity/spread-sheets-designer-resources-en'
import * as GC from '@grapecity/spread-sheets';
import '@grapecity/spread-sheets-designer';

//Apply License
//GC.Spread.Sheets.LicenseKey = 'Your License';
//GC.Spread.Sheets.Designer.LicenseKey = 'Your License';

import { Designer } from '@grapecity/spread-sheets-designer-vue'

export default {
  name: 'App',
  data: function () {
    return {
      styleInfo: { height: "98vh", width: '100%' },
      config: null,
      spreadOptions: {
        sheetCount: 2,
      },
      designer: null
    };
  },
  methods:{
    designerInitialized(value){
      this.designer = value;
    }
  }
}
</script>
<style>
</style>
