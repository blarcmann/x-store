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
import { MoreMenu, Heading } from "../../components/table";
import { Page, Icone, Label } from "../../components/index";
import { useProductsQuery } from "../../framework/product/get-product";

const TABLE_HEAD = [
  { id: "title", label: "Title", alignRight: false },
  { id: "category", label: "Category", alignRight: false },
  { id: "price", label: "Price", alignRight: false },
  { id: "inStock", label: "Status", alignRight: false },
  { id: "salePrice", label: "Sale Price", alignRight: false },
  { id: "" },
];

export default function Products() {
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState<any>([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { isLoading, data } = useProductsQuery();

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
            to="edit/22"
            startIcon={<Icone icon="eva:plus-fill" />}
          >
            New Product
          </Button>
        </Stack>
        {isLoading ? (
          <h1>Loading...</h1>
        ) : (
          <Card>
            <Box>
              <TableContainer sx={{ minWidth: 800 }}>
                <Table>
                  <Heading
                    headLabel={TABLE_HEAD}
                    rowCount={data?.length}
                    numSelected={selected.length}
                  />
                  <TableBody>
                    {data
                      ?.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row: any) => {
                        const {
                          id,
                          title,
                          price,
                          images,
                          category,
                          inStock,
                          salePrice,
                        } = row;
                        const isItemSelected = selected.indexOf(title) !== -1;

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
                                onChange={(event) => handleClick(event, title)}
                              />
                            </TableCell>
                            <TableCell
                              component="th"
                              scope="row"
                              padding="none"
                            >
                              <Stack
                                direction="row"
                                alignItems="center"
                                spacing={2}
                              >
                                <Avatar alt={title} src={images[0]} />
                                <Link to="oeirtunfdksjkdnd">
                                  <Typography variant="subtitle2" noWrap>
                                    {title}
                                  </Typography>
                                </Link>
                              </Stack>
                            </TableCell>
                            <TableCell align="left">{category}</TableCell>
                            <TableCell align="left">
                              NGN {price.toFixed(2)}
                            </TableCell>
                            <TableCell>
                              <Label
                                variant="ghost"
                                color={inStock ? "success" : "error"}
                              >
                                {price > salePrice ? "On Sale" : "Base"}
                              </Label>
                            </TableCell>
                            <TableCell align="left">
                              NGN {salePrice.toFixed(2)}
                            </TableCell>
                            <TableCell align="right">
                              <MoreMenu />
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>

            <TablePagination
              rowsPerPageOptions={[10, 20, 30]}
              component="div"
              count={data ? data.length : 0}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Card>
        )}
      </Container>
    </Page>
  );
}
