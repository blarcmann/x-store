import usePrice from "@framework/product/use-price";
import { OrderItem } from "@framework/types";


export const OrderItemCard = ({ product }: { product: OrderItem }) => {
	const { price: itemTotal } = usePrice({
		amount: product.price * product.quantity,
		currencyCode: "USD",
	});
	return (
		<tr
			className="border-b font-normal border-gray-300 last:border-b-0"
			key={product.id}
		>
			<td className="p-4">
				{product.name} * {product.quantity}
			</td>
			<td className="p-4">{itemTotal}</td>
		</tr>
	);
};

export default OrderItemCard;