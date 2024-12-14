import Link from "next/link"
import ModalWrapper from "./ModalWrapper"
import { BlogData } from "../../../types/blog"

interface Props {
    blogsUsingImage: BlogData[]
}

export default function CannotDeleteModal({ blogsUsingImage }: Props) {
    return (
        <ModalWrapper
            title="Image In Use"
            urlParam="cannotDeleteImage"
        >
            <>
                <p className="text-center text-[.975rem] mb-3 text-[var(--brown-500)] tracking-wide">Remove image from the following blog(s):</p>
                {blogsUsingImage.map((blog: BlogData) => (
                    <Link
                        key={blog.id}
                        href={`/editBlog/${blog.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-md text-center block mt-2 mb-5 text-[var(--brown-300)] hover tracking-wider hover:cursor-pointer text-[var(--paper-color)] bg-[var(--brown-500)] custom-low-lifted-shadow transition-transform duration-100 hover:scale-105 active:scale-100"
                    >
                        {blog.title}
                    </Link>
                ))}
            </>
        </ModalWrapper>

    )
}


