import { PropsWithChildren } from "react";

export default function CenterLayout({ children }: PropsWithChildren) {
    return (
        <div className="flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100 min-h-[calc(100vh-66px)]">
            <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
