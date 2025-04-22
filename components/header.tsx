"use client";

import {useRouter} from "next/navigation";

export default function Header() {
    const router = useRouter();

    return (
        <header className="bg-black text-white p-4">
            <h1
                className="text-l font-bold cursor-pointer inline"
                onClick={ () => router.push("/")}
            >
                <span className="text-3xl mr-2">HMCTS</span>
                Tasks Manager
            </h1>
        </header>
    );
}
