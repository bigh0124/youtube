import items from "../data/items.json";
import { Row, Col } from "react-bootstrap";
import StoreItem from "../components/StoreItem";

const Store = () => {
  return (
    <>
      <Row md={2} xs={1} lg={3} className="g-3">
        {items.map((item) => {
          return (
            <Col key={item.id}>
              <StoreItem {...item} />
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default Store;
