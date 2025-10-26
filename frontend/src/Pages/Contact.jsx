import { contactDatas } from "../Datas/ContactData"
import { FaWhatsapp, FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPaperPlane } from "react-icons/fa";
import { IoIosArrowDropdown } from "react-icons/io";
import { FaPhoneAlt } from "react-icons/fa";

const Contact = () => {
    return (
        <section>
            {/* Header */}
            <div className="py-20 bg-green-600 flex flex-col gap-3 items-center">
                <h1 className="font-bold text-white text-3xl sm:text-4xl">Contact Us</h1>
                <p className="font-medium text-lg sm:text-xl text-white">We'd love to hear from you</p>
            </div>

            {/* Contact Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 px-6 py-10 md:p-16">
                {contactDatas.map((item, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-xl hover:shadow-md p-4 md:p-6 text-center flex flex-col items-center"
                    >
                        <div className="mb-3 text-2xl">{item.icon}</div>
                        <h2 className="text-lg font-semibold mb-1">{item.title}</h2>
                        <p className="text-gray-600 text-sm">{item.description}</p>
                    </div>
                ))}
            </div>

            {/* Contact Form & Options */}
            <div className="py-12 px-4 md:px-16  bg-gray-50">
                <div className="grid grid-cols-1 md:grid-cols-2  justify-center gap-10 px-20 md:gap-16">
                    
                    {/* Left: Contact Form */}
                    <div className="max-w-lg mx-auto md:mx-0">
                        <h1 className="text-2xl sm:text-3xl font-bold mb-4">Get In Touch</h1>
                        <form className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <input
                                    type="text"
                                    placeholder="Your full name"
                                    required
                                    className="w-full border rounded-md p-2 focus:outline-green-500 text-sm"
                                />
                                <input
                                    type="tel"
                                    placeholder="Your phone number"
                                    required
                                    className="w-full border rounded-md p-2 focus:outline-green-500 text-sm"
                                />
                            </div>

                            <input
                                type="email"
                                placeholder="your.email@example.com"
                                required
                                className="w-full border rounded-md p-2 focus:outline-green-500 text-sm"
                            />

                            <div className="relative w-full">
                                <select
                                    required
                                    className="w-full appearance-none border rounded-md p-2 pr-8 focus:outline-green-500 text-sm"
                                >
                                    <option value="" disabled>Select a topic</option>
                                    <option value="Enquiry">General Enquiry</option>
                                    <option value="booking">Farm Visit Booking</option>
                                    <option value="product">Product Information</option>
                                    <option value="order">Bulk Orders</option>
                                    <option value="tours">Educational Tours</option>
                                    <option value="other">Other</option>
                                </select>
                                <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                                    <IoIosArrowDropdown />
                                </div>
                            </div>

                            <textarea
                                rows="14"
                                maxLength="500"
                                placeholder="Tell us how we can help you..."
                                required
                                className="w-full border rounded-md p-2 focus:outline-green-500 text-sm"
                            ></textarea>

                            <button
                                type="submit"
                                className="w-full bg-green-600 cursor-pointer hover:bg-green-700 transition text-white font-semibold py-2 rounded-md flex items-center justify-center gap-2 text-sm"
                            >
                                <FaPaperPlane /> Send Message
                            </button>
                        </form>
                    </div>

                    {/* Right: Contact Options */}
                    <div className="max-w-md mx-auto md:mx-0">
                        <h1 className="text-2xl sm:text-3xl font-bold mb-4">Other Ways to Reach Us</h1>

                        <div className="space-y-3">
                            <a
                                href="tel:7904074107"
                                className="flex items-center justify-center gap-3 border-2 border-green-500 text-green-600 py-2 rounded-md hover:bg-green-50 transition text-sm"
                            >
                                <FaPhoneAlt /> Call Now: 7904074107
                            </a>

                            <a
                                href="https://wa.me/7904074107"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-3 bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition text-sm"
                            >
                                <FaWhatsapp /> WhatsApp: 7904074107
                            </a>
                        </div>

                        {/* Social Media */}
                        <h2 className="text-lg font-semibold mt-8 mb-3">Follow Us</h2>
                        <div className="grid grid-cols-2 gap-3">
                            {[
                                { icon: <FaFacebook className="text-blue-600" />, name: "Facebook", handle: "@LokiIntegratedFarm" },
                                { icon: <FaInstagram className="text-pink-600" />, name: "Instagram", handle: "@LokiIntegratedFarm" },
                                { icon: <FaTwitter className="text-sky-500" />, name: "Twitter", handle: "@LokiIntegratedFarm" },
                                { icon: <FaLinkedin className="text-blue-700" />, name: "Linkedin", handle: "@LokiIntegratedFarm" },
                            ].map((item, index) => (
                                <div key={index} className="border border-gray-300 p-3 rounded-md flex items-center gap-3 shadow-sm hover:bg-gray-100 transition text-sm">
                                    <div>{item.icon}</div>
                                    <div>
                                        <h1 className="font-semibold">{item.name}</h1>
                                        <h2 className="text-gray-500">{item.handle}</h2>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Location */}
                        <h2 className="text-lg font-semibold mt-6 mb-2">Location</h2>
                        <div className="w-full h-36 bg-gray-200 rounded-md flex items-center justify-center text-sm">
                            📍 Map Coming Soon
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Contact;
