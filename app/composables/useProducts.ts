export const useProducts = () => {
  const products = useState('products', () => [
    {
      id: 1,
      name: 'Premium Wireless Headphones',
      slug: 'premium-wireless-headphones',
      price: 299.99,
      category: 'electronics',
      brand: 'AudioTech',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
      rating: 4.5,
      stock: 15,
      description: 'High-quality wireless headphones with noise cancellation',
      features: ['Noise Cancellation', 'Bluetooth 5.0', '40-hour battery']
    },
    {
      id: 2,
      name: 'Ergonomic Office Chair',
      slug: 'ergonomic-office-chair',
      price: 449.99,
      category: 'furniture',
      brand: 'ComfortPro',
      image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=500',
      rating: 4.8,
      stock: 8,
      description: 'Premium ergonomic chair for maximum comfort',
      features: ['Adjustable Height', 'Lumbar Support', 'Breathable Mesh']
    },
    {
      id: 3,
      name: 'Smart Watch Pro',
      slug: 'smart-watch-pro',
      price: 399.99,
      category: 'electronics',
      brand: 'TechWear',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
      rating: 4.6,
      stock: 20,
      description: 'Advanced smartwatch with health tracking features',
      features: ['Heart Rate Monitor', 'GPS', 'Waterproof']
    },
    {
      id: 4,
      name: 'Leather Laptop Bag',
      slug: 'leather-laptop-bag',
      price: 129.99,
      category: 'accessories',
      brand: 'StyleCraft',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
      rating: 4.3,
      stock: 12,
      description: 'Premium leather laptop bag with multiple compartments',
      features: ['Genuine Leather', '15-inch Laptop', 'Water Resistant']
    },
    {
      id: 5,
      name: 'Minimalist Desk Lamp',
      slug: 'minimalist-desk-lamp',
      price: 79.99,
      category: 'furniture',
      brand: 'LightDesign',
      image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500',
      rating: 4.4,
      stock: 25,
      description: 'Modern LED desk lamp with adjustable brightness',
      features: ['Touch Control', 'USB Charging', 'Energy Efficient']
    },
    {
      id: 6,
      name: 'Wireless Gaming Mouse',
      slug: 'wireless-gaming-mouse',
      price: 89.99,
      category: 'electronics',
      brand: 'GameGear',
      image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500',
      rating: 4.7,
      stock: 30,
      description: 'High-precision wireless gaming mouse',
      features: ['16000 DPI', 'RGB Lighting', 'Programmable Buttons']
    },
    {
      id: 7,
      name: 'Cotton T-Shirt Set',
      slug: 'cotton-tshirt-set',
      price: 49.99,
      category: 'clothing',
      brand: 'BasicWear',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
      rating: 4.2,
      stock: 50,
      description: 'Pack of 3 premium cotton t-shirts',
      features: ['100% Cotton', 'Machine Washable', 'Multiple Colors']
    },
    {
      id: 8,
      name: 'Stainless Steel Water Bottle',
      slug: 'stainless-steel-water-bottle',
      price: 34.99,
      category: 'accessories',
      brand: 'HydroLife',
      image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500',
      rating: 4.6,
      stock: 40,
      description: 'Insulated water bottle keeps drinks cold for 24 hours',
      features: ['24oz Capacity', 'BPA Free', 'Leak Proof']
    },
    {
      id: 9,
      name: 'Portable Bluetooth Speaker',
      slug: 'portable-bluetooth-speaker',
      price: 79.99,
      category: 'electronics',
      brand: 'SoundWave',
      image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500',
      rating: 4.5,
      stock: 18,
      description: 'Compact speaker with powerful bass',
      features: ['Waterproof', '12-hour Battery', '360° Sound']
    },
    {
      id: 10,
      name: 'Yoga Mat Premium',
      slug: 'yoga-mat-premium',
      price: 59.99,
      category: 'accessories',
      brand: 'FitLife',
      image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500',
      rating: 4.7,
      stock: 22,
      description: 'Extra thick yoga mat with carrying strap',
      features: ['Non-Slip', 'Eco-Friendly', '6mm Thickness']
    },
    {
      id: 11,
      name: 'Coffee Maker Deluxe',
      slug: 'coffee-maker-deluxe',
      price: 159.99,
      category: 'furniture',
      brand: 'BrewMaster',
      image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500',
      rating: 4.4,
      stock: 10,
      description: 'Programmable coffee maker with thermal carafe',
      features: ['12 Cup Capacity', 'Auto Brew', 'Keep Warm']
    },
    {
      id: 12,
      name: 'Running Shoes',
      slug: 'running-shoes',
      price: 119.99,
      category: 'clothing',
      brand: 'SpeedFit',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
      rating: 4.6,
      stock: 35,
      description: 'Lightweight running shoes with cushioned sole',
      features: ['Breathable Mesh', 'Memory Foam', 'Durable Outsole']
    }
  ])

  const categories = useState('categories', () => [
    { value: 'all', label: 'All Products' },
    { value: 'electronics', label: 'Electronics' },
    { value: 'furniture', label: 'Furniture' },
    { value: 'clothing', label: 'Clothing' },
    { value: 'accessories', label: 'Accessories' }
  ])

  return { products, categories }
}