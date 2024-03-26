import { Button, TextField } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

export default function LoginForm(h) {
  const validationSchemaLogin = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required').min(8, 'Minimum 8 characters length'),
  });

  const validationSchemaRegister = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Email is required'),
  });

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={h.isForgotPassword ? validationSchemaRegister : validationSchemaLogin}
      onSubmit={(values, actions) => {
        h.attemptLoginOrPasswordReset(values);
        console.log(values);
        actions.setSubmitting(false);
      }}
    >
      {({ errors, touched }) => (
        <Form>
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
          {!h.isForgotPassword && (
            <Field
              name="password"
              type="password"
              as={TextField}
              label="Password"
              variant="outlined"
              fullWidth
              required
              error={touched.password && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              className="input-field"
            />
          )}
          <Button variant="contained" className="login" type="submit">
            {h.isForgotPassword ? 'RESET PASSWORD' : 'LOG IN'}
          </Button>
          <h6
            style={{ marginInline: 'auto', marginTop: 10 }}
            onClick={h.toggleForgotPassword}
          >
            {h.isForgotPassword ? (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <ArrowBack style={{ fontSize: 14 }} />
                &nbsp;<p>Back to Login</p>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <ArrowForward style={{ fontSize: 14 }} />
                &nbsp;<p>Forgot your Password?</p>
              </div>
            )}
          </h6>
          <hr />
          <Button variant="outlined" color="primary" fullWidth className="create-account" onClick={() => h.setOpen(true)}>
            Sign Up
          </Button>
        </Form>
      )}
    </Formik>
  );
}
