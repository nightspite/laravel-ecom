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

export default function Edit({
    auth,
    products,
}: PageProps<{ products: Product[] }>) {
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });

    const COLUMNS: ColumnDef<Product>[] = useMemo(
        () => [
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
                header: "",
                accessorKey: "actions",
                cell: ({ row }) => {
                    return (
                        <div className="flex justify-end">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button size="icon" variant="ghost">
                                        <span className="sr-only">
                                            Open menu
                                        </span>
                                        <MoreHorizontal size={16} />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>
                                        Actions
                                    </DropdownMenuLabel>
                                    <Link
                                        href={route(
                                            "products.show",
                                            row.original.id
                                        )}
                                    >
                                        <DropdownMenuItem onClick={() => {}}>
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
                                        <DropdownMenuItem onClick={() => {}}>
                                            <Pencil
                                                className="mr-2"
                                                size={16}
                                            />
                                            Edit
                                        </DropdownMenuItem>
                                    </Link>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={() => {}}>
                                        <Trash className="mr-2" size={16} />
                                        Delete
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    );
                },
            },
        ],
        [products]
    );

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
                            columns={COLUMNS}
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
