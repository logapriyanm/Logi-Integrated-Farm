import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { MdDelete, MdEdit } from "react-icons/md";
import { IoIosArrowDropdown } from "react-icons/io";

const categories = ["All", "Farm Produce", "Pets & Livestock"];
const priceRanges = [
  "All Prices",
  "Below 1000",
  "1000 - 5000",
  "Above 5000",
];

const List = ({ token }) => {
  const [list, setList] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    image: null,
  });
  const [filters, setFilters] = useState({
    category: "All",
    price: "All Prices",
    search: "",
  });

  const navigate = useNavigate();

  // Fetch products
  const fetchList = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success) setList(response.data.products);
      else toast.error(response.data.message);
    } catch (err) {
      toast.error("Error fetching products");
    }
  };

  // Delete product
  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      const response = await axios.post(
        `${backendUrl}/api/product/remove`,
        { id },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success("Product deleted successfully");
        await fetchList();
      } else toast.error(response.data.message);
    } catch (error) {
      toast.error("Error deleting product");
    }
  };

  // Edit functions
  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price,
      stock: product.stock,
      image: null,
    });
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const saveEdit = async () => {
    const data = new FormData();
    data.append("id", editingProduct._id);
    data.append("name", formData.name);
    data.append("category", formData.category);
    data.append("price", formData.price);
    data.append("stock", formData.stock);
    if (formData.image) data.append("image", formData.image);

    try {
      const response = await axios.post(`${backendUrl}/api/product/update`, data, {
        headers: { token },
      });
      if (response.data.success) {
        toast.success("Product updated successfully");
        setEditingProduct(null);
        await fetchList();
      } else toast.error(response.data.message || "Failed to update product");
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  // Filter logic
  const filteredList = list.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(filters.search.toLowerCase());
    const matchesCategory =
      filters.category === "All" || item.category === filters.category;

    const matchesPrice =
      filters.price === "All Prices"
        ? true
        : filters.price === "Below 1000"
          ? item.price < 1000
          : filters.price === "1000 - 5000"
            ? item.price >= 1000 && item.price <= 5000
            : item.price > 5000;

    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <div className="w-full p-1 md:p-6 lg:p-8 mt-4 sm:mt-10 pt-16 md:pt-0 bg-gray-50 rounded-lg">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
        <input
          type="text"
          placeholder="Search products..."
          className="border border-gray-300 rounded-lg px-3 sm:px-4 py-2 w-full text-xs sm:text-sm"
          value={filters.search}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, search: e.target.value }))
          }
        />
        <button
          onClick={() => navigate("/add")}
          className="bg-green-600 cursor-pointer text-white px-4 sm:px-5 py-2 rounded-lg hover:bg-green-700 transition text-xs sm:text-sm w-full md:w-auto mt-2 md:mt-0"
        >
          + Add Product
        </button>
      </div>

      {/* Filters Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 sm:mb-6">
        {/* Category Filter */}
        <div className="relative w-full">
          <select
            className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 appearance-none text-xs sm:text-sm bg-white cursor-pointer"
            value={filters.category}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, category: e.target.value }))
            }
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <IoIosArrowDropdown className="text-gray-500 text-base sm:text-lg" />
          </div>
        </div>

        {/* Price Filter */}
        <div className="relative w-full">
          <select
            className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 appearance-none text-xs sm:text-sm bg-white cursor-pointer"
            value={filters.price}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, price: e.target.value }))
            }
          >
            {priceRanges.map((price) => (
              <option key={price} value={price}>
                {price}
              </option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <IoIosArrowDropdown className="text-gray-500 text-base sm:text-lg" />
          </div>
        </div>
      </div>

      {/* Table - Mobile Cards & Desktop Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {/* Desktop Table */}
        <div className="hidden md:block">
          <table className="min-w-full text-sm text-gray-700">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="px-4 py-3 text-left"></th>
                <th className="px-4 py-3 text-left">Product Name</th>
                <th className="px-4 py-3 text-left">Price</th>
                <th className="px-4 py-3 text-left">Stock</th>
                <th className="px-4 py-3 text-center">Category</th>
                <th className="px-4 py-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredList.length > 0 ? (
                filteredList.map((item) => (
                  <tr key={item._id} className="border-t hover:bg-gray-50 transition">
                    <td className="px-4 py-3"></td>
                    <td className="px-4 py-3 flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-10 h-10 object-cover rounded-md border"
                      />
                      <div>
                        <p className="font-medium text-gray-800">{item.name}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3">{currency}{item.price}</td>
                    <td
                      className={`px-6 py-3 font-medium ${item.stock < 5 ? "text-red-600" : "text-gray-800"
                        }`}
                    >
                      {item.stock}
                      {item.stock < 5 && (
                        <span className="ml-2 text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">
                          Low
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">{item.category}</td>
                    <td className="px-4 py-3">
                      <div className="flex justify-center items-center gap-3">
                        <button
                          onClick={() => handleEdit(item)}
                          className="bg-green-600 text-white p-2 cursor-pointer rounded-lg flex items-center justify-center hover:bg-green-700 transition-colors"
                          title="Edit"
                        >
                          <MdEdit size={14} />
                        </button>
                        <button
                          onClick={() => deleteProduct(item._id)}
                          className="border border-red-300 text-red-600 p-2 cursor-pointer rounded-lg flex items-center justify-center hover:bg-red-50 transition-colors"
                          title="Delete"
                        >
                          <MdDelete size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-6 text-gray-500">
                    No products found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden p-4 space-y-4">
          {filteredList.length > 0 ? (
            filteredList.map((item) => (
              <div key={item._id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md border flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-800 text-sm truncate">{item.name}</h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        {currency}{item.price}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded ${item.stock < 5 ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"}`}>
                        Stock: {item.stock}
                        {item.stock < 5 && " ⚠️"}
                      </span>
                      <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                        {item.category}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-2 mt-3 pt-3 border-t border-gray-100">
                  <button
                    onClick={() => handleEdit(item)}
                    className="bg-green-600 text-white p-2 cursor-pointer rounded-lg flex items-center justify-center hover:bg-green-700 transition-colors text-xs"
                    title="Edit"
                  >
                    <MdEdit size={12} className="mr-1" />
                    Edit
                  </button>
                  <button
                    onClick={() => deleteProduct(item._id)}
                    className="border border-red-300 text-red-600 p-2 cursor-pointer rounded-lg flex items-center justify-center hover:bg-red-50 transition-colors text-xs"
                    title="Delete"
                  >
                    <MdDelete size={12} className="mr-1" />
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              No products found
            </div>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-xl p-4 sm:p-6 w-full max-w-sm sm:max-w-md shadow-lg mx-auto">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 text-center">Edit Product</h2>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Product name"
              className="w-full border border-gray-300 p-2 sm:p-3 mb-3 rounded-lg outline-none focus:border-blue-500 text-sm sm:text-base"
            />

            {/* Category Select with Dropdown Icon */}
            <div className="relative w-full mb-3">
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 sm:p-3 rounded-lg outline-none focus:border-blue-500 appearance-none text-sm bg-white cursor-pointer"
              >
                <option value="" disabled>Select category</option>
                <option value="Farm Produce">Farm Produce</option>
                <option value="Pets & Livestock">Pets & Livestock</option>
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <IoIosArrowDropdown className="text-gray-500 text-lg" />
              </div>
            </div>

            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Price"
              className="w-full border border-gray-300 p-2 sm:p-3 mb-3 rounded-lg outline-none focus:border-blue-500 text-sm sm:text-base"
            />

            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              placeholder="Stock"
              className="w-full border border-gray-300 p-2 sm:p-3 mb-3 rounded-lg outline-none focus:border-blue-500 text-sm sm:text-base"
            />

            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 sm:p-3 mb-3 rounded-lg outline-none focus:border-blue-500 text-xs sm:text-sm"
            />

            <div className="flex justify-center mb-3">
              <img
                src={
                  formData.image
                    ? URL.createObjectURL(formData.image)
                    : editingProduct.image
                }
                alt="preview"
                className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-md border"
              />
            </div>

            <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3">
              <button
                onClick={() => setEditingProduct(null)}
                className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-colors text-sm sm:text-base order-2 sm:order-1"
              >
                Cancel
              </button>
              <button
                onClick={saveEdit}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm sm:text-base order-1 sm:order-2"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default List;