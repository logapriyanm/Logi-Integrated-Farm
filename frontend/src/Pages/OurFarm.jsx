import OurFarmImg from "../assets/OurFarm.jpg";
import CropsImg from "../assets/FarmCrop.jpg";
import FishImg from "../assets/FarmFish.jpg";
import DogsImg from "../assets/FarmDog.jpg";
import GoatsImg from "../assets/FarmGoat.jpg";
import CattleImg from "../assets/FarmCow.jpg";

import FarmDatas from "../Datas/FarmDatas";

// icons
import { GiFarmTractor, GiWorld } from "react-icons/gi";
import { FaCheckCircle } from "react-icons/fa";
import { MdOutlineEco, MdOutlineHealthAndSafety } from "react-icons/md";
import { GiSheep, GiCow, GiFishEggs } from "react-icons/gi";
import { LuDog } from "react-icons/lu";
import { PiPlantDuotone } from "react-icons/pi";
import { FaInfinity } from "react-icons/fa6";

import { useNavigate } from "react-router-dom";

const OurFarm = () => {
    const navigate = useNavigate();

    const contact = () => {
        navigate("/contact");
    };
    return (
        <section>

            <div
                className="w-full h-[70vh] md:h-[60vh] bg-cover bg-center flex items-center justify-center relative"
                style={{ backgroundImage: `url(${OurFarmImg})` }}
            >
                <div className="flex flex-col items-center text-center text-white px-6">
                    <div className="text-white flex items-center mb-3 rounded-full p-4 w-fit bg-green-600">
                        <PiPlantDuotone size={30} />
                    </div>
                    <h1 className="text-4xl flex gap-5 md:text-6xl font-bold">
                        <GiFarmTractor className="text-green-400 " />
                        Our Farm
                    </h1>
                    <p className="mt-4 text-lg md:text-xl text-green-300">
                        A 20-acre model of integrated, sustainable agriculture and animal husbandry
                    </p>
                </div>
            </div>


            <div className="py-10">
                <div className="flex flex-col text-center items-center">
                    <h1 className="text-2xl flex gap-5 md:text-4xl font-primary mb-5 font-bold">
                        Welcome to Logi Integrated Farm
                    </h1>
                    <p className="md:w-[800px] text-base text-gray-600">
                        A 20-acre model of integrated, sustainable agriculture and animal husbandry.
                        Our farm is designed to function as a self-sufficient ecosystem, where every crop, animal,
                        and facility contributes to the overall health and productivity of the land.
                    </p>
                </div>
            </div>


            <div className="flex justify-center pb-20 ">
                <div className="flex flex-col bg-green-100 justify-center items-center text-center py-6 h-[200px] rounded-2xl w-[600px]">
                    <div className="text-white flex items-center mb-3 rounded-full p-2 w-fit bg-green-600">
                        <GiWorld size={30} />
                    </div>
                    <div className="flex flex-col items-center">
                        <h1 className="text-xl md:text-2xl font-primary font-bold">Our Goal</h1>
                        <p className="m-4">
                            We operate with one goal in mind: to produce high-quality food while maintaining harmony with nature.
                        </p>
                    </div>
                </div>
            </div>


            <div className="space-y-16 px-6 md:px-30 bg-green-50 p-10">
                {/* Agriculture */}
                <div className="grid md:grid-cols-2 gap-10 items-center">
                    <div>
                        <div className="flex gap-4">
                            <div className="p-4 w-fit rounded-4xl bg-green-300" >
                                <PiPlantDuotone size={30} className="text-green-600" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold ">
                                    Crops & Fields
                                </h2>
                                <p className="mt-1 font-semibold text-green-700">10 acres</p>
                            </div>

                        </div>

                        <p className="mt-4 text-gray-700">
                            We grow a wide variety of cereal, legume, and vegetable crops that serve multiple purposes across our integrated system.
                        </p>
                        <ul className="mt-4 space-y-2 text-gray-700">
                            <li><FaCheckCircle className="inline text-green-600 mr-2" /> <b>Maize</b> for food and feed</li>
                            <li><FaCheckCircle className="inline text-green-600 mr-2" /> <b>Soybeans</b> for protein-rich feed</li>
                            <li><FaCheckCircle className="inline text-green-600 mr-2" /> <b>Napier grass</b> for grazing</li>
                            <li><FaCheckCircle className="inline text-green-600 mr-2" /> <b>Seasonal vegetables</b> - tomatoes, spinach, okra, bananas</li>
                        </ul>
                        <div className="bg-white shadow rounded-xl p-4 mt-4">
                            <p className="font-bold flex items-center gap-2"><MdOutlineEco className="text-green-600" /> Sustainable Practices</p>
                            <p className="text-gray-600 mt-2 text-sm">We focus on soil regeneration, composting, and minimal tillage to ensure long-term fertility.</p>
                        </div>
                    </div>
                    <img src={CropsImg} alt="Crops" className="rounded-xl shadow-lg" />
                </div>

                {/* Fishing */}
                <div className="grid md:grid-cols-2 gap-10 items-center">
                    <img src={FishImg} alt="Aquaculture" className="rounded-xl shadow-lg order-1 md:order-none" />
                    <div>
                        <div className="flex gap-4">
                            <div className="p-4 w-fit rounded-4xl bg-blue-300" >
                                <GiFishEggs size={30} className="text-blue-600" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold ">

                                    Aquaculture
                                </h2>
                                <p className="mt-1 font-semibold text-blue-700"> 3 acres • 6 large ponds</p>
                            </div>

                        </div>

                        <p className="mt-4 text-gray-700">Our fish farming unit includes 6 large ponds stocked with premium fish varieties.</p>
                        <ul className="mt-4 space-y-2 text-gray-700">
                            <li><FaCheckCircle className="inline text-blue-600 mr-2" /> <b>Tilapia</b> - fast-growing protein</li>
                            <li><FaCheckCircle className="inline text-blue-600 mr-2" /> <b>Catfish</b> - premium market fish</li>
                        </ul>
                        <div className="bg-white shadow rounded-xl p-4 mt-4">
                            <p className="font-bold flex items-center gap-2"><MdOutlineHealthAndSafety className="text-blue-600" /> System Integration</p>
                            <p className="text-gray-600 mt-2 text-sm">Aerated ponds ensure healthy fish, while water fertilizes nearby crops and fish waste is composted.</p>
                        </div>
                    </div>
                </div>

                {/* Dogs */}
                <div className="grid md:grid-cols-2 gap-10 items-center">
                    <div>
                        <div className="flex gap-4">
                            <div className="p-4 w-fit rounded-4xl bg-orange-200" >
                                <LuDog size={30} className="text-orange-400" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold ">
                                    Dog Breeding & Training
                                </h2>
                                <p className="mt-1 font-semibold text-orange-400">1 acre</p>
                            </div>

                        </div>
                        <p className="mt-4 text-gray-700">We raise working breeds with focus on temperament, health, and intelligence.</p>
                        <ul className="mt-4 space-y-2 text-gray-700">
                            <li><FaCheckCircle className="inline text-orange-400 mr-2" /> <b>
                                German Shepherds</b> - Working & family dogs
                            </li>
                            <li><FaCheckCircle className="inline text-orange-400 mr-2" /> <b>
                                Labradors </b> -  Friendly & intelligent
                            </li>
                            <li><FaCheckCircle className="inline text-orange-400 mr-2" /> <b>Rottweilers</b> - Guard & companion dogs</li>
                        </ul>
                        <div className="bg-white shadow rounded-xl p-4 mt-4">
                            <p className="font-bold">🐾 Professional Care</p>
                            <p className="text-gray-600 mt-2 text-sm">Dogs receive early training, socialization, vaccinations, and nutrition plans.</p>
                        </div>
                    </div>
                    <img src={DogsImg} alt="Dogs" className="rounded-xl shadow-lg" />
                </div>

                {/* Goats  */}
                <div className="grid md:grid-cols-2 gap-10 items-center">
                    <img src={GoatsImg} alt="Goats" className="rounded-xl shadow-lg order-1 md:order-none" />
                    <div>
                        <div className="flex gap-4">
                            <div className="p-4 w-fit rounded-4xl bg-green-200" >
                                <GiSheep size={30} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold ">
                                    Goats & Sheep
                                </h2>
                                <p className="mt-1 font-semibold text-green-400">2 acres</p>
                            </div>

                        </div>
                        <p className="mt-4 text-gray-700">Our herds of specialized goat breeds roam free during the day and are housed in well-ventilated sheds at night, supporting multiple farm functions.</p>
                        <ul className="mt-4 space-y-2 text-gray-700">
                            <li><FaCheckCircle className="inline text-green-600 mr-2" /> Boer goats for meat production</li>
                            <li><FaCheckCircle className="inline text-green-600 mr-2" />  Saanen goats for milk production</li>
                            <li><FaCheckCircle className="inline text-green-600 mr-2" />
                                Sheep grazing for weed control & pasture maintenance</li>
                        </ul>
                        <div className="bg-white shadow rounded-xl p-4 mt-4">
                            <p className="font-bold">♻ Farm Integration</p>
                            <p className="text-gray-600 mt-2 text-sm">Goats & sheep help with composting, natural weed control, and pasture management.</p>
                        </div>
                    </div>
                </div>

                {/* Cattle */}
                <div className="grid md:grid-cols-2 gap-10 items-center">
                    <div>
                        <div className="flex gap-4">
                            <div className="p-4 w-fit rounded-4xl bg-orange-200" >
                                <GiCow size={30} className="text-orange-400" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold ">
                                    Cattle
                                </h2>
                                <p className="mt-1 font-semibold text-orange-400">2.5 acres</p>
                            </div>

                        </div>
                        <p className="mt-4 text-gray-700">Our cattle program supports both dairy and beef production with carefully selected breeds managed in optimal conditions for maximum productivity and animal welfare.</p>
                        <ul className="mt-4 space-y-2 text-gray-700">
                            <li><FaCheckCircle className="inline text-orange-400 mr-2" /> Holstein dairy cows for milk production</li>
                            <li><FaCheckCircle className="inline text-orange-400 mr-2" />Brahman cattle for beef production</li>
                            <li><FaCheckCircle className="inline text-orange-400 mr-2" />Modern facilities - milking shed & feedlot</li>
                        </ul>
                        <div className="bg-white shadow rounded-xl p-4 mt-4">
                            <p className="font-bold">🏭 Professional Operations</p>
                            <p className="text-gray-600 mt-2 text-sm">We use modern farming, veterinary care, and nutrition for high-quality production.</p>
                        </div>
                    </div>
                    <img src={CattleImg} alt="Cattle" className="rounded-xl shadow-lg" />
                </div>
            </div>

            <div className="py-10 flex flex-col items-center">
                <div className="text-center pb-5">
                    <h1 className="text-3xl font-semibold font-poppins pb-5">Farm by the Numbers</h1>
                    <p className="text-base pb-6 text-gray-600">Our integrated approach across 20 acres</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:px-20">

                    <div className=" py-6 px-12 bg-green-100 text-center rounded-2xl">
                        <h1 className="text-3xl text-green-600 pb-1 font-semibold">10</h1>
                        <p className="text-gray-600 text-sm">Acres Crops</p>
                    </div>

                    <div className="py-6 px-12 bg-blue-100 text-center rounded-2xl">
                        <h1 className="text-3xl text-blue-600 pb-1 font-semibold">3</h1>
                        <p className="text-gray-600 text-sm">Acres Fish (6 Ponds)</p>
                    </div>

                    <div className="py-6 px-12 bg-orange-100 text-center rounded-2xl">
                        <h1 className="text-3xl text-orange-600 pb-1 font-semibold">2.5</h1>
                        <p className="text-gray-600 text-sm">Acres Cattle</p>
                    </div>

                    <div className="py-6 px-12 bg-green-100 text-center rounded-2xl">
                        <h1 className="text-3xl text-green-600 pb-1 font-semibold">2</h1>
                        <p className="text-gray-600 text-sm">Acres Goats & Sheep</p>
                    </div>

                    <div className="py-6 px-12 bg-orange-100 text-center rounded-2xl">
                        <h1 className="text-3xl text-orange-600  pb-1 font-semibold">1</h1>
                        <p className="text-gray-600 text-sm">Acre Dog Breeding</p>
                    </div>

                    <div className="py-6 px-12 bg-gray-100 text-center rounded-2xl">
                        <h1 className="text-3xl text-gray-600 pb-1 font-semibold">20</h1>
                        <p className="text-gray-600  text-sm">Total Acres</p>
                    </div>

                    <div className="py-6 px-12 bg-purple-100 text-center rounded-2xl">
                        <h1 className="text-3xl text-purple-600 pb-1 font-semibold">100%</h1>
                        <p className="text-gray-600 text-sm">Sustainable</p>
                    </div>

                    <div className="py-6 px-12 bg-orange-100 text-center flex flex-col items-center gap-3 rounded-2xl">
                        <FaInfinity size={25} className="text-orange-600" />
                        <p className="text-gray-600 text-sm">Self-Sufficient</p>
                    </div>

                </div>
            </div>

            <div className="bg-green-700 py-20">
                <div className="flex flex-col items-center">
                    <h1 className="text-3xl text-white pb-1 text-center font-bold">True System Integration</h1>
                    <p className="text-xl text-center text-white  md:w-[700px]">Every element of our farm works together to create a self-sufficient ecosystem where waste becomes resources and efficiency is maximized.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 md:px-40 px-5 py-10 gap-8">
                    {FarmDatas.map((item) => (
                        <div key={item.id}
                            className="bg-green-600 rounded-xl flex flex-col items-center gap-4 p-8 text-center shadow-md overflow-hidden hover:shadow-lg transition">
                            <div className="text-green-800 mb-3 rounded-full p-4 w-fit bg-white">
                                {item.logo}
                            </div>
                            <h1 className="text-xl text-white font-semibold">{item.title}</h1>
                            <p className="text-white font-poppins text-sm tracking-wide">{item.content}</p>
                        </div>
                    ))}
                </div>
            </div>


            <div className="flex flex-col items-center justify-center gap-5 md:py-20 py-5 ">
                <h1 className="text-3xl font-poppins text-center font-bold">Experience Our Integrated Farm</h1>
                <p className=" font-poppins text-base text-center text-gray-600">Book a guided tour to see our sustainable farming practices and meet our animals up close.</p>
                <div className=" md:flex gap-10 items-center text-center  justify-center">
                    <button onClick={contact} className="bg-green-500 px-6 py-3  cursor-pointer border-2 mt-2 rounded-full text-white font-semibold hover:bg-green-600">
                        Book Farm Tour
                    </button>
                    <button onClick={contact} className="border-2 border-green-600 cursor-pointer md:px-6 px-10 mt-2 py-3  rounded-full text-green-600 font-semibold hover:bg-green-600 hover:text-white">
                        Contact Us
                    </button>
                </div>
            </div>

            

        </section>

    )
}

export default OurFarm;
