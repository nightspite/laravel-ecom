import AuthenticatedLayout from "@/Layouts/DefaultLayout";
import { Head, Link } from "@inertiajs/react";
import { Cart, CartProduct, Order, PageProps, Product } from "@/types";
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
import { formatDateTime } from "@/lib/date";
import { Badge } from "@/Components/ui/badge";

const COLUMNS: ColumnDef<Order>[] = [
    {
        header: "Price",
        accessorKey: "price",
        cell: ({ row }) => {
            return (
                <span className="font-medium">
                    {formatMoney(sumOrderTotal(row?.original))}
                </span>
            );
        },
    },
    {
        header: "Status",
        accessorKey: "status",
        cell: ({ row }) => {
            return (
                <span className="font-medium">
                    {row?.original?.completed_at ? (
                        <Badge>Completed</Badge>
                    ) : (
                        <Badge variant="outline">Pending</Badge>
                    )}
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
                    {row?.original?.created_at
                        ? formatDateTime(new Date(row?.original?.created_at))
                        : "-"}
                </span>
            );
        },
    },
    {
        header: "Completed At",
        accessorKey: "completed_at",
        cell: ({ row }) => {
            return (
                <span className="font-medium">
                    {row?.original?.completed_at
                        ? formatDateTime(new Date(row?.original?.completed_at))
                        : "-"}
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
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal size={16} />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <Link href={route("orders.show", row.original?.id)}>
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

export default function Index({
    auth,
    orders,
}: PageProps<{ orders: Order[] }>) {
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center gap-4">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        My orders
                    </h2>
                </div>
            }
        >
            <Head title="My orders" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <DataTable
                            bordered
                            columns={COLUMNS}
                            data={(orders || [])?.slice(
                                pagination.pageIndex * pagination.pageSize,
                                (pagination.pageIndex + 1) * pagination.pageSize
                            )}
                            isLoading={false}
                            onPaginationChange={setPagination}
                            pageCount={Math.ceil(
                                ((orders || [])?.length || 0) /
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
