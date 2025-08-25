import { useParams, Link } from "react-router-dom";
import blogs from "@/utils/blogs";
import "./BlogDetails.css";

function formatDate(input) {
  try {
    if (!input) return "";
    const d = input instanceof Date ? input : new Date(input);
    if (isNaN(d.getTime())) return "";
    return new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(d);
  } catch {
    return "";
  }
}

export default function BlogDetail() {
  const { slug } = useParams();

  // Support /blogs/:slug or /blogs/:id
  const post =
    blogs.find((b) => String(b.slug) === slug) ||
    blogs.find((b) => String(b.id) === slug);

  if (!post) {
    return (
      <main className="blogd-wrapper">
        <div className="blogd-container">
          <h1 className="blogd-title">Post not found</h1>
          <p className="blogd-text">The blog you’re looking for doesn’t exist.</p>
          <Link to="/blogs" className="blogd-back">← Back to Blogs</Link>
        </div>
      </main>
    );
  }

  const meta = [formatDate(post.date), post.author].filter(Boolean).join(" • ");

  return (
    <main className="blogd-wrapper">
      <div className="blogd-container">
        <nav className="blogd-breadcrumb">
          <Link to="/">Home</Link> <span>/</span>{" "}
          <Link to="/blogs">Blogs</Link> <span>/</span>{" "}
          <span className="blogd-current">{post.title}</span>
        </nav>

        <header className="blogd-header">
          <h1 className="blogd-title">{post.title}</h1>
          {meta && <p className="blogd-meta">{meta}</p>}
        </header>
        {/* Image */}
        <figure className="blogd-hero">
          {post.image ? (
            <img
              src={post.image}
              alt={post.title}
              className="blogd-hero-img"
              loading="eager"
            />
          ) : (
            <div className="blogd-hero-placeholder" />
          )}
        </figure>

        <article className="blogd-content">
          {(post.content || []).map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </article>

        <div className="blogd-footer">
          <Link to="/blogs" className="blogd-back">← Back to Blogs</Link>
        </div>
      </div>
    </main>
  );
}
