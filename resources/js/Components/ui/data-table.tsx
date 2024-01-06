"use client";

import type {
    ColumnDef,
    OnChangeFn,
    PaginationState,
    TableOptions,
} from "@tanstack/react-table";
import {
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table";
import {
    ChevronsLeft,
    ChevronLeft,
    ChevronRight,
    ChevronsRight,
} from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { Button } from "@/Components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { cn } from "@/lib/utils";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    pageCount?: number;
    pagination?: PaginationState;
    onPaginationChange?: OnChangeFn<PaginationState>;
    isLoading?: boolean;
    bordered?: boolean;
}

export function DataTable<TData, TValue>({
    columns,
    data,
    pageCount,
    pagination,
    onPaginationChange,
    isLoading,
    bordered,
}: DataTableProps<TData, TValue>) {
    const config: Partial<TableOptions<TData>> = onPaginationChange
        ? {
              pageCount,
              state: {
                  pagination,
              },
              onPaginationChange,
              manualPagination: true,
          }
        : {
              getPaginationRowModel: getPaginationRowModel(),
          };

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        ...config,
    });

    return (
        <div>
            <div className={cn(bordered && "rounded-md border")}>
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext()
                                                  )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    data-state={
                                        row.getIsSelected() && "selected"
                                    }
                                    key={row.id}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : isLoading ? (
                            <TableRow>
                                <TableCell
                                    className="h-24 text-center"
                                    colSpan={columns.length}
                                >
                                    Loading...
                                </TableCell>
                            </TableRow>
                        ) : (
                            <TableRow>
                                <TableCell
                                    className="h-24 text-center"
                                    colSpan={columns.length}
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            {/* <div className='flex items-center justify-end space-x-2 py-4'>
        <Button
          variant='outline'
          size='sm'
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant='outline'
          size='sm'
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div> */}
            <div className="flex items-center justify-between px-2 mt-4">
                {/* <div className='flex-1 text-sm text-muted-foreground'>
          {table.getFilteredSelectedRowModel().rows.length} of{' '}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div> */}
                <div className="flex items-center justify-between w-full space-x-6 lg:space-x-8">
                    <div className="flex items-center space-x-2">
                        <p className="text-sm font-medium">Rows per page</p>
                        <Select
                            onValueChange={(value) => {
                                table.setPageSize(Number(value));
                            }}
                            value={`${table.getState().pagination.pageSize}`}
                        >
                            <SelectTrigger className="h-8 w-[70px]">
                                <SelectValue
                                    placeholder={
                                        table.getState().pagination.pageSize
                                    }
                                />
                            </SelectTrigger>
                            <SelectContent side="top">
                                {[10, 20, 30, 40, 50].map((pageSize) => (
                                    <SelectItem
                                        key={pageSize}
                                        value={`${pageSize}`}
                                    >
                                        {pageSize}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                        Page {table.getState().pagination.pageIndex + 1} of{" "}
                        {table.getPageCount() || 1}
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button
                            className="hidden h-8 w-8 p-0 lg:flex"
                            disabled={!table.getCanPreviousPage()}
                            onClick={() => {
                                table.setPageIndex(0);
                            }}
                            variant="outline"
                        >
                            <span className="sr-only">Go to first page</span>
                            <ChevronsLeft className="h-4 w-4" />
                        </Button>
                        <Button
                            className="h-8 w-8 p-0"
                            disabled={!table.getCanPreviousPage()}
                            onClick={() => {
                                table.previousPage();
                            }}
                            variant="outline"
                        >
                            <span className="sr-only">Go to previous page</span>
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button
                            className="h-8 w-8 p-0"
                            disabled={!table.getCanNextPage()}
                            onClick={() => {
                                table.nextPage();
                            }}
                            variant="outline"
                        >
                            <span className="sr-only">Go to next page</span>
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                        <Button
                            className="hidden h-8 w-8 p-0 lg:flex"
                            disabled={!table.getCanNextPage()}
                            onClick={() => {
                                table.setPageIndex(table.getPageCount() - 1);
                            }}
                            variant="outline"
                        >
                            <span className="sr-only">Go to last page</span>
                            <ChevronsRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
