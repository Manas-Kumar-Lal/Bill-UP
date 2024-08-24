import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';


const SideNav = () => {

    const tab = useSelector(state => state.pageSwitcher.tab);

    const navitem = [
        { name: "Home", tab: "home", route: "/" },
        { name: "Item List", tab: "itemlist", route: "/itemlist" },
        { name: "Create BIll", tab: "createbill", route: "/createbill" },
        { name: "History", tab: "history", route: "/history" },
    ]
    return (
        <div>
            {navitem.map((item, index) => (
                <Link className='' to={`${item.route}`}>
                    <div
                        className={`cursor-pointer flex justify-center items-center py-3 text-lg h-full font-bold ${tab === item.tab ? 'text-[tomato]' : ''}`}
                    >
                        {item.name}
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default SideNav
