import express from 'express';
import { getSingleCategoryController, createCategoryController, updateCategoryController, getAllCategoriesController, deleteCategoryController } from '../controller/category.controller.js';
import { verifyJWT ,isAdmin} from '../middleware/auth.middleware.js';

const router = express.Router();

// create || method post
router.post('/create-category', verifyJWT, isAdmin, createCategoryController);

// update category
router.put('/update-category/:id', verifyJWT, isAdmin, updateCategoryController)

// get all category
router.get('/get-categories', getAllCategoriesController)

//single category
router.get("/single-category/:slug", getSingleCategoryController);

//delete category
router.delete("/delete-category/:id", verifyJWT, isAdmin, deleteCategoryController);



export default router; 