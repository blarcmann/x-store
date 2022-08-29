import { useState } from "react";
import {
  Card,
  Table,
  Stack,
  TablePagination,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  Box,
} from "@mui/material";
import { faker } from "@faker-js/faker";
import Page from "../components/Page";
import { Pill } from "../components";
import { MoreMenu, Heading } from "../components/table";
import { getRandomInt, formatDate } from "../utils/helpers";

const TABLE_HEAD = [
  { id: "ref", label: "Ref", alignRight: false },
  { id: "customer", label: "Customer", alignRight: false },
  { id: "date", label: "Date", alignRight: false },
  { id: "status", label: "status", alignRight: false },
  { id: "" },
];
const statuses = ["pending", "delivered", "cancelled", "refunded"];

const orders = [...Array(24)].map((_, index) => ({
  ref: faker.datatype.uuid(),
  customer: faker.name.findName(),
  createdAt: faker.date.past(),
  status: statuses[getRandomInt(3)],
}));

export default function Orders() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - orders.length) : 0;

  return (
    <Page title="Customers">
      <Container>
        <Stack mb={5}>
          <Typography variant="h2" gutterBottom>
            Orders
          </Typography>
        </Stack>

        <Card>
          <Box>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <Heading headLabel={TABLE_HEAD} rowCount={orders.length} />
                <TableBody>
                  {orders
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const { ref, customer, createdAt, status } = row;
                      return (
                        <TableRow hover key={ref}>
                          <TableCell align="left"></TableCell>
                          <TableCell align="left">{ref}</TableCell>
                          <TableCell align="left">{customer}</TableCell>
                          <TableCell align="left">
                            {formatDate(createdAt)}
                          </TableCell>
                          <TableCell align="left">
                            <Pill status={status} />
                          </TableCell>
                          <TableCell align="right">
                            <MoreMenu />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
          <TablePagination
            rowsPerPageOptions={[10, 20, 30]}
            component="div"
            count={orders.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}
