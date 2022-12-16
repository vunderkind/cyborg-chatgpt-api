import { ChatGPTAPI, getOpenAIAuth } from 'chatgpt';
import dotenv from 'dotenv';
dotenv.config();
const { OPENAI_EMAIL, OPENAI_PASSWORD } = process.env;
console.log(OPENAI_EMAIL, OPENAI_PASSWORD);
async function example(prompt) {
    const openAIAuth = await getOpenAIAuth({
        email: OPENAI_EMAIL,
        password: OPENAI_PASSWORD
    });
    console.log(openAIAuth);
    const API = new ChatGPTAPI({ ...openAIAuth });
    await API.ensureAuth();
    const response = await API.sendMessage(`Write a fictional story in the comedy genre based on the following prompt: ${prompt}`, {
        timeoutMs: 2 * 60 * 1000
    });
    console.log(response);
}
example('A goat in space');
//# sourceMappingURL=main.js.map