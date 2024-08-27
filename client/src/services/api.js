import axios from 'axios';

const API_BASE_URL = 'https://your-backend-api-url.com';

export const getBlogPosts = async () => {
    const response = await axios.get(`${API_BASE_URL}/posts`);
    return response.data;
};

export const getBlogPost = async (id) => {
    const response = await axios.get(`${API_BASE_URL}/posts/${id}`);
    return response.data;
};

export const createBlogPost = async (postData) => {
    const response = await axios.post(`${API_BASE_URL}/posts`, postData);
    return response.data;
};

export const getComments = async (postId) => {
    const response = await axios.get(`${API_BASE_URL}/posts/${postId}/comments`);
    return response.data;
};

export const addComment = async (postId, text) => {
    const response = await axios.post(`${API_BASE_URL}/posts/${postId}/comments`, { text });
    return response.data;
};
