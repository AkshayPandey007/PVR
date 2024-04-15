import mongoose from "mongoose";

const movieSlotSchema = new mongoose.Schema({
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  price: { type: String, required: true },
  maxSeat: { type: Number },
  numOfSeats: { type: Number }
});

const movieSchema = new mongoose.Schema({
  userEmail:{ type: String },
  title: { type: String },
  movieSlots: [movieSlotSchema]
});

export default mongoose.model("Movie", movieSchema);
