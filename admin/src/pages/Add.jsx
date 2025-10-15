import axios from "axios";
import { useState } from "react";
import { backendUrl } from "../App";
import upload from "../assets/upload_area.png";
import { toast } from "react-toastify";
import { IoCloudUploadOutline, IoImageOutline } from "react-icons/io5";
import { IoIosArrowDropdown } from "react-icons/io"

const Add = ({ token }) => {
  const [image, setImage] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("price", price);
      formData.append("stock", stock);

      const response = await axios.post(`${backendUrl}/api/product/add`, formData, {
        headers: { token },
      });

      if (response.data.success) {
        toast.success("Product added successfully");
        setImage(false);
        setName("");
        setDescription("");
        setCategory("");
        setPrice("");
        setStock("");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="w-full flex justify-center py-6 lg:py-10 mt-4 px-0 sm:px-2">
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-6xl bg-gray-50 shadow-xl rounded-xl lg:rounded-2xl p-4 sm:p-6 lg:p-8 flex flex-col gap-6 lg:gap-8 border border-gray-100"
      >
        {/* Title */}
        <div className="text-center mb-2 lg:mb-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Add New Product</h2>
        </div>

        {/* Horizontal Layout Section */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
          {/* Left - Upload Section */}
          <div className="flex-1">
            
            <label
              htmlFor="image-upload"
              className="flex flex-col items-center justify-center w-full h-64 sm:h-72 lg:h-80 border-2 border-dashed border-gray-300 rounded-xl lg:rounded-2xl p-4 sm:p-6 lg:p-8 cursor-pointer hover:border-green-500 hover:bg-green-50 transition-all duration-300 group"
            >
              {!image ? (
                <div className="flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 sm:w-18 sm:h-18 lg:w-20 lg:h-20 bg-green-100 rounded-full flex items-center justify-center mb-3 lg:mb-4 group-hover:bg-green-200 transition-colors">
                    <IoImageOutline className="text-2xl sm:text-3xl text-green-600" />
                  </div>
                  <IoCloudUploadOutline className="text-3xl sm:text-4xl text-gray-400 mb-2 lg:mb-3 group-hover:text-green-500" />
                  <p className="text-gray-600 font-medium text-sm sm:text-base mb-1">Click to upload</p>
                  <p className="text-gray-500 text-xs sm:text-sm">or drag and drop</p>
                  <p className="text-gray-400 text-xs mt-1 lg:mt-2">PNG, JPG, WEBP up to 10MB</p>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Preview"
                    className="max-h-36 sm:max-h-40 lg:max-h-48 object-contain rounded-lg shadow-md mb-2 lg:mb-3"
                  />
                  <p className="text-green-600 font-medium text-xs sm:text-sm">Image selected ✓</p>
                  <p className="text-gray-500 text-xs">Click to change</p>
                </div>
              )}
              <input
                onChange={(e) => setImage(e.target.files[0])}
                type="file"
                id="image-upload"
                hidden
                accept="image/*"
              />
            </label>
          </div>

          {/* Right - Product Info Section */}
          <div className="flex-[2] grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {/* Product Name */}
            <div className="space-y-2">
              
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-x transition-all text-sm sm:text-base"
                type="text"
                placeholder="Enter product name"
                required
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              
              <div className="relative w-full">
                <select
                  onChange={(e) => setCategory(e.target.value)}
                  value={category}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl  appearance-none cursor-pointer bg-white text-sm sm:text-base"
                  required
                >
                  <option value="" disabled>Select category</option>
                  <option value="Farm Produce">Farm Produce</option>
                  <option value="Pets & Livestock">Pets & Livestock</option>
                </select>
                <div className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <IoIosArrowDropdown className="text-gray-500 text-lg sm:text-xl" />
                </div>
              </div>
            </div>

            {/* Price */}
            <div className="space-y-2">
              
              <div className="relative">
               
                <input
                  onChange={(e) => setPrice(e.target.value)}
                  value={price}
                  className="w-full pl-4 sm:pl-4 pr-3 sm:pr-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl  forced-color-adjust-auto
             transition-all text-sm sm:text-base"
                  type="number"
                  placeholder="Price"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
            </div>

            {/* Stock */}
            <div className="space-y-2">
              
              <input
                onChange={(e) => setStock(e.target.value)}
                value={stock}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl  focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all text-sm sm:text-base"
                type="number"
                placeholder="Enter quantity"
                min="0"
                required
              />
            </div>

            {/* Description (full width) */}
            <div className="sm:col-span-2 space-y-2">
              
              <textarea
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl  transition-all resize-vertical text-sm sm:text-base"
                rows="3"
                placeholder="Describe your product features, benefits, and specifications..."
                required
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center sm:justify-end pt-4 border-t border-gray-200">
          <button
            type="submit"
            className="w-full sm:w-auto bg-green-600 text-white font-semibold py-3 px-6 sm:px-8 rounded-xl hover:bg-green-700 transition-all duration-300 shadow-lg hover:shadow-green-200 flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            <IoCloudUploadOutline className="text-base sm:text-lg" />
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default Add;