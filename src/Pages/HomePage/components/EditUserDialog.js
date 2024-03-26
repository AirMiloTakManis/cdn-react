import React from 'react'
import { Dialog, DialogTitle, DialogContent, Button, TextField } from '@mui/material'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

function ViewUserDialog({ openEditUserDialog, setOpenEditUserDialog, updateUser, selectedRow }) {
  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Email is required'),
  });

  return (
    <Dialog fullWidth={true} open={openEditUserDialog} onClose={() => setOpenEditUserDialog(false)}>
      <DialogTitle style={{ display: 'flex', justifyContent: 'space-between' }}>
        Edit User
      </DialogTitle>
      <DialogContent>
        <Formik
          initialValues={{ email: selectedRow.email, name: selectedRow.name, phone: selectedRow.phone, skillsets: selectedRow.skillsets }}
          validationSchema={validationSchema} 
          onSubmit={(values, actions) => {
            updateUser(values);
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
              <Button
                type="submit"
                className='login'
              >
                Update User
              </Button>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  )
}

export default ViewUserDialog