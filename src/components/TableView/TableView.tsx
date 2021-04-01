import React, { useEffect, useState } from 'react';
import { PathParams, TableData } from '../../types';

import { useParams } from 'react-router';

import { DesignerContainer } from '../DesignerContainer/DesignerContainer';
import { Typography } from '@material-ui/core';

const TableView = () => {
    const { tableId } = useParams<PathParams>();
    const [tableData, setTableData] = useState<TableData>();
    const [tableName, setTableName] = useState('');

    useEffect(() => {
        console.log(tableId);

        setTableData({
            data: [[]],
            mergeCells: [],
        });

        setTableName('asdasd');
    }, [tableId]);

    const onSave = (updatedData: TableData) => {
        console.log(updatedData)
    };

    return tableData ?
        (
            <div style={{ height: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h5">
                    {tableName}
                </Typography>
                <div style={{ height: '100%', boxSizing: 'border-box' }}>
                    <DesignerContainer initialData={tableData} onSave={onSave} />
                </div>
            </div>
        )
        :
        (
            <div>
                loading...
            </div>
        );
};

export default TableView;