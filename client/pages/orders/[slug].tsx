import { Container } from "@components/ui";
import Layout from "@components/layout/layout";
import { OrderInformation } from "@components/order";

export default function Order() {
  return (
    <>
      <Container>
        <OrderInformation />
      </Container>
    </>
  );
}

Order.Layout = Layout;
