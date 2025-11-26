import UserController from '@/actions/App/Http/Controllers/UserController';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Edit Product',
        href: '/User/edit',
    },
];

interface User {
    id: number;
    name: string;
    email: string;
    password: string;
}
export default function Edit({ user }: { user: User }) {
    const { data, setData, put, processing, errors } = useForm({
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
    });
    const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        put(UserController.update(user.id).url);
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Products | Edit" />

            <div className="w-8/12 p-4">
                <form
                    method="POST"
                    className="space-y-4"
                    onSubmit={handleUpdate}
                >
                    <div className="gap-1.5">
                        <Input
                            type="text"
                            placeholder="User Name"
                            maxLength={255}
                            value={data.name}
                            required={true}
                            onChange={(e) => setData('name', e.target.value)}
                        />
                        {errors.name && (
                            <div className="mt-1 flex items-center text-sm text-red-500">
                                {errors.name}
                            </div>
                        )}
                    </div>

                    <div className="gap-1.5">
                        <Input
                            type="text"
                            placeholder="User Email"
                            min={0}
                            value={data.email}
                            required={true}
                            onChange={(e) => setData('email', e.target.value)}
                        />
                        {errors.email && (
                            <div className="mt-1 flex items-center text-sm text-red-500">
                                {errors.email}
                            </div>
                        )}
                    </div>
                    <div className="gap-1.5">
                        <Input
                            type="text"
                            placeholder="Product Price"
                            value={data.password}
                            min={0}
                            required={true}
                            onChange={(e) =>
                                setData('password', e.target.value)
                            }
                        />
                        {errors.password && (
                            <div className="mt-1 flex items-center text-sm text-red-500">
                                {errors.password}
                            </div>
                        )}
                    </div>
                    <Button
                        disabled={processing}
                        type="submit"
                        className="mx-2 bg-red-500 text-white hover:bg-red-700"
                    >
                        Update Product
                    </Button>
                    <Link href={UserController.index().url}>
                        <Button className="bg-green-700 text-white hover:bg-green-900">
                            Cancel
                        </Button>
                    </Link>
                </form>
            </div>
        </AppLayout>
    );
}
