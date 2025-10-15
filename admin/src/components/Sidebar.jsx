import { NavLink } from 'react-router-dom'
import { IoBagAdd, IoSettings  } from "react-icons/io5";
import { MdDashboardCustomize } from "react-icons/md";
import { FaShoppingBag } from "react-icons/fa";
import { SiGoogleanalytics } from "react-icons/si";
import { FaList } from "react-icons/fa";

const SidebarLink = ({ to, icon: Icon, children }) => {
    return (
        <NavLink 
            className={({ isActive }) => 
                `flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l transition-colors duration-200 ${
                    isActive 
                        ? 'bg-green-600 text-white' 
                        : 'hover:bg-gray-100 text-gray-700'
                }`
            }
            to={to}
        >
            {({ isActive }) => (
                <>
                    <Icon 
                        size={22} 
                        className={`cursor-pointer ${
                            isActive ? 'text-white' : 'text-gray-600 hover:text-green-700'
                        }`} 
                    />
                    <p className='hidden md:block'>{children}</p>
                </>
            )}
        </NavLink>
    );
};

const Sidebar = () => {
    return (
        <div className='fixed left-0 top-0 w-[18%] h-full pt-16 grid border-r-2 border-gray-200 bg-white z-10'>

            <div className='flex flex-col gap-4 pt-6 pl-[20%] text-[15px]'>
                <SidebarLink to="/" icon={MdDashboardCustomize}>
                    Dashboard
                </SidebarLink>
                
                <SidebarLink to="/add" icon={IoBagAdd}>
                    Add Items
                </SidebarLink>
                
                <SidebarLink to="/list" icon={FaList}>
                    List Items
                </SidebarLink>
                
                <SidebarLink to="/orders" icon={FaShoppingBag}>
                    Orders
                </SidebarLink>
                
                <SidebarLink to="/analytics" icon={SiGoogleanalytics}>
                    Analytics
                </SidebarLink>
            </div>

            <div className='flex flex-col gap-4 pt-6 pl-[20%] text-[15px]'>
                <SidebarLink to="/settings" icon={IoSettings}>
                    Settings
                </SidebarLink>
            </div>

        </div>
    )
}

export default Sidebar