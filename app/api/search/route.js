import { NextResponse } from 'next/server';
import products from '@/data/products.json';

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const query = searchParams.get('q')?.toLowerCase() || '';

        if (!query || query.length < 2) {
            return NextResponse.json([]);
        }

        // Search across all product types
        const results = products
            .filter(item => {
                const searchableText = `${item.name} ${item.category} ${item.subcategory || ''} ${item.description || ''}`.toLowerCase();
                return searchableText.includes(query);
            })
            .slice(0, 8) // Limit to 8 suggestions
            .map(item => ({
                id: item.id,
                name: item.name,
                type: item.type,
                category: item.category,
                price: item.price,
                image: item.image
            }));

        return NextResponse.json(results);
    } catch (error) {
        console.error('Search error:', error);
        return NextResponse.json({ error: 'Search failed' }, { status: 500 });
    }
}
