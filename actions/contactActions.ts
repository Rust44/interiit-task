"use server";
import sendEmail from "@/lib/nodemailer";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
};

export const sendContactEmail = async (formData: FormData) => {
  try {
    const { firstName, lastName, email, message } = formData;

    const subject = `New message from ${firstName} ${lastName}`;
    const html = `
        <h1>New message from ${firstName} ${lastName}</h1>
        <p>Email: ${email}</p>
        <p>Message: ${message}</p>
      `;

    const result = await sendEmail(email, subject, html);
    
    if (result === "success") return "success";
  } catch (error) {
    console.log(error);
    return "failed";
  }
  return "failed";
};
