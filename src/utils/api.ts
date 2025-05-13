/* eslint-disable @typescript-eslint/no-explicit-any */
const API_URL = import.meta.env.VITE_API_URL;

export async function chatApiMiddleware(messages: any) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messages }),
    });

    if (!response.ok) {
      throw new Error(`Backend responded with status: ${response.status}`);
    }

    const data = await response.json();

    return {
      role: data.role,
      content: data.content,
      id: data.id,
    };
  } catch (error) {
    console.error("Error in chat API:", error);
    throw error;
  }
}
