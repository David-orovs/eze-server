import mongoose from 'mongoose';

const requestSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, index: true },
    grade: {
      enum: ['New', 'A1', 'A2', 'B1', 'B2', 'C', 'C/B', 'C/D'],
    },
    price: { type: Number, required: true, index: true },
    unlocked: { type: Boolean, default: false },
    requestType: { enum: ['buy', 'sell'] },
    storageSize: { type: String, required: true, index: true },
  },
  { timestamps: true }
);

const Request = mongoose.model('Request', requestSchema);

export default Request;
