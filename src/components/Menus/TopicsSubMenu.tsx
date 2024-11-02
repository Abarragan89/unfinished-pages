import Link from "next/link"
import { GiBookshelf } from "react-icons/gi";
import { FaCross } from "react-icons/fa";
import { MdFamilyRestroom } from "react-icons/md";
import { FaSchool } from "react-icons/fa";
import { MdOutlineComputer } from "react-icons/md";
import { RiGovernmentLine } from "react-icons/ri";


export default function TopicsSubMenu() {

    const liStyles = 'text-black flex hover:cursor-pointer hover:text-[var(--brown-100)] mb-4 text-left'

    return (
        <div className="absolute animate-growIn top-[42px] left-[-5px] p-[20px_20px_5px_20px] w-[180px] rounded-b-md border-l custom-avatar-menu-shadow bg-[var(--off-white)]"
        >
            <ul>
                <li className={`${liStyles}`}>
                    <GiBookshelf size={18} className="mr-2" />
                    <Link href='/category/philosophy'>Philosophy</Link>
                </li>
                <li className={`${liStyles}`}>
                    <FaCross size={18} className="mr-2" />
                    <Link href='/category/religion'>Religion</Link>
                </li>
                <li className={`${liStyles}`}>
                    <MdFamilyRestroom size={18} className="mr-2" />
                    <Link href='/category/family'>Family</Link>
                </li>
                <li className={`${liStyles}`}>
                    <FaSchool size={18} className="mr-2" />
                    <Link href='/category/education'>Education</Link>
                </li>
                <li className={`${liStyles}`}>
                    <MdOutlineComputer size={18} className="mr-2" />
                    <Link href='/category/technology'>Technology</Link>
                </li>
                <li className={`${liStyles}`}>
                    <RiGovernmentLine size={18} className="mr-2" />
                    <Link href='/category/government'>Government</Link>
                </li>
            </ul>
        </div>
    )
}
