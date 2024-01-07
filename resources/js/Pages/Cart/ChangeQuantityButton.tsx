import { FormEventHandler } from "react";
import { useForm } from "@inertiajs/react";
import { Product } from "@/types";
import { Minus, Plus } from "lucide-react";

export default function ChangeQuantityButton({
    className = "",
    product,
    type,
}: {
    className?: string;
    product: Product;
    type: "increment" | "decrement";
}) {
    const { post, processing, reset } = useForm();

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        if (type === "increment") {
            post(route("cart.addQuantity", product.id), {
                preserveScroll: true,
            });
        } else {
            post(route("cart.removeQuantity", product.id), {
                preserveScroll: true,
            });
        }
    };

    if (type === "increment") {
        return (
            <form onSubmit={submit}>
                <button disabled={processing}>
                    <Plus size={16} />
                </button>
            </form>
        );
    }

    return (
        <form onSubmit={submit}>
            <button disabled={processing}>
                <Minus size={16} />
            </button>
        </form>
    );
}
