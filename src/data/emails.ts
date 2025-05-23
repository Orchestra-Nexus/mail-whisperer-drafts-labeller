// Defines the structure of an email object
export interface Email {
  id: string;
  subject: string;
  sender: {
    name: string;
    email: string;
  };
  preview: string;
  body: string; // HTML content
  isRead: boolean;
  isStarred: boolean;
  labels: string[];
  date: Date; // Or string, to be parsed into Date
}

// Fetches email data from the Gmail MCP service
export async function fetchEmails(): Promise<Email[]> {
  const API_URL = 'http://localhost:8000/v1/chat/completions';
  const requestBody = {
    model: 'gpt-4o', // This model might need to be configurable
    messages: [
      {
        role: 'user',
        content:
          'Please fetch my latest 10 emails. For each email, provide: id, subject, sender name, sender email, a short preview, the full body (can be HTML), read status (true/false), starred status (true/false), a list of labels, and the date.',
      },
    ],
  };

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      console.error('API request failed:', response.status, response.statusText);
      return [];
    }

    const responseData = await response.json();

    let emails: Email[] = [];
    const message = responseData.choices?.[0]?.message;

    if (!message) {
      console.error('No message found in API response:', responseData);
      return [];
    }

    if (message.tool_calls?.[0]?.function?.arguments) {
      try {
        const toolCallArgs = JSON.parse(message.tool_calls[0].function.arguments);
        if (toolCallArgs.emails && Array.isArray(toolCallArgs.emails)) {
          emails = toolCallArgs.emails;
        }
      } catch (e) {
        console.error('Error parsing tool_calls arguments:', e);
        // Fallback to content if tool_calls parsing fails or doesn't contain emails
      }
    }
    
    // If emails are not populated from tool_calls, try parsing from message.content
    if (emails.length === 0 && message.content) {
      try {
        const contentEmails = JSON.parse(message.content);
        if (Array.isArray(contentEmails)) {
          emails = contentEmails;
        }
      } catch (e) {
        console.error('Error parsing message.content:', e);
      }
    }

    if (emails.length === 0) {
      console.warn('No email data found in tool_calls or message.content. API Response:', responseData);
      return [];
    }

    // Convert date strings to Date objects
    return emails.map((email) => ({
      ...email,
      date: new Date(email.date),
    }));

  } catch (error) {
    console.error('Error fetching emails:', error);
    return []; // Or throw error;
  }
}
