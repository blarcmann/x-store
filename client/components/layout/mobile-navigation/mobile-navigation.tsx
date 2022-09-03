import { Link } from "@components/ui";
import {
  IoSearchCircle,
  IoHomeOutline,
  IoPersonOutline,
  IoMenu,
} from "react-icons/io5";
import { useUI } from "@contexts/ui.context";
import { ROUTES } from "@utils/routes";
import dynamic from "next/dynamic";
import { Drawer } from "@components/common/drawer/drawer";
const CartButton = dynamic(() => import("@components/cart/cart-button"), {
  ssr: false,
});
const AuthMenu: any = dynamic(() => import("@components/layout/header/auth-menu"), {
  ssr: false,
});
const MobileMenu = dynamic(
  () => import("@components/layout/header/mobile-menu")
);

const BottomNavigation: React.FC = () => {
  const {
    openSidebar,
    closeSidebar,
    displaySidebar,
    setDrawerView,
    openSearch,
    openModal,
    setModalView,
    isAuthorized,
  } = useUI();

  function handleLogin() {
    setModalView("LOGIN_VIEW");
    return openModal();
  }
  function handleMobileMenu() {
    setDrawerView("MOBILE_MENU");
    return openSidebar();
  }

  return (
    <>
      <div className="md:hidden fixed z-10 bottom-0 flex items-center justify-between shadow-bottomNavigation text-gray-700 body-font bg-white w-full h-14 sm:h-16 px-4">
        <button
          aria-label="Menu"
          className="menuBtn flex flex-col items-center justify-center flex-shrink-0 outline-none focus:outline-none"
          onClick={handleMobileMenu}
        >
          <IoMenu />
        </button>
        <button
          className="flex items-center justify-center flex-shrink-0 h-auto relative focus:outline-none"
          onClick={openSearch}
          aria-label="search-button"
        >
          <IoSearchCircle />
        </button>
        <Link href="/" className="flex-shrink-0">
          <IoHomeOutline />
        </Link>
        <CartButton />
        <AuthMenu
          isAuthorized={isAuthorized}
          href={ROUTES.ACCOUNT}
          className="flex-shrink-0"
          btnProps={{
            className: "flex-shrink-0 focus:outline-none",
            children: <IoPersonOutline />,
            onClick: handleLogin,
          }}
        >
          <IoPersonOutline />
        </AuthMenu>
      </div>
      <Drawer
        placement="left"
        open={displaySidebar}
        onClose={closeSidebar}
        // handler={false}
        // showMask={true}
        // level={null}
        contentWrapperStyle={{ left: 0 }}
      >
        <MobileMenu />
      </Drawer>
    </>
  );
};

export default BottomNavigation;
