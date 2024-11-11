import ModalWrapper from "./ModalWrapper";
import LoginForm from "../FormInputs/LoginForm";

export const LoginModal = () => {

    return (
        <ModalWrapper
            title='Join the Conversation'
            urlParam='login'
        >
            <LoginForm />
        </ModalWrapper>
    )
}

export default LoginModal;
