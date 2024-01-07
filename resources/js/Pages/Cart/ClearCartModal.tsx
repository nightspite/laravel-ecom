import { FormEventHandler } from "react";
import Modal from "@/Components/Modal";
import { useForm } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";

export default function ClearCartModal({
    className = "",
    open,
    setOpen,
}: {
    className?: string;
    open: boolean;
    setOpen: (open: boolean) => void;
}) {
    const { delete: destroy, processing, reset } = useForm();

    const clearCart: FormEventHandler = (e) => {
        e.preventDefault();

        destroy(route("cart.clear"), {
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
            <form onSubmit={clearCart} className="p-6">
                <h2 className="text-lg font-medium text-gray-900">
                    Are you sure you want to remove all items from the cart?
                </h2>

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
                        Remove All Products
                    </Button>
                </div>
            </form>
        </Modal>
    );
}
