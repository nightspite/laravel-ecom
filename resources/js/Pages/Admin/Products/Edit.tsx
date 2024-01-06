import AuthenticatedLayout from "@/Layouts/DefaultLayout";
import { Head, useForm } from "@inertiajs/react";
import { PageProps, Product } from "@/types";
import { Button } from "@/Components/ui/button";
import { FormEventHandler } from "react";
import { Transition } from "@headlessui/react";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import { InputError } from "@/Components/ui/input-error";

export default function Edit({
    auth,
    product,
}: PageProps<{ product: Product }>) {
    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm<{
            name: string;
            description: string;
            image: string;
            price: number;
        }>({
            name: product.name,
            description: product.description,
            image: product.image,
            price: product.price,
        });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route("admin_products.update", product.id));
    };

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
                        <form onSubmit={submit} className="space-y-6">
                            <div>
                                <Label htmlFor="name">Name</Label>

                                <Input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={data.name}
                                    className="mt-1 block w-full"
                                    autoComplete="name"
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                />

                                <InputError
                                    message={errors.name}
                                    className="mt-2"
                                />
                            </div>

                            <div className="">
                                <Label htmlFor="description">Description</Label>

                                <Input
                                    type="text"
                                    id="description"
                                    name="description"
                                    value={data.description}
                                    className="mt-1 block w-full"
                                    autoComplete="description"
                                    onChange={(e) =>
                                        setData("description", e.target.value)
                                    }
                                />

                                <InputError
                                    message={errors.description}
                                    className="mt-2"
                                />
                            </div>

                            <div className="">
                                <Label htmlFor="image">
                                    Image URL(temporary)
                                </Label>

                                <div className="flex items-center gap-4">
                                    <Input
                                        type="url"
                                        id="image"
                                        name="image"
                                        value={data.image}
                                        className="mt-1 block w-full"
                                        autoComplete="image"
                                        onChange={(e) =>
                                            setData("image", e.target.value)
                                        }
                                    />

                                    {data.image ? (
                                        <img
                                            src={data.image}
                                            alt=""
                                            className="w-10 h-10 rounded-sm object-cover"
                                        />
                                    ) : null}
                                </div>

                                <InputError
                                    message={errors.image}
                                    className="mt-2"
                                />
                            </div>

                            <div className="">
                                <Label htmlFor="price">Price</Label>

                                <Input
                                    type="number"
                                    step={0.01}
                                    id="price"
                                    name="price"
                                    value={data.price}
                                    className="mt-1 block w-full"
                                    autoComplete="price"
                                    onChange={(e) => {
                                        setData(
                                            "price",
                                            parseFloat(e.target.value)
                                        );
                                    }}
                                />

                                <InputError
                                    message={errors.price}
                                    className="mt-2"
                                />
                            </div>

                            <div className="flex items-center gap-4">
                                <Button disabled={processing}>Save</Button>

                                <Transition
                                    show={recentlySuccessful}
                                    enter="transition ease-in-out"
                                    enterFrom="opacity-0"
                                    leave="transition ease-in-out"
                                    leaveTo="opacity-0"
                                >
                                    <p className="text-sm text-gray-600">
                                        Saved.
                                    </p>
                                </Transition>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
