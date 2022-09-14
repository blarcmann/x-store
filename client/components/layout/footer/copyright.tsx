import { Container } from "@components/ui";
import { siteSettings } from "@settings/site-settings";

interface CopyrightProps {
  payment?: {
    id: string | number;
    path?: string;
    name: string;
    image: string;
    width: number;
    height: number;
  }[];
}

const Copyright: React.FC<CopyrightProps> = ({ payment }) => {
  return (
    <div className="border-t border-gray-300 pt-5 pb-16 sm:pb-20 md:pb-5 mb-2 sm:mb-0">
      <Container className="flex flex-col-reverse md:flex-row text-center md:justify-between">
        <p className="text-body text-xs lg:text-sm leading-6">
          Made with ❤️ by {' '}
          <a
            className="font-semibold text-gray-700 transition-colors duration-200 ease-in-out hover:text-body"
            href={siteSettings.author.websiteUrl}
            target="_blank"
          >
             {siteSettings.author.name}
          </a>
        </p>

        {payment && (
          <ul className="hidden md:flex flex-wrap justify-center items-center space-x-4 xs:space-x-5 lg:space-x-7 mb-1 md:mb-0 mx-auto md:mx-0">
            {payment?.map((item) => (
              <li
                className="mb-2 md:mb-0 transition hover:opacity-80"
                key={`payment-list--key${item.id}`}
              >
                <a href={item.path ? item.path : "/#"} target="_blank">
                  <img
                    src={item.image}
                    alt={`${item.name}`}
                    height={item.height}
                    width={item.width}
                  />
                </a>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </div>
  );
};

export default Copyright;
