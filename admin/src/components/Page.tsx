import React, { ReactElement } from "react";
import { forwardRef } from "react";
// @mui
import { Box } from "@mui/material";

interface Props {
  children: React.ReactNode;
  title: String;
}

const Page: React.FC<Props> = forwardRef(
  ({ children, title, ...other }, ref): ReactElement => (
    <>
      <div>
        <title>{`${title} | ' ' `}</title>
      </div>

      <Box ref={ref} {...other}>
        {children}
      </Box>
    </>
  )
);

export default Page;
