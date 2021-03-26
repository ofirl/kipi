/* eslint-disable import/first */
import React from 'react';

import GC from '@grapecity/spread-sheets';
import designerResEn from '@grapecity/spread-sheets-designer-resources-en';

// @ts-ignore
GC.Spread.Sheets.DesignerRes = designerResEn;

import { Designer } from '@grapecity/spread-sheets-designer-react';
import '@grapecity/spread-sheets-designer-resources-en';
import "@grapecity/spread-sheets-designer/styles/gc.spread.sheets.designer.min.css"
import "@grapecity/spread-sheets/styles/gc.spread.sheets.excel2013white.css"

import { SpreadSheets, Worksheet, Column } from '@grapecity/spread-sheets-react';
import { designerDefaultConfig } from './defaultConfig';

// GC.Spread.Sheets.LicenseKey = 'asd';

const data = [
    { Name: 'Apple', Category: 'Fruit', Price: 1, 'Shopping Place': 'Wal-Mart' },
    { Name: 'Potato', Category: 'Fruit', Price: 2.01, 'Shopping Place': 'Other' },
    { Name: 'Tomato', Category: 'Vegetable', Price: 3.21, 'Shopping Place': 'Other' },
    { Name: 'Sandwich', Category: 'Food', Price: 2, 'Shopping Place': 'Wal-Mart' },
    { Name: 'Hamburger', Category: 'Food', Price: 2, 'Shopping Place': 'Wal-Mart' },
    { Name: 'Grape', Category: 'Fruit', Price: 4, 'Shopping Place': 'Sun Store' }
];

export const DesignerContainer = () => {
    return (
        <div style={{ height: '100%' }}>
            <Designer styleInfo={{ width: "1500px", height: '90vh' }} config={designerDefaultConfig} >
                {/* <SpreadSheets backColor={'aliceblue'}>
                    <Worksheet name={'sheet1'}>
                    </Worksheet>
                </SpreadSheets> */}
            </Designer>

            {/* <SpreadSheets backColor={'aliceblue'}>
                <Worksheet name={'sheet1'}>
                    <Column dataField='Name' width={300}></Column>
                    <Column dataField='Category' width={100}></Column>
                    <Column dataField='Price' width={100}
                        formatter="$#.00"></Column>
                    <Column dataField='Shopping Place' width={100}></Column>
                </Worksheet>
            </SpreadSheets> */}
        </div>
    );
};