
import AboutImg from "../assets/About.jpg";
import Philosophy from "../assets/Philosophy.jpg";

import AboutDatas from "../Datas/AboutDatas.jsx";
import { useNavigate } from "react-router-dom";

// icons
import { GrWorkshop } from "react-icons/gr";
import { FaEye, FaHeartbeat } from "react-icons/fa";
import { RiHomeHeartLine, RiCommunityLine } from "react-icons/ri";
import { use } from "react";

const About = () => {
    const navigate = useNavigate();

    const ourFarm = () => {
        navigate("/farm");
    }

    const contact = () => {
        navigate("/contact");
    }
    return (
        <section>
            <div
                className="w-full h-[70vh] md:h-[60vh] bg-cover bg-center flex items-center justify-center relative"
                style={{ backgroundImage: `url(${AboutImg})` }}
            >

                <div className="relative z-10 text-center text-white px-6">
                    <h1 className="text-4xl md:text-6xl font-bold">About Us</h1>
                    <p className="mt-4 text-lg md:text-xl text-green-300">
                        Where sustainability meets smart farming
                    </p>
                </div>
            </div>

            <div className='py-10 flex flex-col items-center text-center gap-10'>
                <h1 className='text-4xl font-bold font-primary'>Welcome to <span className='text-green-600'>Logi Integrated Farm</span></h1>
                <p className='md:w-[750px] p-2 text-lg text-gray-600'>Located on 20 acres of rich agricultural land, Loki Integrated Farm is a passion-driven, multi-functional farm
                    focused on sustainable food production, animal welfare, and innovative farming methods.
                    Our vision is to become a leading example of integrated farming in
                    the region — producing healthy, organic crops and responsibly bred animals and fish.

                </p>
            </div>
            <div className="flex justify-center">
                <div className="md:grid md:grid-cols-2 md:w-[1000px] md:py-10 md:px-30 p-4  gap-5 ">
                    <div className="flex flex-col gap-5 ">
                        <h1 className="text-2xl font-bold">Our Philosophy</h1>
                        <p className="text-base text-gray-600">We believe that farming is more than just cultivation; it's a way of life. By blending traditional practices with modern technology, we create a system that is efficient, eco-friendly, and self-sustaining.</p>
                        <p className="text-base text-gray-600 pb-5">Founded by a team of nature lovers, animal breeders, and agricultural experts, Loki Integrated Farm is built on values of quality, care, and community.</p>
                    </div>
                    <div>
                        <img src={Philosophy} alt="PhilosophyImage" className="rounded-2xl md:h-[300px]" />
                    </div>
                </div>

            </div>

            <div className="py-20 md:flex md:px-30 p-5 justify-center bg-green-50  gap-10">

                <div className=" rounded-2xl shadow-lg mb-5 md:w-[350px] md:h-[220px] p-5 bg-white">
                    <div className=" bg-green-300 text-green-700 p-4 rounded-4xl inline-block"><GrWorkshop size={20} /></div>
                    <h1 className="pb-2 text-xl font-semibold font-poppins">Our Mission</h1>
                    <p className="font-primary">To raise healthy animals, grow sustainable crops, and educate others about the benefits of integrated farming.</p>
                </div>

                <div className=" bg-white shadow-lg rounded-2xl md:w-[350px] md:h-[220px] p-5">
                    <div className=" bg-blue-300 text-blue-700 p-4 rounded-4xl inline-block"><FaEye size={20} /></div>
                    <h1 className="pb-2 text-xl font-semibold font-poppins">Our Vision</h1>
                    <p className="font-primary">A future where farms operate in harmony with nature and communities have access to nutritious, responsibly produced food.</p>
                </div>

            </div>

            <div className="py-10" >
                <div className="flex flex-col items-center gap-5">
                    <h1 className="text-2xl md:text-4xl font-bold font-poppins">Our Core Values</h1>
                    <p className="text-xl text-center m-0.5 md:m-0 text-gray-600 font-primary">The principles that guide everything we do at Logi Integrated Farm</p>
                </div>
                <div className="py-20 md:flex md:px-30 p-5 justify-center  gap-10 text-center">
                    <div className=" mb-5  p-5 flex flex-col items-center gap-3">
                        <div className=" bg-green-300 text-green-700 p-4 rounded-4xl inline-block"><FaHeartbeat shop size={20} /></div>
                        <h1 className="pb-2 text-xl font-semibold font-poppins">Quality</h1>
                        <p className="font-primary text-gray-600">We maintain the highest standards in everything we produce, from crops to livestock, ensuring premium quality for our community.</p>
                    </div>

                    <div className=" mb-5  p-5 flex flex-col items-center text-center gap-3">
                        <div className=" bg-blue-300 text-blue-700 p-4 rounded-4xl inline-block"><RiHomeHeartLine size={20} /></div>
                        <h1 className="pb-2 text-xl font-semibold font-poppins">Care</h1>
                        <p className="font-primary text-gray-600">Every animal, plant, and person on our farm receives the attention and care they deserve for healthy, happy lives.</p>
                    </div>

                    <div className=" mb-5  p-5 flex flex-col items-center text-center gap-3">
                        <div className=" bg-blue-300 text-blue-700 p-4 rounded-4xl inline-block"><RiCommunityLine size={20} /></div>
                        <h1 className="pb-2 text-xl font-semibold font-poppins">Community</h1>
                        <p className="font-primary text-gray-600">We believe in building strong relationships with our local community and sharing knowledge about sustainable farming.</p>
                    </div>
                </div>

            </div>


            <div className="pb-20 md:px-30 ">
                <div className="flex flex-col justify-center items-center">
                    <h1 className="pb-2 text-4xl font-semibold font-poppins">Meet Our Team</h1>
                    <p className="pb-5 font-primary text-center text-gray-600">Nature lovers, animal breeders, and agricultural experts working together</p>
                </div>

                <div className="grid grid-cols-1 p-5 gap-10 md:grid-cols-3">
                    {AboutDatas.map((item) => (
                        <div key={item.id}
                            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"><img src={item.image} alt={item.position}
                                className="w-full h-80 object-cover " />
                            <div className="p-6 text-left">
                                <h1 className="text-xl font-bold font-primary">{item.position}</h1>
                                <p className="text-green-600 mt-2 text-sm font-poppins">{item.role}</p>
                                <p className="text-gray-600 mt-5 text-sm font-poppins">{item.description}</p>

                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className=" flex flex-col bg-green-600 justify-center md:p-16 p-5 items-center text-center">
                <h1 className=" text-xl md:text-5xl text-white  font-primary font-bold m-4 ">
                    Want to Learn More About Our Farm?
                </h1>
                <p className=" text-lg md:w-[650px] text-white">Visit us to see sustainable farming in action and meet our team of dedicated professionals.</p>
                <div className="mt-6 md:flex gap-10  justify-center">
                    <button onClick={ourFarm} className="bg-white px-6 py-3 cursor-pointer  border-2 mt-2 rounded-full text-green-500 font-semibold hover:bg-green-600 ">
                       Explore Our Farm
                    </button>
                    <button onClick={contact} className="border border-white cursor-pointer md:px-6 px-10 mt-2 py-3  rounded-full text-white font-semibold hover:bg-white hover:text-green-700">
                       Schedule a Visit
                    </button>
                </div>
            </div>
        </section>
    );
};

export default About;
