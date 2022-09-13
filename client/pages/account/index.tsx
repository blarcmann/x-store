import Layout from "@components/layout/layout";
import {AccountLayout, AccountDetails} from "@components/account";

export default function AccountDetailsPage() {
	return (
		<AccountLayout>
			<AccountDetails />
		</AccountLayout>
	);
}

AccountDetailsPage.Layout = Layout;
