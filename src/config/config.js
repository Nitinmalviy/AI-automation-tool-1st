require('dotenv').config();

module.exports = {
    openai: {
        apiKey: process.env.OPENAI_API_KEY
    },
    linkedin: {
        accessToken: process.env.LINKEDIN_ACCESS_TOKEN,
        personId: process.env.LINKEDIN_PERSON_ID
    }
};