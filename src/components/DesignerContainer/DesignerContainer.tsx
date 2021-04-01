import React, { useState } from 'react';

import 'handsontable/dist/handsontable.full.css';

import { HotTable } from '@handsontable/react';
import Handsontable from 'handsontable';

const testData = [
    ["", "Ford", "Volvo", "Toyota", "Honda"],
    ["2016", 10, 11, 12, 13],
    ["2017", 20, 11, 14, 13],
    ["2018", 30, 15, 12, 13],
];

export interface DesignerContainerProps {
    onSave: (data: any[][]) => void;
}
export const DesignerContainer = () => {
    const [data, setData] = useState(testData);

    const onDataChange = (change: Handsontable.CellChange[], source?: Handsontable.ChangeSource) => {
        change.forEach(([row, column, prevValue, newValue]) => {
            console.log(newValue);
        });
    };

    return (
        <div style={{ height: '100%' }}>
            <HotTable
                manualColumnResize
                manualColumnFreeze
                manualColumnMove
                manualRowResize
                manualRowMove
                contextMenu
                formulas
                collapsibleColumns
                columnSorting
                allowEmpty
                comments
                copyPaste
                copyable
                correctFormat
                dragToScroll
                dropdownMenu
                fillHandle
                filter
                filters
                headerTooltips
                hiddenColumns
                hiddenRows
                minSpareRows={2}
                minSpareCols={2}
                mergeCells
                // nestedRows
                renderAllRows
                search
                stretchH="all"
                title="title"
                licenseKey='non-commercial-and-evaluation'
                afterSetDataAtCell={onDataChange}
                data={data}
                colHeaders={true}
                rowHeaders={true}
                width="100%"
                height="100%" />
        </div>
    );
};