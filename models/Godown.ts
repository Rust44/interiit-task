import mongoose from "mongoose";

interface GodownDocument extends mongoose.Document {
  name: string;
  parentGodown: mongoose.Schema.Types.ObjectId;
}

const godownSchema = new mongoose.Schema<GodownDocument>({
  name: { type: String, required: true },
  parentGodown: { type: mongoose.Schema.Types.ObjectId, ref: "Godown" },
});

export default mongoose.models.Godown ||
  mongoose.model<GodownDocument>("Godown", godownSchema);
