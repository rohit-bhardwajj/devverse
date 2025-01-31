import slugify from "slugify";
import categoryModel from "../models/category.models.js";

// Create category
export const createCategoryController = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).send({ message: "Enter Category Name" });
        }

        const existingCategory = await categoryModel.findOne({ name });
        if (existingCategory) {
            return res.status(409).send({
                success: false,
                message: "Category Already Exists",
            });
        }

        const category = await categoryModel.create({ name, slug: slugify(name) });

        res.status(201).send({
            success: true,
            message: "New category created",
            category,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in creating category",
        });
    }
};

// Update category
export const updateCategoryController = async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params;

        const category = await categoryModel.findByIdAndUpdate(
            id,
            { name, slug: slugify(name) },
            { new: true }
        );

        res.status(200).send({
            success: true,
            message: "Category Updated Successfully",
            category,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            error,
            message: "Error while updating category",
        });
    }
};

// Get all categories
export const getAllCategoriesController = async (req, res) => {
    try {
        const categories = await categoryModel.find({});

        res.status(200).send({
            success: true,
            message: "All Categories List",
            categories,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            error,
            message: "Error while getting all categories",
        });
    }
};

// Get single category
export const getSingleCategoryController = async (req, res) => {
    try {
        const category = await categoryModel.findOne({ slug: req.params.slug });

        res.status(200).send({
            success: true,
            message: "Get Single Category Successfully",
            category,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            error,
            message: "Error While getting Single Category",
        });
    }
};

// Delete category
export const deleteCategoryController = async (req, res) => {
    try {
        const { id } = req.params;
        await categoryModel.findByIdAndDelete(id);

        res.status(200).send({
            success: true,
            message: "Category Deleted Successfully",
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error while deleting category",
            error,
        });
    }
};
