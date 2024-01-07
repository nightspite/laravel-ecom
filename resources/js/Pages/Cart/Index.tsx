import AuthenticatedLayout from "@/Layouts/DefaultLayout";
import { Head, Link } from "@inertiajs/react";
import { Cart, CartProduct, PageProps, Product } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/Components/ui/button";
import { Eraser, Eye, Minus, MoreHorizontal, Plus, Trash } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { DataTable } from "@/Components/ui/data-table";
import { useMemo, useState } from "react";
import { formatMoney, sumCartTotal } from "@/lib/money";
import RemoveProductFromCartModal from "./RemoveProductFromCartModal";
import ClearCartModal from "./ClearCartModal";
import ChangeQuantityButton from "./ChangeQuantityButton";
import SendEmailCartButton from "./SendEmailCartButton";

const COLUMNS: ColumnDef<CartProduct>[] = [
    {
        header: "Image",
        accessorKey: "image",
        cell: ({ row }) => {
            return (
                <span className="font-medium">
                    {row?.original?.product?.image ? (
                        <img
                            src={row?.original?.product?.image}
                            alt=""
                            className="w-10 h-10 rounded-sm object-cover"
                        />
                    ) : (
                        "-"
                    )}
                </span>
            );
        },
    },
    {
        header: "Name",
        accessorKey: "name",
        cell: ({ row }) => {
            return (
                <span className="font-medium">
                    {row?.original?.product?.name || "-"}
                </span>
            );
        },
    },
    {
        header: "Description",
        accessorKey: "description",
        cell: ({ row }) => {
            return (
                <span className="font-medium truncate">
                    {row?.original?.product?.description || "-"}
                </span>
            );
        },
    },
    {
        header: "Price",
        accessorKey: "price",
        cell: ({ row }) => {
            return (
                <span className="font-medium">
                    {formatMoney(row?.original?.product?.price)}
                </span>
            );
        },
    },
    {
        header: "Quantity",
        accessorKey: "quantity",
        cell: ({ row }) => {
            return (
                <div className="font-medium flex items-center gap-4">
                    <ChangeQuantityButton
                        product={row.original.product}
                        type="decrement"
                    />
                    {row?.original?.quantity}
                    <ChangeQuantityButton
                        product={row.original.product}
                        type="increment"
                    />
                </div>
            );
        },
    },
    {
        header: "",
        accessorKey: "actions",
        cell: ({ row }) => {
            return <ActionsCell row={row} />;
        },
    },
];

export default function Index({ auth, cart }: PageProps<{ cart: Cart }>) {
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });

    const summaryCost = useMemo(() => sumCartTotal(cart), [cart]);

    const [isClearCartModalOpen, setIsClearCartModalOpen] = useState(false);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Cart
                    </h2>
                    <Button
                        variant="outline"
                        className="ml-4"
                        onClick={() => setIsClearCartModalOpen(true)}
                    >
                        <Eraser className="mr-2" size={16} />
                        Clear Cart
                    </Button>
                    <ClearCartModal
                        open={isClearCartModalOpen}
                        setOpen={setIsClearCartModalOpen}
                    />
                </div>
            }
        >
            <Head title="Cart" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <h2 className="mb-4 flex items-center gap-4">
                            <b>Summary cost:</b> {formatMoney(summaryCost || 0)}
                            <SendEmailCartButton cart={cart} />
                        </h2>

                        <DataTable
                            bordered
                            columns={COLUMNS}
                            data={(cart?.cart_product || [])?.slice(
                                pagination.pageIndex * pagination.pageSize,
                                (pagination.pageIndex + 1) * pagination.pageSize
                            )}
                            isLoading={false}
                            onPaginationChange={setPagination}
                            pageCount={Math.ceil(
                                ((cart?.cart_product || [])?.length || 0) /
                                    pagination.pageSize
                            )}
                            pagination={{
                                pageIndex: pagination.pageIndex,
                                pageSize: pagination.pageSize,
                            }}
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

const ActionsCell = ({ row }: { row: { original: CartProduct } }) => {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    return (
        <>
            <div className="flex justify-end">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button size="icon" variant="ghost">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal size={16} />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <Link
                            href={route(
                                "products.show",
                                row.original.product?.id
                            )}
                        >
                            <DropdownMenuItem>
                                <Eye className="mr-2" size={16} />
                                View
                            </DropdownMenuItem>
                        </Link>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            onClick={() => setIsDeleteModalOpen(true)}
                        >
                            <Trash className="mr-2" size={16} />
                            Remove
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <RemoveProductFromCartModal
                open={isDeleteModalOpen}
                setOpen={setIsDeleteModalOpen}
                product={row.original.product}
                quantity={row.original.quantity}
            />
        </>
    );
};
