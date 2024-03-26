/* eslint-disable max-lines */
import React, { useState } from 'react';
import MUIDataTable from 'mui-datatables';
import {
  createTheme, ThemeProvider,
} from '@mui/material/styles';
import { makeStyles, styled } from '@mui/styles';
import {
  Typography, Avatar, Tooltip, IconButton,
} from '@mui/material';
import { Delete, Edit, Visibility } from '@mui/icons-material';

const useStyles = makeStyles({
  root: { maxWidth: '100%', margin: '0 2px', minHeight: '100%' },
  media: { height: '5vh', width: '5vw' },
  title: {
    fontWeight: 'bold', fontSize: 12, marginLeft: 10, marginTop: 5,
  },
  content: { color: '#707070', fontSize: 12 },
});

const options = {
  filter: false,
  search: false,
  print: false,
  download: false,
  viewColumns: false,
  responsive: 'standard',
  selectableRows: 'none',
  sort: false,
  elevation: 0,
  rowsPerPage: 7,
  rowsPerPageOptions: [7, 21, 100],
};

const columns = [
  {
    name: 'Name',
    selector: 'name',
    align: 'left',
  },
  {
    name: 'Skillsets',
    selector: 'skillsets',
    align: 'left',
  },
  {
    name: 'Hobby',
    selector: 'hobby',
    align: 'right',
  },
  {
    name: 'Actions',
    selector: 'actions',
  },
];


export default (props) => {
  const classes = useStyles();

  const UserActions = (x) => {
    return (
      <div className="d-flex align-items-center justify-content-center">
        <Tooltip title="View User">
          <IconButton onClick={() => { props.setSelectedRow(x); props.setOpenViewUserDialog(true); }}>
            <Visibility height="24px" width="24px" />
          </IconButton>
        </Tooltip>
        {props.user?.RoleId === 1 && (
          <>
            <Tooltip title="Edit User Detail">
              <IconButton onClick={() => { props.setSelectedRow(x); props.setOpenEditUserDialog(true); }}>
                <Edit height="18px" width="18px" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete User">
              <IconButton>
                <Delete style={{ color: 'red' }} onClick={() => { props.setSelectedRow(x); props.setOpenDeleteUserDialog(true); }} />
              </IconButton>
            </Tooltip>
          </>
        )}
      </div>
    );
  };

  const NameCell = (x) => (
    <div style={{ display : 'flex', alignItems: 'center' }}>
      <Avatar alt={x.name} src={x?.image} style={{ width: 30, height: 30 }} />
      <Typography gutterBottom className={classes.title}>{x?.name}</Typography>
    </div>
  )

  return (
    <>
      <ThemeProvider theme={getMuiTheme()}>
        <MUIDataTable
          options={options}
          columns={columns.map((col) => ({ ...col, label: col.name, name: col.selector }))}
          tableBodyMaxHeight='200px'
          data={props.tableData.map((x) => {
            return ({
              ...x,
              name: <NameCell {...x} />,
              skillsets: <div style={{ display : 'flex', alignItems: 'center' }}><Typography gutterBottom className={classes.title}>{x?.skillsets}</Typography></div>,
              hobby: <div style={{ display : 'flex', alignItems: 'center' }}><Typography gutterBottom className={classes.title}>{x?.hobby}</Typography></div>,
              actions: <UserActions {...x} />,
            });
          })}
        />
      </ThemeProvider>
    </>
  );
};


const getMuiTheme = () => createTheme({
  overrides: {
    MuiTableHead: {
      root: {
        '& .MuiTableCell-root': {
          color: 'gray',
          fontSize: '12px',
          textTransform: 'uppercase',
        },
      },
    },
    MuiTableRow: {
      root: {
        color: '#048279',
      },
    },
    MuiTableCell: {
      body: {
        color: 'var(--primary-color) !important',
        fontSize: 12,
        fontWeight: '400px',
      },
    },
    MuiChip: {
      root: {
        backgroundColor: '#03A69A',
        color: 'white',
      },
      deleteIcon: {
        backgroundColor: '#03A69A',
        color: 'white',
      },
    },
  },
});
