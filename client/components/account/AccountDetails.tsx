import { Input, Button } from "@components/ui";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import {
  useUpdateUserMutation,
  UpdateUserType,
} from "@framework/auth/use-update-user";

const defaultValues = {};
const AccountDetails: React.FC = () => {
  const { mutate: updateUser, isLoading } = useUpdateUserMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateUserType>({
    defaultValues,
  });
  function onSubmit(input: UpdateUserType) {
    updateUser(input);
  }

  return (
    <motion.div
      layout
      initial="from"
      animate="to"
      exit="from"
      //@ts-ignore
      className={`w-full flex flex-col`}
    >
      <h2 className="text-lg md:text-xl xl:text-2xl font-bold text-heading mb-6 xl:mb-8">
        Account details
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full mx-auto flex flex-col justify-center "
        noValidate
      >
        <div className="flex flex-col space-y-4 sm:space-y-5">
          <div className="flex flex-col sm:flex-row sm:space-x-3 space-y-4 sm:space-y-0">
            <Input
              labelKey="first name"
              {...register("firstName", {
                required: "first name is required",
              })}
              variant="solid"
              className="w-full sm:w-1/2"
              errorKey={errors.firstName?.message}
            />
            <Input
              labelKey="last name"
              {...register("lastName", {
                required: "last name is required",
              })}
              variant="solid"
              className="w-full sm:w-1/2"
              errorKey={errors.lastName?.message}
            />
          </div>
          <Input
            labelKey="Username"
            {...register("username", {
              required: "username is required",
            })}
            variant="solid"
            errorKey={errors.username?.message}
          />
          <div className="flex flex-col sm:flex-row sm:space-x-3 space-y-4 sm:space-y-0">
            <Input
              type="tel"
              labelKey="Phone number"
              {...register("phoneNumber", {
                required: "phone number is required",
              })}
              variant="solid"
              className="w-full sm:w-1/2"
              errorKey={errors.phoneNumber?.message}
            />
            <Input
              type="email"
              labelKey="Email address"
              {...register("email", {
                required: "email is required",
                pattern: {
                  value:
                    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "valid email address is required",
                },
              })}
              variant="solid"
              className="w-full sm:w-1/2"
              errorKey={errors.email?.message}
            />
          </div>
          <div className="relative">
            <Button
              type="submit"
              loading={isLoading}
              disabled={isLoading}
              className="h-12 mt-3 w-full sm:w-32"
            >
              Save
            </Button>
          </div>
        </div>
      </form>
    </motion.div>
  );
};

export default AccountDetails;
