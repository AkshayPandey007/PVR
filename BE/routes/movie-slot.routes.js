import { Router } from "express";
import  MovieController  from "../controllers/movie.controller.js";
const movieSlotRouter = Router();

// Create a movie slot
movieSlotRouter.post("/",MovieController.createMovie);

// Get all movies
movieSlotRouter.get("/all-movie",MovieController.getAllMovies)

// Delete a movie by ID
movieSlotRouter.post("/delete/:movieId",MovieController.deleteMovie);

// Get a movie slot by ID
movieSlotRouter.get("/:id" , MovieController.getMovieById);


// Delete a movie slot by ID
movieSlotRouter.post("/delete-slot/:id",MovieController.deleteSlotById);

// Update a movie slot by ID
movieSlotRouter.post("/update-slot" , MovieController.updateSlotById);

// Update a movie  by ID
movieSlotRouter.post("/update-movie/:id" , MovieController.updateMovieById);



export default movieSlotRouter;
