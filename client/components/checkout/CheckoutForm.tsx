import { useForm } from "react-hook-form";
import { CheckBox, Button, TextArea, Input } from "../ui";
import Router from "next/router";
import { ROUTES } from "@utils/routes";
import { useCheckoutMutation } from "@framework/checkout/use-checkout";

interface CheckoutInputType {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  zipCode: string;
  save: boolean;
  note: string;
}

const CheckoutForm: React.FC = () => {
  const { mutate: updateUser, isLoading } = useCheckoutMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutInputType>();
  function onSubmit(input: CheckoutInputType) {
    updateUser(input);
    Router.push(ROUTES.ORDER);
  }

  return (
    <>
      <h2 className="text-lg md:text-xl xl:text-2xl font-bold text-heading mb-6 xl:mb-8">
        Shipping Address
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full mx-auto flex flex-col justify-center "
        noValidate
      >
        <div className="flex flex-col space-y-4 lg:space-y-5">
          <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0">
            <Input
              labelKey="first name"
              {...register("firstName", {
                required: "first name is required",
              })}
              errorKey={errors.firstName?.message}
              variant="solid"
              className="w-full lg:w-1/2 "
            />
            <Input
              labelKey="last name"
              {...register("lastName", {
                required: "last name is required",
              })}
              errorKey={errors.lastName?.message}
              variant="solid"
              className="w-full lg:w-1/2 lg:mx-3 mt-2 md:mt-0"
            />
          </div>
          <Input
            labelKey="address"
            {...register("address", {
              required: "address is required",
            })}
            errorKey={errors.address?.message}
            variant="solid"
          />
          <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0">
            <Input
              type="tel"
              labelKey="Phone number"
              {...register("phone", {
                required: "phone number is required",
              })}
              errorKey={errors.phone?.message}
              variant="solid"
              className="w-full lg:w-1/2 "
            />

            <Input
              type="email"
              labelKey="email address"
              {...register("email", {
                required: "a valid email is required",
                pattern: {
                  value:
                    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "invalid email address",
                },
              })}
              errorKey={errors.email?.message}
              variant="solid"
              className="w-full lg:w-1/2 lg:mx-3 mt-2 md:mt-0"
            />
          </div>
          <div className="relative flex items-center ">
            <CheckBox label="Save checkout information" />
          </div>
          <TextArea
            labelKey="Order notes"
            {...register("note")}
            placeholderKey="Enter order notes"
            className="relative pt-3 xl:pt-6"
          />
          <div className="flex w-full">
            <Button
              className="w-full sm:w-auto"
              loading={isLoading}
              disabled={isLoading}
            >
              Place Order
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default CheckoutForm;
