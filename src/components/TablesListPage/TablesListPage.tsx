import { createStyles, List, ListItem, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { TableDetails } from '../../types';

import { Link } from 'react-router-dom';
import { Cell, Grid } from 'styled-css-grid';

const useStyles = makeStyles(theme =>
    createStyles({
        tableLink: {
            width: '100%',
            backgroundColor: 'rgb(248,248,248)'
        },
    })
);

const TableRow = ({ id, name, description }: TableDetails) => {
    const classes = useStyles();

    return (
        <Link to={`${id}`} className={classes.tableLink}>
            <Grid columns="1fr" rows="auto 1fr">
                <Cell>
                    <Typography variant="h6">
                        {name}
                    </Typography>
                </Cell>
                <Cell>
                    <Typography variant="body1">
                        {description}
                    </Typography>
                </Cell>
            </Grid>
        </Link>
    );
};

const TablesListPage = () => {
    const [allTables, setAllTables] = useState<TableDetails[] | null>(null);

    useEffect(() => {
        setAllTables([{
            id: 'asd',
            name: 'test table',
            description: 'table description',
        }]);
    }, []);

    return allTables ?
        (
            <List>
                {
                    allTables.map(t => (
                        <ListItem button>
                            <TableRow {...t} />
                        </ListItem>
                    ))
                }
            </List>
        )
        :
        (
            <div>
                {`loading...`}
            </div>
        );
};

export default TablesListPage;