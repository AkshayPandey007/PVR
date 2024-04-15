import React, { useEffect, useState } from 'react'
import "./Dashboard.scss"
import MovieTable from './MovieTable'
import CreateMovie from './CreateMovie';
import { useDispatch, useSelector } from 'react-redux';
import { allMovie } from '../../Redux/Features/Movie.Slice';
import { RootState } from '../../Redux/Store';
import logo from '../../Assets/PVRMovies.jpg'
import { clearState, logout } from '../../Redux/Features/Auth.Slice';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch()
  const movieData = useSelector((state:RootState)=>state.movie)
  const navigate = useNavigate()
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleLogout=()=>{
    dispatch(clearState())
   dispatch(logout()).then((res:any)=>{
    if(res?.payload==true){
      navigate("/login")
    }
   })
  }
  
  useEffect(()=>{
  dispatch(allMovie())
  },[])
  return (
    <div>
      <div className='headerBox'>
        <div>
       <img src={logo} alt="" className='logoImg'/>
        </div>
      <div style={{display:'flex',justifyContent:'center',gap:'40px'}}>
        <button className='createBtn' onClick={openModal}>Create Movie +</button>
        <button className='logOutBtn' onClick={()=>handleLogout()}>Logout</button>
      </div>
      
      </div>
      <div className='TableLayout'>
        <MovieTable movieData={movieData}/>
      </div>
      {isModalOpen && <CreateMovie isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />}
    </div>
  )
}

export default Dashboard