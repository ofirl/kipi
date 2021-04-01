import { Button, createStyles, Dialog, DialogActions, DialogContent, DialogTitle, List, ListItem, makeStyles, TextField, Typography } from '@material-ui/core';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { TableDetails } from '../../types';

import { Link } from 'react-router-dom';
import { Cell, Grid } from 'styled-css-grid';
import axios from 'axios';
import { SERVER_URL } from '../../utils/consts';

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
    const [newTableWindowOpen, setNewTableWindowOpen] = useState(false);

    const [filter, setFilter] = useState('');

    const newTableNameRef = useRef();
    const newTableDescriptionRef = useRef();

    const loadTables = useCallback(() => {
        axios.get(`${SERVER_URL}/get/all`).then((res) => {
            if (res.status !== 200) {
                console.log('error');
                return;
            }

            res.data.forEach((t: any) => {
                t.id = t._id;
            });

            setAllTables(res.data);
        });
    }, []);

    useEffect(() => {
        loadTables();
    }, [loadTables]);

    const handleOpenNewTableWindow = () => {
        setNewTableWindowOpen(true)
    };

    const handleCloseNewTableWindow = () => {
        setNewTableWindowOpen(false)
    };

    const createNewTable = () => {
        // @ts-ignore
        if (!newTableNameRef.current?.value)
            return;

        axios.post(`${SERVER_URL}/create`, {
            // @ts-ignore
            name: newTableNameRef.current?.value,
            // @ts-ignore
            description: newTableDescriptionRef.current?.value,
            source: undefined,
        }).then((res) => {
            if (res.status !== 200) {
                console.log('error');
                return;
            }

            handleCloseNewTableWindow();
            loadTables();
        });
    };

    return allTables ?
        (
            <>
                <Button variant="contained" color="primary" onClick={handleOpenNewTableWindow}>
                    Create New Table
                </Button>
                <TextField variant="outlined" label="filter" onInput={(e) => setFilter((e.target as HTMLInputElement).value)} />
                <List>
                    {
                        allTables.filter(t => t.name.includes(filter) || t.description?.includes(filter)).map(t => (
                            <ListItem key={t.id} button>
                                <TableRow {...t} />
                            </ListItem>
                        ))
                    }
                </List>
                <Dialog open={newTableWindowOpen} maxWidth="sm" fullWidth onClose={handleCloseNewTableWindow}>
                    <DialogTitle title="New Table" />
                    <DialogContent>
                        <Grid columns="1fr">
                            <Cell>
                                <TextField inputRef={newTableNameRef} variant="outlined" label="name" />
                            </Cell>
                            <Cell>
                                <TextField inputRef={newTableDescriptionRef} variant="outlined" label="description" multiline rows={5} />
                            </Cell>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={createNewTable}>
                            Save
                        </Button>
                        <Button variant="outlined" color="secondary" onClick={handleCloseNewTableWindow}>
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
            </>
        )
        :
        (
            <div>
                {`loading...`}
            </div>
        );
};

export default TablesListPage;