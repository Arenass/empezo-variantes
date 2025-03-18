import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye } from 'lucide-react';
import { Product } from '../../types/product';
import Button from './Button';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();
  
  // Find environment image ("ambiente") or fallback to first image or placeholder
  const getProductImage = () => {
    if (!product.imagenes || product.imagenes.length === 0) {
      return 'https://images.unsplash.com/photo-1544829885-87ac47101088?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80';
    }
    
    // First try to find an "ambiente" type image
    const ambienteImage = product.imagenes.find(img => img.tipo_imagen === 'ambiente');
    if (ambienteImage) {
      return ambienteImage.url_imagen;
    }
    
    // If no ambiente image, use the first available image
    return product.imagenes[0].url_imagen;
  };
  
  const imageUrl = getProductImage();
  
  const handleViewProduct = () => {
    navigate(`/producto/${product.sku}`);
  };
  
  // Get the price to display (precio_venta if available, otherwise precio_tarifa)
  const displayPrice = product.precio_venta || product.precio_tarifa || 0;
  
  return (
    <div className="group relative bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
      <Link to={`/producto/${product.sku}`} className="block">
        <div className="aspect-square overflow-hidden">
          <img 
            src={imageUrl} 
            alt={product.nombre} 
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </Link>
      
      <div className="p-4">
        <Link to={`/producto/${product.sku}`} className="block">
          <h3 className="text-lg font-medium text-gray-900 line-clamp-2 mb-1">{product.nombre}</h3>
          
          {product.marca && (
            <p className="text-sm text-gray-500 mb-2">{product.marca}</p>
          )}
          
          <div className="flex items-baseline mt-2 mb-3">
            <span className="text-xl font-bold text-gray-900">{displayPrice.toFixed(2)}€</span>
          </div>
        </Link>
        
        <div className="mt-2">
          <Button 
            onClick={handleViewProduct} 
            fullWidth
            className="flex items-center justify-center gap-2"
          >
            <Eye size={18} />
            <span>Ver producto</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
