import Copyright from "./copyright";

const payment = [
  {
    id: 1,
    path: "/",
    image: "/assets/images/payment/mastercard.svg",
    name: "payment-master-card",
    width: 34,
    height: 20,
  },
  {
    id: 2,
    path: "/",
    image: "/assets/images/payment/visa.svg",
    name: "payment-visa",
    width: 50,
    height: 20,
  },
  {
    id: 3,
    path: "/",
    image: "/assets/images/payment/paypal.svg",
    name: "payment-paypal",
    width: 76,
    height: 20,
  },
];

const Footer: React.FC = () => (
  <footer className="border-b-4 border-heading mt-9 md:mt-11 lg:mt-16 3xl:mt-20 pt-2.5 lg:pt-0 2xl:pt-2">
    <Copyright payment={payment} />
  </footer>
);

export default Footer;
