import ProductController from '@/actions/App/Http/Controllers/ProductController';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create Product',
        href: ProductController.create().url,
    },
];

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
        stock: '',
        price: '',
    });
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(ProductController.store().url);
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Products | Create" />
            <div className="w-8/12 p-4">
                <form
                    method="POST"
                    className="space-y-4"
                    onSubmit={handleSubmit}
                >
                    <div className="gap-1.5">
                        <Input
                            type="text"
                            placeholder="Product Name"
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
                            type="number"
                            placeholder="Product Stock"
                            min={0}
                            value={data.stock}
                            required={true}
                            onChange={(e) => setData('stock', e.target.value)}
                        />
                        {errors.stock && (
                            <div className="mt-1 flex items-center text-sm text-red-500">
                                {errors.stock}
                            </div>
                        )}
                    </div>
                    <div className="gap-1.5">
                        <Input
                            type="number"
                            placeholder="Product Price"
                            value={data.price}
                            min={0}
                            required={true}
                            onChange={(e) => setData('price', e.target.value)}
                        />
                        {errors.price && (
                            <div className="mt-1 flex items-center text-sm text-red-500">
                                {errors.price}
                            </div>
                        )}
                    </div>
                    <div className="gap-1.5">
                        <Textarea
                            placeholder="Product Description (Optional)"
                            value={data.description}
                            maxLength={1000}
                            onChange={(e) =>
                                setData('description', e.target.value)
                            }
                        />
                        {errors.description && (
                            <div className="mt-1 flex items-center text-sm text-red-500">
                                {errors.description}
                            </div>
                        )}
                    </div>
                    <Button
                        disabled={processing}
                        type="submit"
                        className="bg-green-700 text-white hover:bg-green-900"
                    >
                        Create Product
                    </Button>

                    <Link href={ProductController.index().url}>
                        <Button className="text-whitehover:bg-red-700 mx-2 bg-red-500 hover:bg-red-700">
                            Cancel
                        </Button>
                    </Link>
                </form>
            </div>
        </AppLayout>
    );
}
