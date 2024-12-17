'use client';
import axios from 'axios';
import ConfirmWithText from '@/components/Modals/ConfirmWithText';
import { useState } from 'react';
import { signOut } from 'next-auth/react';

export default function DeleteUserAccount() {

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleConfirm = async () => {
        setIsLoading(true)
        try {
            // this will delete all the database on cascade
            const { data } = await axios.delete(`/api/userRoutes`);
            // sign out user
            if(data.message === 'success') {
                signOut({
                    callbackUrl: '/'
                })
            }

        } catch (error) {
            console.error('Error deleting account:', error);
        } finally {
            setIsLoading(false)
        }
    };

    return (
        <ConfirmWithText
            urlParamTrigger="deleteAccount"
            confirmText="Delete Account and All Data"
            isLoading={isLoading}
            modalTitle="Delete Account"
            onConfirmHandler={handleConfirm}
            btnColor='bg-[var(--danger)]'
            btnText='Delete Account'
            errorMsg=''
        />
    );
}