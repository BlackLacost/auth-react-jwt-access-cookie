import { Card, CardContent, CardMedia, Typography } from '@mui/material'
import PropTypes from 'prop-types'

function ProductCard({ product, isFetching }) {
  return (
    <Card>
      <CardMedia height="140" component="img" image={product.image} />
      <CardContent>
        <Typography variant="h5" component="h2" minHeight={65}>
          {product.name}
        </Typography>
        <Typography>
          Цена: {product.price} руб. {isFetching && ' ...'}
        </Typography>
      </CardContent>
    </Card>
  )
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  isFetching: PropTypes.bool.isRequired,
}

export { ProductCard }
