import AuthenticatedLayout from "@/Layouts/DefaultLayout";
import { Head } from "@inertiajs/react";
import { PageProps, Product } from "@/types";
import { Button } from "@/Components/ui/button";
import { Plus } from "lucide-react";

export default function Show({
    auth,
    product,
}: PageProps<{ product: Product }>) {
    console.log(product);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Edit product
                </h2>
            }
        >
            <Head title="Edit product" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <></>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
