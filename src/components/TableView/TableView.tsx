import React, { useEffect, useState } from 'react';
import { PathParams, TableData } from '../../types';

import { useParams } from 'react-router';

import { DesignerContainer } from '../DesignerContainer/DesignerContainer';

const TableView = () => {
    const { tableId } = useParams<PathParams>();
    const [tableData, setTableData] = useState<TableData>();

    useEffect(() => {
        console.log(tableId);

        setTableData({
            data: [[]],
            mergeCells: [],
        });
    }, [tableId]);

    return tableData ?
        (
            <DesignerContainer initialData={tableData} />
        )
        :
        (
            <div>
                loading...
            </div>
        );
};

export default TableView;