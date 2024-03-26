import React, { useState, useEffect } from 'react'
import Api, { endpoints } from '../../Helpers/api'

export default function Hook({ user }) {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [openAddUserDialog, setOpenAddUserDialog] = useState(false);
  const [openViewUserDialog, setOpenViewUserDialog] = useState(false);
  const [openEditUserDialog, setOpenEditUserDialog] = useState(false);
  const [openDeleteUserDialog, setOpenDeleteUserDialog] = useState(false);
  const [selectedRow, setSelectedRow] = useState([]);

  const getUsers = () => {
    Api({
      endpoint: endpoints.getUsers(search),
      onSuccess: (res) => {
        setUsers(res.data);
        setSearch('');
      },
      onFail: (err) => {
        setUsers([]);
        setSearch('');
      } 
    })
  }

  const addUser = (data) => {
    Api({
      endpoint: endpoints.createUser(),
      data,
      onSuccess: (res) => {
        alert('Successfully add user');
        getUsers();
        setOpenAddUserDialog(false);
      },
      onFail: (err) => {
        alert('Failed to add user');
        setOpenAddUserDialog(false);
      } 
    })
  }
  const updateUser = (data) => {
    Api({
      endpoint: endpoints.updateUser(selectedRow.id),
      data,
      onSuccess: (res) => {
        alert('Successfully update user');
        getUsers();
        setOpenEditUserDialog(false);
      },
      onFail: (err) => {
        alert('Failed to update user');
        setOpenEditUserDialog(false);
      } 
    })
  }

  const onDelete = () => {
    Api({
      endpoint: endpoints.deleteUser(selectedRow.id),
      onSuccess: (res) => {
        alert('Successfully delete user');
        getUsers();
        setOpenDeleteUserDialog(false);
      },
      onFail: () => {
        alert('Failed to delete user');
        setOpenDeleteUserDialog(false);
      }
    })
  }

  return {
    users,
    setUsers,
    getUsers,
    search,
    setSearch,
    openViewUserDialog,
    setOpenViewUserDialog,
    openEditUserDialog,
    setOpenDeleteUserDialog,
    openDeleteUserDialog,
    setOpenEditUserDialog,
    selectedRow,
    setSelectedRow,
    updateUser,
    onDelete,
    openAddUserDialog,
    setOpenAddUserDialog,
    addUser,
  }
}
