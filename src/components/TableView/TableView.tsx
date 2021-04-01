import React, { useEffect, useState } from 'react';
import { PathParams, TableData } from '../../types';

import { useParams } from 'react-router';

import { DesignerContainer } from '../DesignerContainer/DesignerContainer';
import { Typography } from '@material-ui/core';
import axios from 'axios';
import { SERVER_URL } from '../../utils/consts';

const TableView = () => {
    const { tableId } = useParams<PathParams>();
    const [tableData, setTableData] = useState<TableData>();
    const [tableName, setTableName] = useState('');

    useEffect(() => {
        axios.get(`${SERVER_URL}/get/${tableId}`).then((res) => {
            if (res.status !== 200) {
                console.log('error');
                return;
            }

            setTableData(res.data.data);

            setTableName(res.data.name);
        });

    }, [tableId]);

    const onSave = (updatedData: TableData) => {
        axios.post(`${SERVER_URL}/update/${tableId}`, updatedData).then((res) => {
            if (res.status !== 200) {
                console.log('error');
                return;
            }

            return true;
        });
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