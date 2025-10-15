import { FaHome,FaTruck  } from "react-icons/fa";
import { GiForkKnifeSpoon } from "react-icons/gi";
import { MdStorefront } from "react-icons/md";


const AgriDatas = [
    {
        id:1,
        icon: <FaHome/>  ,
        header: "150+ Families",
        para:"Local Households",
        content:"Fresh vegetables and fruits delivered directly to families"
    },
    {
         id:2,
        icon: <GiForkKnifeSpoon />  ,
        header: "25+ Partners",
        para:"Restaurants",
        content:"Farm-to-table partnerships with local dining establishments"
    },
    {
         id:3,
        icon: <MdStorefront />,
        header: "40+ Vendors",
        para:"Vendors",
        content:"Wholesale supply to local markets and vendors"
    },
    {
         id:4,
        icon: <FaTruck /> ,
        header: "10+ Farms",
        para:"Feed Chains",
        content:"Animal feed supply to regional livestock operations"
    },
]

export default AgriDatas