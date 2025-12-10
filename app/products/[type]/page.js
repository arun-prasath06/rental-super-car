import { promises as fs } from 'fs';
import path from 'path';
import Navbar from '../../components/Navbar';
import AddToCartButton from '../../components/AddToCartButton';

// Function to get data
async function getProducts() {
    const filePath = path.join(process.cwd(), 'data', 'products.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    return JSON.parse(fileContents);
}

export default async function ProductList({ params }) {
    const { type } = await params;
    const allProducts = await getProducts();

    // Filter by type (car, bike, part, kit)
    const products = allProducts.filter(p => p.type === type);

    // Title mapping
    const titles = {
        car: 'Super Cars',
        bike: 'Super Bikes',
        part: 'Spare Parts',
        kit: 'Modification Kits'
    };

    return (
        <main>
            <Navbar />
            <div className="container" style={{ padding: '2rem 0' }}>
                <h1 style={{ textTransform: 'capitalize' }}>{titles[type] || 'Collection'}</h1>

                <div className="grid">
                    {products.map(product => (
                        <div key={product.id} className="card">
                            <div style={{
                                height: '250px',
                                background: `url(${product.image}) center/cover`
                            }}></div>
                            <div style={{ padding: '1.5rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                    <span style={{ fontSize: '0.8rem', color: '#888', textTransform: 'uppercase' }}>{product.category}</span>
                                </div>
                                <h3>{product.name}</h3>
                                <p style={{ color: '#aaa', fontSize: '0.9rem', marginBottom: '1rem', height: '3em', overflow: 'hidden' }}>{product.description}</p>

                                {/* Specs Box */}
                                {product.specs && (
                                    <div suppressHydrationWarning style={{
                                        background: '#0a0a0a',
                                        border: '1px solid #333',
                                        padding: '1rem',
                                        marginBottom: '1rem',
                                        borderRadius: '4px'
                                    }}>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.85rem' }}>
                                            <div><span style={{ color: '#666' }}>Model Year:</span> <span style={{ color: '#fff' }}>{product.specs.modelYear}</span></div>
                                            <div><span style={{ color: '#666' }}>HP:</span> <span style={{ color: '#dc143c', fontWeight: 'bold' }}>{product.specs.hp}</span></div>
                                            <div><span style={{ color: '#666' }}>Torque:</span> <span style={{ color: '#fff' }}>{product.specs.torque}</span></div>
                                            <div><span style={{ color: '#666' }}>Fuel:</span> <span style={{ color: '#fff' }}>{product.specs.fuelType}</span></div>
                                            <div><span style={{ color: '#666' }}>Engine:</span> <span style={{ color: '#fff' }}>{product.specs.engineType}</span></div>
                                            <div><span style={{ color: '#666' }}>Mileage:</span> <span style={{ color: '#fff' }}>{product.specs.mileage}</span></div>
                                            <div><span style={{ color: '#666' }}>Top Speed:</span> <span style={{ color: '#fff' }}>{product.specs.topSpeed}</span></div>
                                            <div><span style={{ color: '#666' }}>0-100:</span> <span style={{ color: '#dc143c', fontWeight: 'bold' }}>{product.specs.acceleration}s</span></div>
                                        </div>
                                    </div>
                                )}


                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem', borderTop: '1px solid #333', paddingTop: '1rem' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        <span style={{ fontSize: '0.8rem', color: '#888' }}>Price</span>
                                        <span className="text-gold" style={{ fontSize: '1.4rem', fontWeight: 'bold' }}>
                                            ₹{product.price} / per hour
                                        </span>
                                    </div>
                                    {/* Client Component for Interactivity */}
                                    <AddToCartButton product={product} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {products.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '4rem', color: '#666' }}>
                        <h2>No items found in this collection.</h2>
                    </div>
                )}
            </div>
        </main>
    );
}
