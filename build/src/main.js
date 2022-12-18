import dotenv from 'dotenv';
import fetch from 'node-fetch';
dotenv.config();
const { OPENAI_API_KEY, OPENAI_URL } = process.env;
async function testing() {
    const response = await fetch(OPENAI_URL, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + OPENAI_API_KEY,
        },
        body: JSON.stringify({
            model: 'text-davinci-003',
            prompt: `how would you write javascript code that simulate cloth physics? explain it like i'm five.`,
            temperature: 0.9,
            max_tokens: 4000,
        }),
    });
    const data = await response.json();
    console.log(data);
}
testing();
//# sourceMappingURL=main.js.map