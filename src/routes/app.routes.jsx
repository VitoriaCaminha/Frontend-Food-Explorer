import { Routes, Route, Navigate } from 'react-router-dom';

import { Home } from '../pages/Home';
import { Menu } from '../pages/Menu';
import { ProductInfo } from '../pages/ProductInfo';
import { EditProduct } from '../pages/EditProduct';
import { CreateProduct } from '../pages/CreateProduct';
import { useAuth } from '../hooks/auth';

export const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/product-info/:id" element={<ProductInfo />} />

      {user.isAdmin && (
        <>
          <Route path="/create" element={<CreateProduct />} />
          <Route path="/edit/:id" element={<EditProduct />} />
        </>
      )}

      {/* Redirecionar usuários não autenticados para a página inicial */}
      <Route
        path="/"
        element={<Navigate to={user ? "/menu" : "/"} replace />}
      />
    </Routes>
  );
};
