import Link from "next/link"
import { GiBookshelf } from "react-icons/gi";
import { MdFamilyRestroom } from "react-icons/md";
import { FaSchool } from "react-icons/fa";
import { MdOutlineComputer } from "react-icons/md";
import { GiAirplaneDeparture } from "react-icons/gi";
import { IoFitnessOutline } from "react-icons/io5";
import { IoIosHammer } from "react-icons/io";
import { PiBookOpenText } from "react-icons/pi";
import { PiTelevisionLight } from "react-icons/pi";
import { TbAlignBoxLeftTopFilled } from "react-icons/tb";
import { TbSquareLetterO } from "react-icons/tb";



export default function TopicsSubMenu() {

    const liStyles = 'text-[var(--off-black)] flex hover:cursor-pointer hover:text-[var(--brown-300)] mb-4 text-left'

    return (
        <div
            className="absolute animate-growIn top-[41px] left-[-5px] p-[20px_20px_5px_20px] w-[220px] rounded-b-md border border-[var(--gray-500)] border-t-0 custom-avatar-menu-shadow bg-[var(--off-white)]"
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
                    <PiBookOpenText size={18} className="mr-2" />
                    <Link href='/category/short-stories'>Short Stories</Link>
                </li>
                <li className={`${liStyles}`}>
                    <IoIosHammer size={18} className="mr-2" />
                    <Link href='/category/diy'>DIY</Link>
                </li>
                <li className={`${liStyles}`}>
                    <TbSquareLetterO size={18} className="mr-2" />
                    <Link href='/category/other'>Other</Link>
                </li>
            </ul>
        </div>
    )
}
