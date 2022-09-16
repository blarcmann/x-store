import * as Yup from "yup";
import PropTypes from "prop-types";
import { useCallback } from "react";
import { Form, FormikProvider, useFormik } from "formik";
import { experimentalStyled as styled } from "@mui/material/styles";
import {
  Card,
  Chip,
  Grid,
  Stack,
  Radio,
  Switch,
  Select,
  TextField,
  InputLabel,
  Typography,
  RadioGroup,
  FormControl,
  Autocomplete,
  InputAdornment,
  FormHelperText,
  FormControlLabel,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import UploadFile from "./UploadFile";
import { generateId } from "../../utils/helpers";
import { ref, uploadBytes, UploadResult, getDownloadURL } from "firebase/storage";
import {storage} from '../../framework/firebase';

const GENDER_OPTION = ["Men", "Women", "Kids"];

const CATEGORY_OPTION = [
  { group: "Clothing", classify: ["Shirts", "T-shirts", "Jeans", "Leather"] },
  {
    group: "Tailored",
    classify: ["Suits", "Blazers", "Trousers", "Waistcoats"],
  },
  {
    group: "Accessories",
    classify: ["Shoes", "Backpacks and bags", "Bracelets", "Face masks"],
  },
];

const TAGS_OPTION = [
  "Toy Story 3",
  "Logan",
  "Full Metal Jacket",
  "Dangal",
  "The Sting",
  "2001: A Space Odyssey",
  "Singin' in the Rain",
  "Toy Story",
  "Bicycle Thieves",
  "The Kid",
  "Inglourious Basterds",
  "Snatch",
  "3 Idiots",
];

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

ProductForm.propTypes = {
  isEdit: PropTypes.bool,
  currentProduct: PropTypes.object,
};

export default function ProductForm({
  isEdit,
  currentProduct,
  submitProduct,
}: any) {
  const NewProductSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
    images: Yup.array().min(1, "Images is required"),
    price: Yup.number().required("Price is required"),
  });

  console.log("getRandomInt: ", generateId());

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: currentProduct?.name || "",
      description: currentProduct?.description || "",
      images: currentProduct?.images || [],
      code: currentProduct?.code || "",
      sku: currentProduct?.sku || "",
      price: currentProduct?.price || "",
      priceSale: currentProduct?.priceSale || "",
      tags: currentProduct?.tags || [TAGS_OPTION[0]],
      inStock: Boolean(currentProduct?.inventoryType !== "out_of_stock"),
      taxes: true,
      gender: currentProduct?.gender || GENDER_OPTION[2],
      category: currentProduct?.category || CATEGORY_OPTION[0].classify[1],
    },
    validationSchema: NewProductSchema,

    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        // await fakeRequest(500);
        resetForm();
        setSubmitting(false);
        // enqueueSnackbar(!isEdit ? 'Create success' : 'Update success', { variant: 'success' });
      } catch (error: any) {
        console.error(error);
        setSubmitting(false);
        setErrors(error);
      }
    },
  });

  const {
    errors,
    values,
    touched,
    handleSubmit,
    isSubmitting,
    setFieldValue,
    getFieldProps,
  } = formik;

  const handleDrop = useCallback(
    (acceptedFiles: any[]) => {
      setFieldValue(
        "images",
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
    [setFieldValue]
  );

  const handleRemoveAll = () => {
    setFieldValue("images", []);
  };

  const handleRemove = (file: any) => {
    const imagename = file.name.split('.');
    const imageRef = ref(storage, `products/${imagename[0]}-${generateId()}`);
    uploadBytes(imageRef, file).then((value: UploadResult) => {
      if (value.ref) {
        getDownloadURL(value.ref).then(url => {
          console.log('URL', url);
        })
      } else {
        console.log('error occured: ', value);
      }
    });
    // const filteredItems = values.images.filter((_file: any) => _file !== file);
    // setFieldValue("images", filteredItems);
  };

  return (
    <FormikProvider value={formik}>
      <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <TextField
                  fullWidth
                  label="Product Name"
                  {...getFieldProps("name")}
                  error={Boolean(touched.name && errors.name)}
                />

                <div style={{ height: "300px" }}>
                  <LabelStyle>Description</LabelStyle>
                  <ReactQuill
                    id="product-description"
                    placeholder="Enter product details"
                    value={values.description}
                    onChange={(val) => setFieldValue("description", val)}
                    style={{
                      height: "220px",
                      borderRadius: "16px",
                      overflowY: "visible",
                    }}
                  />
                  {touched.description && errors.description && (
                    <FormHelperText error sx={{ px: 2 }}>
                      Field cannot be empty
                    </FormHelperText>
                  )}
                </div>

                <div>
                  <LabelStyle>Add Images</LabelStyle>
                  <UploadFile
                    showPreview
                    maxSize={3145728}
                    accept={{
                      "image/*": [".png", ".jpeg", ".jpg"],
                    }}
                    files={values.images}
                    onDrop={handleDrop}
                    onRemove={handleRemove}
                    onRemoveAll={handleRemoveAll}
                    error={Boolean(touched.images && errors.images)}
                  />
                  {touched.images && errors.images && (
                    <FormHelperText error sx={{ px: 2 }}>
                      Please add product images
                    </FormHelperText>
                  )}
                </div>
              </Stack>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Stack spacing={3}>
              <Card sx={{ p: 3 }}>
                <FormControlLabel
                  control={
                    <Switch
                      {...getFieldProps("inStock")}
                      checked={values.inStock}
                    />
                  }
                  label="In stock"
                  sx={{ mb: 2 }}
                />

                <Stack spacing={3}>
                  <TextField
                    fullWidth
                    label="Product Code"
                    {...getFieldProps("code")}
                  />
                  <TextField
                    fullWidth
                    label="Product SKU"
                    {...getFieldProps("sku")}
                  />

                  <div>
                    <LabelStyle>Gender</LabelStyle>
                    <RadioGroup {...getFieldProps("gender")} row>
                      <Stack spacing={1} direction="row">
                        {GENDER_OPTION.map((gender) => (
                          <FormControlLabel
                            key={gender}
                            value={gender}
                            control={<Radio />}
                            label={gender}
                          />
                        ))}
                      </Stack>
                    </RadioGroup>
                  </div>

                  <FormControl fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select
                      label="Category"
                      native
                      {...getFieldProps("category")}
                      value={values.category}
                    >
                      {CATEGORY_OPTION.map((category) => (
                        <optgroup key={category.group} label={category.group}>
                          {category.classify.map((classify) => (
                            <option key={classify} value={classify}>
                              {classify}
                            </option>
                          ))}
                        </optgroup>
                      ))}
                    </Select>
                  </FormControl>
                  <Autocomplete
                    multiple
                    freeSolo
                    value={values.tags}
                    onChange={(event, newValue) => {
                      setFieldValue("tags", newValue);
                    }}
                    options={TAGS_OPTION.map((option) => option)}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip
                          size="small"
                          label={option}
                          {...getTagProps({ index })}
                        />
                      ))
                    }
                    renderInput={(params) => (
                      <TextField label="Tags" {...params} />
                    )}
                  />
                </Stack>
              </Card>

              <Card sx={{ p: 3 }}>
                <Stack spacing={3}>
                  <TextField
                    fullWidth
                    placeholder="0.00"
                    label="Regular Price"
                    {...getFieldProps("price")}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                      ),
                      type: "number",
                    }}
                    error={Boolean(touched.price && errors.price)}
                  />

                  <TextField
                    fullWidth
                    placeholder="0.00"
                    label="Sale Price"
                    {...getFieldProps("priceSale")}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                      ),
                      type: "number",
                    }}
                  />
                </Stack>

                <FormControlLabel
                  control={
                    <Switch
                      {...getFieldProps("taxes")}
                      checked={values.taxes}
                    />
                  }
                  label="Price includes taxes"
                  sx={{ mt: 2 }}
                />
              </Card>

              <LoadingButton
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                loading={isSubmitting}
              >
                {!isEdit ? "Create Product" : "Save Changes"}
              </LoadingButton>
            </Stack>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}
