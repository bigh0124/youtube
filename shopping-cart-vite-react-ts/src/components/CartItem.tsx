import { Button, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import data from "../data/items.json";
import { formatCurrency } from "../utils/formatCurrency";

type CartItemProps = {
  id: number;
  quantity: number;
};

const CartItem = ({ id, quantity }: CartItemProps) => {
  const { removeFromCart } = useShoppingCart();
  const item = data.find((item) => item.id === id);
  if (!item) return null;
  return (
    <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
      <img src={item.imgUrl} style={{ width: "125px", height: "75px", objectFit: "cover" }} />
      <div className="me-auto">
        <div>
          {item.name}
          {quantity > 1 ? (
            <span style={{ fontSize: ".65rem", marginLeft: "1rem" }} className="text-muted">
              x{quantity}
            </span>
          ) : null}
        </div>
        <div className="text-muted" style={{ fontSize: ".75rem" }}>
          {formatCurrency(item.price)}
        </div>
      </div>
      <div>${(item.price * quantity).toFixed(2)}</div>
      <Button onClick={() => removeFromCart(item.id)} size="sm" variant="outline-danger">
        &times;
      </Button>
    </Stack>
  );
};

export default CartItem;
