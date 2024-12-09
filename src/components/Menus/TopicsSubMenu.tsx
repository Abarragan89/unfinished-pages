import Link from "next/link"
import { GiBookshelf } from "react-icons/gi";
import { MdFamilyRestroom } from "react-icons/md";
import { FaSchool } from "react-icons/fa";
import { MdOutlineComputer } from "react-icons/md";
import { GiAirplaneDeparture } from "react-icons/gi";
import { IoFitnessOutline } from "react-icons/io5";
import { IoIosHammer } from "react-icons/io";

import { PiTelevisionLight } from "react-icons/pi";

export default function TopicsSubMenu() {

    const liStyles = 'text-black flex hover:cursor-pointer hover:text-[var(--brown-100)] mb-4 text-left'

    return (
        <div
            className="absolute animate-growIn top-[42px] left-[-5px] p-[20px_20px_5px_20px] w-[220px] rounded-b-md border-l custom-avatar-menu-shadow bg-[var(--off-white)]"
        >
            <ul>
                <li className={`${liStyles}`}>
                    <GiBookshelf size={18} className="mr-2" />
                    <Link href='/category/politics-philosophy'>Politics | Philosphy</Link>
                </li>
                <li className={`${liStyles}`}>
                    <FaSchool size={18} className="mr-2" />
                    <Link href='/category/education-career'>Education | Career</Link>
                </li>
                <li className={`${liStyles}`}>
                    <MdFamilyRestroom size={18} className="mr-2" />
                    <Link href='/category/family-relationships'>Family | Relationships</Link>
                </li>
                <li className={`${liStyles}`}>
                    <MdOutlineComputer size={18} className="mr-2" />
                    <Link href='/category/business-technology'>Business | Technology</Link>
                </li>
                <li className={`${liStyles}`}>
                    <GiAirplaneDeparture size={18} className="mr-2" />
                    <Link href='/category/travel-food'>Travel | Food</Link>
                </li>
                <li className={`${liStyles}`}>
                    <IoFitnessOutline size={18} className="mr-2" />
                    <Link href='/category/health-fitness'>Health | Fitness</Link>
                </li>
                <li className={`${liStyles}`}>
                    <PiTelevisionLight size={19} className="mr-2" />
                    <Link href='/category/entertainment-sports'>Entertainment | Sports</Link>
                </li>
                <li className={`${liStyles}`}>
                    <IoIosHammer size={18} className="mr-2" />
                    <Link href='/category/DIY'>DIY</Link>
                </li>
            </ul>
        </div>
    )
}
