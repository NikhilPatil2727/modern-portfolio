export type BlogPost = {
  title: string;
  description: string;
  date: string;
  readingTime: string;
  tag: string;
  href: string;
};

export const blogPosts: BlogPost[] = [
  {
    title: "Consistent Hashing — How Distributed Systems Find the Right Server",
    description:
      "A practical system design explainer on hash rings, key movement, virtual nodes, and why distributed systems use consistent hashing.",
    date: "May 7, 2025",
    readingTime: "5 min read",
    tag: "System Design",
    href: "/blog/consistent-hashing",
  },
  {
    title: "Complete Guide to React Hooks",
    description:
      "A complete beginner-to-advanced guide on mastering React Hooks, from useState and useEffect to Redux interview notes.",
    date: "Jul 15, 2025",
    readingTime: "8 min read",
    tag: "React",
    href: "/blog/react",
  },
  {
    title: "CAP Theorem Explained Simply",
    description:
      "A beginner-friendly explanation of consistency, availability, and partition tolerance.",
    date: "Coming soon",
    readingTime: "5 min read",
    tag: "System Design",
    href: "/blog",
  },
];
