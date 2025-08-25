import React from "react";
import "../Services/Services.css";
import BlogCarousel from "./BlogCarousel";
import blogsData from "@/utils/blogs";

export default function BlogSection({
  title = "Our Blogs",
  blogs = blogsData,
  linkBase = "/blogs",
}) {
  const items = Array.isArray(blogs) ? blogs : [];

  return (
    <section className="svc_section svc_section--bleed" aria-labelledby="blg_title">
      <div className="svc_inner">
        <header className="svc_header">
          <p className="svc_eyebrow">Insights & Updates</p>
          <h2 id="blg_title" className="svc_title">{title}</h2>
        </header>

        <BlogCarousel blogs={items} linkBase={linkBase} />
      </div>
    </section>
  );
}
