import React, { useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'
import './login.scss'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import logo from '../../Assets/PVRMovies.jpg'
import { Formik } from 'formik'
import { validateLogin } from './Login.validate'
import { useTranslation } from 'react-i18next'
import { Alert, AlertColor, IconButton, InputAdornment, Snackbar, TextField } from '@mui/material'
import { validationError } from '../../Constraints/Shared.Validation'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { login, signup } from '../../Redux/Features/Auth.Slice'

export interface LoginValues {
  email: string
  password: string
}

const SignUp = () => {
  const navigate = useNavigate()
  const [values, setValues] = useState({ username: '', password: '' })
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const [successVal, setSuccess] = useState('success')
  const [msg, setMsg] = useState('')
  const { t } = useTranslation()
  const [showPassword, setShowPassword] = useState(false)


  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  return (
    <>
      <div>
        <div className='loginBox'>
          <div className='logoBox'>
            <img src={logo} alt='' className='LoginLogo' />
          </div>

          <Formik<LoginValues>
            validateOnBlur
            initialValues={{
              email: '',
              password: ''
            }}
            onSubmit={values => {
              dispatch(
                signup({ email: values.email, password: values?.password })
              ).then((res: any) => {
                if (res?.payload?.status === true) {
                  setMsg('Successfully login')
                  setSuccess('success')
                  setOpen(true)
                  navigate('/')
                }
                if (res?.payload?.status === false) {
                  setMsg(res?.payload?.message)
                  setSuccess('error')
                  setOpen(true)
                }
              })
            }}
            validate={values => validateLogin(values, t)}
          >
            {({
              values,
              touched,
              errors,
              handleChange,
              handleBlur,
              handleSubmit,
              isValid
            }) => (
              <form
                style={{
                  margin: 'auto',
                  padding: '30px',
                  borderRadius: '10px'
                }}
                onSubmit={handleSubmit}
              >
                <TextField
                  margin='normal'
                  InputLabelProps={{ style: { color: 'white' } }}
                  name='email'
                  placeholder='Enter your email'
                  type='email'
                  InputProps={{
                    style: {
                      width: '400px',
                      borderRadius: 10,
                      fontSize: 20
                    }
                  }}
                  error={Boolean(touched.email) && Boolean(errors.email)}
                  helperText={validationError(errors.email, touched.email)}
                  value={values.email}
                  onChange={handleChange}
                />

                <TextField
                  margin='normal'
                  InputLabelProps={{ style: { color: 'white' } }}
                  name='password'
                  placeholder='Password'
                  type={showPassword ? 'text' : 'password'} 
                  InputProps={{
                    style: {
                      width: '400px',
                      borderRadius: 10,
                      fontSize: 20
                    },
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge='end'
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                  error={Boolean(touched.password) && Boolean(errors.password)}
                  helperText={validationError(
                    errors.password,
                    touched.password
                  )}
                  value={values.password}
                  onChange={handleChange}
                />

                <br />

                <button
                  type='submit'
                  className='loginBtn'
                >
                  SignUp
                </button>
              </form>
            )}
          </Formik>
          <div className='LoginSignBox'>
           Already have an account?{' '}
            <span style={{ color: 'rgba(0,149,,246,1', fontWeight: '600',cursor:'pointer' }} onClick={()=>navigate('/login')}>
              {' '}
              Login
            </span>
          </div>
        </div>
       

        <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleClose}
          severity={successVal as AlertColor}
          variant='filled'
          sx={{ width: '100%' }}
        >
          {msg}
        </Alert>
      </Snackbar>
      </div>
    </>
  )
}

export default SignUp
