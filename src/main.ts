import { ChatGPTAPI } from 'chatgpt';
import dotenv from 'dotenv';
dotenv.config();

async function example(prompt: string) {
    const API = new ChatGPTAPI({
        sessionToken: process.env.SESSION_TOKEN
    });

    await API.ensureAuth();

    const response = await API.sendMessage(
        `Write a fictional story in the comedy genre based on the following prompt: ${prompt}`, {
            timeoutMs: 2 * 60 * 1000
        }
    )

    console.log(response);
}

example('A goat in space');