"use client"
import { useSearchParams } from "next/navigation";
import ModalWrapper from "./ModalWrapper";
import LoginForm from "../FormInputs/LoginForm";


export const LoginModal = () => {
    const params = useSearchParams();
    const showModal = params.get('showModal')

    return (
        <>
            {showModal === 'login' &&
                <ModalWrapper
                    title='Join the Conversation'
                >
                    <LoginForm />
                </ModalWrapper>
            }
        </>
    )
}

export default LoginModal;
