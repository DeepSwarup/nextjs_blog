import CommentsSection from '../../components/CommentsSection';

async function getPost(id) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    cache: 'no-store',
  });
  await new Promise((resolve) => setTimeout(resolve, 1000));
  if (!res.ok) {
    throw new Error('Post not found');
  }
  const post = await res.json();
  return post;
}

async function getComments(id) {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}/comments`,
    { cache: 'no-store' }
  );
  await new Promise((resolve) => setTimeout(resolve, 1000));
  if (!res.ok) {
    throw new Error('Failed to fetch comments');
  }
  const comments = await res.json();
  return comments;
}

export async function generateStaticParams() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const posts = await res.json();
  return posts.slice(0, 5).map((post) => ({
    id: post.id.toString(),
  }));
}

export default async function PostPage({ params }) {
  const { id } = await params;

  try {
    const [post, comments] = await Promise.all([
      getPost(id),
      getComments(id),
    ]);

    return (
      <div className="py-10 bg-gray-100 min-h-screen">
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {post.title}
          </h1>
          <p className="text-gray-600 mb-8">{post.body}</p>
          <CommentsSection initialComments={comments} postId={id} />
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-xl text-red-600">Error: {error.message}</p>
      </div>
    );
  }
}