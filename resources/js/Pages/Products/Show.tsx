import AuthenticatedLayout from "@/Layouts/DefaultLayout";
import { Head } from "@inertiajs/react";
import { PageProps, Product } from "@/types";
import { Button } from "@/Components/ui/button";
import { Plus } from "lucide-react";
import { formatMoney } from "@/lib/money";

export default function Show({
    auth,
    product,
}: PageProps<{ product: Product }>) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    {product.name}
                </h2>
            }
        >
            <Head title={product.name} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <img
                            src={product?.image}
                            alt=""
                            className="w-96 aspect-square rounded-sm object-cover"
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

                        <Button className="mt-4">
                            <Plus className="mr-2" size={16} />
                            Add to cart
                        </Button>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
