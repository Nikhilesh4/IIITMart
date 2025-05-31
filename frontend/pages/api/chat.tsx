import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextApiRequest, NextApiResponse } from "next";

const apiKey = process.env.GOOGLE_GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("GOOGLE_GEMINI_API_KEY is not defined");
}

const genAI = new GoogleGenerativeAI(apiKey);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method Not Allowed" });

  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: "Invalid request body" });
    }

    const formattedHistory = messages.map((msg: { role: string; content: string }) => ({
      role: msg.role === "assistant" ? "model" : msg.role,
      parts: [{ text: msg.content }],
    }));

    // Fetch available models
    // Use a predefined model name directly
    const modelName = "gemini-default-model"; // Replace with the actual model name from the library documentation
    console.log("Using model:", modelName);
    if (!modelName) {
      return res.status(500).json({ error: "No valid model found for the request" });
    }

    const model = genAI.getGenerativeModel({ model: modelName });

    // Start a new chat session
    const chat = model.startChat({ history: formattedHistory });

    // Get the last user message
    const userMessage = messages[messages.length - 1].content;

    if (!userMessage) {
      return res.status(400).json({ error: "Empty message content" });
    }

    // Send the message
    const response = await chat.sendMessage([{ text: userMessage }]);
    console.log(response);
    if (!response.response.candidates || response.response.candidates.length === 0) {
      return res.status(500).json({ error: "No candidates found in the response" });
    }
    res.status(200).json({ role: "model", content: response.response.candidates[0].content.parts[0].text });

  } catch (error: any) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message || "Something went wrong" });
  }
}
