import { Container } from "@components/ui";
import Layout from "@components/layout/layout";
import { CheckoutForm, CheckoutCard } from "@components/checkout";

export default function CheckoutPage() {
  return (
    <>
      <Container>
        <div className="py-14 xl:py-20 px-0 2xl:max-w-screen-2xl xl:max-w-screen-xl mx-auto flex flex-col md:flex-row justify-center w-full">
          <div className="md:w-full lg:w-2/5 flex h-full flex-col">
            <CheckoutCard />
          </div>
          <div className="md:w-full lg:w-2/5 md:mx-7 lg:mx-10 xl:mx-14 flex flex-col h-full">
            <CheckoutForm />
          </div>
        </div>
      </Container>
    </>
  );
}

CheckoutPage.Layout = Layout;
