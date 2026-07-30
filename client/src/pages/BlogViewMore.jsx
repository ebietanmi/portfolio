import { useLocation, useParams } from "react-router-dom";

function BlogViewMore() {
  const location = useLocation();
  const { id } = useParams();
  const blog = location.state?.blog;
  const blog_content = `
    <p>${blog.blog_content}</p>`

  return (
    <div className="blog_preview-container" id="blog_preview-container">
      <section
        className="blog_preview-hero"
        id="blog_preview-hero"
        style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${blog.blog_img_url})` }}
      >
        <div className="blog_preview-hero-content" id="blog_preview-hero-content">
          <span className="blog_preview-category" id="blog_preview-category">{blog.blog_category}</span>
          <h1 className="blog_preview-title" id="blog_preview-title">{blog.blog_title}</h1>
          <div className="blog_preview-meta" id="blog_preview-meta">
            <span className="blog_preview-date" id="blog_preview-date">{blog.blog_creation_date}</span>
          </div>
        </div>
      </section>
      <article className="blog_preview-article" id="blog_preview-article">
        <p className="blog_preview-excerpt" id="blog_preview-excerpt">{blog.blog_excerpt}</p>
        <div
          className="blog_preview-content"
          id="blog_preview-content"
          dangerouslySetInnerHTML={{ __html: blog.blog_content }}
        />
      </article>
    </div>
  )
}

export default BlogViewMore;
