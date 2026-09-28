import React from 'react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { EmptyState } from './EmptyState';

interface ProductGridProps {
  products: Product[];
  layout?: 'grid' | 'list';
  columns?: 3 | 4;
  emptyTitle?: string;
  emptyDescription?: string;
  onResetFilters?: () => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  layout = 'grid',
  columns = 4,
  emptyTitle = 'No products found',
  emptyDescription = 'Try adjusting your search terms, price filters, or category selections.',
  onResetFilters
}) => {
  if (products.length === 0) {
    return (
      <EmptyState
        title={emptyTitle}
        description={emptyDescription}
        actionText={onResetFilters ? 'Clear All Filters' : 'View All Products'}
        onAction={onResetFilters}
      />
    );
  }

  if (layout === 'list') {
    return (
      <div className="flex flex-col gap-4">
        {products.map(product => (
          <ProductCard key={product.id} product={product} layout="list" />
        ))}
      </div>
    );
  }

  const colClasses = columns === 3
    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
    : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4';

  return (
    <div className={`grid ${colClasses} gap-4 sm:gap-6`}>
      {products.map(product => (
        <ProductCard key={product.id} product={product} layout="grid" />
      ))}
    </div>
  );
};
