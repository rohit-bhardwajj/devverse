import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/authContext";
import ReactQuill from "react-quill";
import "quill/dist/quill.snow.css"; // Quill Snow theme

const CreateBlog = () => {
  const [auth] = useAuth();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [blogImage, setblogImage] = useState(null);

  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(`/api/v1/category/get-categories`, {
        headers: { Authorization: auth?.token },
      });
      if (data?.success) {
        setCategories(data?.categories);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("content", content);
      formData.append("category", category);
      formData.append("blogImage", blogImage);

      const response = await axios.post(`/api/v1/blogs/create-blog`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", 
          Authorization: auth?.token },
      });
      console.log(formData);
      
      if (response.data.success) {
        alert("Blog created successfully");
      } else {
        alert("Failed to create blog");
      }
    } catch (error) {
      console.error("Error:", error);
      // alert("Error creating blog");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Title:</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <label>Description:</label>
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      <label>Category:</label>
      <select onChange={(e) => setCategory(e.target.value)} required>
        <option value="">Select a category</option>
        {categories?.map((c) => (
          <option key={c._id} value={c._id}>
            {c.name}
          </option>
        ))}
      </select>

      <label>Featured Image:</label>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setblogImage(e.target.files[0])}
      />

      <label>Content:</label>
      <ReactQuill
        value={content}
        onChange={setContent}
        modules={{
          toolbar: [
            [{ header: "1" }, { header: "2" }, { font: [] }],
            [{ list: "ordered" }, { list: "bullet" }],
            ["bold", "italic", "underline", "strike"],
            [{ align: [] }],
            ["link", "image", "code-block"],
            ["clean"], // Remove formatting
          ],
        }}
        formats={[
          "header",
          "font",
          "bold",
          "italic",
          "underline",
          "strike",
          "list",
          "bullet",
          "align",
          "link",
          "image",
          "code-block",
        ]}
        placeholder="Write your blog content here..."
      />

      <button type="submit">Submit Blog</button>
    </form>
  );
};

export default CreateBlog;
