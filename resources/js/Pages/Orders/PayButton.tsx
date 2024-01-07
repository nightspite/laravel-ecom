import { useForm } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import { FormEventHandler } from "react";
import { HeartHandshake } from "lucide-react";
import { Order } from "@/types";

export default function PayButton({ order }: { order: Order }) {
    const { post, processing } = useForm();

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("orders.pay", order.id));
    };

    return (
        <form onSubmit={submit}>
            <Button disabled={processing}>
                <HeartHandshake className="mr-2" size={16} />
                Pay
            </Button>
        </form>
    );
}
