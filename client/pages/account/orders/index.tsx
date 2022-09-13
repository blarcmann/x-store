import Layout from "@components/layout/layout";
import {AccountLayout, Orders} from "@components/account";

export default function OrdersTablePage() {
	return (
		<AccountLayout>
			<Orders />
		</AccountLayout>
	);
}

OrdersTablePage.Layout = Layout;
