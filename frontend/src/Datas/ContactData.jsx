import { IoLocation } from "react-icons/io5";
import { FaWhatsapp } from "react-icons/fa";
import { CgMail } from "react-icons/cg";
import { IoCall } from "react-icons/io5";

export const contactDatas = [
  {
    title: "Address",
    description: "Nanjai Uthukuli",
    icon: <IoLocation  size={40} className="text-red-600  p-2 rounded-full bg-red-200" />
  },
  {
    title: "Email",
    description: "info@lokiintegratedfarm.com",
    icon: <CgMail size={40} className="text-blue-600  p-2 rounded-full bg-blue-200" />
  },
  {
    title: "Phone",
    description: "7904074107",
    icon: <IoCall size={40} className="text-green-600  p-2 rounded-full bg-green-200" />
  },
  {
    title: "WhatsApp",
    description: "7904074107",
    icon: <FaWhatsapp size={40} className="text-orange-600  p-2 rounded-full bg-orange-2  00" />
  }
];