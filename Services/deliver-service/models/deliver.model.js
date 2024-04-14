import mongoose from 'mongoose';
const { Schema } = mongoose;
const deliverSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    orderId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    pNumber: {
      type: Number,
      default: 0,
    },
    dOption: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Deliver', deliverSchema);
