import mongoose from "mongoose";

const SlotSchema = new mongoose.Schema({
  movieId: { type: String},
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  price: { type: String, required: true },
  title: { type: String },
  maxSeat: { type: Number },
  numOfSeats: { type: Number }
});

export default mongoose.model("Slot", SlotSchema);
