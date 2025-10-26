import { TbPlant } from "react-icons/tb";
import { FaFacebook, FaInstagram, FaYoutube, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";


const Footer = () => {
    return (
        <>
            <div>
                <div className=' p-10 md:px-30  grid grid-cols-1 gap-10 md:grid-cols-3 bg-primary'>
                    <div className=' gap-8 '>
                        <div className=''>
                            <h1 className="text-xl  font-medium font-extra flex gap-2 py-5 text-white items-center">
                                <TbPlant
                                    size={25}
                                    className="text-white  bg-green-700 p-1 rounded-2xl"
                                />
                                Logi Integrated Farm
                            </h1>
                            <p className="text-white ">Sustainable. Smart. Integrated. Experience modern farming at its finest with our 20-acre integrated agriculture and breeding facility.</p>
                            <ul className="flex md:gap-10 gap-8 py-5 cursor-pointer ">
                                <li className="p-2  rounded-4xl bg-green-700 text-white hover:bg-green-600 ">
                                    <a href="" target="_blank" rel="noopener noreferrer"><FaFacebook size={20} /></a></li>
                                <li className="p-2  rounded-4xl bg-green-700 text-white hover:bg-green-600 ">
                                    <a href="https://www.instagram.com/distres_x.heart_/" target="_blank" rel="noopener noreferrer"><FaInstagram size={20} /></a></li>
                                <li className="p-2  rounded-4xl bg-green-700 text-white hover:bg-green-600 ">
                                    <a href="https://www.youtube.com/@INFO_LOKI_TAMIL" target="_blank" rel="noopener noreferrer"><FaYoutube size={20} /></a></li>
                                <li className="p-2  rounded-4xl bg-green-700 text-white hover:bg-green-600 ">
                                    <a href="https://www.linkedin.com/in/logapriyan-m/" target="_blank" rel="noopener noreferrer"><FaLinkedin size={20} /></a></li>
                            </ul>

                        </div>
                    </div>

                    <div className="text-white font-primary ">
                        <h1 className="py-4 text-xl font-poppins font-bold">Quick Links</h1>
                        <ul className="flex flex-col gap-1 cursor-pointer">
                            <li><Link to="/about">About Us</Link></li>
                            <li><Link to="/farm">Our Farm</Link></li>
                            <li><Link to="/agriculture">Agriculture</Link></li>
                            <li><Link to="/products">Products</Link></li>
                            <li><Link to="/visit">Visit Us</Link></li>
                            <li><Link to="/contact">Contact Us</Link></li>
                        </ul>
                    </div>

                    <div className="text-white">
                        <h1 className="text-lg py-2 font-poppins font-bold">Newsletter</h1>
                        <p>Stay updated with farm news and seasonal updates.</p>
                        <input type="text" placeholder="Your email address" className="px-2 w-full rounded-sm border-1 border-green-300 bg-green-700 my-2 p-1 outline-none" />
                        <button className="w-full bg-green-600 hover:bg-green-500 cursor-pointer rounded-sm p-1">Subscribe</button>
                    </div>



                </div>
                <footer className="bg-green-800 text-white py-6">
                   
                    <hr className="w-full border-t border-green-600 mb-4" />

                    <div className="flex flex-col md:flex-row justify-between items-center px-5 md:px-20 text-gray-200">
                        {/* Copyright */}
                        <p className="text-sm">
                            © 2025 Loki Integrated Farm. All rights reserved.
                        </p>

                        {/* Extra text */}
                        <div className="flex gap-5 mt-3 md:mt-0">
                            <span className="cursor-pointer">Privacy Policy</span>
                            <span className="cursor-pointer">Terms of Service</span>
                        </div>
                    </div>
                </footer>

            </div>


        </>
    )
}

export default Footer
