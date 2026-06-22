import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center  text-white px-4">
            <Image
                src="/404.svg"
                alt="Page Not Found"
                width={650}
                height={450}
                priority
                className="max-w-full h-auto"
            />
            <p className="text-gray-500 text-center max-w-lg mt-3">
                The page you're looking for isn't available right now. Let's get you back to finding your perfect temporary stay.
            </p>

            <Link
                href="/"
                className="mt-8 inline-flex items-center gap-2 bg-violet-400 hover:bg-violet-500 text-white px-6 py-3 rounded-xl font-medium transition"
            >
                <ArrowLeft size={18} />
                Back to Home
            </Link>
        </main>
    );
}