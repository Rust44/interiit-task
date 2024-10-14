"use server";
import Item from "@/models/Item";

type FormData = {
  name: string;
  quantity: string;
  category: string;
  price: string;
  status: string;
  godown_id: string;
  brand: string;
  image_url: string;
  attributes?: {
    key: string;
    value: string | number | boolean;
  }[];
};

export const createNewItem = async (formData: FormData) => {
  try {
    const itemExists = await Item.findOne({
      name: formData.name,
      godown_id: formData.godown_id,
    });

    if (itemExists) {
      return "Item already exists";
    }

    const { attributes, ...restFormData } = formData;

    let newAttributes: Record<string, string | number | boolean> | undefined =
      undefined;

    if (attributes !== undefined) {
      newAttributes = attributes
        .filter(({ key, value }) => key && value !== undefined && value !== "")
        .reduce<Record<string, string | number | boolean>>(
          (acc, { key, value }) => {
            acc[key] = value;
            return acc;
          },
          {},
        );
    }

    console.log(restFormData);
    console.log("new attributes", newAttributes);

    const item = new Item({
      ...restFormData,
      attributes: newAttributes,
    });

    await item.save();

    return "success";
  } catch (error) {
    console.log(error);
  }

  return "Failed to create item";
};
