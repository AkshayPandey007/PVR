import * as React from 'react'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableFooter from '@mui/material/TableFooter'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import IconButton from '@mui/material/IconButton'
import { Button, Modal, TableHead } from '@mui/material'
import './Dashboard.scss'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { deleteMovie } from '../../Redux/Features/Movie.Slice'
import CreateMovie from './CreateMovie'

interface TablePaginationActionsProps {
  count: number
  page: number
  rowsPerPage: number
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void
}


export default function MovieTable ({ movieData }: any) {
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)
  const [selectedRow, setSelectedRow] = React.useState<any>(null)
  const [deleteModalOpen, setDeleteModalOpen] = React.useState<boolean>(false)
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const navigate = useNavigate()
  const disptach = useDispatch()
  const handleDeleteIconClick = (row: any) => {
    setSelectedRow(row) 
    setDeleteModalOpen(true) 
  }

  const handleDelete = () => {
    disptach(deleteMovie({ movieId: selectedRow?._id }))
    setDeleteModalOpen(false)
  }

  const handleCancelDelete = () => {
    setSelectedRow(null) 
    setDeleteModalOpen(false) 
  }

  
  const emptyRows =
    page > 0 ? Math?.max(0, (1 + page) * rowsPerPage - movieData?.length) : 0

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const openModal = () => {
    setIsModalOpen(true)
  }

  return (
    <>
      <TableContainer component={Paper} >
        <Table sx={{ minWidth: 500 }} aria-label='custom pagination table'>
          <TableHead>
            <TableRow>
              <TableCell className='tableHeading'>Title</TableCell>
              <TableCell align='right' className='tableHeading'>
                Start Date
              </TableCell>
              <TableCell align='right' className='tableHeading'>
                End Date
              </TableCell>
              <TableCell align='right' className='tableHeading'>
                Start Time
              </TableCell>
              <TableCell align='right' className='tableHeading'>
                End Time
              </TableCell>
              <TableCell align='right' className='tableHeading'>
                Price
              </TableCell>
              <TableCell align='right' className='tableHeading'>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          {movieData?.allMovie?.length > 0 ? (
            <TableBody>
              {(rowsPerPage > 0 && movieData?.allMovie
                ? movieData?.allMovie?.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : movieData?.allMovie
              )?.map((row: any) => (
                <TableRow key={row.title}>
                  <TableCell component='th' scope='row'>
                    {row.title}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align='right'>
                    {row?.movieSlots?.map((el: any) => (
                      <div>{el?.startDate}</div>
                    ))}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align='right'>
                    {row?.movieSlots?.map((el: any) => (
                      <div>{el?.endDate}</div>
                    ))}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align='right'>
                    {row?.movieSlots?.map((el: any) => (
                      <div>{el?.startTime}</div>
                    ))}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align='right'>
                    {row?.movieSlots?.map((el: any) => (
                      <div>{el?.endTime}</div>
                    ))}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align='right'>
                    {row?.movieSlots?.map((el: any) => (
                      <div>{el?.price} Rs.</div>
                    ))}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align='right'>
                    <IconButton
                      aria-label='edit'
                      onClick={() => {
                        setSelectedRow(row)
                        openModal()
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-label='delete'
                      onClick={() => handleDeleteIconClick(row)}
                    >
                      <DeleteIcon />
                    </IconButton>
                    <IconButton
                      aria-label='view'
                      onClick={() => navigate(`/movie-slot/${row._id}`)}
                    >
                      <VisibilityIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          ) : (
            <TableBody>
              <TableRow>
                <TableCell colSpan={7} align='center'>
                  No Data
                </TableCell>
              </TableRow>
            </TableBody>
          )}
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[]}
                colSpan={7}
                count={movieData?.allMovie?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>

      <Modal
        open={deleteModalOpen}
        onClose={handleCancelDelete}
        aria-labelledby='delete-modal-title'
        aria-describedby='delete-modal-description'
      >
        <Box
          sx={{
            position: 'absolute' as 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4
          }}
        >
          <h2 id='delete-modal-title'>Delete Confirmation</h2>
          <p id='delete-modal-description'>
            Are you sure you want to delete "
           <span style={{fontWeight:'600',fontSize:'17px'}}> {selectedRow ? selectedRow.title : ''} </span>"?
          </p>
          <div style={{display:'flex',justifyContent:'space-between'}}>
          <Button onClick={handleDelete} className='DeleteModalBtn'>Delete</Button>
          <Button onClick={handleCancelDelete} className='CancelModalBtn'>Cancel</Button>
          </div>
        </Box>
      </Modal>

      {isModalOpen && (
        <CreateMovie
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          isUpdate={true}
          selectedRow={selectedRow}
        />
      )}
    </>
  )
}
