import axios from "axios";

const baseURL = process.env.REACT_APP_BACKEND_URL;

// Login Post request
async function signup(email: string, password: string) {
  try {
    const { data } = await axios.post<any>(`${baseURL}/api/auth/signup`, {
      email,
      password,
    });
    if (data) {
      localStorage.setItem("pvrMovies", data?.user?.email);
    }
    return data;
  } catch (e: any) {
    return e.response.data;
  }
}

// Login Post request
async function login(email: string, password: string) {
  try {
    const { data } = await axios.post<any>(`${baseURL}/api/auth/login`, {
      email,
      password,
    });
    if (data) {
      localStorage.setItem("pvrMovies", data?.user?.email);
    }
    return data;
  } catch (e: any) {
    return e.response.data;
  }
}



const logout = async () => {
  try {
    localStorage.removeItem("pvrMovies");
    return true;
  } catch (e) {
    return e;
  }
};


//Export Auth Service
const AuthService = {
  signup,
    login,
    logout,

  };
  
  export default AuthService;