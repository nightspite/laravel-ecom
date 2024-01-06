import AuthenticatedLayout from "@/Layouts/DefaultLayout";
import { Head, Link } from "@inertiajs/react";
import { PageProps, Product } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/Components/ui/button";
import { Eye, MoreHorizontal, Pencil, Plus, Trash } from "lucide-react";
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
import { formatMoney } from "@/lib/money";
import DeleteProductForm from "./DeleteProductModal";
import { formatDateTime } from "@/lib/date";

const COLUMNS = ({
    isDeleteModalOpen,
    setIsDeleteModalOpen,
}: {
    isDeleteModalOpen: boolean;
    setIsDeleteModalOpen: (open: boolean) => void;
}): ColumnDef<Product>[] => [
    {
        header: "Image",
        accessorKey: "image",
        cell: ({ row }) => {
            return (
                <span className="font-medium">
                    {row?.original?.image ? (
                        <img
                            src={row?.original?.image}
                            alt=""
                            className="w-8 h-8 rounded-full object-cover"
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
                    {row?.original?.name || "-"}
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
                    {row?.original?.description || "-"}
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
                    {formatMoney(row?.original?.price)}
                </span>
            );
        },
    },
    {
        header: "Created At",
        accessorKey: "created_at",
        cell: ({ row }) => {
            return (
                <span className="font-medium">
                    {formatDateTime(new Date(row?.original?.created_at))}
                </span>
            );
        },
    },
    {
        header: "Updated At",
        accessorKey: "updated_at",
        cell: ({ row }) => {
            return (
                <span className="font-medium">
                    {formatDateTime(new Date(row?.original?.updated_at))}
                </span>
            );
        },
    },
    {
        header: "",
        accessorKey: "actions",
        cell: ({ row }) => {
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
                                        row.original.id
                                    )}
                                >
                                    <DropdownMenuItem>
                                        <Eye className="mr-2" size={16} />
                                        View
                                    </DropdownMenuItem>
                                </Link>
                                <Link
                                    href={route(
                                        "admin_products.edit",
                                        row.original.id
                                    )}
                                >
                                    <DropdownMenuItem>
                                        <Pencil className="mr-2" size={16} />
                                        Edit
                                    </DropdownMenuItem>
                                </Link>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    onClick={() => setIsDeleteModalOpen(true)}
                                >
                                    <Trash className="mr-2" size={16} />
                                    Delete
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <DeleteProductForm
                        open={isDeleteModalOpen}
                        setOpen={setIsDeleteModalOpen}
                        product={row.original}
                    />
                </>
            );
        },
    },
];

export default function Index({
    auth,
    products,
}: PageProps<{ products: Product[] }>) {
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const columns = useMemo(
        () => COLUMNS({ isDeleteModalOpen, setIsDeleteModalOpen }),
        [isDeleteModalOpen, setIsDeleteModalOpen]
    );

    console.log(products);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Products
                    <Link href={route("admin_products.create")}>
                        <Button variant="outline" className="ml-4">
                            <Plus className="mr-2" size={16} />
                            Create new
                        </Button>
                    </Link>
                </h2>
            }
        >
            <Head title="Products" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <DataTable
                            bordered
                            columns={columns}
                            data={products?.slice(
                                pagination.pageIndex * pagination.pageSize,
                                (pagination.pageIndex + 1) * pagination.pageSize
                            )}
                            isLoading={false}
                            onPaginationChange={setPagination}
                            pageCount={Math.ceil(
                                (products?.length || 0) / pagination.pageSize
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
