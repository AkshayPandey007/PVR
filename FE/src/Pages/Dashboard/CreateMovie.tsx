import React from 'react'
import { Box, Button, CircularProgress, IconButton, Modal, TextField } from '@mui/material'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import './Dashboard.scss'
import DeleteIcon from '@mui/icons-material/Delete'
import { useDispatch, useSelector } from 'react-redux'
import { allMovie, createMovie, updateMovieById } from '../../Redux/Features/Movie.Slice'
import { RootState } from '../../Redux/Store'

const CreateMovie = ({
  setIsModalOpen,
  isModalOpen,
  isUpdate,
  selectedRow
}: {
  isModalOpen: boolean
  setIsModalOpen: Function,
  isUpdate?:boolean,
  selectedRow?:any
}) => {
  const CustomErrorMessage = ({ name }: any) => (
    <ErrorMessage name={name}>
      {msg => <div style={{ color: 'red' }}>{msg}</div>}
    </ErrorMessage>
  )

  const dispatch = useDispatch()
  const createData = useSelector((state:RootState)=>state?.movie)
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    maxWidth: 550,
    height: '80%', 
    maxHeight: 480,
    overflow: 'auto',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
  }

  const addMoreFields = (formik: any) => {
    formik.setFieldValue('movieSlots', [
      ...formik.values.movieSlots,
      { startTime: '', endTime: '', startDate: '', endDate: '', price: '' }
    ])
  }

  const removeField = (formik: any, index: number) => {
    formik.setFieldValue(
      'movieSlots',
      formik.values?.movieSlots?.filter((_value: any, i: number) => i !== index)
    )
  }

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    movieSlots: Yup.array()
      .of(
        Yup.object().shape({
          startTime: Yup.string().required('Start Time is required'),
          endTime: Yup.string().required('End Time is required'),
          startDate: Yup.string().required('Start Date is required'),
          endDate: Yup.string().required('End Date is required'),
          price: Yup.number()
            .required('Price is required')
            .positive('Price must be positive')
            .integer('Price must be an integer')
        })
      )
      .min(1, 'At least one set of fields is required')
  })

  const handleSubmit = (values: any, { setSubmitting }: any) => {
    if(isUpdate)
      {
     dispatch(updateMovieById({id:selectedRow._id,title:values?.title})).
     then((res:any)=>{
      if(res?.payload.success==true)
        {
          dispatch(allMovie())
          setIsModalOpen(false);
          setSubmitting(false)
        }
     })
      }
      else{

        const { title, movieSlots } = values
        dispatch(createMovie({ title, movieSlots }))
        .then((res:any)=>{
        
          if(res?.payload)
            {
              setIsModalOpen(false);
              setSubmitting(false)
            }
        })
   
      }
  }

  return (
    <Modal
      open={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Formik
         initialValues={{
          title: isUpdate ? selectedRow?.title || '' : '',
          movieSlots: isUpdate
            ? selectedRow?.movieSlots?.map((slot: any) => ({
                startTime: slot?.startTime || '',
                endTime: slot?.endTime || '',
                startDate: slot?.startDate || '',
                endDate: slot?.endDate || '',
                price: slot?.price || ''
              }))
            : [
                {
                  startTime: '',
                  endTime: '',
                  startDate: '',
                  endDate: '',
                  price: ''
                }
              ]
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {formik => (
          <Form>
            <Box sx={style}>
              <h3 style={{ padding: '20px', textAlign: 'center' }}>
                Enter Movie Details
              </h3>
              <div style={{ padding: '20px' }}>
                <p>Title*</p>{' '}
                <Field
                  name='title'
                  as={TextField}
                  label=''
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className='DateField'
                  placeholder='Enter movie title...'
                />
                <CustomErrorMessage name='title' />
              </div>
              {formik?.values?.movieSlots?.map((_field: any, index: number) => (
                <Box key={index} className='createCard__field'>
                  <div className='createCard__row'>
                    <div className='createCard__column'>
                      <p>Start Time*</p>
                      <Field
                        name={`movieSlots.${index}.startTime`}
                        as={TextField}
                        label=''
                        type='time'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className='DateField'
                        disabled={isUpdate}
                      />
                      <CustomErrorMessage
                        name={`movieSlots.${index}.startTime`}
                      />
                    </div>

                    <div className='createCard__column'>
                      <p>End Time*</p>
                      <Field
                        name={`movieSlots.${index}.endTime`}
                        as={TextField}
                        label=''
                        type='time'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className='DateField'
                        disabled={isUpdate}
                      />
                      <CustomErrorMessage
                        name={`movieSlots.${index}.endTime`}
                      />
                    </div>
                  </div>

                  <div
                    className='createCard__row'
                    style={{ marginTop: '20px' }}
                  >
                    <div className='createCard__column'>
                      <p>Start Date*</p>
                      <Field
                        name={`movieSlots.${index}.startDate`}
                        as={TextField}
                        label=''
                        type='date'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className='DateField'
                        disabled={isUpdate}
                      />
                      <CustomErrorMessage
                        name={`movieSlots.${index}.startDate`}
                      />
                    </div>

                    <div className='createCard__column'>
                      <p>End Date*</p>
                      <Field
                        name={`movieSlots.${index}.endDate`}
                        as={TextField}
                        label=''
                        type='date'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className='DateField'
                        disabled={isUpdate}
                      />
                      <CustomErrorMessage
                        name={`movieSlots.${index}.endDate`}
                      />
                    </div>
                  </div>

                  <div className='createCard__column'>
                    <p>Price*</p>
                    <Field
                      name={`movieSlots.${index}.price`}
                      as={TextField}
                      label=''
                      type='number'
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className='DateField'
                      placeholder='Enter Movie Slot Price'
                      disabled={isUpdate}
                    />
                    <CustomErrorMessage name={`movieSlots.${index}.price`} />
                  </div>

                  {index > 0 && !isUpdate && (
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <IconButton onClick={() => removeField(formik, index)}>
                        <DeleteIcon sx={{ fontSize: '32px' }} />
                      </IconButton>
                    </div>
                  )}
                </Box>
              ))}

             {isUpdate? "": <Box display='flex' justifyContent='flex-end'>
                <IconButton onClick={() => addMoreFields(formik)}>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                  >
                    <path
                      d='M8 12H12M12 12H16M12 12V16M12 12V8'
                      stroke='#2659ED'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                    <circle
                      cx='12'
                      cy='12'
                      r='9'
                      stroke='#2659ED'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>{' '}
                  Add
                </IconButton>
              </Box>}

              <Box display='flex' justifyContent='center'>
                <Button
                  sx={{
                    backgroundColor: '#2659ED',
                    color: 'white',
                    fontFamily: 'Nunito',
                    fontSize: '16px',
                    fontStyle: 'normal',
                    fontWeight: 600,
                    lineHeight: 'normal',
                    borderRadius: '31px',
                    padding: '15px 50px',
                    marginTop: '10px',
                    transition: 'background-color 0.3s',
                    '&:hover': {
                      backgroundColor: '#1E4B8F'
                    }
                  }}
                  type='submit'
                 
                  disabled={createData?.isFetching || formik.isSubmitting}
                >
                {createData.isFetching ? (
                    <>
                      <CircularProgress size={20} sx={{color:'white'}}/>
                    </>
                  ) : (
                    ''
                  )} {isUpdate?"Update":"Create"} 
                </Button>
              </Box>
            </Box>
          </Form>
        )}
      </Formik>
    </Modal>
  )
}

export default CreateMovie
