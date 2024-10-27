import { titleFont } from "@/app/fonts"
import LgBtn from "./Buttons/LgBtn"

export default function Jumbotron() {
    return (
        <section className="relative p-[20px] h-[95vh] bg-[url('/images/homepageHeader.png')] bg-cover flex items-center">
            <div className="sm:ps-[60px] mb-[250px] sm:mb-[150px]">
                <h1 className={`text-7xl ${titleFont.className} custom-title-gradient`}>Unfinished</h1>
                <h1 className={`text-7xl ${titleFont.className} custom-title-gradient`}>Pages</h1>
                <h2 className={`text-[1.13rem] w-[70%] mt-3 text-[var(--brown500)] tracking-wider`}>Short arguments with myself. Leave with more questions than answers.</h2>
                <div className="mt-8 flex justify-between w-[235px]">
                    <LgBtn text="Read Blogs" />
                    <LgBtn text="Login" />
                </div>
            </div>
        </section>
    )
}
