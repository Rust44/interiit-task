import { object, array, string } from "zod";

export const itemSchema = object({
  name: string({ required_error: "Name is required" })
    .min(2, "Name must be at least 2 characters")
    .max(32, "Name must be at most 32 characters"),
  quantity: string({ required_error: "Quantity is required" })
    .min(1, "Quantity must be at least 1")
    .max(1000, "Quantity must be at most 1000"),
  category: string({ required_error: "Category is required" })
    .min(2, "Category must be at least 2 characters")
    .max(32, "Category must be at most 32 characters"),
  price: string({ required_error: "Price is required" })
    .min(1, "Price must be at least 1")
    .max(100000, "Price must be at most 100000"),
  status: string({ required_error: "Status is required" })
    .min(2, "Status must be at least 2 characters")
    .max(32, "Status must be at most 32 characters"),
  godown_id: string({ required_error: "Godown ID is required" }),
  brand: string({ required_error: "Brand is required" })
    .min(2, "Brand must be at least 2 characters")
    .max(32, "Brand must be at most 32 characters"),
  image_url: string({ required_error: "Image URL is required" }).url(
    "Image URL must be a valid URL",
  ),
  attributes: array(
    object({
      key: string(),
      value: string(),
    }),
  ).optional(),
});

export const godownSchema = object({
  name: string({ required_error: "Name is required" })
    .min(2, "Name must be at least 2 characters")
    .max(32, "Name must be at most 32 characters"),
  parent_godown: string().optional(),
});

export const contactSchema = object({
  firstName: string({ required_error: "First name is required" })
    .min(2, "First name must be at least 2 characters")
    .max(32, "First name must be at most 32 characters"),
  lastName: string({ required_error: "Last name is required" })
    .min(2, "Last name must be at least 2 characters")
    .max(32, "Last name must be at most 32 characters"),
  email: string({ required_error: "Email is required" }).email(
    "Email must be a valid email address",
  ),
  message: string({ required_error: "Message is required" })
    .min(2, "Message must be at least 2 characters")
    .max(1000, "Message must be at most 1000 characters"),
});
