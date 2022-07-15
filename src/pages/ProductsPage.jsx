import { Grid } from '@mui/material'
import { ProductCard } from '../features/Products/ProductCard'
import { useProducts } from '../features/Products/useProducts'

export const ProductsPage = () => {
  const productsQuery = useProducts()

  if (productsQuery.isLoading) return 'Loading Products...'

  return (
    <Grid p={3} container spacing={2}>
      {productsQuery.data.products.map((product) => (
        <Grid key={product.id} item xs={12} sm={6} md={4} lg={3}>
          <ProductCard
            product={product}
            isFetching={productsQuery.isFetching}
          />
        </Grid>
      ))}
    </Grid>
  )
}
