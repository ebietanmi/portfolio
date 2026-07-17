import { useState } from "react"
import { createBlogAPI } from "../controllers/APIs";
import { useNavigate } from "react-router-dom";



export default function CreateBlog() {
    const navigate = useNavigate();

    // const [form, setForm] = useState({
    //     'blog_title': '', 'blog_excerpt': '',
    //     'blog_creation_date': '',
    //     'blog_category': ''
    // });

    // function handleChange(e) {
    //     // setForm({ ...form, [e.target.name]: e.target.value });
    //     // const formData = new FormData(e.target.form);
    //     // const response = createBlogAPI(formData)
    // }

    async function handleCreateBlog(e) {
        const formData = new FormData(e.target)
        await createBlogAPI(formData).then(response => {
            response.ok ? alert('Blog created successfully') :
                alert(`Blog creation failed with${response.SQLMessage} error`);
        }).then(navigate('/blog'));
    }
    // response.ok ? alert('Blog created succesfully'): alert('Blog creation failed')
    // }'Blog created succesfully'
    return (
        <section className="create-blog">
            <div className="create-blog-container">
                <h1 className="create-blog-header">
                    Create Blog
                </h1>
                <form onSubmit={(e) => {
                    e.preventDefault()
                    handleCreateBlog(e);
                }
                } className="create-blog-form" action="">
                    <div className="create-blog-form-group">
                        <label htmlFor="name">Title</label>
                        <input
                            type="text"
                            className="create-blog-form-input"
                            id="name"
                            name="blog_title"
                            placeholder="Title"
                            required
                        />
                    </div>
                    <div className="create-blog-form-group">
                        <label htmlFor="name">Excerpt</label>
                        <textarea
                            className="create-blog-form-input"
                            id="name"
                            name="blog_excerpt"
                            required
                        />
                    </div>
                    <div className="create-blog-form-group">
                        <label htmlFor="name">Thumbnail</label>
                        <input
                            type="file"
                            className="create-blog-form-input"
                            id="name"
                            name="blog_file"
                            required

                        />
                    </div>
                    <div className="create-blog-form-group">
                        <label htmlFor="name">Date Created</label>
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
                            name="blog_category"

                        >
                            <option value=''>Select Category</option>
                            <option value='API'>API</option>
                            <option value='CSS'>CSS</option>
                            <option value='API'>NODE</option>
                            <option value='HTML'>HTML</option>
                        </select>
                    </div>
                    <button className="create-blog-submit-btn" type="submit">
                        Submit Blog
                    </button>
                </form>

            </div>
        </section>
    )
}