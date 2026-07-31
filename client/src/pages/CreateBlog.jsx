import { useState } from "react"
import { handleCreateBlog } from "../controllers/client_controllers";
import { useNavigate } from "react-router-dom";
import { ScaleLoader } from "react-spinners";


export default function CreateBlog() {
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);
    return (
        <section className="create-blog-screen">
                <ScaleLoader id="loader" height={10} loading={isLoading}/>
            <div className="create-blog-container">
                <h1 className="create-blog-header">
                    Create Blog
                </h1>
                <form onSubmit={(e) => {
                    e.preventDefault()
                    const formData = new FormData(e.target);
                    handleCreateBlog({ formData }, isLoading, setLoading, navigate);
                }
                } className="create-blog-form" action="">
                    <div className="create-blog-form-group">
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            className="create-blog-form-input"
                            id="title"
                            name="blog_title"
                            placeholder="Title"
                            required
                        />
                    </div>
                    <div className="create-blog-form-group">
                        <label htmlFor="excerpt">Excerpt</label>
                        <textarea
                            className="create-blog-form-input"
                            id="excerpt"
                            name="blog_excerpt"
                            required
                            placeholder="Excerpt"

                        />
                    </div>
                    <div className="create-blog-form-group">
                        <label htmlFor="content">Blog Content</label>
                        <textarea
                            className="create-blog-form-input"
                            id="name"
                            name="blog_content"
                            required
                            placeholder="Content"
                        />
                    </div>
                    <div className="create-blog-form-group">
                        <label htmlFor="thumbnail">Thumbnail</label>
                        <input
                            type="file"
                            className="create-blog-form-input"
                            id="thumbnail"
                            name="blog_file"
                            required
                        />
                    </div>
                    <div className="create-blog-form-group">
                        <label htmlFor="date_created">Date Created</label>
                        <input
                            type="date"
                            className="create-blog-form-input"
                            id=""
                            name="blog_creation_date"
                            required

                        />
                    </div>
                    <div className="create-blog-form-group">
                        <label htmlFor="name">Category</label>
                        <select id="category"
                            name="blog_category">
                            <option value=''>Select Category</option>
                            <option value='API'>API</option>
                            <option value='CSS'>CSS</option>
                            <option value='NODE'>NODE</option>
                            <option value='HTML'>HTML</option>
                        </select>
                    </div>
                    <button className="create-blog-submit-btn" type="submit">
                        Submit Blog
                    </button>
                </form>
            </div>
            {isLoading ? <ScaleLoader height={10} id="loader" color="black" /> : <></>}
        </section>
    )
}