import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material'

function ViewUserDialog({ openViewUserDialog, setOpenViewUserDialog, users, selectedRow }) {
  return (
    <Dialog fullWidth={true} open={openViewUserDialog} onClose={() => setOpenViewUserDialog(false)}>
      <DialogTitle style={{ display: 'flex', justifyContent: 'space-between' }}>
        View User
      </DialogTitle>
      <DialogContent>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
          <text>
            Name:&nbsp;&nbsp;
          </text>
          <text>
            {selectedRow.name}
          </text>
        </div>
        <div style={{ display: 'flex', alignItems: 'center',  marginBottom: 10 }}>
          <text>
            Email:&nbsp;&nbsp;
          </text>
          <text>
            {selectedRow.email}
          </text>
        </div>
        <div style={{ display: 'flex', alignItems: 'center',  marginBottom: 10 }}>
          <text>
            Phone:&nbsp;&nbsp;
          </text>
          <text>
            {selectedRow.phone}
          </text>
        </div>
        <div style={{ display: 'flex', alignItems: 'center',  marginBottom: 10 }}>
          <text>
            Skillsets:&nbsp;&nbsp;
          </text>
          <text>
            {selectedRow.skillsets}
          </text>
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => setOpenViewUserDialog(false)}
          style={{ width: '100%', color: 'black', backgroundColor: 'var(--primary-color)' }}
        >
          Contact
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ViewUserDialog