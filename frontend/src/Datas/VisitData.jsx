// Logo
import { TbPlant } from "react-icons/tb";
import { GiHorseHead } from "react-icons/gi";
import { LuLeaf } from "react-icons/lu";
import { FaUserGraduate, FaSeedling, FaCamera, FaHeart, FaLightbulb, FaHandsHelping } from "react-icons/fa";

// images
import Activity1 from "../assets/Activity1.jpg";
import Activity2 from "../assets/Activity2.jpg";
import Activity3 from "../assets/Activity3.jpg";
import Activity4 from "../assets/Activity4.jpg";
import { GiForkKnifeSpoon } from "react-icons/gi";


const VisitDatas = [
    {
        id:1,
        image: Activity1   ,
        logo: <TbPlant size={25}/>   ,
        title:"Tour Facilities ",
        content: "Explore our crops, modern barns, aquaculture ponds, and 4,000 sq ft farmhouse."       
    },
    {
        id:2,
        image: Activity2   ,
        logo: <GiHorseHead size={25}/>  ,
        title:"Meet Our Animals ",
        content: "Interact with our cattle, goats, sheep, dogs, horses, and observe our fish farming."       
    },
    {
        id:3,
        image: Activity3  ,
        logo: <LuLeaf size={25}/>,
        title:"Learn Sustainable Practices ",
        content: "Discover our composting, crop rotation, water management, and integrated farming methods."       
    },
    {
        id:4,
        image: Activity4   ,
        logo: <GiForkKnifeSpoon size={25}/>  ,
        title:"Taste Fresh Produce ",
        content: "Sample our fresh vegetables, dairy products, and other farm-to-table delicacies."       
    }
]

export default VisitDatas


export const steps = [
  "Call or WhatsApp us",
  "Choose your visit date",
  "Confirm your booking"
];



export const audience = [
  {
    title: "Students",
    description: "Educational tours for schools and universities studying agriculture, biology, and environmental science.",
    icon: <FaUserGraduate size={40} className="text-blue-500  p-1.5 rounded-full bg-blue-300" />
  },
  {
    title: "Investors",
    description: "Business professionals interested in sustainable agriculture and integrated farming investments.",
    icon: <FaSeedling size={40} className="text-green-500  p-1.5 rounded-full bg-green-300" />
  },
  {
    title: "Tourists",
    description: "Visitors seeking authentic farm experiences and connection with nature and rural life.",
    icon: <FaCamera size={40} className="text-purple-500  p-2 rounded-full bg-purple-300" />
  },
  {
    title: "Enthusiasts",
    description: "Agriculture enthusiasts, hobbyist farmers, and those passionate about sustainable living.",
    icon: <FaHeart size={40} className="text-orange-600  p-1.5 rounded-full bg-orange-300" />
  }
];

export const benefits = [
  {
    title: "Educational Experience",
    description: "Learn cutting-edge sustainable farming techniques and integrated agriculture systems.",
    icon: <FaLightbulb size={30} className="text-white" />
  },
  {
    title: "Connect with Nature",
    description: "Experience the harmony between modern farming technology and natural processes.",
    icon: <FaSeedling size={30} className="text-white" />
  },
  {
    title: "Support Local Agriculture",
    description: "Be part of the sustainable agriculture movement and support local farming communities.",
    icon: <FaHandsHelping size={30} className="text-white" />
  }
];
