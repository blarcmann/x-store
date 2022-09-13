import Layout from "@components/layout/layout";
import { AccountLayout, ChangePassword } from "@components/account";

export default function ChangePasswordPage() {
  return (
    <AccountLayout>
      <ChangePassword />
    </AccountLayout>
  );
}

ChangePasswordPage.Layout = Layout;
