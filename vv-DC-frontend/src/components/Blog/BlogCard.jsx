import { Link } from "react-router-dom";

export default function BlogCard({ blog }) {
  return (
    <article className="group rounded-2xl overflow-hidden border bg-white hover:shadow-xl transition-all">
      <Link to={`/blogs/${blog.slug}`} className="block">
        <div className="aspect-[16/10] overflow-hidden">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform"
            loading="lazy"
          />
        </div>
        <div className="p-4 sm:p-5">
          <div className="text-xs text-gray-500">
            {new Date(blog.date).toLocaleDateString()} • {blog.author}
          </div>
          <h3 className="mt-1 text-lg font-semibold text-gray-900 line-clamp-2">
            {blog.title}
          </h3>
          <p className="mt-2 text-sm text-gray-600 line-clamp-3">
            {blog.excerpt}
          </p>
          <span className="mt-3 inline-block text-sm font-medium text-blue-600 group-hover:underline">
            Read more →
          </span>
        </div>
      </Link>
    </article>
  );
}
