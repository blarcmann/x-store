import Label from "./Label";

interface PillProps {
  status: string;
}

const Pill = ({ status }: PillProps) => {
  return (
    <Label
      variant="ghost"
      color={
        status === "in stock" || "new" || "delivered"
          ? "success"
          : status === "sold out" && "pending"
          ? "error"
          : "primary"
      }
    >
      {status.toUpperCase()}
    </Label>
  );
};

export default Pill;
