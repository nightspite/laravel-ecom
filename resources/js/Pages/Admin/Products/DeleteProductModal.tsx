import { useRef, FormEventHandler } from "react";
import Modal from "@/Components/Modal";
import { useForm } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import { Product } from "@/types";
import { formatMoney } from "@/lib/money";

export default function DeleteProductForm({
    className = "",
    product,
    open,
    setOpen,
}: {
    className?: string;
    product: Product;
    open: boolean;
    setOpen: (open: boolean) => void;
}) {
    const { delete: destroy, processing, reset } = useForm();

    const deleteUser: FormEventHandler = (e) => {
        e.preventDefault();

        destroy(route("admin_products.destroy", product.id), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
        });
    };

    const closeModal = () => {
        setOpen(false);

        reset();
    };

    return (
        <Modal show={open} onClose={closeModal} closeable={false}>
            <form onSubmit={deleteUser} className="p-6">
                <h2 className="text-lg font-medium text-gray-900">
                    Are you sure you want to delete this product?
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

                <div className="mt-6 flex justify-end">
                    <Button variant="secondary" onClick={closeModal}>
                        Cancel
                    </Button>

                    <Button
                        variant="destructive"
                        className="ms-3"
                        disabled={processing}
                    >
                        Delete Product
                    </Button>
                </div>
            </form>
        </Modal>
    );
}
