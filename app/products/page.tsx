'use client';

import { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'motion/react';
import { Search, SlidersHorizontal, ChevronDown } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { allProducts } from '@/lib/data';

function ProductsContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [priceRange, setPriceRange] = useState<number>(2000);
  const [sortBy, setSortBy] = useState('featured');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const categories = ['All', 'Sofa', 'Chair', 'Table', 'Bed', 'Dining', 'Decor'];

  const filteredProducts = useMemo(() => {
    return allProducts
      .filter((product) => {
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || product.category.toLowerCase() === selectedCategory.toLowerCase();
        const matchesPrice = product.price <= priceRange;
        return matchesSearch && matchesCategory && matchesPrice;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0; // featured
      });
  }, [searchQuery, selectedCategory, priceRange, sortBy]);

  return (
    <div className="pt-24 pb-16 min-h-screen bg-background">
      {/* Header */}
      <div className="bg-muted/30 py-12 mb-12 border-b border-border">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-heading font-bold mb-4"
          >
            Our Collection
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            Explore our wide range of premium furniture and home decors. Find the perfect pieces to craft your unique story.
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className={`lg:w-1/4 ${isFilterOpen ? 'block' : 'hidden lg:block'}`}>
            <div className="sticky top-28 space-y-8 p-6 bg-card rounded-2xl border border-border shadow-sm">
              <div>
                <h3 className="text-lg font-heading font-semibold mb-4 border-b border-border pb-2">Search</h3>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                  />
                  <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-heading font-semibold mb-4 border-b border-border pb-2">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label key={category} className="flex items-center space-x-3 cursor-pointer group">
                      <input
                        type="radio"
                        name="category"
                        value={category}
                        checked={selectedCategory.toLowerCase() === category.toLowerCase()}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="form-radio text-accent focus:ring-accent h-4 w-4 border-input"
                      />
                      <span className={`text-sm transition-colors ${selectedCategory.toLowerCase() === category.toLowerCase() ? 'text-foreground font-medium' : 'text-muted-foreground group-hover:text-foreground'}`}>
                        {category}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-heading font-semibold mb-4 border-b border-border pb-2">Price Range</h3>
                <div className="space-y-4">
                  <input
                    type="range"
                    min="0"
                    max="2000"
                    step="50"
                    value={priceRange}
                    onChange={(e) => setPriceRange(Number(e.target.value))}
                    className="w-full accent-accent"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>$0</span>
                    <span className="font-medium text-foreground">${priceRange}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4 bg-card p-4 rounded-xl border border-border shadow-sm">
              <button 
                className="lg:hidden flex items-center gap-2 text-sm font-medium text-foreground bg-muted px-4 py-2 rounded-lg w-full sm:w-auto justify-center"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                <SlidersHorizontal size={16} />
                {isFilterOpen ? 'Hide Filters' : 'Show Filters'}
              </button>

              <p className="text-sm text-muted-foreground">
                Showing <span className="font-medium text-foreground">{filteredProducts.length}</span> results
              </p>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <span className="text-sm text-muted-foreground whitespace-nowrap">Sort by:</span>
                <div className="relative w-full sm:w-48">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full appearance-none bg-background border border-input rounded-lg pl-3 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                  <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Product Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-24 bg-card rounded-2xl border border-border">
                <p className="text-lg text-muted-foreground mb-4">No products found matching your criteria.</p>
                <button 
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                    setPriceRange(2000);
                  }}
                  className="text-accent font-medium hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <ProductsContent />
    </Suspense>
  );
}
