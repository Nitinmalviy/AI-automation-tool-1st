const { Configuration, OpenAIApi } = require('openai');
const config = require('../config/config');

class OpenAIService {
    constructor() {
        const configuration = new Configuration({
            apiKey: config.openai.apiKey
        });
        this.openai = new OpenAIApi(configuration);
    }

    async generatePost(content) {
        try {
            const response = await this.openai.createChatCompletion({
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: "system",
                        content: "You are a professional LinkedIn content writer."
                    },
                    {
                        role: "user",
                        content: `Transform this content into an engaging LinkedIn post:\n${content}`
                    }
                ],
                temperature: 0.7,
                max_tokens: 500
            });

            return response.data.choices[0].message.content;
        } catch (error) {
            console.error('Error generating post:', error);
            throw error;
        }
    }
}

module.exports = new OpenAIService();