import { useForm } from "@inertiajs/react";
import { Product } from "@/types";
import { Button } from "@/Components/ui/button";
import { FormEventHandler } from "react";
import { Plus } from "lucide-react";

export default function AddProductToCartButton({
    product,
}: {
    product: Product;
}) {
    const { post, processing } = useForm();

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("cart.add", product.id));
    };

    return (
        <form onSubmit={submit}>
            <Button className="mt-4" disabled={processing}>
                <Plus className="mr-2" size={16} />
                Add to cart
            </Button>
        </form>
    );
}
