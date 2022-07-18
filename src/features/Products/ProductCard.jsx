import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from '@mui/material'
import PropTypes from 'prop-types'
import { Link as RouterLink } from 'react-router-dom'
import { routes } from '../../App'

function ProductCard({ product, isFetching }) {
  return (
    <Card>
      <CardMedia height="140" component="img" image={product.image} />
      <CardContent>
        <Typography variant="h5" component="h2" minHeight={65}>
          {product.name}
        </Typography>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography>
            Цена: {product.price} руб. {isFetching && ' ...'}
          </Typography>
          <Button
            color="primary"
            to={routes.basket.path}
            component={RouterLink}
          >
            В корзину
          </Button>
        </Stack>
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
