import AuthenticatedLayout from "@/Layouts/DefaultLayout";
import { Head, Link } from "@inertiajs/react";
import {
    Cart,
    CartProduct,
    Order,
    OrderProduct,
    PageProps,
    Product,
} from "@/types";
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
import { formatMoney, sumCartTotal, sumOrderTotal } from "@/lib/money";
import PayButton from "@/Pages/Orders/PayButton";
import { formatDateTime } from "@/lib/date";
import { Badge } from "@/Components/ui/badge";

const COLUMNS: ColumnDef<OrderProduct>[] = [
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
                    {row?.original?.quantity}
                </div>
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
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            );
        },
    },
];

export default function Index({ auth, order }: PageProps<{ order: Order }>) {
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });

    const summaryCost = useMemo(() => sumOrderTotal(order), [order]);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center gap-4">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Order
                    </h2>
                    {!order?.completed_at ? <PayButton order={order} /> : null}
                </div>
            }
        >
            <Head title="Order" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <h2 className="">
                            <b>Status:</b>{" "}
                            {order?.completed_at ? (
                                <Badge>Completed</Badge>
                            ) : (
                                <Badge variant="outline">Pending</Badge>
                            )}
                        </h2>
                        <h2 className="">
                            <b>Created At:</b>{" "}
                            {order?.created_at
                                ? formatDateTime(new Date(order?.created_at))
                                : "-"}
                        </h2>
                        <h2 className="">
                            <b>Completed At:</b>{" "}
                            {order?.completed_at
                                ? formatDateTime(new Date(order?.completed_at))
                                : "-"}
                        </h2>
                        <h2 className="mb-4">
                            <b>Summary cost:</b> {formatMoney(summaryCost || 0)}
                        </h2>

                        <DataTable
                            bordered
                            columns={COLUMNS}
                            data={(order?.order_product || [])?.slice(
                                pagination.pageIndex * pagination.pageSize,
                                (pagination.pageIndex + 1) * pagination.pageSize
                            )}
                            isLoading={false}
                            onPaginationChange={setPagination}
                            pageCount={Math.ceil(
                                ((order?.order_product || [])?.length || 0) /
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
