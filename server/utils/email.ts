import { type User } from "better-auth";
import { userVerificationTemplate } from "./emailTemplates";

export type EmailOptions = {
    from: string;
    to: string | string[];
    subject: string;
    html?: string;
    text?: string;
};
export interface EmailService {
    send(emailOptions: EmailOptions): Promise<void>;
}



export const useMailgun = (): EmailService => {
    const MAILGUN_API_KEY = process.env.MAILGUN_API_KEY;
    const MAILGUN_DOMAIN = process.env.MAILGUN_DOMAIN;
    const MAILGUN_API_URL = `https://api.mailgun.net/v3/${MAILGUN_DOMAIN}/messages`;

    const send = async (emailOptions: EmailOptions): Promise<void> => {
        if (!MAILGUN_API_KEY || !MAILGUN_DOMAIN) {
            throw new Error("Mailgun API key or domain is missing");
        }

        const { to, from, subject, text, html } = emailOptions;
        if (!to || !from || (!text && !html)) {
            throw new Error("Required email fields are missing");
        }

        const formData = new FormData();
        formData.append("from", from);
        formData.append("to", Array.isArray(to) ? to.join(",") : to);
        formData.append("subject", subject);
        if (text) formData.append("text", text);
        if (html) formData.append("html", html);

        try {
            const unencodedCredential = `api:${MAILGUN_API_KEY}`;
            const encodedCredentials = typeof Buffer !== "undefined"
                ? Buffer.from(unencodedCredential).toString("base64")
                // Use `btoa` in non-Node environments
                : btoa(unencodedCredential)

            await $fetch(MAILGUN_API_URL, {
                method: "POST",
                headers: {
                    Authorization: `Basic ${encodedCredentials}`,
                },
                body: formData,
            });
            console.log("Email sent via Mailgun");
        } catch (error) {
            console.error("Failed to send email with Mailgun:", error);
            throw new Error("Email sending failed with Mailgun");
        }
    };

    return { send };
};



export const sendUserVerificationEmail = async (user: User, url: string) => {
    const emailHTML = await userVerificationTemplate(url, user);

    try {
        await useMailgun().send({
            from: process.env.MAIL_FROM_EMAIL || "no-reply@localhost.com",
            to: user.email,
            subject: "Email Verification",
            text: "Please click the following link to verify your email:",
            html: emailHTML,
        });
        console.log("Email sent successfully");
    } catch (error) {
        console.error("Failed to send email:", error);
    }
}