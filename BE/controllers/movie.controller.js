import Movie from "../schema/movies.js";
import Slot from "../schema/slot.js";

const createMovie = async (req, res) => {
    try {
      const { title, movieSlots,userEmail } = req.body;
      console.log(userEmail,'userEmail')
      const defaultMaxSeat = 50;
      const defaultNumOfSeats = 50;
  
      const movieSlotsWithDefaults = movieSlots?.map(slot => ({
        ...slot,
        maxSeat: slot.maxSeat || defaultMaxSeat,
        numOfSeats: slot.numOfSeats || defaultNumOfSeats
      }));
  
      const movie = new Movie({ title, movieSlots: movieSlotsWithDefaults,userEmail });
      await movie.save();
  
      // Create slots based on startDate and endDate
      for (const slot of movieSlotsWithDefaults) {
        const startDate = new Date(slot.startDate);
        const endDate = new Date(slot.endDate);
        const daysDifference = (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24);
  
        // Create slots for each day in the date range
        for (let i = 0; i <= daysDifference; i++) {
          const currentDate = new Date(startDate);
          currentDate.setDate(startDate.getDate() + i);
          
          // Create a slot for the current date
          const newSlot = new Slot({
            movieId: movie._id, // Assign the movie's ID to the slot
            startTime: slot.startTime,
            endTime: slot.endTime,
            startDate: currentDate.toISOString().split('T')[0], // Format date as YYYY-MM-DD
            endDate: currentDate.toISOString().split('T')[0], // Format date as YYYY-MM-DD
            price: slot.price,
            title:title,
            maxSeat: slot.maxSeat,
            numOfSeats: slot.numOfSeats
          });
  
          // Save the slot to the database
          await newSlot.save();
        }
      }
  
      res.status(201).json(movie);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


  const deleteMovie = async (req, res) => {
    try {
      const { movieId } = req.params;
  
      const deletedMovie = await Movie.findByIdAndDelete(movieId);
  
      if (!deletedMovie) {
        return res.status(404).json({ error: "Movie not found" });
      }
  
      await Slot.deleteMany({ movieId });
  
      res.status(200).json({ message: "Movie and associated slots deleted successfully",movieId });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

  const getAllMovies = async (req, res) => {
    const userEmail = req.query.userEmail;
    try {
      const movies = await Movie.find({userEmail});
      res.status(200).json(movies);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


  const getMovieById = async (req, res) => {
    try {
        const { id } = req.params;
        const movies = await Slot.find({ movieId: id });

        if (movies.length === 0) {
            return res.status(404).json({ message: "No movies found for the given ID." });
        }
        let minStartDate = movies[0]?.startDate;
        let maxEndDate = movies[0]?.endDate;

        movies?.forEach(movie => {
            if (movie.startDate < minStartDate) {
                minStartDate = movie.startDate;
            }
            if (movie.endDate > maxEndDate) {
                maxEndDate = movie.endDate;
            }
        });

        const moviesByStartTimeAndEndTime = movies?.reduce((acc, movie) => {
            const key = `${movie.startTime}-${movie.endTime}`;
            if (!acc[key]) {
                acc[key] = {
                    startTime: movie.startTime,
                    endTime: movie.endTime,
                    movies: [],
                };
            }
            acc[key].movies.push(movie);
            return acc;
        }, {});

        const result = Object.values(moviesByStartTimeAndEndTime);

        res.status(200).json({ minStartDate, maxEndDate, result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const deleteSlotById = async (req, res) => {
    try {
      const { id } = req.params;
  
      const deletedMovie = await Slot.findByIdAndDelete({_id:id});
  
      if (!deletedMovie) {
        return res.status(404).json({ error: "Movie Slot not found" });
      }
  
      res.status(200).json({ message: "Slot deleted successfully",id });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


  const updateSlotById = async (req, res) => {
    try {
      const { slotArray } = req.body;
  
      console.log(slotArray,'slotArray')
      // Assuming you have a Slot model and access to the database
      // Loop through each object in slotArray
      for (const { id, val } of slotArray) {
        // Find the slot by its _id
        const slot = await Slot.findById(id);
  
        // If the slot is not found, skip to the next iteration
        if (!slot) {
          console.log(`Slot with ID ${id} not found.`);
          continue;
        }
  
        // Update the slot's maxSeat value
        slot.maxSeat += val;
  
        // Save the updated slot
        await slot.save();
        console.log(`Slot with ID ${id} updated successfully. New maxSeat: ${slot.maxSeat}`);
      }
  
      res.status(200).json({ message: 'Slots updated successfully.',status:true });
    } catch (error) {
      console.error('Error updating slots:', error);
      res.status(500).json({ error: error.message });
    }
  };
  
  

  const updateMovieById = async (req, res) => {
    try {
      const { id } = req.params;
      const { title } = req.body;
  
      await Movie.findByIdAndUpdate({_id:id}, { title });
  
      await Slot.updateMany({ movieId: id }, { title });
  
      res.status(200).json({ message: 'updated successfully',success:true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  

const MovieController = {
    createMovie,
    getAllMovies,
    deleteMovie,
    getMovieById,
    deleteSlotById,
    updateSlotById,
    updateMovieById
  };
  
  export default MovieController;
