import sgMail, { MailDataRequired } from '@sendgrid/mail';
sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);
import { UserData } from '../../types/users';

///////////////////////////// Send Confirmation Email /////////////////////////////////////////
export async function sendAddedCommentEmail(
    userArr: UserData[],
    blogLink: string,
    commentorName: string,
    commentText: string,
    blogTitle: string
): Promise<void> {
    
    // 1. Create the email template and send messages
    const emailPromises = userArr.map((user) => {
        const messageId = `<${user.id}-${new Date().toISOString()}@unfinishedpages.com>`
        const message: MailDataRequired = {
            from: process.env.GOOGLE_USER as string, // Your email address
            // to: user.email, // User's email address
            to: user.email as string,
            subject: `${user.isAuthor ?
                `NEW 📜🖋️ comments on your blog ${blogTitle}`
                :
                `NEW 📜🖋️  activity on ${blogTitle}`
                } `,
            html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
                <h2 style="color: #333;">Hello ${user.name},</h2>
                ${user.isAuthor ?
                    `<p style="color: #555;">${commentorName} replied with:</p>`
                    :
                    '<p style="color: #555;">Others have joined the conversation on the blog you commented on:</p>'
                } 
                <p style="color: #555; text-align: center">"${commentText}"</p>
                <p style="color: #555;">Click the button below to view:</p>
                <div style="text-align: center;">
                    <a href="${blogLink}" target="_blank" rel="noopener noreferrer" style="display: inline-block; padding: 10px 20px; background-color: #007BFF; color: #ffffff; text-decoration: none; border-radius: 5px; font-weight: bold;">View Blog</a>
                </div>
                <p style="color: #999; font-size: 12px; margin-top: 20px;">If you did not request this notification, please disregard this email.</p>
                <p style="color: #555;">- Unfinished Pages</p>
            </div>
            `,
            headers: {
                'Message-ID': messageId,
            }
        };
        return sgMail.send(message).catch((error) => {
            console.error(`Failed to send email to ${user.email}:`, error.response?.body || error.message);
            return null; // Return null to indicate failure
        });
    });

    // Wait for all email promises to settle
    const results = await Promise.allSettled(emailPromises);

    // Handle results if needed
    results.forEach((result, index) => {
        if (result.status === 'rejected') {
            console.error(`Email to ${userArr[index].email} failed.`);
        } else {
            console.log(`Email to ${userArr[index].email} sent successfully.`);
        }
    });
}