import { useEffect, FormEventHandler } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        first_name: "",
        last_name: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        country: "",
        education: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("register"));
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <form onSubmit={submit}>
                <div className="flex gap-4">
                    <div className="w-full">
                        <InputLabel htmlFor="first_name" value="First name" />

                        <TextInput
                            id="first_name"
                            name="first_name"
                            value={data.first_name}
                            className="mt-1 block w-full"
                            autoComplete="first_name"
                            isFocused={true}
                            onChange={(e) =>
                                setData("first_name", e.target.value)
                            }
                            required
                        />

                        <InputError
                            message={errors.first_name}
                            className="mt-2"
                        />
                    </div>

                    <div className="w-full">
                        <InputLabel htmlFor="last_name" value="Last name" />

                        <TextInput
                            id="last_name"
                            name="last_name"
                            value={data.last_name}
                            className="mt-1 block w-full"
                            autoComplete="last_name"
                            onChange={(e) =>
                                setData("last_name", e.target.value)
                            }
                            required
                        />

                        <InputError
                            message={errors.last_name}
                            className="mt-2"
                        />
                    </div>
                </div>

                <div className="mt-4 ">
                    <InputLabel htmlFor="address" value="Address" />

                    <TextInput
                        id="address"
                        name="address"
                        value={data.address}
                        className="mt-1 block w-full"
                        autoComplete="address"
                        onChange={(e) => setData("address", e.target.value)}
                        required
                    />

                    <InputError message={errors.address} className="mt-2" />
                </div>

                <div className="flex gap-4 mt-4">
                    <div className="w-full">
                        <InputLabel htmlFor="city" value="City" />

                        <TextInput
                            id="city"
                            name="city"
                            value={data.city}
                            className="mt-1 block w-full"
                            autoComplete="city"
                            onChange={(e) => setData("city", e.target.value)}
                            required
                        />

                        <InputError message={errors.city} className="mt-2" />
                    </div>

                    <div className="w-full">
                        <InputLabel htmlFor="state" value="State" />

                        <TextInput
                            id="state"
                            name="state"
                            value={data.state}
                            className="mt-1 block w-full"
                            autoComplete="state"
                            onChange={(e) => setData("state", e.target.value)}
                            required
                        />

                        <InputError message={errors.state} className="mt-2" />
                    </div>
                </div>

                <div className="flex gap-4 mt-4">
                    <div className="w-full">
                        <InputLabel htmlFor="zip" value="Zip" />

                        <TextInput
                            id="zip"
                            name="zip"
                            value={data.zip}
                            className="mt-1 block w-full"
                            autoComplete="zip"
                            onChange={(e) => setData("zip", e.target.value)}
                            required
                        />

                        <InputError message={errors.zip} className="mt-2" />
                    </div>

                    <div className="w-full">
                        <InputLabel htmlFor="country" value="Country" />

                        <TextInput
                            id="country"
                            name="country"
                            value={data.country}
                            className="mt-1 block w-full"
                            autoComplete="country"
                            onChange={(e) => setData("country", e.target.value)}
                            required
                        />

                        <InputError message={errors.country} className="mt-2" />
                    </div>
                </div>

                {/* 
                education -> select
                interests -> multi-select
                 */}

                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData("email", e.target.value)}
                        required
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData("password", e.target.value)}
                        required
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Confirm Password"
                    />

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) =>
                            setData("password_confirmation", e.target.value)
                        }
                        required
                    />

                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                    />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <Link
                        href={route("login")}
                        className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Already registered?
                    </Link>

                    <PrimaryButton className="ms-4" disabled={processing}>
                        Register
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
