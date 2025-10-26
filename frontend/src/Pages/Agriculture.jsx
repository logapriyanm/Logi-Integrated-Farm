import AgricultureImg from "../assets/agriculture.jpg"
import CropAgri from "../assets/CropAgri.jpg"
import Napier from "../assets/Napier.jpg"
import SoyaBeans from "../assets/SoyaBeans.jpg"
import Vegetables from "../assets/Vegetables.jpg"
import CoverCrops from "../assets/CoverCrops.jpg"
import AnimalFarm from "../assets/AnimalFarm.jpg"


import AgriDatas from "../Datas/AgriData"
// icons
import { PiPlantDuotone, PiPlantFill } from "react-icons/pi";
import { FaRecycle } from "react-icons/fa";
import { GiHighGrass, GiPlantRoots } from "react-icons/gi";
import { MdGrass } from "react-icons/md";
import { MdOutlineSystemUpdateAlt } from "react-icons/md";

import { useNavigate } from "react-router-dom"

const Agriculture = () => {
    const navigate = useNavigate();

    const contact = () => {
        navigate("/contact");
    }
    return (
        <section className="w-full">

            <div
                className="w-full h-[60vh] sm:h-[70vh] md:h-[60vh] bg-cover bg-center flex items-center justify-center relative"
                style={{ backgroundImage: `url(${AgricultureImg})` }}
            >
                <div className="flex flex-col items-center text-center text-white px-4 sm:px-6">
                    <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold">Agriculture</h1>
                </div>
            </div>


            <div className="py-10 flex flex-col gap-5 items-center justify-center px-4">
                <h1 className="text-xl  md:text-4xl font-bold text-center">
                    6 Acres of <span className="text-green-600">Sustainable Agriculture</span>
                </h1>
                <p className="max-w-[90%] md:max-w-[800px] text-center text-base sm:text-lg p-3 text-gray-600">
                    At Loki Integrated Farm, agriculture is the foundation of our integrated ecosystem.
                    We dedicate 6 acres of fertile land to cultivating high-quality, nutrient-rich crops that serve both
                    commercial and on-farm purposes — feeding our animals and supporting local food systems.
                </p>
            </div>

            {/* Crops Section */}
            <div className="space-y-16 bg-green-50 p-6 sm:p-10">
                <div className="flex flex-col items-center gap-2">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">What We Grow</h1>
                    <p className="text-center text-base sm:text-lg text-gray-600">
                        Our diverse range of crops serves multiple purposes across our farm
                    </p>
                </div>

                <div className="flex flex-col items-center gap-10 md:w-[80vw] mx-auto">

                    {/* Maize */}
                    <div className="grid md:grid-cols-2 gap-6  items-center  md:px-0">
                        <img src={CropAgri} alt="Maize" className="rounded-xl h-[200px] sm:h-[250px] md:h-[300px] w-full object-cover shadow-lg order-1 md:order-none" />
                        <div className="md:w-[460px] w-full">
                            <div className="flex gap-4">
                                <div className="p-4 w-fit rounded-4xl bg-yellow-100">
                                    <PiPlantDuotone size={30} className="text-yellow-600" />
                                </div>
                                <div>
                                    <h2 className="text-base md:text-xl font-bold">Maize (Corn)</h2>
                                    <p className="mt-1 text-sm font-semibold text-yellow-700">Primary grain crop</p>
                                </div>
                            </div>
                            <p className="mt-4 text-gray-700">
                                Grown for both human consumption and animal feed, maize is a key staple on our farm.
                                This versatile crop provides essential carbohydrates for our livestock while serving local
                                market demand for fresh corn.
                            </p>
                            <ul className="mt-4 text-gray-700 flex flex-wrap gap-2">
                                <li className="bg-yellow-100 rounded-2xl px-3 py-1 text-sm font-semibold">Human Consumption</li>
                                <li className="bg-yellow-100 rounded-2xl px-3 py-1 text-sm font-semibold">Animal Feed</li>
                                <li className="bg-yellow-100 rounded-2xl px-3 py-1 text-sm font-semibold">Local Markets</li>
                            </ul>
                        </div>
                    </div>

                    {/* Napier Grass */}
                    <div className="grid md:grid-cols-2 gap-6  items-center  md:px-0">
                        <div className="md:w-[460px] w-full">
                            <div className="flex gap-4">
                                <div className="p-4 w-fit rounded-4xl bg-green-200">
                                    <GiHighGrass size={30} className="text-green-600" />
                                </div>
                                <div>
                                    <h2 className="text-base md:text-xl   font-bold">Napier Grass</h2>
                                    <p className="mt-1  text-sm font-semibold text-green-400">High-yield fodder crop</p>
                                </div>
                            </div>
                            <p className="mt-4 text-gray-700">
                                Also known as Elephant Grass, this high-yield, protein-rich fodder crop is essential for feeding
                                our cows and goats. Napier grass provides excellent nutrition while being drought-resistant
                                and fast-growing.
                            </p>
                            <ul className="mt-4 text-gray-700 flex flex-wrap gap-2">
                                <li className="bg-green-100 rounded-2xl px-3 py-1 text-sm font-semibold">Cattle Feed</li>
                                <li className="bg-green-100 rounded-2xl px-3 py-1 text-sm font-semibold">Goat Feed</li>
                                <li className="bg-green-100 rounded-2xl px-3 py-1 text-sm font-semibold">High Protein</li>
                                <li className="bg-green-100 rounded-2xl px-3 py-1 text-sm font-semibold">Drought Resistant</li>
                            </ul>
                        </div>
                        <img src={Napier} alt="Napier" className="rounded-xl h-[200px] sm:h-[250px] md:h-[300px] w-full object-cover shadow-lg" />
                    </div>

                    {/* Soybeans */}
                    <div className="grid md:grid-cols-2 gap-6  items-center  md:px-0">
                        <img src={SoyaBeans} alt="Soybeans" className="rounded-xl h-[200px] sm:h-[250px] md:h-[300px] w-full object-cover shadow-lg order-1 md:order-none" />
                        <div className="md:w-[460px] w-full">
                            <div className="flex gap-4">
                                <div className="p-4 w-fit rounded-4xl text-yellow-600 bg-yellow-200">
                                    <PiPlantFill size={30} />
                                </div>
                                <div>
                                    <h2 className="text-base md:text-xl   font-bold">Soybeans</h2>
                                    <p className="mt-1 text-sm font-semibold text-yellow-400">Protein-rich legume</p>
                                </div>
                            </div>
                            <p className="mt-4 text-gray-700">
                                Valued for their high protein content, soybeans support both livestock feed requirements and
                                meet market demand. These nitrogen-fixing legumes also improve soil fertility naturally.
                            </p>
                            <ul className="mt-4 text-gray-700 flex flex-wrap gap-2">
                                <li className="bg-yellow-100 rounded-2xl px-3 py-1 text-sm font-semibold">High Protein</li>
                                <li className="bg-yellow-100 rounded-2xl px-3 py-1 text-sm font-semibold">Livestock Feed</li>
                                <li className="bg-yellow-100 rounded-2xl px-3 py-1 text-sm font-semibold">Market Sales</li>
                                <li className="bg-yellow-100 rounded-2xl px-3 py-1 text-sm font-semibold">Soil Improvement</li>
                            </ul>
                        </div>
                    </div>

                    {/* Vegetables */}
                    <div className="grid md:grid-cols-2 gap-6  items-center  md:px-0">
                        <div className="md:w-[460px] w-full">
                            <div className="flex gap-4">
                                <div className="p-4 w-fit rounded-4xl bg-red-200">
                                    <GiPlantRoots size={30} className="text-red-600" />
                                </div>
                                <div>
                                    <h2 className="text-base md:text-xl font-bold">Vegetables & Fruits</h2>
                                    <p className="mt-1 text-sm font-semibold text-red-600">Seasonal fresh produce</p>
                                </div>
                            </div>
                            <p className="mt-4 text-gray-700">
                                Seasonal produce such as tomatoes, peppers, greens, bananas, and more are grown for household
                                use and local sales. Our diverse fruit and vegetable production ensures fresh, nutritious food year-round.
                            </p>
                            <ul className="mt-4 text-gray-700 flex flex-wrap gap-2">
                                <li className="bg-red-100 rounded-2xl px-3 py-1 text-sm font-semibold">Tomatoes</li>
                                <li className="bg-red-100 rounded-2xl px-3 py-1 text-sm font-semibold">Peppers</li>
                                <li className="bg-red-100 rounded-2xl px-3 py-1 text-sm font-semibold">Leafy Greens</li>
                                <li className="bg-red-100 rounded-2xl px-3 py-1 text-sm font-semibold">Bananas</li>
                            </ul>
                        </div>
                        <img src={Vegetables} alt="Vegetables" className="rounded-xl h-[200px] sm:h-[250px] md:h-[300px] w-full object-cover shadow-lg" />
                    </div>

                    {/* Cover Crops */}
                    <div className="grid md:grid-cols-2 gap-6  items-center  md:px-0">
                        <img src={CoverCrops} alt="Cover Crops" className="rounded-xl h-[200px] sm:h-[250px] md:h-[300px] w-full object-cover shadow-lg order-1 md:order-none" />
                        <div className="md:w-[460px] w-full">
                            <div className="flex gap-4">
                                <div className="p-4 w-fit rounded-4xl bg-purple-200">
                                    <MdGrass size={30} className="text-purple-600" />
                                </div>
                                <div>
                                    <h2 className="text-base md:text-xl font-bold">Cover Crops & Green Manure</h2>
                                    <p className="mt-1 text-sm font-semibold text-purple-600">Soil enrichment system</p>
                                </div>
                            </div>
                            <p className="mt-4 text-gray-700">
                                To naturally enrich the soil, we rotate with legumes and cover crops, improving fertility
                                and structure without chemicals. This sustainable approach maintains soil health for long-term productivity.
                            </p>
                            <ul className="mt-4 text-gray-700 flex flex-wrap gap-2">
                                <li className="bg-purple-100 rounded-2xl px-3 py-1 text-sm font-semibold">Legumes</li>
                                <li className="bg-purple-100 rounded-2xl px-3 py-1 text-sm font-semibold">Soil Health</li>
                                <li className="bg-purple-100 rounded-2xl px-3 py-1 text-sm font-semibold">Natural Fertilizer</li>
                                <li className="bg-purple-100 rounded-2xl px-3 py-1 text-sm font-semibold">Crop Rotation</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sustainable Practices */}
            <div className="py-10 px-4">
                <div className="flex flex-col gap-4 items-center text-center">
                    <h1 className="text-2xl sm:text-3xl font-bold">Sustainable Practices</h1>
                    <p className="text-base sm:text-lg text-gray-600">
                        Eco-friendly, regenerative farming techniques for long-term sustainability
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 md:px-40 p-5 mt-5">
                    <div className="p-4 sm:p-6 flex flex-col gap-5 rounded-2xl bg-green-50">
                        <div className="text-green-600 flex items-center justify-center mb-3 rounded-full p-4 bg-green-100 self-center">
                            <FaRecycle size={30} />
                        </div>
                        <h1 className="text-lg sm:text-xl font-semibold">Composting</h1>
                        <p className="text-gray-600 text-sm sm:text-base">
                            We recycle animal manure and crop waste into rich compost for soil health and natural fertilization.
                        </p>
                    </div>

                    <div className="p-4 sm:p-6 flex flex-col gap-5 rounded-2xl bg-blue-50">
                        <div className="text-blue-600 flex items-center justify-center mb-3 rounded-full p-4 bg-blue-100 self-center">
                            <FaRecycle size={30} />
                        </div>
                        <h1 className="text-lg sm:text-xl font-semibold">Crop Rotation</h1>
                        <p className="text-gray-600 text-sm sm:text-base">
                            Rotation and intercropping practices reduce pests, improve yields, and protect the environment.
                        </p>
                    </div>

                    <div className="p-4 sm:p-6 flex flex-col gap-5 rounded-2xl bg-yellow-50">
                        <div className="text-yellow-600 flex items-center justify-center mb-3 rounded-full p-4 bg-yellow-100 self-center">
                            <FaRecycle size={30} />
                        </div>
                        <h1 className="text-lg sm:text-xl font-semibold">Minimal Chemicals</h1>
                        <p className="text-gray-600 text-sm sm:text-base">
                            Our approach relies on natural pest control and organic inputs whenever possible.
                        </p>
                    </div>

                    <div className="p-4 sm:p-6 flex flex-col gap-5 rounded-2xl bg-cyan-50">
                        <div className="text-cyan-600 flex items-center justify-center mb-3 rounded-full p-4 bg-cyan-100 self-center">
                            <FaRecycle size={30} />
                        </div>
                        <h1 className="text-lg sm:text-xl font-semibold">Water Management</h1>
                        <p className="text-gray-600 text-sm sm:text-base">
                            Borehole-fed system with drip irrigation conserves water and supports crops year-round.
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 md:px-40 p-10 gap-10 items-center justify-center">
                <div className="flex flex-col gap-6">
                    <h1 className="md:text-4xl text-xl  font-semibold"><span className="text-green-600">Integration</span> with Animal Farming</h1>
                    <p className="text-gray-600 text-sm sm:text-base">Our agriculture and livestock systems work hand-in-hand to create a sustainable, closed-loop ecosystem.</p>

                    <div className="flex  gap-4">
                        <div className="text-green-600 flex items-center w-fit justify-center mb-3 rounded-full p-4 bg-green-100 self-center">
                            <PiPlantFill size={20} />
                        </div>
                        <div>
                            <h1 className="font-bold">Crops Feed Animals</h1>
                            <p className="text-gray-600 text-sm">Crops like maize, napier, and soybean feed our cows, goats, pigs, and poultry.</p>
                        </div>
                    </div>

                    <div className="flex  gap-4">
                        <div className="text-orange-600 flex items-center w-fit justify-center mb-3 rounded-full p-4 bg-orange-100 self-center">
                            < FaRecycle size={20} />
                        </div>
                        <div>
                            <h1 className="font-bold">Animals Fertilize Crops</h1>
                            <p className="text-gray-600 text-sm">Animal waste is converted into natural fertilizer for the fields.</p>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <div className="text-blue-600 flex items-center w-fit justify-center mb-3 rounded-full p-4 bg-blue-100 self-center">
                            <MdOutlineSystemUpdateAlt size={20} />
                        </div>
                        <div>
                            <h1 className="font-bold">Reduced Costs</h1>
                            <p className="text-gray-600 text-sm">This closed-loop system reduces input costs and boosts productivity.</p>
                        </div>
                    </div>
                </div>
                <div>
                    <img src={AnimalFarm} alt="AnimalFarm" className="rounded-2xl md:w-[450px] md:h-[350px]" />
                </div>
            </div>

            <div className="py-10 bg-green-100">
                <div className="flex flex-col items-center pb-10">
                    <h1 className="text-2xl p-5 text-center font-bold pb-5 font-poppins">Market & <span className="text-green-600">Community Impact</span></h1>
                    <p className="text-base pb-5 text-center text-gray-600">Our agricultural production supports local food security and economic development.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 px-6 md:px-40">
                    {AgriDatas.map((item) => (
                        <div key={item.id} className="p-6 rounded-2xl shadow-md bg-white flex flex-col items-center text-center gap-3 hover:shadow-lg transition">
                            <div className="text-yellow-500 text-3xl p-2 border-2 rounded-4xl">
                                {item.icon}
                            </div>
                            <h2 className="text-xl text-green-600 font-bold">{item.header}</h2>
                            <p className="text-sm font-semibold">{item.para}</p>
                            <p className="text-gray-700 text-sm">{item.content}</p>
                        </div>
                    ))}
                </div>
            </div>

             <div className="flex flex-col items-center justify-center gap-5 md:py-15 py-5 ">
                <h1 className="text-3xl font-poppins text-center font-bold">Experience Sustainable Agriculture</h1>
                <p className=" font-poppins text-base text-center text-gray-600">Visit our farm to see how we grow healthy crops using eco-friendly practices and innovative techniques.</p>
                <div className=" md:flex gap-10 items-center text-center  justify-center">
                    <button onClick={contact} className="bg-green-500 px-6 py-3 cursor-pointer  border-2 mt-2 rounded-full text-white font-semibold hover:bg-green-600">
                        Schedule Farm Tour
                    </button>
                    <button onClick={contact} className="border-2 border-green-600 cursor-pointer md:px-6 px-10 mt-2 py-3  rounded-full text-green-600 font-semibold hover:bg-green-600 hover:text-white">
                        Contact Us
                    </button>
                </div>
            </div>
        </section>
    )
}

export default Agriculture
