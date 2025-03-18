import React from 'react';
import { AlertTriangle, Lightbulb } from 'lucide-react';
import { Product } from '../../types/product';
import Button from '../ui/Button';
import ProductVarianteSimpleFotos from './ProductVarianteSimpleFotos';
import ProductVariantesDobleSelect from './ProductVariantesDobleSelect';

interface ProductInfoProps {
  product: Product;
  brotherProducts?: Product[];
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product, brotherProducts }) => {
  // Get the price to display (precio_venta if available, otherwise precio_tarifa)
  const displayPrice = product.precio_venta || product.precio_tarifa || 0;
  
  // Check if product is out of stock
  const isOutOfStock = product.stock_texto?.toLowerCase().includes('agotado');
  
  // Determine which variant component to show based on the number of brother products
  const renderVariantComponent = () => {
    if (!brotherProducts || brotherProducts.length <= 1) {
      return null; // Don't show anything if there's only one product or no brother products
    }
    
    if (brotherProducts.length >= 2 && brotherProducts.length <= 6) {
      return <ProductVarianteSimpleFotos currentProduct={product} brotherProducts={brotherProducts} />;
    }
    
    if (brotherProducts.length > 6) {
      return <ProductVariantesDobleSelect currentProduct={product} brotherProducts={brotherProducts} />;
    }
    
    return null;
  };
  
  return (
    <div>
      {/* Brand */}
      {product.marca && (
        <p className="text-gray-500 mb-2">{product.marca}</p>
      )}
      
      {/* Product Name */}
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{product.nombre}</h1>
      
      {/* Price */}
      <div className="flex items-baseline mb-6">
        <span className="text-3xl font-bold text-gray-900">{displayPrice.toFixed(2)}€</span>
      </div>
      
      {/* Short Description */}
      {product.descripcion_corta && (
        <div className="mb-6">
          <p className="text-gray-700">{product.descripcion_corta}</p>
        </div>
      )}

      {/* Product Variants Component */}
      {renderVariantComponent()}
      
      {/* Stock Status */}
      <div className="mb-3">
        <p className="text-sm font-medium">
          Disponibilidad: 
          <span className={`ml-2 ${isOutOfStock ? 'text-red-600' : product.stock_texto?.includes('En stock') ? 'text-green-600' : 'text-amber-600'}`}>
            {product.stock_texto || 'Consultar disponibilidad'}
          </span>
        </p>
      </div>
      
      {/* EAN and SKU Numbers */}
      <div className="mb-3">
        <p className="text-sm font-medium flex flex-wrap items-center">
          {product.ean && (
            <>
              <span>EAN: <span className="ml-1 text-gray-700">{product.ean}</span></span>
              <span className="mx-2 text-gray-300">|</span>
            </>
          )}
          <span>SKU: <span className="ml-1 text-gray-700">{product.sku}</span></span>
        </p>
      </div>
      
      {/* Tipo Variante - Moved below EAN/SKU */}
      {product.tipo_variante && (
        <div className="mb-6">
          <p className="text-sm font-medium">
            Tipo Variante: 
            <span className="ml-2 text-gray-700">{product.tipo_variante}</span>
          </p>
        </div>
      )}
      
      {/* Buttons */}
      <div className="grid grid-cols-1 gap-3 mb-8">
        {/* Report Issue Button */}
        <Button 
          variant="outline"
          size="lg"
          fullWidth
          className="flex items-center justify-center gap-2"
        >
          <AlertTriangle size={20} />
          <span>Notificar incidencia producto</span>
        </Button>
        
        {/* Find Inspiration Button */}
        <Button 
          variant="secondary"
          size="lg"
          fullWidth
          className="flex items-center justify-center gap-2"
        >
          <Lightbulb size={20} />
          <span>Buscar inspiración</span>
        </Button>
      </div>
    </div>
  );
};

export default ProductInfo;
