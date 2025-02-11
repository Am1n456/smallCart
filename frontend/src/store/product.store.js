import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import axios from "axios";

export const useProductStore = create((set, get) => ({
  products: [],

  createProducts: async (newProduct) => {
    try {
      const res = await axiosInstance.post("/products/", newProduct);
      console.log(res.data.success, "Product Added successfully");
      toast.success("Product added");
    } catch (error) {
      toast.error("Error while creating product: ", error.message);
    }
  },

  fetchProducts: async () => {
    const res = await axiosInstance.get("/products/");
    try {
      set({ products: res.data.data });
    } catch (error) {
      toast.error("Error while fecthing product: ", error.message);
    }
  },

  updateProduct: async (pid, updatedProduct) => {
    try {
      const res = await axiosInstance.put(`/products/${pid}`, updatedProduct);
      if (!res.data.success)
        return { success: false, message: res.data.message };

      set((state) => ({
        products: state.products.map((product) =>
          product._id === pid ? res.data.data : product
        ),
      }));

      toast.success("Product updated");
      return { success: true, message: res.data.message };
    } catch (error) {
      toast.error("Error while updating product: ", error.message);
    }
  },

  deleteProduct: async (pid) => {
    const res = await axiosInstance.delete(`/products/${pid}`);
    set((state) => ({
      products: state.products.filter((product) => product._id !== pid),
    }));
    toast.success("Product deleted");
    return { success: true, message: res.data.message };
  },
}));
