import React, { useEffect, useRef, useState } from "react";
import Layout from "../../../components/Layout/Layout";
import styles from "./AdminUpdateBlog.module.css";
import AdminMenu from "../../../components/Layout/AdminMenu/AdminMenu";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../../context/authContext";
import { toast } from "react-toastify"; 
import { Editor } from "@tinymce/tinymce-react";

const AdminUpdateBlog = () => {
  const [auth, stAuth] = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [photo, setPhoto] = useState("");
  const [category, setCategory] = useState("");
  const [id, setId] = useState("");
  const { slug } = useParams();
  const [blog, setBlog] = useState([]);
  const [categories, setCategories] = useState([]);

  const editorRef = useRef(null);


  const getBlog = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/blog/get-blog/${slug}`
      );
      console.log(data?.blog);
      setTitle(data?.blog?.title);
      setId(data?.blog?._id);
      setDescription(data?.blog?.description);
      setContent(data?.blog?.content || "");
      setCategory(data?.blog?.category?._id);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-categories`,
        {
          headers: {
            Authorization: auth?.token,
          },
        }
      );
      setCategories(data?.categories);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBlog();
    getAllCategories();
    // eslint-disable-next-line
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const blogData = new FormData();
      blogData.append("title", title);
      blogData.append("description", description);
      photo && blogData.append("photo", photo);
      blogData.append("category", category);
      blogData.append("content", content);

      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/blog/update-blog/${id}`,
        blogData,
        {
          headers: {
            Authorization: auth?.token,
          },
        }
      );
      if (data?.success) {
        toast.success("Product Updated Successfully");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  return (
    <Layout>
      <div className={styles.container}>
        <AdminMenu />
        <div className={styles.content}>
          <h1>Update Blog</h1>
          <div className="container">
            <form onSubmit={handleUpdate}>
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
              <select
                placeholder="Select a category"
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
              >
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
                onChange={(e) => setPhoto(e.target.files[0])}
              /> 
              <label>Content:</label>
              <Editor
                apiKey = {process.env.REACT_APP_TINY_EDITOR_API_KEY}
                onInit={(_evt, editor) => (editorRef.current = editor)}
                onEditorChange={(content) => setContent(content)}
                initialValue={content}
                init={{
                  height: 500,
                  menubar: true,
                  plugins: [
                    "advlist",
                    "autolink",
                    "lists",
                    "link",
                    "image",
                    "charmap",
                    "preview",
                    "anchor",
                    "searchreplace",
                    "visualblocks",
                    "codesample",
                    "fullscreen",
                    "insertdatetime",
                    "media",
                    "table",
                    "wordcount",
                    "emoticons",
                    "autosave",
                    "code",
                    "imagetools",
                    "paste",
                  ],
                  toolbar:
                    "undo redo | formatselect | " +
                    "bold italic underline forecolor backcolor | " + 
                    "bullist numlist outdent indent | " +
                    "link image media codesample | " +
                    "preview fullscreen | " +
                    "removeformat",
                  content_style: "body { font-family:Inter; font-size:16px }",
                  skin: "oxide",
                  content_css: "light",
                  toolbar_mode: "sliding",
                  autosave_interval: "30s",
                  paste_data_images: true,
                }}
              />

              <button type="submit">Update Blog</button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminUpdateBlog;
