import mongoose from "mongoose";

interface ItemDocument extends mongoose.Document {
  name: string;
  quantity: number;
  category: string;
  price: number;
  status: string;
  godown_id: mongoose.Schema.Types.ObjectId;
  brand: string;
  image_url: string;
  attributes: Map<string, string | number | boolean>;
}

const itemSchema = new mongoose.Schema<ItemDocument>({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  status: { type: String, required: true },
  godown_id: { type: mongoose.Schema.Types.ObjectId, ref: "Godown" },
  brand: { type: String, required: true },
  image_url: { type: String, required: true },
  attributes: {
    type: Map,
    of: mongoose.Schema.Types.Mixed,
  },
});

export default mongoose.models.Item ||
  mongoose.model<ItemDocument>("Item", itemSchema);