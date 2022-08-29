import { useState } from "react";
import { Link, Link as RouterLink } from "react-router-dom";
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Box,
} from "@mui/material";
import { faker } from "@faker-js/faker";
import { SearchNotFound, MoreMenu, Heading } from "../../components/table";
import { Page, Icone, ColorPreview, Label } from "../../components";
import { getRandomInt } from "../../utils/helpers";

const TABLE_HEAD = [
  { id: "name", label: "Name", alignRight: false },
  { id: "price", label: "Price", alignRight: false },
  { id: "colors", label: "Colors", alignRight: false },
  { id: "status", label: "Status", alignRight: false },
  { id: "" },
];

const PRODUCT_NAME = [
  "Nike Air Force 1 NDESTRUKT",
  "Nike Space Hippie 04",
  "Nike Air Zoom Pegasus 37 A.I.R. Chaz Bear",
  "Nike Blazer Low 77 Vintage",
  "Nike ZoomX SuperRep Surge",
  "Zoom Freak 2",
  "Nike Air Max Zephyr",
  "Jordan Delta",
  "Air Jordan XXXV PF",
  "Nike Waffle Racer Crater",
  "Kyrie 7 EP Sisterhood",
  "Nike Air Zoom BB NXT",
  "Nike Air Force 1 07 LX",
  "Nike Air Force 1 Shadow SE",
  "Nike Air Zoom Tempo NEXT%",
  "Nike DBreak-Type",
  "Nike Air Max Up",
  "Nike Air Max 270 React ENG",
  "NikeCourt Royale",
  "Nike Air Zoom Pegasus 37 Premium",
  "Nike Air Zoom SuperRep",
  "NikeCourt Royale",
  "Nike React Art3mis",
  "Nike React Infinity Run Flyknit A.I.R. Chaz Bear",
];
const PRODUCT_COLOR = [
  "#F0AB55",
  "#000000",
  "#FFDDFF",
  "#FFC0CB",
  "#FF4D42",
  "#18D0FF",
  "#94D8DD",
  "#FDC107",
];

const statuses = ["sale", "new", "rollback", "sold out"];

const products = [...Array(24)].map((_, index) => {
  const setIndex = index + 1;
  return {
    id: faker.datatype.uuid(),
    cover: `/static/mock-images/products/product_${setIndex}.jpg`,
    name: PRODUCT_NAME[index],
    price: faker.datatype.number({ min: 4, max: 99, precision: 0.01 }),
    priceSale:
      setIndex % 3
        ? null
        : faker.datatype.number({ min: 19, max: 29, precision: 0.01 }),
    colors:
      (setIndex === 1 && PRODUCT_COLOR.slice(0, 2)) ||
      (setIndex === 2 && PRODUCT_COLOR.slice(1, 3)) ||
      (setIndex === 3 && PRODUCT_COLOR.slice(2, 4)) ||
      (setIndex === 4 && PRODUCT_COLOR.slice(3, 6)) ||
      (setIndex === 23 && PRODUCT_COLOR.slice(4, 6)) ||
      (setIndex === 24 && PRODUCT_COLOR.slice(5, 6)) ||
      PRODUCT_COLOR,
    status: statuses[getRandomInt(4)],
  };
});

export default function Products() {
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState<any>([]);
  const [filterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleSelectAllClick = (event: any) => {
    if (event.target.checked) {
      const newSelecteds = products.map((n: any) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: any, name: any) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: any = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - products.length) : 0;

  const isProductFound = products.length === 0;

  return (
    <Page title="Products">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h2" gutterBottom>
            Products
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="#"
            startIcon={<Icone icon="eva:plus-fill" />}
          >
            New Product
          </Button>
        </Stack>

        <Card>
          <Box>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <Heading
                  headLabel={TABLE_HEAD}
                  rowCount={products.length}
                  numSelected={selected.length}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {products
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row: any) => {
                      const { id, name, cover, price, colors, status } = row;
                      const isItemSelected = selected.indexOf(name) !== -1;

                      return (
                        <TableRow
                          hover
                          key={id}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={isItemSelected}
                              onChange={(event) => handleClick(event, name)}
                            />
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack
                              direction="row"
                              alignItems="center"
                              spacing={2}
                            >
                              <Avatar alt={name} src={cover} />
                              <Link to="oeirtunfdksjkdnd">
                                <Typography variant="subtitle2" noWrap>
                                  {name}
                                </Typography>
                              </Link>
                            </Stack>
                          </TableCell>
                          <TableCell align="left">{price}</TableCell>
                          <TableCell align="left">
                            <ColorPreview colors={colors} />
                          </TableCell>
                          <TableCell>
                            <Label
                              variant="ghost"
                              color={
                                status === "in stock" || status === "new"
                                  ? "success"
                                  : status === "sold out"
                                  ? "error"
                                  : "primary"
                              }
                            >
                              {status.toUpperCase()}
                            </Label>
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

                {isProductFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Box>

          <TablePagination
            rowsPerPageOptions={[10, 20, 30]}
            component="div"
            count={products.length}
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
