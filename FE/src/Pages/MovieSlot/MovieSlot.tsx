import React, { useEffect, useState } from 'react';
import './MovieSlot.scss';
import { Box, Button, IconButton, Modal, Snackbar } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../Redux/Store';
import { deleteMovieSlotById, getMovieById, updateMovieSlotById } from '../../Redux/Features/Movie.Slice';
import MuiAlert from '@mui/material/Alert';

const MovieSlot = () => {
  const data = useSelector((state: RootState) => state?.movie);
  const { id } = useParams();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState<any>({});
  const dispatch = useDispatch();
  const [maxSeats, setMaxSeats] = useState<{ [key: string]: number }>({});
  const [changes, setChanges] = useState<any>([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [currentWeekStartDate, setCurrentWeekStartDate] = useState<string>('');

  useEffect(() => {
    if (data?.getMovieById?.result) {
      const initialMaxSeats: { [key: string]: number } = {};
      data?.getMovieById?.result?.forEach((slot: any) => {
        slot?.movies?.forEach((movie: any) => {
          initialMaxSeats[movie._id] = movie?.maxSeat;
        });
      });
      setMaxSeats(initialMaxSeats);
    }
 }, [data?.getMovieById?.result]);

 useEffect(() => {
    if (data?.getMovieById?.minStartDate) {
      setCurrentWeekStartDate(data?.getMovieById?.minStartDate);
    }
 }, [data?.getMovieById?.minStartDate]);

 useEffect(() => {
    dispatch(getMovieById({ movieId: id }));
 }, [id, dispatch]);

 const getWeekStartDate = (date:any) => {
  const day = date.getDay();
  const startOfWeek = new Date(date);
  startOfWeek.setDate(date.getDate() - day);
  return startOfWeek.toISOString().split('T')[0];
 };

 const getWeekNumber = (date: Date) => {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
 };

 const goToNextWeek = () => {
  const currentDate = new Date(currentWeekStartDate);
  currentDate.setDate(currentDate.getDate() + 7);
  setCurrentWeekStartDate(getWeekStartDate(currentDate));
 };
 
 const goToPreviousWeek = () => {
  const currentDate = new Date(currentWeekStartDate);
  currentDate.setDate(currentDate.getDate() - 7);
  setCurrentWeekStartDate(getWeekStartDate(currentDate));
 };

 const currentWeekNumber = getWeekNumber(new Date(currentWeekStartDate));

  const filteredMovies = data?.getMovieById?.result?.map((slot: any) => ({
    ...slot,
    movies: slot?.movies?.filter((movie: any) => {
      const movieStartDate = new Date(movie.startDate);
      const weekStartDate = new Date(currentWeekStartDate);
      const weekEndDate = new Date(weekStartDate);
      weekEndDate.setDate(weekEndDate.getDate() + 7); 
      return movieStartDate >= weekStartDate && movieStartDate < weekEndDate;
    }),
  }));

  const formatWeekDate = (startDate: string) => {
    const startDateObj = new Date(startDate);
    const startMonth = startDateObj?.toLocaleString('default', { month: 'long' });
    const startYear = startDateObj.getFullYear();
    const endDateObj = new Date(startDate);
    endDateObj?.setDate(endDateObj.getDate() + 6);
    const endMonth = endDateObj?.toLocaleString('default', { month: 'long' });
    const endDate = endDateObj.getDate();
    return `${startMonth} ${startDateObj?.getDate()} - ${endMonth} ${endDate} ${startYear}`;
  };

  const increaseMaxSeats = (movieId: string) => {
    setMaxSeats((prevState) => {
      const newMaxSeats = (prevState[movieId] || 0) + 1;
      const existingChangeIndex = changes.findIndex((change: any) => change.id === movieId);
      if (existingChangeIndex !== -1) {
        const updatedChanges = [...changes];
        updatedChanges[existingChangeIndex].val += 1;
        setChanges(updatedChanges);
      } else {
        setChanges((prevChanges: any) => [...prevChanges, { id: movieId, val: 1 }]);
      }
      return {
        ...prevState,
        [movieId]: newMaxSeats,
      };
    });
  };

  const decreaseMaxSeats = (movieId: string) => {
    setMaxSeats((prevState) => {
      const newMaxSeats = Math.max((prevState[movieId] || 0) - 1, 0);
      const existingChangeIndex = changes.findIndex((change: any) => change.id === movieId);
      if (existingChangeIndex !== -1) {
        const updatedChanges = [...changes];
        updatedChanges[existingChangeIndex].val -= 1;
        setChanges(updatedChanges);
      } else {
        setChanges((prevChanges: any) => [...prevChanges, { id: movieId, val: -1 }]);
      }
      return {
        ...prevState,
        [movieId]: newMaxSeats,
      };
    });
  };

  const handleSaveAndContinue = () => {
    dispatch(updateMovieSlotById({ slotArray: changes })).then((res: any) => {
      if (res?.payload?.status == true) {
        dispatch(getMovieById({ movieId: id }));
        handleOpenSnackbar('Movie slots updated successfully');
        setChanges([]);
      }
    });
  };

  const handleCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleOpenSnackbar = (message: any) => {
    setSnackbarMessage(message);
    setOpenSnackbar(true);
  };

  const hasChanges = Object.values(changes)?.some((val) => val !== 0);

  return (
    <div>
      <div>
        <div className='pagination'>
          <IconButton
            onClick={goToPreviousWeek}
            disabled={new Date(currentWeekStartDate) <= new Date(data?.getMovieById?.minStartDate)}
          >
            <ArrowBackIosNewIcon sx={{ fontSize: '20px' }} />
          </IconButton>

          <p>
            Week {currentWeekNumber} - {formatWeekDate(currentWeekStartDate)}
          </p>
          <IconButton
            onClick={goToNextWeek}
            
            disabled={
              new Date(currentWeekStartDate).getTime() + 7 * 24 * 60 * 60 * 1000 >=
              new Date(data?.getMovieById?.maxEndDate).getTime()
            }
          >
            <ArrowForwardIosIcon sx={{ fontSize: '20px' }} />
          </IconButton>
        </div>
        {filteredMovies?.map((slot: any) => (
          <div
            key={`${slot.startTime}-${slot.endTime}`}
            style={{ display: 'flex' }}
          >
            <div>
              <p style={{ textAlign: 'center', fontWeight: '600' }}>
                Starts time
              </p>
              <div className='time-slot'>
                <p className='StartTime'>{slot.startTime}</p>
                <p className='EndTime'>End {slot.endTime}</p>
              </div>
            </div>
            <div className='MainSlotBox'>
              {slot?.movies?.map((movie: any, ind: any) => {
                const formattedDay = new Date(movie.startDate).toLocaleString(
                  'default',
                  { weekday: 'long' }
                );

                return (
                  <>
                    <div key={ind} className='EachDiv'>
                      <p style={{ textAlign: 'center', fontWeight: '600' }}>
                        {formattedDay}
                      </p>
                      <div style={{ border: '1px solid gray' }}>
                        <div
                          style={{ display: 'flex', justifyContent: 'right' }}
                        >
                          <IconButton
                            sx={{ color: 'red' }}
                            onClick={() => {
                              setSelectedData(movie);
                              setIsDeleteModalOpen(true);
                            }}
                          >
                            <HighlightOffIcon />
                          </IconButton>
                        </div>
                        <p style={{ textAlign: 'center' }}>Min 1</p>
                        <div className='IncDecSeat'>
                          <IconButton
                            onClick={() => decreaseMaxSeats(movie._id)}
                          >
                            <RemoveIcon />
                          </IconButton>
                          Max {maxSeats[movie._id] || movie.maxSeat}
                          <IconButton
                            onClick={() => increaseMaxSeats(movie._id)}
                          >
                            <AddIcon />
                          </IconButton>
                        </div>
                        <p style={{ textAlign: 'center' }}>
                          {movie.maxSeat} seats left
                        </p>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button className={!hasChanges ? 'disabledSaveAndCont' : "saveAndContinue"} onClick={handleSaveAndContinue} disabled={!hasChanges}>
          Save & continue
        </button>
      </div>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <MuiAlert
          elevation={4}
          variant='filled'
          onClose={handleCloseSnackbar}
          severity='success'
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>

      <Modal
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
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
            Are you sure you want to delete{' '}
            <span style={{ fontWeight: '600' }}>
              {selectedData?.startDate} {selectedData?.title}{' '}
            </span>{' '}
            ?
          </p>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              onClick={() =>
                dispatch(deleteMovieSlotById({ id: selectedData?._id })).then(
                  (res: any) => {
                    if (res.payload) {
                      dispatch(getMovieById({ movieId: id }));
                      setIsDeleteModalOpen(false);
                    }
                  }
                )
              }
              className='DeleteModalBtn'
            >
              Delete
            </Button>

            <Button onClick={() => setIsDeleteModalOpen(false)} className='CancelModalBtn'>Cancel</Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default MovieSlot;
