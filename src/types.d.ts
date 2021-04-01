export type PathParams = {
    tableId: string,
};

export type TableDetails = {
    id: string,
    name: string,
    description?: string,
};

export type TableData = {
    data?: string[][],
    mergeCells?: Handsontable.mergeCells.Settings[],
};