import { Container } from "@components/ui";
import Layout from "@components/layout/layout";
import { OrderDetails } from "@components/order";

export default function Order() {
  return (
    <>
      <Container>
        {Array.prototype.fill(4).map(() => (
          <OrderDetails />
        ))}
      </Container>
    </>
  );
}

Order.Layout = Layout;
