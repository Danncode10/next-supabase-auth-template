"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Alert } from "./alert";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function NotificationHandler() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    useEffect(() => {
        const errorParam = searchParams.get("error");
        const messageParam = searchParams.get("message");

        if (errorParam) setError(decodeURIComponent(errorParam));
        else setError(null);

        if (messageParam) setMessage(decodeURIComponent(messageParam));
        else setMessage(null);
    }, [searchParams]);

    const clearParams = () => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete("error");
        params.delete("message");
        router.replace(`?${params.toString()}`);
    };

    return (
        <div className="mb-6 space-y-2">
            <AnimatePresence mode="wait">
                {error && (
                    <Alert
                        key="error"
                        type="error"
                        message={error}
                        onClose={() => {
                            setError(null);
                            clearParams();
                        }}
                    />
                )}
                {message && (
                    <Alert
                        key="message"
                        type="success"
                        message={message}
                        onClose={() => {
                            setMessage(null);
                            clearParams();
                        }}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
