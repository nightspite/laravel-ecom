import { useRef, FormEventHandler } from "react";
import Modal from "@/Components/Modal";
import { useForm } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import { Product } from "@/types";
import { formatMoney } from "@/lib/money";

export default function RemoveProductFromCartModal({
    className = "",
    product,
    quantity,
    open,
    setOpen,
}: {
    className?: string;
    product: Product;
    quantity: number;
    open: boolean;
    setOpen: (open: boolean) => void;
}) {
    const { delete: destroy, processing, reset } = useForm();

    const removeProductFromCart: FormEventHandler = (e) => {
        e.preventDefault();

        destroy(route("cart.remove", product.id), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
        });
    };

    const closeModal = () => {
        setOpen(false);

        reset();
    };

    return (
        <Modal show={open} onClose={closeModal}>
            <form onSubmit={removeProductFromCart} className="p-6">
                <h2 className="text-lg font-medium text-gray-900">
                    Are you sure you want to remove this product from your cart?
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    <b>Name:</b> {product.name}
                </p>
                <p className="mt-1 text-sm text-gray-600">
                    <b>Description:</b> {product.description}
                </p>
                <p className="mt-1 text-sm text-gray-600">
                    <b>Image:</b> {product.image}
                </p>
                <p className="mt-1 text-sm text-gray-600">
                    <b>Price:</b> {formatMoney(product.price)}
                </p>
                <p className="mt-1 text-sm text-gray-600">
                    <b>Quantity:</b> {quantity}
                </p>
                <p className="mt-1 text-sm text-gray-600">
                    <b>Total:</b> {formatMoney(product.price * quantity)}
                </p>

                <div className="mt-6 flex justify-end">
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={closeModal}
                    >
                        Cancel
                    </Button>

                    <Button
                        variant="destructive"
                        className="ms-3"
                        disabled={processing}
                    >
                        Remove Product
                    </Button>
                </div>
            </form>
        </Modal>
    );
}
