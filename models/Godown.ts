import mongoose from "mongoose";

type Item = {
  id: mongoose.Schema.Types.ObjectId;
  name: string;
};

interface GodownDocument extends mongoose.Document {
  name: string;
  parentGodown: mongoose.Schema.Types.ObjectId;
  items: Item[];
}

const godownSchema = new mongoose.Schema<GodownDocument>({
  name: { type: String, required: true },
  parentGodown: { type: mongoose.Schema.Types.ObjectId, ref: "Godown", default: null },
  items: [
    {
      id: { type: mongoose.Schema.Types.ObjectId, ref: "Item" },
      name: { type: String, required: true },
    },
  ],
});

export default mongoose.models.Godown ||
  mongoose.model<GodownDocument>("Godown", godownSchema);
