import AuthenticatedLayout from "@/Layouts/DefaultLayout";
import { Head, Link } from "@inertiajs/react";
import { PageProps, Product } from "@/types";
import { formatMoney } from "@/lib/money";

export default function Edit({
    auth,
    products,
}: PageProps<{ products: Product[] }>) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Products
                </h2>
            }
        >
            <Head title="Products" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <div className="grid grid-cols-3 gap-8">
                            {products?.map((product) => (
                                <Link
                                    href={route("products.show", product.id)}
                                    key={product.id}
                                >
                                    <img
                                        src={product?.image}
                                        alt=""
                                        className="w-full aspect-square rounded-sm object-cover"
                                    />
                                    <h2 className="font-semibold text-xl mt-2">
                                        {product.name}
                                    </h2>
                                    <p className="text-gray-600 line-clamp-2">
                                        {product.description}
                                    </p>

                                    <div className="mt-4">
                                        <span className="text-gray-600">
                                            {formatMoney(product.price)}
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
