import Link from 'next/link';

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
    const post = await getPost(id);

    return (
      <div className="py-10 bg-gray-100 dark:bg-gray-900 min-h-screen">
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">
            {post.title}
          </h1>
          <p className="text-gray-600 dark:text-gray-300">{post.body}</p>
          <Link
            href="/"
            className="mt-6 inline-block text-blue-600 dark:text-blue-400 hover:underline"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        <p className="text-xl text-red-600 dark:text-red-400">
          Error: {error.message}
        </p>
      </div>

      
    );
  }
}