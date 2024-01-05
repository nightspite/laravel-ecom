import { useEffect, FormEventHandler } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import { InputError } from "@/Components/ui/input-error";
import { Button } from "@/Components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { MultiSelect } from "@/Components/ui/multi-select";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm<{
        first_name: string;
        last_name: string;
        address: string;
        city: string;
        state: string;
        zip: string;
        country: string;
        education: string;
        hobbies: string[];
        email: string;
        password: string;
        password_confirmation: string;
    }>({
        first_name: "",
        last_name: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        country: "",
        education: "",
        hobbies: [],
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
                        <Label htmlFor="first_name">First name</Label>

                        <Input
                            type="text"
                            id="first_name"
                            name="first_name"
                            value={data.first_name}
                            className="mt-1 block w-full"
                            autoComplete="first_name"
                            autoFocus
                            onChange={(e) =>
                                setData("first_name", e.target.value)
                            }
                        />

                        <InputError
                            message={errors.first_name}
                            className="mt-2"
                        />
                    </div>

                    <div className="w-full">
                        <Label htmlFor="last_name">Last name</Label>

                        <Input
                            type="text"
                            id="last_name"
                            name="last_name"
                            value={data.last_name}
                            className="mt-1 block w-full"
                            autoComplete="last_name"
                            onChange={(e) =>
                                setData("last_name", e.target.value)
                            }
                        />

                        <InputError
                            message={errors.last_name}
                            className="mt-2"
                        />
                    </div>
                </div>

                <div className="mt-4 ">
                    <Label htmlFor="address">Address</Label>

                    <Input
                        type="text"
                        id="address"
                        name="address"
                        value={data.address}
                        className="mt-1 block w-full"
                        autoComplete="address"
                        onChange={(e) => setData("address", e.target.value)}
                    />

                    <InputError message={errors.address} className="mt-2" />
                </div>

                <div className="flex gap-4 mt-4">
                    <div className="w-full">
                        <Label htmlFor="city">City</Label>

                        <Input
                            type="text"
                            id="city"
                            name="city"
                            value={data.city}
                            className="mt-1 block w-full"
                            autoComplete="city"
                            onChange={(e) => setData("city", e.target.value)}
                        />

                        <InputError message={errors.city} className="mt-2" />
                    </div>

                    <div className="w-full">
                        <Label htmlFor="state">State</Label>

                        <Input
                            type="text"
                            id="state"
                            name="state"
                            value={data.state}
                            className="mt-1 block w-full"
                            autoComplete="state"
                            onChange={(e) => setData("state", e.target.value)}
                        />

                        <InputError message={errors.state} className="mt-2" />
                    </div>
                </div>

                <div className="flex gap-4 mt-4">
                    <div className="w-full">
                        <Label htmlFor="zip">Zip</Label>

                        <Input
                            type="text"
                            id="zip"
                            name="zip"
                            value={data.zip}
                            className="mt-1 block w-full"
                            autoComplete="zip"
                            onChange={(e) => setData("zip", e.target.value)}
                        />

                        <InputError message={errors.zip} className="mt-2" />
                    </div>

                    <div className="w-full">
                        <Label htmlFor="country">Country</Label>

                        <Input
                            type="text"
                            id="country"
                            name="country"
                            value={data.country}
                            className="mt-1 block w-full"
                            autoComplete="country"
                            onChange={(e) => setData("country", e.target.value)}
                        />

                        <InputError message={errors.country} className="mt-2" />
                    </div>
                </div>

                <div className="mt-4">
                    <Label htmlFor="education">Education</Label>

                    <Select
                        name="education"
                        onValueChange={(o) => setData("education", o)}
                        defaultValue={data.education}
                        value={data.education}
                        autoComplete="education"
                    >
                        <SelectTrigger className="w-full" id="education">
                            <SelectValue placeholder="-" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Basic">Basic</SelectItem>
                            <SelectItem value="Secondary">Secondary</SelectItem>
                            <SelectItem value="Higher">Higher</SelectItem>
                        </SelectContent>
                    </Select>

                    <InputError message={errors.country} className="mt-2" />
                </div>

                <div className="mt-4">
                    <Label htmlFor="hobbies">Hobbies</Label>

                    <MultiSelect
                        selected={data.hobbies}
                        options={[
                            "Reading",
                            "Writing",
                            "Coding",
                            "Gaming",
                            "Sports",
                            "Music",
                            "Movies",
                            "Cooking",
                            "Dancing",
                            "Singing",
                            "Traveling",
                            "Photography",
                            "Painting",
                            "Gardening",
                            "Fishing",
                            "Hiking",
                            "Camping",
                            "Shopping",
                            "Sightseeing",
                            "Swimming",
                            "Running",
                            "Cycling",
                            "Yoga",
                            "Meditation",
                            "Volunteering",
                            "Socializing",
                            "Other",
                        ]?.map((hobby) => ({
                            value: hobby,
                            label: hobby,
                        }))}
                        onChange={(e) => setData("hobbies", e)}
                        // className="mt-1 block w-full"
                        // autoComplete="hobbies"
                        //
                    />

                    <InputError message={errors.hobbies} className="mt-2" />
                </div>

                <div className="mt-4">
                    <Label htmlFor="email">Email</Label>

                    <Input
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData("email", e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <Label htmlFor="password">Password</Label>

                    <Input
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData("password", e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <Label htmlFor="password_confirmation">
                        Confirm Password
                    </Label>

                    <Input
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) =>
                            setData("password_confirmation", e.target.value)
                        }
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

                    <Button className="ms-4" disabled={processing}>
                        Register
                    </Button>
                </div>
            </form>
        </GuestLayout>
    );
}
