const axios = require('axios');
const config = require('../config/config');

class LinkedInService {
    async createPost(text) {
        try {
            const body = {
                author: `urn:li:person:${config.linkedin.personId}`,
                lifecycleState: "PUBLISHED",
                specificContent: {
                    "com.linkedin.ugc.ShareContent": {
                        shareCommentary: { text },
                        shareMediaCategory: "NONE"
                    }
                },
                visibility: {
                    "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC"
                }
            };

            const response = await axios.post(
                'https://api.linkedin.com/v2/ugcPosts',
                body,
                {
                    headers: {
                        'Authorization': `Bearer ${config.linkedin.accessToken}`,
                        'Content-Type': 'application/json',
                        'X-Restli-Protocol-Version': '2.0.0'
                    }
                }
            );

            return response.data;
        } catch (error) {
            console.error('Error posting to LinkedIn:', error);
            throw error;
        }
    }
}

module.exports = new LinkedInService();