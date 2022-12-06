import LoadingButton from "@mui/lab/LoadingButton";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { Box, Button, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useTypedDispatch, useTypedSelector } from '../../../hooks/rtk-hooks';

import { ErrorContext, ErrorContextType } from "../../../context/ErrorProvider";
import { Discount, IDispatchResponse } from '../../../utils/types';
import { BootstrapDialog, BootstrapDialogTitle } from "./BootstrapDialog";
import { isNotEmpty, throwError, randomString } from '../../../utils/helpers';
import { addDiscount, updateDiscountById } from '../../../features/discountSlice';
import InputAdornment from '@mui/material/InputAdornment';
type DiscountMOdalProps = {
    open: boolean;
    handleClose: () => void;
    setOpenModal: (value: boolean) => void;
    discountToEdit?: Discount;
    title?: string;
    refreshTable: () => void;
};

const DiscountModal = ({
    open,
    handleClose,
    discountToEdit,
    title,
    refreshTable
}: DiscountMOdalProps) => {
    const { loading } = useTypedSelector((state) => state.discount);
    const dispatch = useTypedDispatch();
    const { setErrorMessage } = useContext(ErrorContext) as ErrorContextType;
    const [newDiscount, setNewDiscount] = useState<Discount>({
        discountName: "",
        discountCode: "",
        discountValue: "",
    });

    useEffect(() => {
        onModalMount();
    }, [discountToEdit]);

    const onModalMount = async () => {

        if (discountToEdit) {
            setNewDiscount({
                discountName: discountToEdit.discountName,
                discountCode: discountToEdit.discountCode,
                discountValue: discountToEdit.discountValue,
                expiryDate: discountToEdit.expiryDate
            });
        }
    };
    const resetForm = () => {
        setNewDiscount({
            discountName: "",
            discountCode: "",
            discountValue: "",
            expiryDate: ""
        });

    };

    const handleGenerate = () => {
        const randomStr = randomString().toLocaleUpperCase();
        setNewDiscount({
            ...newDiscount,
            discountCode: randomStr,
        });

    };

    const handleSubmit = async () => {
        try {
            isNotEmpty(newDiscount.discountName, "Discount name");
            isNotEmpty(newDiscount.discountCode, "Discount code");
            isNotEmpty(newDiscount.discountValue, "Discount value");
            const discount: Discount = {
                discountName: newDiscount.discountName,
                discountCode: newDiscount.discountCode,
                discountValue: newDiscount.discountValue,
            };

            if (discountToEdit) {
                discount.id = discountToEdit.id;
                discount.expiryDate = discountToEdit.expiryDate;
                console.log(discount);
                const res: IDispatchResponse = await dispatch(updateDiscountById(discount));
                throwError(res?.payload);
            } else {
                console.log(newDiscount);
                const res: IDispatchResponse = await dispatch(addDiscount(newDiscount));
                throwError(res.payload);
            }
            resetForm();
            handleClose();
        } catch (error: any) {
            setErrorMessage(error.message);
        }
        refreshTable();
    };

    return (
        <div>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle
                    id="customized-dialog-title"
                    onClose={handleClose}
                >
                    {title ? title : "Add Discount"}
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <Box
                        sx={{
                            width: 400,
                        }}
                    >
                        <div className="ma-sm">
                            <TextField

                                fullWidth
                                label="Name"
                                value={newDiscount.discountName}
                                onChange={(e) =>
                                    setNewDiscount({ ...newDiscount, discountName: e.target.value })
                                }
                            />
                        </div>


                        <div className="ma-sm ">
                            <Box sx={{ display: 'flex', flexDirection: 'row' }} >

                                <TextField

                                    fullWidth
                                    label="Code"
                                    value={newDiscount.discountCode}
                                    onChange={(e) =>
                                        setNewDiscount({ ...newDiscount, discountCode: e.target.value })
                                    }
                                />
                                &nbsp;


                                <DialogActions>
                                    <Button sx={{ ml: '2' }}
                                        onClick={handleGenerate}
                                        variant="outlined"
                                    >Generate</Button>
                                </DialogActions>
                            </Box>

                        </div>
                        <div className="ma-sm">
                            <TextField
                                fullWidth
                                type='number'
                                label="Discount value"
                                value={newDiscount.discountValue}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">%</InputAdornment>,
                                }}
                                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                onChange={(e) =>
                                    setNewDiscount({ ...newDiscount, discountValue: e.target.value })
                                }
                            />
                        </div>
                        {discountToEdit ? (
                            <div className="ma-sm">
                                <TextField
                                    fullWidth
                                    label="expiry Date"
                                    placeholder={"2023-12-01"}
                                    value={newDiscount.expiryDate}
                                    onChange={(e) =>
                                        setNewDiscount({ ...newDiscount, expiryDate: e.target.value })
                                    }
                                />
                            </div>
                        ) : ""
                        }

                    </Box>
                </DialogContent>
                <DialogActions>
                    <LoadingButton
                        variant="outlined"
                        loading={loading}
                        onClick={handleSubmit}
                    >
                        Submit
                    </LoadingButton>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
};

export default DiscountModal;
