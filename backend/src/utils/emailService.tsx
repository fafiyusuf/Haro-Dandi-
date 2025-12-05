import nodemailer from "nodemailer"
import { config } from "../config/env.js"

let transporter: nodemailer.Transporter | null = null

const initializeTransporter = () => {
  if (transporter) return transporter

  if (config.smtpUser && config.smtpPass) {
    transporter = nodemailer.createTransport({
      host: config.smtpHost,
      port: config.smtpPort,
      secure: config.smtpPort === 465,
      auth: {
        user: config.smtpUser,
        pass: config.smtpPass,
      },
    })
  }

  return transporter
}

export const sendContactNotificationEmail = async (message: any) => {
  const transporter = initializeTransporter()
  if (!transporter) {
    console.log("[Email] SMTP not configured, skipping email notification")
    return
  }

  try {
    const mailOptions = {
      from: config.smtpUser,
      to: config.adminEmail,
      subject: `New Contact Form Submission: ${message.subject}`,
      html: `
        <h2>New Contact Message</h2>
        <p><strong>From:</strong> ${message.firstName} ${message.lastName}</p>
        <p><strong>Email:</strong> <a href="mailto:${message.email}">${message.email}</a></p>
        ${message.phone ? `<p><strong>Phone:</strong> ${message.phone}</p>` : ""}
        <p><strong>Subject:</strong> ${message.subject}</p>
        <h3>Message:</h3>
        <p>${message.message.replace(/\n/g, "<br>")}</p>
      `,
    }

    await transporter.sendMail(mailOptions)
    console.log("[Email] Contact notification sent to", config.adminEmail)
  } catch (error) {
    console.error("[Email] Failed to send notification:", error)
  }
}
