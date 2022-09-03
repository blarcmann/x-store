import Header from "@components/layout/header/header";
import Footer from "@components/layout/footer/footer";
import MobileNavigation from "@components/layout/mobile-navigation/mobile-navigation";
import { CookieBar, Search } from "@components/common";
import { useAcceptCookies } from "@utils/index";
import { Button } from "../ui";

const Layout: React.FC = ({ children }: any) => {
  const { acceptedCookies, onAcceptCookies } = useAcceptCookies();
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main
        className="relative flex-grow"
        style={{
          minHeight: "-webkit-fill-available",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {children}
      </main>
      <Footer />
      <MobileNavigation />
      <Search />
      <CookieBar
        title={"text-cookies-title"}
        hide={acceptedCookies}
        action={
          <Button onClick={() => onAcceptCookies()} variant="slim">
            Accept cookies
          </Button>
        }
      />
    </div>
  );
};

export default Layout;
