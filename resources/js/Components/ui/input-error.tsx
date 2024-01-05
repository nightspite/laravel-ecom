import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

const InputError = ({
    message,
    className,
    ...props
}: HTMLAttributes<HTMLParagraphElement> & { message?: string }) => {
    return message ? (
        <p {...props} className={cn("text-sm text-red-600", className)}>
            {message}
        </p>
    ) : null;
};

InputError.displayName = "InputError";

export { InputError };
