import Link from 'next/link';

const blogPosts = [
  {
    title: 'Ace the Javascript Interview - Practical questions to help you clear your next interview',
    views: '18,642',
    slug: 'ace-javascript-interview',
    date: '2024-01-15',
  },
  // ... more blog posts
];

export default function BlogPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">Blog</h1>
      <div className="space-y-6">
        {blogPosts.map((post) => (
          <article
            key={post.slug}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
          >
            <Link href={`/blog/${post.slug}`}>
              <h2 className="text-2xl font-bold mb-3 hover:text-blue-600 transition">
                {post.title}
              </h2>
            </Link>
            <div className="flex justify-between items-center text-gray-600 dark:text-gray-400">
              <span>{post.date}</span>
              <span>{post.views} views</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}