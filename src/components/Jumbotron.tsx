import { titleFont } from "@/app/fonts"
import JumboCallToAction from "./JumboCallToAction"

export default function Jumbotron() {
    return (
        <section className="relative h-[100vh] p-[20px] sm:p-0 bg-[url('/images/homepageHeader.png')] bg-cover flex items-center">
            <div className="sm:ps-[60px] mb-[200px] sm:mb-[200px]">
                <h1 className={`${titleFont.className} custom-title-gradient font-medium leading-none text-[5.8rem] sm:text-[6.6rem]`}>Unfinished</h1>
                <h1 className={`${titleFont.className} custom-title-gradient font-medium leading-tight text-[5.5rem] sm:text-[6.5rem]`}>Pages</h1>
                <h2 className={`text-[1.1rem] opacity-[0.9] w-[90%] sm:w-[70%] mt-3 text-[var(--brown-600)] tracking-wider`}>Where beliefs remain drafts, constantly revised by growth and the lives we live. Join the conversation!</h2>
                <JumboCallToAction />
            </div>
        </section>
    )
}
