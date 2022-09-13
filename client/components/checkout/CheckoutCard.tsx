import usePrice from "@framework/product/use-price";
import { useCart } from "@contexts/cart/cart.context";
import CheckoutItem from "./Item";
import { CheckoutCardFooterItem } from "./Price";

const CheckoutCard: React.FC = () => {
  const { items, total, isEmpty } = useCart();
  const { price: subtotal } = usePrice({
    amount: total,
    currencyCode: "USD",
  });
  const checkoutFooter = [
    {
      id: 1,
      name: "Sub total",
      price: subtotal,
    },
    {
      id: 2,
      name: "Shipping",
      price: "Free",
    },
    {
      id: 3,
      name: "Total",
      price: subtotal,
    },
  ];
  return (
    <div className="pt-12 md:pt-0 2xl:ps-4">
      <h2 className="text-lg md:text-xl xl:text-2xl font-bold text-heading mb-6 xl:mb-8">
        Your Order
      </h2>
      <div className="flex justify-between p-4 rounded-md mt-6 md:mt-7 xl:mt-9 bg-gray-150 text-sm font-semibold text-heading">
        <span>Products</span>
        <span className="flex-shrink-0">Sub total</span>
      </div>
      {!isEmpty ? (
        items.map((item) => <CheckoutItem item={item} key={item.id} />)
      ) : (
        <p className="text-red-500 lg:px-3 py-4">Empty Cart</p>
      )}
      {checkoutFooter.map((item: any) => (
        <CheckoutCardFooterItem item={item} key={item.id} />
      ))}
    </div>
  );
};

export default CheckoutCard;
