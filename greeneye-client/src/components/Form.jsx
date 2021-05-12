import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import SendIcon from "@material-ui/icons/Send";
import { CircularProgress } from "@material-ui/core";
import React, { useState, useCallback } from 'react';
import AlertSnackbar from "./AlertSnackbar";
import { useFormik } from "formik";
import * as yup from "yup";
import API from '../services/api';

const validationSchema = yup.object({
    k: yup
      .number("Enter the desired number of clusters")
      .positive("You can't have a negative number of clusters")
      .integer("We both know it should be an integer")
      .required("Required!"),
    iterations: yup
        .number("Enter the desired number of iterations")
        .positive("You can't have a negative number of iterations")
        .integer("We both know it should be an integer")
        .required("Required!"),
    imagesToProcess: yup.
        number("Enter the desired number of images to process")
        .positive("You can't have a negative number of images")
        .integer("We both know it should be an integer")
        .max(60000, "I'm sorry but there are ONLY 60,000 images")
        .required("Required!")
  });


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Form({setResponse}) {
  const classes = useStyles();
  const [alertSnackbar, setAlertSnackbar] = useState({type: "", message: ""});
  const [isSubmitting, setIsSubmitting] = useState(false); 

  const formik = useFormik({
    initialValues: {
      k: "",
      iterations: "",
      imagesToProcess: "",
    },
    validationSchema: validationSchema,
    onSubmit: () => {
      submit();
    },
  });

  const submit = useCallback(async () => {
    setIsSubmitting(true);
    try {
      const response = await API.getClusters(
        formik.values.k,
        formik.values.iterations,
        formik.values.imagesToProcess,
      );
      setResponse(response.data.response);
      formik.resetForm();
      setAlertSnackbar({type: "success", message: response.data.message});
    } catch(error) {
      setAlertSnackbar({type: "error", message: error.response.data.error || error.toString()});
    }
    setIsSubmitting(false);
  }, [formik.values, isSubmitting]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Settings
        </Typography>
        <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="k"
          name="k"
          label="Number of clusters"
          value={formik.values.k}
          onChange={formik.handleChange}
          error={formik.touched.k && Boolean(formik.errors.k)}
          helperText={formik.touched.k && formik.errors.k}
        />
        <TextField
          fullWidth
          id="iterations"
          name="iterations"
          label="Iterations"
          value={formik.values.iterations}
          onChange={formik.handleChange}
          error={
            formik.touched.iterations && Boolean(formik.errors.iterations)
          }
          helperText={formik.touched.iterations && formik.errors.iterations}
        />
        <TextField
          fullWidth
          id="imagesToProcess"
          name="imagesToProcess"
          label="Number of images to process"
          value={formik.values.imagesToProcess}
          onChange={formik.handleChange}
          error={
            formik.touched.imagesToProcess && Boolean(formik.errors.imagesToProcess)
          }
          helperText={formik.touched.imagesToProcess && formik.errors.imagesToProcess}
        />
        {isSubmitting ? (
            <div>
                <Typography variant="h1"/>
                <CircularProgress/>
            </div>
        ) : (
          <Button
            color="primary"
            variant="contained"
            fullWidth
            type="submit"
            startIcon={<SendIcon />}
          >
            Submit New Clusters Request
          </Button>
        )}
        <AlertSnackbar type={alertSnackbar.type} message={alertSnackbar.message}/>
      </form>
      </div>
    </Container>
  );
}