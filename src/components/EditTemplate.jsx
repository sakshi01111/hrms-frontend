import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import { Box, Grid, TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
  "& .MuiPaper-root": {
    // Apply styles to the Dialog's Paper component
    width: "800px", // Set your desired width
    height: "600px", // Set your desired height
    maxWidth: "none", // Override default maxWidth
  },
}));

const ReqForm = ({
  inputValue,
  handleOnChange,
  handleLevelOfApprovalChange,
  addTableRow,
  handleTableRowChange,
  deleteTableRow,
  mailOptions,
  handleOnChangeForMail,
}) => {
  const fieldTypeOptions = ["Text", "Number", "Email", "Date"]; // Add your field type options here

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
      style={{
        padding: " 1rem 1.5rem",
      }}
    >
      <Grid
        container
        justifyContent="center"
        spacing="10"
        style={{ margin: "auto 2rem", width: "500px" }}
      >
        <Grid item xs={12} sm={12} md={12}>
          <TextField
            name="name"
            label="Template Name"
            value={inputValue.name}
            onChange={handleOnChange}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={12} md={12}>
          <InputLabel id="levelOfApproval" style={{ margin: "0.5rem auto" }}>
            Select Level of Approvals
          </InputLabel>

          <Select
            name="levelOfApproval"
            id="levelOfApproval"
            value={inputValue.levelOfApproval}
            onChange={handleLevelOfApprovalChange}
            fullWidth
            displayEmpty
            renderValue={(value) => (value ? value : <em>Choose an option</em>)}
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
          </Select>
        </Grid>

        <Grid item xs={12} sm={12} md={12}>
          <InputLabel id="emailTemplate" style={{ margin: "0.5rem auto" }}>
            Select Email Template
          </InputLabel>

          <Select
            name="emailTemplate"
            id="emailTemplate"
            value={inputValue?.emailTemplate}
            onChange={handleOnChangeForMail}
            fullWidth
            displayEmpty
            renderValue={(value) => {
              const selectedTemplate = mailOptions.find(
                (option) => option._id === value
              );
              return selectedTemplate ? (
                selectedTemplate.name
              ) : (
                <em>Choose an option</em>
              );
            }}
          >
            {mailOptions.map((option) => (
              <MenuItem key={option._id} value={option._id}>
                {option.name}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <InputLabel
            id="remainderEmailTemplate"
            style={{ margin: "0.5rem auto" }}
          >
            Select Remainder Email Template
          </InputLabel>

          <Select
            name="remainderEmailTemplate"
            id="remainderEmailTemplate"
            value={inputValue?.remainderEmailTemplate}
            onChange={handleOnChangeForMail}
            fullWidth
            displayEmpty
            renderValue={(value) => {
              const selectedTemplate = mailOptions.find(
                (option) => option._id === value
              );
              return selectedTemplate ? (
                selectedTemplate.name
              ) : (
                <em>Choose an option</em>
              );
            }}
          >
            {mailOptions.map((option) => (
              <MenuItem key={option._id} value={option._id}>
                {option.name}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <InputLabel
            id="responseEmailTemplate"
            style={{ margin: "0.5rem auto" }}
          >
            Select Response Email Template
          </InputLabel>

          <Select
            name="responseEmailTemplate"
            id="responseEmailTemplate"
            value={inputValue?.responseEmailTemplate}
            onChange={handleOnChangeForMail}
            fullWidth
            displayEmpty
            renderValue={(value) => {
              const selectedTemplate = mailOptions.find(
                (option) => option._id === value
              );
              return selectedTemplate ? (
                selectedTemplate.name
              ) : (
                <em>Choose an option</em>
              );
            }}
          >
            {mailOptions.map((option) => (
              <MenuItem key={option._id} value={option._id}>
                {option.name}
              </MenuItem>
            ))}
          </Select>
        </Grid>

        <Grid item xs={12} sm={12} md={12} style={{ marginTop: "1rem" }}>
          <Grid
            container
            alignItems="center"
            style={{ marginBottom: "0.7rem" }}
          >
            <Grid item xs={6}>
              <Typography variant="h6">Custom Input Fields</Typography>
            </Grid>
            <Grid item xs={6} textAlign="right">
              <Button onClick={addTableRow} startIcon={<AddIcon />}>
                Add New Field
              </Button>
            </Grid>
          </Grid>

          {inputValue?.tableRows?.length > 0 && inputValue?.tableRows?.map((row, index) => (
            <React.Fragment key={row._id}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={5} style={{ marginBottom: "1rem" }}>
                  <TextField
                    name={`field_${index + 1}_name`}
                    label="Input Field Name"
                    fullWidth
                    value={row.fieldName}
                    onChange={(e) =>
                      handleTableRowChange(row._id, "fieldName", e.target.value)
                    }
                    variant="outlined"
                  />
                </Grid>

                <Grid item xs={5} style={{ marginBottom: "1rem" }}>
                  <Select
                    id={`field_${index + 1}_type`}
                    value={row.fieldType}
                    onChange={(e) =>
                      handleTableRowChange(row._id, "fieldType", e.target.value)
                    }
                    fullWidth
                    displayEmpty
                    renderValue={(value) =>
                      value ? value : <em>Choose input type</em>
                    }
                  >
                    {fieldTypeOptions.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>

                <Grid item xs={2} style={{ marginBottom: "1rem" }}>
                  <Button
                    onClick={() => deleteTableRow(row._id)}
                    startIcon={<DeleteIcon />}
                  >
                    Delete
                  </Button>
                </Grid>
              </Grid>
            </React.Fragment>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
};

function SimpleDialog({
  onClose,
  open,
  handleSubmit,
  inputValue,
  handleOnChange,
  handleLevelOfApprovalChange,
  addTableRow,
  handleTableRowChange,
  deleteTableRow,
  mailOptions,
  handleOnChangeForMail,
}) {
  return (
    <BootstrapDialog
      onClose={onClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle id="customized-dialog-title">
        Edit Template
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>
        <ReqForm
          inputValue={inputValue}
          handleOnChange={handleOnChange}
          handleLevelOfApprovalChange={handleLevelOfApprovalChange}
          addTableRow={addTableRow}
          handleTableRowChange={handleTableRowChange}
          deleteTableRow={deleteTableRow}
          mailOptions={mailOptions}
          handleOnChangeForMail={handleOnChangeForMail}
        />
      </DialogContent>
      <DialogActions>
        <Button
          autoFocus
          onClick={() => {
            handleSubmit(inputValue.id);
          }}
        >
          Update
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
}

function EditTemplate({ open, handleClose, data, mailOptions }) {
  const [inputValue, setInputValue] = useState({
    id: "",
    name: "",
    emailTemplate: "",
    remainderEmailTemplate: "",
    responseEmailTemplate: "",
    levelOfApproval: "",
    tableRows: [], // This will hold the rows of the dynamic table
  });

  useEffect(() => {
    if (open && data) {
      setInputValue({
        id: data._id || "",
        name: data.name || "",
        emailTemplate: data.emailTemplate || {},
        remainderEmailTemplate: data.remainderEmailTemplate || {},
        responseEmailTemplate: data.responseEmailTemplate || {},
        levelOfApproval: data.levelOfApproval || "",
        tableRows: data.tableRows || [],
      });
    }
  }, [open, data]);  

  const handleEdit = async (id) => {
    try {
        const { data } = await axios.put(
          `${process.env.REACT_APP_REQUEST_URL}/templates/update/${id}`,
          {
            ...inputValue,
          },
          { withCredentials: true }
        );
        console.log(data);
        const { success, message } = data;
        if (success) {
          handleSuccess(message);
          handleClose();
        } else {
          handleError(message);
          handleClose();
        }
      } catch (error) {
        console.log(error);
      }
  
      setInputValue({
        ...inputValue,
        id: "",
        name: "",
        emailTemplate: "",
        remainderEmailTemplate: "",
        responseEmailTemplate: "",
        levelOfApproval: "",
        tableRows: [],
      });
  }

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setInputValue((prevInputValue) => ({
      ...prevInputValue,
      [name]: value,
    }));
  };

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-left",
    });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLevelOfApprovalChange = (e) => {
    const level = parseInt(e.target.value, 10);
    setInputValue((prevState) => ({
      ...prevState,
      levelOfApproval: level,

      // this will create a new array of length level and assign default values using map function
      approvers: Array.from({ length: level }, (_, i) => ({
        id: i,
        name: "",
      })),
    }));
  };

  const handleOnChangeForMail = (e) => {
    const { name, value } = e.target;

    const selectedTemplate = mailOptions.find(
      (option) => option._id === value
    );

    setInputValue((prevState) => ({
      ...prevState,
      [name]: selectedTemplate._id,
    }));
  };

  // add rows
  const addTableRow = () => {
    setInputValue((prevState) => ({
      ...prevState,
      tableRows: [
        ...prevState.tableRows,
        { id: Date.now(), fieldName: "", fieldType: "" },
      ],
    }));
  };

  // handle row values
  const handleTableRowChange = (id, name, value) => {
    setInputValue((prevState) => ({
      ...prevState,
      tableRows: prevState.tableRows.map((row) =>
        row._id === id ? { ...row, [name]: value } : row
      ),
    }));
  };

  // delete rows
  const deleteTableRow = (id) => {
    setInputValue((prevState) => ({
      ...prevState,
      tableRows: prevState.tableRows.filter((row) => row._id !== id),
    }));
  };

  return <div>
    <SimpleDialog
        open={open}
        onClose={handleClose}
        handleSubmit={handleEdit}
        inputValue={inputValue}
        handleOnChange={handleOnChange}
        handleLevelOfApprovalChange={handleLevelOfApprovalChange}
        addTableRow={addTableRow}
        handleTableRowChange={handleTableRowChange}
        deleteTableRow={deleteTableRow}
        mailOptions={mailOptions}
        handleOnChangeForMail={handleOnChangeForMail}
      />
  </div>;
}

export default EditTemplate;
