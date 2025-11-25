import ProductController from '@/actions/App/Http/Controllers/ProductController';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Show Product',
        href: '/products/show',
    },
];

interface Product {
    id: number;
    name: string;
    stock: number;
    price: number;
    description: string;
}
export default function Show({ product }: { product: Product }) {
    const { data, setData, put, processing, errors } = useForm({
        name: product.name,
        stock: product.stock,
        price: product.price,
        description: product.description,
    });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Products | Show" />
            <div className="w-8/12 p-4">
                <Link href={ProductController.index().url}>
                    <Button className="bg-transparent text-white outline-2 outline-offset-2 outline-dotted hover:bg-gray-900">
                        go back
                    </Button>
                </Link>
                <form method="POST" className="space-y-4">
                    <Label htmlFor="name" className="block text-center">
                        Name
                    </Label>
                    <div className="flex flex-col gap-1.5">
                        <Input
                            type="text"
                            id="name"
                            disabled={true}
                            value={data.name}
                            readOnly={true}
                            onChange={(e) => setData('name', e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <Label htmlFor="stock" className="block text-center">
                            Stock
                        </Label>
                        <Input
                            type="number"
                            id="stock"
                            disabled={true}
                            value={data.stock}
                            readOnly={true}
                        />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <Label htmlFor="price" className="block text-center">
                            Price
                        </Label>
                        <Input
                            type="number"
                            id="price"
                            disabled={true}
                            value={data.price}
                            readOnly={true}
                        />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <Label
                            htmlFor="Description"
                            className="block text-center"
                        >
                            Description
                        </Label>
                        <Textarea
                            value={data.description}
                            disabled={true}
                            id="description"
                        />
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
