import { useCallback, useState, useEffect } from "react";
import { getBlogsAPI } from "../controllers/APIs";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { ScaleLoader } from "react-spinners";
// import "./Blog.css";

export default function Blog() {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const fetchBlogs = useCallback(() => {
    setLoading(isLoading => true);
    setTimeout(() => {
      setLoading(isLoading => true);
    }, 10000);

    getBlogsAPI().
      then(response => response.json()).
      then(setBlogs).
      then(setLoading(isLoading => false));
  }, [])
  useEffect(() => {
    fetchBlogs();
  }, [])


  const [selectedCategory, setSelectedCategory] = useState("All");
  const categories = ["All", ...new Set(blogs.map(b => b.blog_category)) || []];

  const filteredPosts = selectedCategory === "All"
    ? blogs
    : blogs.filter(b => b.blog_category === selectedCategory);

  function previewBlog(blog) {
    navigate(`/blogs/${blog.id}`, { state: { blog: blog } });
  }
  return (
    <section className="blog-section">
      <FontAwesomeIcon onClick={() => navigate('/')} style={{ marginBottom: '1rem' }} icon={faArrowLeft} />
      <div className="blog-container">
        <div className="blog-header">
          <p className="blog-tag">Blog</p>
          <h1>Thoughts, tutorials & dev notes</h1>
          <p className="blog-desc">
            I write about web development, system design, and things I learn while building.
          </p>
        </div>
        <div className="blog-filters">
          {categories.map(cat => (
            <button
              key={cat}
              className={`filter-btn ${selectedCategory === cat ? "active" : ""}`}
              onClick={() => setSelectedCategory(cat)}>
              {cat}
            </button>
          ))}
        </div>

        <div className="blog-grid">
          {blogs.length > 0 ? filteredPosts.map(blog => (
            <article key={blog.id} className="blog-card">
              <div className="card-image-wrap">
                <img src={`${blog.blog_img_url}`} alt={blog.blog_title} className="card-image" />
                <span className="card-category">{blog.blog_category}</span>
              </div>
              <div className="card-content">
                <div className="card-meta">
                  <span>{blog.blog_creation_date}</span>
                  <span>•</span>
                </div>
                <h3 className="card-title">{blog.blog_title}</h3>
                <p className="card-excerpt">{blog.blog_excerpt}</p>
                <button
                  onClick={() => { previewBlog(blog) }}
                  className="card-link"
                >
                  Read Article →
                </button>
              </div>
            </article>
          )) : isLoading ? <p style={{ textAlign: "center" }}> No blogs at this time, refresh page or try again later.</p> : <div style={{ display: 'flex', justifyContent: 'center' }}>
            <ScaleLoader color="white" height={10} />
          </div>}
        </div>
      </div>
    </section>
  );
}


