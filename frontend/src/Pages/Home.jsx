
import HomeImg from "../assets/home.jpg"
import HomeDatas from "../Datas/HomeDatas.jsx";

// Icons
import { GiFarmer, GiGoat, GiGreenhouse } from "react-icons/gi";
import { TbPlant } from "react-icons/tb";
import { IoFishOutline } from "react-icons/io5";
import { IoIosArrowRoundForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";


const Home = () => {

  const navigate = useNavigate();

  const goToFarm = () => {
  navigate("/farm"); 
};

const contactUs = () => {
  navigate("/contact"); 

};

  return (

    <section>
      <div className=" w-full min-h-screen bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${HomeImg})` }}>


        {/* Text content */}
        <div className="relative z-10 text-center text-white px-6">
          <h1 className="text-4xl md:text-5xl font-primary font-bold flex flex-col justify-center gap-3 items-center text-center">
            Welcome to
            <span className="text-green-400 md:text-6xl text-4xl flex items-center text-center font-primary justify-center gap-2 flex-wrap">
              Logi Integrated
              <span className="flex items-center gap-2">
                Farm
                <GiFarmer className="text-white text-3xl md:text-[50px]" />
              </span>
            </span>
          </h1>
          <p className="m-4 text-lg">
            Sustainable. Smart. Integrated.
          </p>
          <p className=" text-xl md:w-[650px]">Experience modern farming at its finest with our 20-acre integrated agriculture and animal breeding facility featuring crops, livestock, and sustainable practices.</p>
          <div className="mt-6 flex flex-col gap-4 justify-center md:flex-row">
            <button onClick={goToFarm} className="bg-green-500 px-6 py-3 cursor-pointer rounded-full text-white font-semibold hover:bg-green-600">
              Explore Our Farm
            </button>
            <button className="border border-white cursor-pointer px-6 py-3 rounded-full text-white font-semibold hover:bg-white hover:text-green-700">
              Book a Tour
            </button>
          </div>
        </div>
      </div>

      <div className="p-10">
        <div className="flex flex-col items-center">
          <h1 className="md:pt-10 text-4xl font-bold font-poppins">What We Do</h1>
          <p className="m-10 text-center text-base w-full md:w-3xl text-gray-600 font-primary">Loki Integrated Farm combines traditional farming wisdom with modern sustainable practices across 20 acres of carefully managed land.</p>
        </div>

        <div className="flex justify-center md:p-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 text-center max-w-6xl w-full">
            <div className="flex flex-col justify-center items-center">
              <div className="text-green-600 mb-3 rounded-full p-4 w-fit bg-green-200">
                <TbPlant size={30} />
              </div>
              <h1>Crop Cultivation</h1>
              <p>Maize, napier grass, soybean, and fresh vegetables grown using sustainable farming methods.</p>
            </div>

            <div className="flex flex-col justify-center items-center">
              <div className="text-blue-600 mb-3 rounded-full p-4 w-fit bg-blue-200">
                <IoFishOutline size={30} />
              </div>
              <h1>Fish Breeding</h1>
              <p>Premium tilapia and catfish raised in our carefully maintained pond systems.</p>
            </div>

            <div className="flex flex-col justify-center items-center">
              <div className="text-orange-600 mb-3 rounded-full p-4 w-fit bg-orange-100">
                <GiGoat size={30} />
              </div>
              <h1>Animal Breeding</h1>
              <p>Quality livestock including cattle, horses, goats, sheep, and premium dog breeds.</p>
            </div>

            <div className="flex flex-col justify-center items-center">
              <div className="text-green-600 mb-3 rounded-full p-4 w-fit bg-green-200">
                <GiGreenhouse size={30} />
              </div>
              <h1>Modern Farmhouse</h1>
              <p>4,000 sq. ft residence featuring modern amenities and farm office facilities.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center p-20 bg-green-50">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 font-extra gap-10 text-center max-w-6xl w-full">
          <div>
            <h1 className="text-4xl font-bold text-green-700">20</h1>
            <p className="text-xl text-gray-600">Acres</p>
          </div>

          <div>
            <h1 className="text-4xl font-bold text-green-700">8</h1>
            <p className="text-xl text-gray-600">Farm Sections</p>
          </div>

          <div>
            <h1 className="text-4xl font-bold text-green-700">4000</h1>
            <p className="text-xl text-gray-600">Sq. Ft Farmhouse</p>
          </div>

          <div>
            <h1 className="text-4xl font-bold text-green-700"> 100%</h1>
            <p className="text-xl text-gray-600">Sustainable</p>
          </div>
        </div>
      </div>
      <div className="p-10 bg-white">
        <div className="flex flex-col items-center mb-10">
          <h1 className="text-4xl font-bold text-center font-poppins">Our Specialties</h1>
          <p className="mt-4 text-center text-base w-full md:w-3xl text-gray-600 font-primary">
            From livestock to premium breeding, discover our farm’s specialties.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
          {HomeDatas.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-60 object-cover"
              />
              <div className="p-6 text-left">
                <h2 className="text-2xl font-semibold font-primary">{item.title}</h2>
                <p className="text-gray-600 mt-2 text-sm font-poppins">{item.description}</p>
                <a
                  href={item.link}
                  className="text-green-600 flex font-semibold mt-3 hover:underline"
                >
                  Learn More <IoIosArrowRoundForward size={25}/>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>



      <div className=" flex flex-col bg-green-600 justify-center md:p-16 p-5 items-center text-center">
        <h1 className=" text-3xl md:text-5xl text-white  font-primary font-bold m-4 ">
          Ready to Visit Our Farm?
        </h1>
        <p className=" text-xl md:w-[650px] text-white">Experience sustainable farming firsthand with a guided tour of our facilities and meet our animals.</p>
        <div className="mt-6 md:flex gap-10  justify-center">
          <button onClick={contactUs} className="bg-white px-6 py-3 cursor-pointer  border-2 mt-2 rounded-full text-green-500 font-semibold hover:bg-green-600">
            Book Farm Tour
          </button>
          <button onClick={contactUs} className="border border-white cursor-pointer md:px-6 px-10 mt-2 py-3  rounded-full text-white font-semibold hover:bg-white hover:text-green-700">
            Contact Us
          </button>
        </div>
      </div>

    </section>
    
  )
}

export default Home
