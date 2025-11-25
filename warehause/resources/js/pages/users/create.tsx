import UserController from '@/actions/App/Http/Controllers/UserController';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create User',
        href: UserController.create().url,
    },
];

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
    });
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(UserController.store().url);
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users | Create" />
            <div className="w-8/12 p-4">
                <form
                    method="POST"
                    className="space-y-4"
                    onSubmit={handleSubmit}
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
                            type="Email"
                            placeholder="User Email"
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
                            type="Password"
                            placeholder="User Password"
                            value={data.password}
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
                        className="bg-green-700 text-white hover:bg-green-900"
                    >
                        Create User
                    </Button>

                    <Link href={UserController.index().url}>
                        <Button className="text-whitehover:bg-red-700 mx-2 bg-red-500 hover:bg-red-700">
                            Cancel
                        </Button>
                    </Link>
                </form>
            </div>
        </AppLayout>
    );
}
