import { Cart } from "@components/cart";
import { useUI } from "@contexts/ui.context";
import Drawer from "rc-drawer";
import "rc-drawer/assets/index.css";

const SideDrawer: any = () => {
  const { displayCart, closeCart } = useUI();
  return (
    <Drawer
      open={displayCart}
      placement="right"
      onClose={closeCart}
      // handler={false}
      // showMask={true}
      // level={null}
      contentWrapperStyle={{ right: 0 }}
    >
      <Cart />
    </Drawer>
  );
};

export default SideDrawer;
