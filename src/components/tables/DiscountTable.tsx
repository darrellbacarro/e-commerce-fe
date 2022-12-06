import React, { useEffect, useState, useContext } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Button,
  TableFooter,
  TablePagination,
  Box
} from "@mui/material";

import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';


import { useTypedDispatch, useTypedSelector } from '../../hooks/rtk-hooks';
import { Discount } from '../../utils/types';
import { deleteDiscountById, fetchAllDiscounts } from '../../features/discountSlice';

import { ErrorContext, ErrorContextType } from "../../context/ErrorProvider";
import TablePaginationActions from "./TablePaginationActions";

import DiscountModal from "./Modals/DiscountModal";
import DeleteModal from "./Modals/DeleteModal";

const DiscountTable = () => {
  const { discounts, loading } = useTypedSelector((state) => state.discount);
  const { setErrorMessage } = useContext(ErrorContext) as ErrorContextType;
  const dispatch = useTypedDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [errorInput, setErrorInput] = useState("");
  const [openAdd, setOpenAdd] = useState(false);

  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [idToDelete, setIdToDelete] = useState("");
  const [discountToEdit, setDiscountToEdit] = useState<Discount | null>(null);

  useEffect(() => {
    dispatch(fetchAllDiscounts());
  }, [dispatch]);



  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenDelete = (id?: string) => {
    if (id) {
      setIdToDelete(id);
    }
    setOpenDelete(true);
  };

  const handleOpenEdit = (discount: Discount | null) => {
    if (discount) {
      setDiscountToEdit(discount);

    }
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setDiscountToEdit(null);
    setOpenEdit(false);
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await dispatch(deleteDiscountById(id));
      setOpenDelete(false);
      dispatch(fetchAllDiscounts());
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  const refreshTable = () => {
    dispatch(fetchAllDiscounts());
  };

  const renderTableBody = () => {
    if (discounts && discounts.length > 0) {
      if (rowsPerPage > 0) {
        return discounts
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((discount: Discount, index: number) => (
            <TableRow
              key={discount.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center">{index + 1}</TableCell>
              <TableCell align="center">{discount.discountCode}</TableCell>
              <TableCell align="center">{discount.discountName}</TableCell>
              <TableCell align="center">{discount.discountValue}%</TableCell>
              <TableCell align="center"> {discount.expiryDate}</TableCell>
              <TableCell align="center">
                <Button
                >
                  <ModeEditIcon
                    onClick={() => { handleOpenEdit(discount); }}
                  />
                </Button>
                <Button

                  color="error"
                  onClick={() => { handleOpenDelete(discount.id); }}
                >
                  <DeleteForeverIcon />
                </Button>

              </TableCell>
            </TableRow>
          ));
      } else {
        return discounts.map((discount: Discount, index: number) => (
          <TableRow
            key={discount.id}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell align="center">{index + 1}</TableCell>
            <TableCell align="center">{discount.discountCode}</TableCell>
            <TableCell align="center">{discount.discountName}</TableCell>
            <TableCell align="center">{discount.discountValue}%</TableCell>
            <TableCell align="center"> {discount.expiryDate}</TableCell>
            <TableCell align="center">
              <Button
              >
                <ModeEditIcon
                  onClick={() => { handleOpenEdit(discount); }}
                />
              </Button>
              <Button

                color="error"
                onClick={() => { handleOpenDelete(discount.id); }}
              >
                <DeleteForeverIcon />
              </Button>
            </TableCell>
          </TableRow>
        ));
      }
    } else {
      return (
        <TableRow>
          <TableCell align="center" colSpan={5}>
            No data
          </TableCell>
        </TableRow>
      );
    }
  };
  return (
    <>
      <TableContainer
        component={Paper}>
        <Box
          component="span"
          m={1}
          display="flex"
          justifyContent="flex-end"
          alignItems="flex-end"

        >

        </Box>
        <Button
          onClick={() => setOpenAdd(true)}
        >
          Add Discount
        </Button>

        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">#</TableCell>
              <TableCell align="center">Discount Code</TableCell>
              <TableCell align="center">Discount Name</TableCell>
              <TableCell align="center">Value</TableCell>
              <TableCell align="center">Expiry Date</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{renderTableBody()}</TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={5}
                count={discounts?.length || 5}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    "aria-label": "rows per page",
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>

      </TableContainer>
      <DiscountModal
        refreshTable={refreshTable}
        open={openAdd}
        handleClose={() => setOpenAdd(false)}
        setOpenModal={setOpenAdd}
      />

      {discountToEdit !== null && (
        <DiscountModal
          open={openEdit}
          handleClose={handleCloseEdit}
          discountToEdit={discountToEdit}
          setOpenModal={setOpenAdd}
          title="Edit Discount"
          refreshTable={refreshTable}
        />
      )}
      <DeleteModal
        open={openDelete}
        handleClose={() => setOpenDelete(false)}
        id={idToDelete}
        handleDelete={handleDelete}

      />
    </>

  );
};

export default DiscountTable;
