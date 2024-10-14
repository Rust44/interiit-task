"use server"
import Godown from "@/models/Godown";

export const createNewGodown = async (name: string, parentGodown?: string) => {
  try {
    const godownExists = await Godown.findOne({ name });
    
    if (godownExists) {
      return "Godown already exists";
    }
    
    const godown = new Godown({
      name,
      parentGodown: parentGodown?.substring(0, 24) || null,
    });
    await godown.save();
    return "success";
  } catch (error) {
    console.log(error);
  }
  return "Failed to create godown";
};
