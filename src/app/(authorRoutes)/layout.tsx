import React from "react";
import Breadcrumb from "@/components/Breadcrumb";
export default function DashboardLayout({
    children, // The pages inside this layout
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Breadcrumb />
            {children}
        </>
    );
}