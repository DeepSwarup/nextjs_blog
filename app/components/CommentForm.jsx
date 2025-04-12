"use client";

import { useState } from 'react';

export default function CommentForm({ postId, onCommentAdded }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/comments',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            postId: Number(postId),
            name,
            email,
            body,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to submit comment');
      }

      const newComment = {
        id: Date.now(), // Temporary ID since JSONPlaceholder doesn't persist
        postId: Number(postId),
        name,
        email,
        body,
      };

      onCommentAdded(newComment); // Update UI locally
      setName('');
      setEmail('');
      setBody('');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="mt-1 w-full p-3 rounded-lg border border-gray-300 bg-white text-gray-900 focus:outline-none focus:border-blue-600"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mt-1 w-full p-3 rounded-lg border border-gray-300 bg-white text-gray-900 focus:outline-none focus:border-blue-600"
        />
      </div>
      <div>
        <label htmlFor="body" className="block text-sm font-medium text-gray-700">
          Comment
        </label>
        <textarea
          id="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
          rows={4}
          className="mt-1 w-full p-3 rounded-lg border border-gray-300 bg-white text-gray-900 focus:outline-none focus:border-blue-600"
        />
      </div>
      {error && (
        <p className="text-red-600 text-sm">{error}</p>
      )}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
      >
        {isSubmitting ? 'Submitting...' : 'Add Comment'}
      </button>
    </form>
  );
}