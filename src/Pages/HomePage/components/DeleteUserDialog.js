import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material'

function DeleteUserDialog({ openDeleteUserDialog, setOpenDeleteUserDialog, selectedRow, onDelete }) {
  return (
    <Dialog fullWidth open={openDeleteUserDialog} onClose={() => setOpenDeleteUserDialog(false)}>
      <DialogTitle>Delete User</DialogTitle>
      <DialogContent>
          <text>Do you want to delete the following user?</text>
          <p style={{ fontWeight: 600, marginTop: 10 }}>{selectedRow.name}</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={onDelete} style={{ backgroundColor: 'red', color: 'white' }}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteUserDialog