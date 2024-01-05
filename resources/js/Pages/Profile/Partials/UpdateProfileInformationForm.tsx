import { InputError } from "@/Components/ui/input-error";
import { Link, useForm, usePage } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import { FormEventHandler } from "react";
import { PageProps } from "@/types";
import { Button } from "@/Components/ui/button";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { MultiSelect } from "@/Components/ui/multi-select";

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = "",
}: {
    mustVerifyEmail: boolean;
    status?: string;
    className?: string;
}) {
    const user = usePage<PageProps>().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm<{
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
        }>({
            first_name: user.first_name || "",
            last_name: user.last_name || "",
            address: user.address || "",
            city: user.city || "",
            state: user.state || "",
            zip: user.zip || "",
            country: user.country || "",
            education: user.education || "",
            hobbies: user.hobbies || [],
            email: user.email,
        });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route("profile.update"));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Profile Information
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Update your account's profile information and email address.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
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
                            required
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
                            autoFocus
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

                <div>
                    <Label htmlFor="email">Email</Label>

                    <Input
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        required
                        autoComplete="username"
                    />

                    <InputError className="mt-2" message={errors.email} />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="text-sm mt-2 text-gray-800">
                            Your email address is unverified.
                            <Link
                                href={route("verification.send")}
                                method="post"
                                as="button"
                                className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === "verification-link-sent" && (
                            <div className="mt-2 font-medium text-sm text-green-600">
                                A new verification link has been sent to your
                                email address.
                            </div>
                        )}
                    </div>
                )}

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
                    <Label htmlFor="education">Hobbies</Label>

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

                <div className="flex items-center gap-4">
                    <Button disabled={processing}>Save</Button>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Saved.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
