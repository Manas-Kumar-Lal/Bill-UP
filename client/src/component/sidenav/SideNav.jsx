import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const SideNav = () => {
    const tab = useSelector(state => state.pageSwitcher.tab);

    const navitem = [
        { name: "Home", tab: "home", route: "/" },
        { name: "Item List", tab: "itemlist", route: "/itemlist" },
        { name: "Create Bill", tab: "createbill", route: "/createbill" },
        { name: "History", tab: "history", route: "/history" },
    ]

    return (
        <div className="w-full h-full bg-gray-800 text-white flex flex-col items-start p-4">
            {navitem.map((item, index) => (
                <Link key={index} to={item.route} className="w-full">
                    <div
                        className={`cursor-pointer flex items-center py-3 px-4 text-lg font-semibold rounded-lg 
                        transition-all duration-300 ease-in-out 
                        ${tab === item.tab ? 'bg-[tomato] text-white shadow-lg' : 'hover:bg-gray-700 hover:text-white'} `}
                    >
                        {item.name}
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default SideNav
