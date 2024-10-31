import { IoSearchOutline } from "react-icons/io5";


export default function SearchInput() {
    return (
        <div className="relative">
            <IoSearchOutline className="absolute rounded-l-sm pt-[3px] h-[80%] w-[30px]"/>
            <input type="input" className="custom-dark-input" placeholder="Search Blogs" />
        </div>
    )
}
