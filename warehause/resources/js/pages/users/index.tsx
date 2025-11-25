import UserController from '@/actions/App/Http/Controllers/UserController';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { FaEye } from 'react-icons/fa6';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Users',
        href: UserController.index().url,
    },
];

interface Users {
    id: number;
    name: string;
    email: string;
}

export default function Index({ users }: { users: Users[] }) {
    const { processing, delete: destroy } = useForm();
    const handleDelete = (id: number) => {
        if (confirm('seguro que deseas eliminar este usuario')) {
            destroy(UserController.destroy(id).url);
        }
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users | List" />

            <div className="m-4">
                <Link href={UserController.create().url}>
                    <Button className="mb-4 bg-green-700 text-white hover:bg-green-900">
                        Create User
                    </Button>
                </Link>
                {users.length > 0 && (
                    <Table>
                        <TableCaption>List a Users</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">
                                    View User
                                </TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead className="text-right">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.map((users) => (
                                <TableRow key={users.id}>
                                    <TableHead className="w-[100px]">
                                        <Link
                                            href={
                                                UserController.show(users.id)
                                                    .url
                                            }
                                        >
                                            <Button className="mx-2 bg-orange-500 hover:bg-orange-700">
                                                <FaEye />
                                            </Button>
                                        </Link>
                                    </TableHead>
                                    <TableCell>{users.name}</TableCell>
                                    <TableCell className="">
                                        {users.email}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Link
                                            href={
                                                UserController.edit(users.id)
                                                    .url
                                            }
                                        >
                                            <Button className="bg-orange-400 hover:bg-orange-600">
                                                Edit
                                            </Button>
                                        </Link>
                                        <Button
                                            className="mx-2 bg-red-500 hover:bg-red-700"
                                            disabled={processing}
                                            onClick={() =>
                                                handleDelete(users.id)
                                            }
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </div>
        </AppLayout>
    );
}
