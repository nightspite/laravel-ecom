import { useForm } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import { FormEventHandler } from "react";
import { ShoppingCart } from "lucide-react";

export default function OrderButton() {
    const { post, processing } = useForm();

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("orders.store"));
    };

    return (
        <form onSubmit={submit}>
            <Button disabled={processing}>
                <ShoppingCart className="mr-2" size={16} />
                Order
            </Button>
        </form>
    );
}
