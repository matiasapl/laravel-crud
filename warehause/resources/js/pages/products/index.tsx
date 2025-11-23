import ProductController from '@/actions/App/Http/Controllers/ProductController';
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
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Products',
        href: ProductController.index().url,
    },
];

interface Product {
    id: number;
    name: string;
    description: string;
    stock: number;
    price: number;
}

export default function Index({ products }: { products: Product[] }) {
    const { processing, delete: destroy } = useForm();
    const handleDelete = (id: number) => {
        if (confirm('seguro que deseas eliminar este producto')) {
            destroy(ProductController.destroy(id).url);
        }
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Products | List" />

            <div className="m-4">
                <Link href={ProductController.create().url}>
                    <Button className="mb-4">Create Product</Button>
                </Link>
                {products.length > 0 && (
                    <Table>
                        <TableCaption>Lista de Productos</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">ID</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead className="text-right">
                                    Stock
                                </TableHead>
                                <TableHead className="text-right">
                                    Price
                                </TableHead>
                                <TableHead className="text-right">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {products.map((product) => (
                                <TableRow key={product.id}>
                                    <TableCell className="font-medium">
                                        {product.id}
                                    </TableCell>
                                    <TableCell>{product.name}</TableCell>
                                    <TableCell>{product.description}</TableCell>
                                    <TableCell className="text-right">
                                        {product.stock}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {product.price}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Link
                                            href={
                                                ProductController.edit(
                                                    product.id,
                                                ).url
                                            }
                                        >
                                            <Button className="bg-slate-500 hover:bg-slate-700">
                                                Edit
                                            </Button>
                                        </Link>
                                        <Button
                                            className="mx-2 bg-red-500 hover:bg-red-700"
                                            disabled={processing}
                                            onClick={() =>
                                                handleDelete(product.id)
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
