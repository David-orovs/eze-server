import mongoose from 'mongoose';

const requestSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, index: true },
    grade: {
      type: String,
      enum: ['New', 'A1', 'A2', 'B1', 'B2', 'C', 'C/B', 'C/D'],
    },
    price: { type: Number, required: true, index: true },
    unlocked: { type: Boolean, default: false },
    requestType: {
      type: String,
      enum: ['buy', 'sell'],
    },
    storageSize: { type: String, required: true, index: true },
  },
  { timestamps: true }
);

requestSchema.index({ name: 'text', grade: 'text', storageSize: 'text' });

const Request = mongoose.model('Request', requestSchema);

export default Request;
