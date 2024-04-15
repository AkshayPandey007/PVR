import axios from "axios";

const baseURL = process.env.REACT_APP_BACKEND_URL;

// Movie Post request
async function MovieCreate(title:any, movieSlots:any) {
    const userEmail = localStorage.getItem("pvrMovies")
  try {
    const { data } = await axios.post<any>(`${baseURL}/api/movie/`, {
        title, movieSlots,userEmail
    });
    return data;
  } catch (e: any) {
    return e.response.data;
  }
}

async function AllMovie() {
    const userEmail = localStorage.getItem("pvrMovies")
    try {
      const { data } = await axios.get<any>(`${baseURL}/api/movie/all-movie?userEmail=${userEmail}`);
      return data;
    } catch (e: any) {
      return e.response.data;
    }
}

  async function DeleteMovie(movieId:string) {
    try {
      const { data } = await axios.post<any>(`${baseURL}/api/movie/delete/${movieId}`, {
          
      });
      return data;
    } catch (e: any) {
      return e.response.data;
    }
  }


  async function getMovieById(movieId:string) {
    try {
      const { data } = await axios.get<any>(`${baseURL}/api/movie/${movieId}`, {
          
      });
      return data;
    } catch (e: any) {
      return e.response.data;
    }
  }



  async function deleteMovieSlotById(id:string) {
    try {
      const { data } = await axios.post<any>(`${baseURL}/api/movie/delete-slot/${id}`, {
          
      });
      return data;
    } catch (e: any) {
      return e.response.data;
    }
  }


  async function updateMovieSlotById(slotArray:any) {
    try {
      const { data } = await axios.post<any>(`${baseURL}/api/movie/update-slot`, {
        slotArray
      });
      return data;
    } catch (e: any) {
      return e.response.data;
    }
  }


  async function updateMovieById(id:string,title:any) {
    try {
      const { data } = await axios.post<any>(`${baseURL}/api/movie/update-movie/${id}`, {
        title
      });
      return data;
    } catch (e: any) {
      return e.response.data;
    }
  }



//Export Movie Service
const MovieService = {
    MovieCreate,
    AllMovie,
    DeleteMovie,
    getMovieById,
    deleteMovieSlotById,
    updateMovieSlotById,
    updateMovieById
  };
  
  export default MovieService;