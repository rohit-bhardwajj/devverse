import React, { useState } from 'react'
import Layout from '../../../components/Layout/Layout'
import styles from "./AdminManageCategory.module.css"
import AdminMenu from '../../../components/Layout/AdminMenu/AdminMenu'
import axios from 'axios'
import { useAuth } from '../../../context/authContext'
import { useEffect } from 'react'
import { Await, Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { MdDeleteOutline } from "react-icons/md";

const AdminAllCategory = () => {
    const [category, setCategory] = useState("");
    const [categories, setCategories] = useState([]);
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();

    const getAllCategories = async () => {
        try {
            const { data } = await axios.get(`/api/v1/category/get-categories`, {
                headers: {
                    Authorization: auth?.token
                }
            });
            if (data?.success) {
                setCategories(data?.categories);
            }
        } catch (error) {
            console.log(error)
        }
    };


    const handleDelete = async (id) => {
        try {
            let answer = window.prompt("Are You Sure want to delete this product ? ");
            if (!answer) return;
            const { data } = await axios.delete(`/api/v1/category/delete-category/${id}`, {
                headers: {
                    Authorization: auth?.token
                }
            });
            toast.success("category Deleted successfully");
            navigate("/dashboard/admin/all-blogs");
        } catch (error) {
            toast.error("Something went wrong");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post(`/api/v1/category/create-category`, { name: category }, {
                headers: {
                    Authorization: auth?.token
                }
            })
            toast.success("category created successfully");
            navigate("/dashboard/admin/all-blogs");
        } catch (error) {
            toast.error("Something went wrong");
        }
    }

    useEffect(() => {
        getAllCategories()
    }, [])

    return (
        <Layout>
            <div className={styles.container}>
                <AdminMenu />
                <div className={styles.content}>
                    <div className={styles.createCategory}>
                        <form onSubmit={handleSubmit}>
                            <label>Title:</label>
                            <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required />
                            <button style={{ margin: "5px 0" }} type="submit">Create Category</button>
                        </form>
                    </div>
                    <div className={styles.allCategories}>

                        {
                            categories.map((c) => (
                                <div key={c._id} className={styles.categoryCard}>
                                    <p>{c.name}</p>
                                    <Link onClick={() => handleDelete(c._id)}><MdDeleteOutline className={styles.delete} /> </Link>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default AdminAllCategory