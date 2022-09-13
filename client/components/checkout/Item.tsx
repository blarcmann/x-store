import { Item } from "@contexts/cart/cart.utils";
import usePrice from "@framework/product/use-price";

export const CheckoutItem: React.FC<{ item: Item }> = ({ item }) => {
  const { price } = usePrice({
    amount: item.itemTotal,
    currencyCode: "USD",
  });

  const generateCartItemName = (name: string, attributes: object) => {
    if (Object.keys(attributes) && Object.keys(attributes).length > 0) {
		console.log('attributessss', attributes);
    //   return `${name} - ${sortedAttributes.join(", ")}`;
    }
    return name;
  };

  return (
    <div className="flex py-4 items-center lg:px-3 border-b border-gray-300">
      <div className="flex justify-between border rounded-md border-gray-300 w-16 h-16 flex-shrink-0">
        <img
          src={item.image ?? "/assets/placeholder/order-product.svg"}
          width="64"
          height="64"
          className="object-cover"
        />
      </div>
      <h6 className="text-sm ps-3 font-regular text-heading">
        {generateCartItemName(item.name, item.attributes)}
      </h6>
      <div className="flex text-heading text-sm ps-2 flex-shrink-0">
        {price}
      </div>
    </div>
  );
};

export default CheckoutItem;