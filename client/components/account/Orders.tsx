import { motion } from "framer-motion";
import { Link } from "@components/ui";
import { useWindowSize } from "@utils/index";

const OrdersTable: React.FC = () => {
  const { width } = useWindowSize();
  return (
    <>
      <h2 className="text-lg md:text-xl xl:text-2xl font-bold text-heading mb-6 xl:mb-8">
        Orders
      </h2>
      <motion.div
        layout
        initial="from"
        animate="to"
        exit="from"
        //@ts-ignore
        className={`w-full flex flex-col`}
      >
        {width >= 1025 ? (
          <table>
            <thead className="text-sm lg:text-base">
              <tr>
                <th className="bg-gray-100 p-4 text-heading font-semibold text-start first:rounded-ts-md">
                  Order
                </th>
                <th className="bg-gray-100 p-4 text-heading font-semibold text-start lg:text-center">
                  Date
                </th>
                <th className="bg-gray-100 p-4 text-heading font-semibold text-start lg:text-center">
                  Status
                </th>
                <th className="bg-gray-100 p-4 text-heading font-semibold text-start lg:text-center">
                  Total
                </th>
                <th className="bg-gray-100 p-4 text-heading font-semibold text-start lg:text-end last:rounded-te-md">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="text-sm lg:text-base">
              <tr className="border-b border-gray-300 last:border-b-0">
                <td className="px-4 py-5 text-start">
                  <Link
                    href="/orders/3203"
                    className="underline hover:no-underline text-body"
                  >
                    #3203
                  </Link>
                </td>
                <td className="text-start lg:text-center px-4 py-5 text-heading">
                  March 18, 2021
                </td>
                <td className="text-start lg:text-center px-4 py-5 text-heading">
                  Completed
                </td>
                <td className="text-start lg:text-center px-4 py-5 text-heading">
                  $16,950.00 for 93 items
                </td>
                <td className="text-end px-4 py-5 text-heading">
                  <Link
                    href="/orders/3203"
                    className="text-sm leading-4 bg-heading text-white px-4 py-2.5 inline-block rounded-md hover:text-white hover:bg-gray-600"
                  >
                    Detail
                  </Link>
                </td>
              </tr>
              <tr className="border-b border-gray-300 last:border-b-0">
                <td className="px-4 py-5 text-start">
                  <Link
                    href="/orders/3204"
                    className="underline hover:no-underline text-body"
                  >
                    #3204
                  </Link>
                </td>
                <td className="text-start lg:text-center px-4 py-5 text-heading">
                  March 18, 2021
                </td>
                <td className="text-start lg:text-center px-4 py-5 text-heading">
                  Completed
                </td>
                <td className="text-start lg:text-center px-4 py-5 text-heading">
                  $16,950.00 for 93 items
                </td>
                <td className="text-end px-4 py-5 text-heading">
                  <Link
                    href="/orders/3204"
                    className="text-sm leading-4 bg-heading text-white px-4 py-2.5 inline-block rounded-md hover:text-white hover:bg-gray-600"
                  >
                    Details
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        ) : (
          <div className="w-full space-y-4">
            <ul className="text-sm font-semibold text-heading border border-gray-300 rounded-md flex flex-col px-4 pt-5 pb-6 space-y-5">
              <li className="flex items-center justify-between">
                Order
                <span className="font-normal">
                  <Link
                    href="/orders/3203"
                    className="underline hover:no-underline text-body"
                  >
                    #3203
                  </Link>
                </span>
              </li>
              <li className="flex items-center justify-between">
                Date
                <span className="font-normal">March 18, 2021</span>
              </li>
              <li className="flex items-center justify-between">
                Status
                <span className="font-normal">Completed</span>
              </li>
              <li className="flex items-center justify-between">
                Total
                <span className="font-normal">$16,950.00 for 93 items</span>
              </li>
              <li className="flex items-center justify-between">
                Actions
                <span className="font-normal">
                  <Link
                    href="/orders/3203"
                    className="text-sm leading-4 bg-heading text-white px-4 py-2.5 inline-block rounded-md hover:text-white hover:bg-gray-600"
                  >
                    Details
                  </Link>
                </span>
              </li>
            </ul>
            <ul className="text-sm font-semibold text-heading border border-gray-300 rounded-md flex flex-col px-4 pt-5 pb-6 space-y-5">
              <li className="flex items-center justify-between">
                Order
                <span className="font-normal">
                  <Link
                    href="/orders/3204"
                    className="underline hover:no-underline text-body"
                  >
                    #3204
                  </Link>
                </span>
              </li>
              <li className="flex items-center justify-between">
                Date
                <span className="font-normal">March 18, 2021</span>
              </li>
              <li className="flex items-center justify-between">
                Status
                <span className="font-normal">Completed</span>
              </li>
              <li className="flex items-center justify-between">
                Total
                <span className="font-normal">$16,950.00 for 93 items</span>
              </li>
              <li className="flex items-center justify-between">
                Actions
                <span className="font-normal">
                  <Link
                    href="/orders/3204"
                    className="text-sm leading-4 bg-heading text-white px-4 py-2.5 inline-block rounded-md hover:text-white hover:bg-gray-600"
                  >
                    Details
                  </Link>
                </span>
              </li>
            </ul>
          </div>
        )}
      </motion.div>
    </>
  );
};

export default OrdersTable;
