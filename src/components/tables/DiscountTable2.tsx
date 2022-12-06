import React, { useEffect, useState, useContext } from "react";
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import { Discount } from '../../utils/types';

import { useTypedDispatch, useTypedSelector } from '../../hooks/rtk-hooks';
import { deleteDiscountById, fetchAllDiscounts } from '../../features/discountSlice';


function createDiscount(
  discountCode: string,
  discountName: string,
  discountValue: string,
  expiryDate: string
  // name: string,
  // calories: number,
  // fat: number,
  // carbs: number,
  // protein: number,
): Discount {
  return {
    discountCode,
    discountName,
    discountValue,
    expiryDate,
  };
}


// const rows = [
//   createDiscount('Cupcake', 305, 3.7, 67, 4.3),
//   createDiscount('Donut', 452, 25.0, 51, 4.9),
//   createDiscount('Eclair', 262, 16.0, 24, 6.0),
//   createDiscount('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createDiscount('Gingerbread', 356, 16.0, 49, 3.9),
//   createDiscount('Honeycomb', 408, 3.2, 87, 6.5),
//   createDiscount('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createDiscount('Jelly Bean', 375, 0.0, 94, 0.0),
//   createDiscount('KitKat', 518, 26.0, 65, 7.0),
//   createDiscount('Lollipop', 392, 0.2, 98, 0.0),
//   createDiscount('Marshmallow', 318, 0, 81, 2.0),
//   createDiscount('Nougat', 360, 19.0, 9, 37.0),
//   createDiscount('Oreo', 437, 18.0, 63, 4.0),
// ];

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Discount;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'discountCode',
    numeric: false,
    disablePadding: true,
    label: 'Discount Code',
  },
  {
    id: 'discountName',
    numeric: false,
    disablePadding: false,
    label: 'Discount Name',
  },
  {
    id: 'discountValue',
    numeric: false,
    disablePadding: false,
    label: 'Discount Value',
  },
  {
    id: 'expiryDate',
    numeric: false,
    disablePadding: false,
    label: 'Expiry date',
  },

];

interface DiscountTable2Props {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Discount) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function DiscountTablehead(props: DiscountTable2Props) {

  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler =
    (property: keyof Discount) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all discounts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface DiscountTableToolbarProps {
  numSelected: number;
}

function DiscountTable2Toolbar(props: DiscountTableToolbarProps) {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Discount
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

export const DiscountTable2 = () => {

  const rows: Discount = useTypedSelector((state) => state.discount);

  const dispatch = useTypedDispatch();
  useEffect(() => {
    dispatch(fetchAllDiscounts());
  }, [dispatch]);

  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Discount>('discountValue');
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Discount,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n: { name: any; }) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  // const emptyRows =
  //   page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  console.log(rows);
  return (
    <>test</>
    // <Box sx={{ width: '100%' }}>
    //   <Paper sx={{ width: '100%', mb: 2 }}>
    //     <DiscountTable2Toolbar numSelected={selected.length} />
    //     <TableContainer>
    //     <Box sx={{ overflow: "auto" }}>
    //     <Box sx={{ width: "100%", display: "table", tableLayout: "fixed" }}>
    //       <Table
    //         aria-labelledby="tableTitle"
    //         size={dense ? 'small' : 'medium'}
    //       >
    //         <DiscountTablehead
    //           numSelected={selected.length}
    //           order={order}
    //           orderBy={orderBy}
    //           onSelectAllClick={handleSelectAllClick}
    //           onRequestSort={handleRequestSort}
    //           rowCount={rows.length}
    //         />
    //         <TableBody>
    //           {/* if you don't need to support IE11, you can replace the `stableSort` call with:
    //           rows.sort(getComparator(order, orderBy)).slice() */}
    //           {stableSort(rows, getComparator(order, orderBy))
              
    //             .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    //             .map((row, index) => {
    //               const isItemSelected = isSelected(parseInt(row.discountCode));
    //               const labelId = `enhanced-table-checkbox-${index}`;

    //               return (
    //                 <TableRow
    //                   hover
    //                   onClick={(event) => handleClick(event, row.discountName)}
    //                   role="checkbox"
    //                   aria-checked={isItemSelected}
    //                   tabIndex={-1}
    //                   key={row.discountName}
    //                   selected={isItemSelected}
    //                 >
    //                   <TableCell padding="checkbox">
    //                     <Checkbox
    //                       color="primary"
    //                       checked={isItemSelected}
    //                       inputProps={{
    //                         'aria-labelledby': labelId,
    //                       }}
    //                     />
    //                   </TableCell>
    //                   <TableCell
    //                     component="th"
    //                     id={labelId}
    //                     scope="row"
    //                     padding="none"
    //                   >
    //                     {row.name}
    //                   </TableCell>
    //                   <TableCell align="right">{row.calories}</TableCell>
    //                   <TableCell align="right">{row.fat}</TableCell>
    //                   <TableCell align="right">{row.carbs}</TableCell>
    //                   <TableCell align="right">{row.protein}</TableCell>
    //                 </TableRow>
    //               );
    //             })}
    //           {emptyRows > 0 && (
    //             <TableRow
    //               style={{
    //                 height: (dense ? 33 : 53) * emptyRows,
    //               }}
    //             >
    //               <TableCell colSpan={6} />
    //             </TableRow>
    //           )}
    //         </TableBody>
    //       </Table>
    //       </Box>
    //     </Box>
    //     </TableContainer>
    //     <TablePagination
    //       rowsPerPageOptions={[5, 10, 25]}
    //       component="div"
    //       count={rows.length}
    //       rowsPerPage={rowsPerPage}
    //       page={page}
    //       onPageChange={handleChangePage}
    //       onRowsPerPageChange={handleChangeRowsPerPage}
    //     />
    //   </Paper>
    //   <FormControlLabel
    //     control={<Switch checked={dense} onChange={handleChangeDense} />}
    //     label="Dense padding"
    //   />
    // </Box>
  );
};