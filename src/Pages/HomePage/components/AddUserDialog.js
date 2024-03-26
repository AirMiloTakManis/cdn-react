import React from 'react'
import { Dialog, DialogTitle, DialogContent, Button, TextField } from '@mui/material'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

function ViewUserDialog({ openAddUserDialog, setOpenAddUserDialog, addUser }) {
  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Email is required'),
  });

  return (
    <>
      <Button 
        style={{ backgroundColor: 'var(--primary-color)', color: 'black', borderRadius: '0.4rem', width: '10%' }}
        onClick={() => setOpenAddUserDialog(true)}
      >
        Add User
      </Button>
      <Dialog fullWidth={true} open={openAddUserDialog} onClose={() => setOpenAddUserDialog(false)}>
        <DialogTitle style={{ display: 'flex', justifyContent: 'space-between' }}>
          Add User
        </DialogTitle>
        <DialogContent>
          <Formik
            initialValues={{ email: '', name: '', phone: '', skillsets: '', RoleId: 2, hobby: '', username: '' }}
            validationSchema={validationSchema} 
            onSubmit={(values, actions) => {
              addUser(values);
              console.log(values);
              actions.setSubmitting(false);
            }}
          >
            {({ errors, touched }) => (
              <Form>
                <Field
                  name="name"
                  type="text"
                  as={TextField}
                  label="Name"
                  variant="outlined"
                  fullWidth
                  className="input-field"
                />
                <Field
                  name="email"
                  type="text"
                  as={TextField}
                  label="Email"
                  variant="outlined"
                  fullWidth
                  required
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                  className="input-field"
                />
                 <Field
                  name="username"
                  type="text"
                  as={TextField}
                  label="Username"
                  variant="outlined"
                  fullWidth
                  className="input-field"
                />
                <Field
                  name="phone"
                  type="text"
                  as={TextField}
                  label="Phone"
                  variant="outlined"
                  fullWidth
                  className="input-field"
                />
                <Field
                  name="skillsets"
                  type="text"
                  as={TextField}
                  label="Skillsets"
                  variant="outlined"
                  fullWidth
                  className="input-field"
                />
                <Field
                  name="hobby"
                  type="text"
                  as={TextField}
                  label="Hobby"
                  variant="outlined"
                  fullWidth
                  className="input-field"
                />
                <Field
                  name="RoleId"
                  type="text"
                  as={TextField}
                  label="RoleId"
                  variant="outlined"
                  fullWidth
                  className="input-field"
                />
                <Button
                  type="submit"
                  className='login'
                >
                  Add User
                </Button>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default ViewUserDialog