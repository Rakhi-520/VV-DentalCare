import BlogCarousel from "@/components/Blog/BlogCarousel";
import blogs from "@/utils/blogs";


export default function BlogsPage() {
  return (
    <main>
      <section className="svc_section svc_section--bleed" aria-labelledby="blogs_title">
        <div className="svc_inner">
          <header className="svc_header">
            <p className="svc_eyebrow">Tips & Insights</p>
            <h1 id="blogs_title" className="svc_title">Blogs</h1>
          </header>

        
          <BlogCarousel blogs={blogs} linkBase="/blogs" />
        </div>
      </section>
    </main>
  );
}
