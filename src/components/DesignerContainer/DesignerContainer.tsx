import React, { useRef, useState } from 'react';
import { TableData } from '../../types';

import { createStyles, makeStyles } from '@material-ui/core';
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@material-ui/lab';

import SaveIcon from '@material-ui/icons/Save';
import PrintIcon from '@material-ui/icons/Print';

import { HotTable } from '@handsontable/react';
import Handsontable from 'handsontable';

import 'handsontable/dist/handsontable.full.css';
import { Link } from 'react-router-dom';

// const testData = [
//     ["", "Ford", "Volvo", "Toyota", "Honda"],
//     ["2016", '10', '11', '12', '13'],
//     ["2017", '20', '11', '14', '13'],
//     ["2018", '30', '15', '12', '13'],
// ];

const useStyles = makeStyles(theme =>
    createStyles({
        speedDial: {
            position: 'absolute',
            right: '1em',
            bottom: '1em',
        },
    })
);
export interface DesignerContainerProps {
    initialData?: TableData,
    onSave?: (data: any) => void,
    name?: string,
}
export const DesignerContainer = ({ initialData: { data, mergeCells } = {}, onSave, name }: DesignerContainerProps) => {
    const [speedDialOpen, setSpeedDialOpen] = useState(false);
    const updatedData = useRef(data || [[]]);
    const updatedMergeCells = useRef<Handsontable.mergeCells.Settings[]>(mergeCells || []);

    const hotTableRef = useRef(null);

    const classes = useStyles();

    const handleSpeedDialClose = () => {
        setSpeedDialOpen(false);
    };

    const handleSpeedDialOpen = () => {
        setSpeedDialOpen(true);
    };

    const onSaveButtonClick = () => {
        console.log(updatedData.current);
        console.log(updatedMergeCells.current);

        onSave && onSave({ data: updatedData.current, mergeCells: updatedMergeCells.current })
    };

    const onDownload = () => {
        // @ts-ignore
        hotTableRef.current?.hotInstance.getPlugin('exportFile').downloadFile('csv', { filename: `${name || 'KipiTable'}.xls` });
    };

    const speedDialActions = [
        { icon: <Link to="/"> back </Link>, name: 'Back' },
        { icon: <SaveIcon />, name: 'Save', onClick: onSaveButtonClick },
        { icon: <PrintIcon />, name: 'Download', onClick: onDownload },
    ];

    const onDataChange = (change: Handsontable.CellChange[], source?: Handsontable.ChangeSource) => {
        change.forEach(([row, column, prevValue, newValue]) => {
            updatedData.current[row][column as number] = newValue;
        });
    };

    const onMergeChange = (cellRange: Handsontable.wot.CellRange, mergeParent: Handsontable.mergeCells.Settings, auto: boolean) => {
        if (!updatedMergeCells.current.find(m => m.row === cellRange.from.row && m.col === cellRange.from.col))
            updatedMergeCells.current.push({
                row: cellRange.from.row,
                col: cellRange.from.col,
                rowspan: cellRange.to.row - cellRange.from.row + 1,
                colspan: cellRange.to.col - cellRange.from.col + 1,
            });
    };

    const onUnmergeChange = (cellRange: Handsontable.wot.CellRange, auto: boolean) => {
        const mergeIndex = updatedMergeCells.current.findIndex(c => c.row === cellRange.from.row && c.col === cellRange.from.col);
        updatedMergeCells.current.splice(mergeIndex, 1);
    };

    return (
        <div style={{ height: '100%' }}>
            <SpeedDial
                ariaLabel="SpeedDial example"
                className={classes.speedDial}
                icon={<SpeedDialIcon />}
                onClose={handleSpeedDialClose}
                onOpen={handleSpeedDialOpen}
                open={speedDialOpen}
                direction={'up'}
            >
                {speedDialActions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        onClick={action.onClick}
                    />
                ))}
            </SpeedDial>
            <HotTable
                ref={hotTableRef}
                afterMergeCells={onMergeChange}
                afterUnmergeCells={onUnmergeChange}
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
                enterBeginsEditing={false}
                fillHandle
                filter
                filters
                headerTooltips
                hiddenColumns
                hiddenRows
                minSpareRows={2}
                minSpareCols={2}
                mergeCells={updatedMergeCells.current || true}
                // nestedRows
                renderAllRows
                search
                stretchH="all"
                title="title"
                licenseKey='non-commercial-and-evaluation'
                afterSetDataAtCell={onDataChange}
                data={updatedData.current}
                colHeaders={true}
                rowHeaders={true}
                width="100%"
                height="100%" />
        </div>
    );
};