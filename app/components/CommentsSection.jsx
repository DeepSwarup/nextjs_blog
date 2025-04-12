"use client";

import { useState } from 'react';
import Link from 'next/link';
import CommentForm from './CommentForm';

export default function CommentsSection({ initialComments, postId }) {
  const [comments, setComments] = useState(initialComments);

  const addComment = (newComment) => {
    setComments((prev) => [...prev, newComment]);
  };

  return (
    <div className="border-t border-gray-200 pt-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Comments
      </h2>
      {comments.length > 0 ? (
        <ul className="space-y-4 mb-8">
          {comments.map((comment) => (
            <li
              key={comment.id}
              className="p-4 bg-gray-50 rounded-lg"
            >
              <p className="text-sm text-gray-500">
                <strong>{comment.name}</strong> ({comment.email})
              </p>
              <p className="mt-1 text-gray-600">{comment.body}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600 mb-8">No comments yet.</p>
      )}
      <CommentForm postId={postId} onCommentAdded={addComment} />
      <Link
        href="/"
        className="inline-block text-blue-600 hover:underline mt-4"
      >
        Back to Home
      </Link>
    </div>
  );
}