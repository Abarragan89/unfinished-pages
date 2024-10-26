import { titleFont, bodyFont } from "@/app/fonts"

export default function Jumbotron() {
    return (
        <section className="relative p-[20px] h-[80vh] bg-[url('/images/homepageHeader.png')] bg-cover flex items-center">
            <div className="sm:ps-[60px] mb-[250px] sm:mb-[150px]">
                <h1 className={`text-7xl ${titleFont.className} title-gradient`}>Unfinished</h1>
                <h1 className={`text-7xl ${titleFont.className} title-gradient`}>Pages</h1>
                <h2 className={`text-lg w-[70%] mt-5 ${bodyFont.className} text-[var(--primary-color)] tracking-wider`}>Arguments with myself. Leave with more questions than answers.</h2>
            </div>
        </section>
    )
}
