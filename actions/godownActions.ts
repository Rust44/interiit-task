"use server"
import Godown from "@/models/Godown";

type FormData = {
  name: string;
  parent_godown?: string;
}

export const createNewGodown = async (formData: FormData) => {
  try {
    const godownExists = await Godown.findOne({ name: formData.name });
    
    if (godownExists) {
      return "Godown already exists";
    }
    
    console.log("formData ", formData)
    
    const godown = new Godown(formData);
    await godown.save();
    return "success";
  } catch (error) {
    console.log(error);
  }
  return "Failed to create godown";
};
