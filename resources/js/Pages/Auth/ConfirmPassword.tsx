import { useEffect, FormEventHandler } from "react";
import DefaultLayout from "@/Layouts/DefaultLayout";
import { InputError } from "@/Components/ui/input-error";
import { Head, useForm } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import CenterLayout from "@/Layouts/CenterLayout";

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: "",
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("password.confirm"));
    };

    return (
        <DefaultLayout>
            <CenterLayout>
                <Head title="Confirm Password" />

                <div className="mb-4 text-sm text-gray-600">
                    This is a secure area of the application. Please confirm
                    your password before continuing.
                </div>

                <form onSubmit={submit}>
                    <div className="mt-4">
                        <Label htmlFor="password">Password</Label>

                        <Input
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full"
                            autoFocus
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                        />

                        <InputError
                            message={errors.password}
                            className="mt-2"
                        />
                    </div>

                    <div className="flex items-center justify-end mt-4">
                        <Button className="ms-4" disabled={processing}>
                            Confirm
                        </Button>
                    </div>
                </form>
            </CenterLayout>
        </DefaultLayout>
    );
}
