import dotenv from 'dotenv';
dotenv.config();
import fetch from 'node-fetch'; // Node 18+ me native fetch hai, old Node me install karna padega

export const sendMail = async (to: string, subject: string, html: string) => {
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer re_E4Xmnvov_2XQoBjj5TodYKQwUD3E2ri6o`, // apna API key .env me rakho
      },
      body: JSON.stringify({
        from: 'Code Sync <anujkaran420@gmail.com>', // apna verified email
        to,
        subject,
        html,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      console.error('Error sending mail:', data);
      return null;
    }

    console.log('Mail sent:', data);
    return data;
  } catch (error) {
    console.error('Error sending mail:', error);
    return null;
  }
};
