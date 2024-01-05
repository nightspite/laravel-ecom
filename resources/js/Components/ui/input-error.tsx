import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

const InputError = ({
    message,
    className,
    ...props
}: HTMLAttributes<HTMLParagraphElement> & { message?: string }) => {
    if (message) {
        <p {...props} className={cn("text-sm text-red-600", className)}>
            {message}
        </p>;
    }

    return null;
};

InputError.displayName = "InputError";

export { InputError };
