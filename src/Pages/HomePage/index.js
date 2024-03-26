import React from 'react';
import { AccountTree } from '@mui/icons-material';
import { TextField, Button } from '@mui/material';
import useHook from './hook';
import Table from '../../Components/MaterialTable'
import AddUserDialog from './components/AddUserDialog'
import ViewUserDialog from './components/ViewUserDialog';
import EditUserDialog from './components/EditUserDialog';
import DeleteUserDialog from './components/DeleteUserDialog';

export default function Homepage(props) {
  const h = useHook(props);
  return (
    <div style={{ position: 'relative' }}>
      <ViewUserDialog {...h} />
      <EditUserDialog {...h} />
      <DeleteUserDialog {...h} />
      <div className="homepage-container">
      {!!h.users.length ? (
        <div className='table-container'>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBlock: 10 }}>
            <h2>Freelance Developer List</h2>
            <AddUserDialog {...h} />
          </div>
          <Table
            tableData={h.users}
            user={props.user}
            {...h}
          />
        </div>
      ) : (
        <>
          <div style={{ marginBottom: 20, textAlign: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <AccountTree style={{ color: 'var(--primary-color)', fontSize: 90 }} />
              &nbsp;&nbsp;
              <span style={{ fontSize: 50, fontWeight: 600 }}>CDN</span>
            </div>
            <p>
              Connect with developers and the freelance world around you.
            </p>
          </div>
          <div style={{ width: '50%' }}>
            <TextField
              value={h.search}
              onChange={e => h.setSearch(e.target.value)}
              style={{ backgroundColor: 'white', color: 'black' }}
              placeholder="Search for developers"
              fullWidth
              size='small'
            />
          </div>
          <div style={{ width: '50%', marginTop: 10, textAlign: 'center' }}>
            <Button
              style={{ backgroundColor: 'var(--primary-color)', width: '100%', color: '#333333', fontWeight: 600 }}
              onClick={h.getUsers}
            >
              SEARCH
            </Button>
            <span onClick={h.getUsers} style={{ marginTop: 5, textDecoration: 'underline', cursor: 'pointer' }}>
              Don't know what to search? Let us do the work!
            </span>
          </div>
        </>
      )}
      </div>
    </div>
  );
}
