import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie'
import './index.css';

const CommentSection = ({ blogId }) => {
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');
    const [error, setError] = useState(null);
    
    
    useEffect(() => {
        const fetchComments = async () => {
            const jwtToken =Cookies.get('jwt_token')
  
            const response = await fetch(`https://my-blogs-00jp.onrender.com/posts/${blogId}/comments`,{
             method: 'GET',
                headers: {
                   
                    Authorization: `Bearer ${jwtToken}`,
                },
            })
            const data = await response.json();
            setComments(data);
        };
        fetchComments();
    }, [blogId]);

    const handleSubmit = async (e) => {
        const jwtToken =Cookies.get('jwt_token')
  
        e.preventDefault();
        try {
            const response = await fetch(`https://my-blogs-00jp.onrender.com/posts/${blogId}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${jwtToken}`,
                },
                body: JSON.stringify({ text: comment }),
            });
            const newComment = await response.json();
            setComments([...comments, newComment]);
            setComment('');
        } catch (error) {
            setError('Failed to add comment');
        }
    };

    return (
        <div className="comment-section">
            <h3>Comments</h3>
            {comments.map(c => (
                <p key={c._id}>{c.text}</p>
            ))}
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Add a comment"
                ></textarea>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default CommentSection;
