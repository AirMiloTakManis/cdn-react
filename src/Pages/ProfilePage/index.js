import React from 'react'
import { Avatar, Button } from '@mui/material'

export default function index({ user }) {
  return (
    <div className="profile-card-container">
      <div>
        <Avatar src={user?.image} alt={user?.name} style={{ marginInline: 'auto', marginBottom: 10 }} />
        <hr />
      </div>
      <div>
        <div><span>{user?.name}</span></div>
        <div><span>{user?.username}</span></div>
        <div><span>{user?.skillsets}</span></div>
        <div><span>{user?.hobby}</span></div>
        <div><span>{user?.phone}</span></div>
      </div>
      <Button style={{ backgroundColor: 'salmon', color: 'white', marginTop: 20 }} onClick={() => window.location.replace("/logout")}>
        Log out
      </Button>
    </div>
  )
}
