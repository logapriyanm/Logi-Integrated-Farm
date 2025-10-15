import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import RelatedProducts from "./RelatedProducts";
import { toast } from "react-toastify";

export default function ProductItem() {
    const { productId } = useParams();
    const { products, addToCart, currency, token, navigate } = useCart();
    const [productData, setProductData] = useState(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const item = products.find((p) => p._id === (productId));
        if (item) {
            setProductData(item);
            setQuantity(item.quantity || 1);
        }
    }, [productId, products]);

    // 🆕 Handle add to cart with login check
    const handleAddToCart = () => {
        if (!token) {
            toast.error("Please login to add items to cart");
            navigate("/login");
            return;
        }
        addToCart({ ...productData, quantity });
        toast.success(`${quantity} ${productData.name} added to cart`);
    };

    if (!productData) {
        return <h2 className="text-center mt-10">Product not found</h2>;
    }

    const unit = productData.category === "Farm Produce" ? "kg" : "";

    const handleIncrease = () => {
        if (quantity < productData.stock) {
            setQuantity((prev) => prev + 1);
        } else {
            toast.error(`Only ${productData.stock} items available in stock`);
        }
    };

    const handleDecrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

    return (
        <div className="max-w-4xl my-20 mx-auto p-6">
            <img
                src={productData.image}
                alt={productData.name}
                className="w-full h-80 object-contain rounded-lg"
            />

            <h1 className="text-3xl font-bold mt-4">{productData.name}</h1>
            <p className="text-gray-600 mt-2">{productData.desc}</p>

            <p className="text-green-600 mt-4 text-2xl font-bold">
                {currency}{productData.price} / {unit}
            </p>

            <div className="flex justify-between">
                {/* Quantity controls */}
                <div className="flex items-center gap-4 mt-6">
                    <button
                        onClick={handleDecrease}
                        className="px-3 py-1 bg-gray-200 rounded-md text-lg"
                    >
                        −
                    </button>
                    <span className="text-lg font-semibold">
                        {quantity} {unit}
                    </span>
                    <button
                        onClick={handleIncrease}
                        className="px-3 py-1 bg-gray-200 rounded-md text-lg"
                    >
                        +
                    </button>
                </div>
                <div className="text-sm text-gray-600 mt-5 flex flex-col gap-2">
                    <p>100% Organic Product</p>
                    <p>Cash on delivery available in this product</p>
                    <p>Easy returns and exchange within 7 days</p>
                </div>
            </div>
            
            <button
                onClick={handleAddToCart}
                className="bg-green-600 text-white px-6 py-2 mt-6 rounded-lg hover:bg-green-700"
            >
                Add {quantity} {unit} to Cart
            </button>

            <hr className="mt-8 flex text-center sm:w-4/5" />

            {/* Description */}
            <div className="mt-10">
                <div className="flex">
                    <b className="border px-5 py-2 border-gray-400 text-sm">Description</b>
                    <p className="border px-5 py-2 border-gray-400 text-sm">Reviews (122)</p>
                </div>
                <div className="flex flex-col gap-4 border p-5 text-gray-500">
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis, nostrum.</p>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis, nostrum.</p>
                </div>
            </div>

            {/* Related Products */}
            <RelatedProducts currentCategory={productData.category} currentId={productData._id} />
        </div>
    );
}