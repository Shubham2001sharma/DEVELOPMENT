import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  AppBar,
  Toolbar,
  Button,
  Card,
  CardContent,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import EditIcon from "@mui/icons-material/Edit";
import Slide from "@mui/material/Slide";

function App() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [data, setData] = useState(() => {
    const storedData = localStorage.getItem("data");
    return storedData ? JSON.parse(storedData) : [];
  });
  const [editIndex, setEditIndex] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [open, setOpen] = useState(false); // State for dialog visibility
  const [deleteIndex, setDeleteIndex] = useState(null); // State to store the index of item to be deleted

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(data));
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editMode) {
      const updatedData = [...data];
      updatedData[editIndex] = { title, description };
      setData(updatedData);
      setEditMode(false);
      setTitle("");
      setDescription("");
    } else {
      try {
        const response = await axios.post("http://localhost:5000/sendData", {
          title,
          description,
        });
        toast.success("Data received from server");
        setData([...data, { title, description }]);
        setTitle("");
        setDescription("");
      } catch (error) {
        console.error("Error:", error);
        toast.error("Data submission failed");
      }
    }
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditMode(true);
    setTitle(data[index].title);
    setDescription(data[index].description);
  };

  const handleDelete = (index) => {
    setDeleteIndex(index); // Set the index of the item to be deleted
    setOpen(true); // Open the dialog
  };

  const handleConfirmDelete = () => {
    const newData = [...data];
    newData.splice(deleteIndex, 1);
    setData(newData);
    setOpen(false); // Close the dialog
  };

  const handleCloseDialog = () => {
    setOpen(false); // Close the dialog
  };

  return (
    <>
      <Container maxWidth="sm" sx={{ mt: 5 }}>
        <Card variant="outlined" sx={{ borderColor: "black" }}>
          <CardContent>
            <AppBar position="static" sx={{ mb: 2 }}>
              <Toolbar>
                <Typography variant="h6">Backend to Frontend</Typography>
              </Toolbar>
            </AppBar>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Title"
                color="success"
                focused
                type="text"
                placeholder="Enter title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                error={title.trim() === ""}
                helperText={title.trim() === "" ? "Title is required" : ""}
                sx={{
                  mb: 2,
                  "& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline": {
                    borderColor: "green",
                  },
                }}
              />
              <TextField
                fullWidth
                label="Description"
                color="success"
                focused
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                error={description.trim() === ""}
                helperText={
                  description.trim() === "" ? "Description is required" : ""
                }
                sx={{
                  mb: 2,
                  "& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline": {
                    borderColor: "green",
                  },
                }}
              />
              <Button
                variant="contained"
                color="success"
                type="submit"
                endIcon={<ArrowForwardIcon />}
              >
                {editMode ? "UPDATE" : "SUBMIT"}
              </Button>
            </form>

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.title}</TableCell>
                      <TableCell>{item.description}</TableCell>
                      <TableCell>
                        <Button
                          variant="outlined"
                          size="medium"
                          onClick={() => handleEdit(index)}
                          endIcon={<EditIcon />}
                          sx={{ marginRight: 1 }}
                        >
                          EDIT
                        </Button>
                        <Button
                          variant="outlined"
                          endIcon={<DeleteIcon />}
                          color="error"
                          onClick={() => handleDelete(index)}
                        >
                          DELETE
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Delete Confirmation Dialog */}
            <Dialog open={open} onClose={handleCloseDialog}>
              <DialogTitle>Confirm Delete</DialogTitle>
              <DialogContent>
                <Typography variant="h5">Are you sure you want to delete this item?</Typography>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialog}>Cancel</Button>
                <Button onClick={handleConfirmDelete} color="error">
                  Delete
                </Button>
              </DialogActions>
            </Dialog>
          </CardContent>
        </Card>
      </Container>

      <br />
      <ToastContainer />
    </>
  );
}

export default App;