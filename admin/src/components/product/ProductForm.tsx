import { useCallback, useState } from "react";
import * as Yup from "yup";
import PropTypes from "prop-types";
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
import {
  ref,
  uploadBytes,
  UploadResult,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { storage } from "../../framework/firebase";

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

// source: https://api.ximilar.com/tagging/fashion/v2/top_categories
const TAGS_OPTION = [
  "Baby Clothes",
  "Bathrobes",
  "Dresses",
  "Jackets and Coats",
  "Nightwear",
  "Overalls and Dungarees",
  "Pants",
  "Skirts",
  "Upper",
  "Ballerinas",
  "Chelsea and Ankle boots",
  "Crocs",
  "Desert Boots",
  "Espadrilles",
  "Flip-Flops",
  "Formal Shoes",
  "Free Time Shoes",
  "Hiking",
  "Ladies High Boots",
  "Mary Jane Shoes",
  "Mules",
  "Pumps",
  "Rubber Boots",
  "Sandals",
  "Ski Boots",
  "Slippers",
  "Sneakers",
  "Snow Boots",
  "Trainers",
  "Bracelets",
  "Brooches, Badges and Pins",
  "Cufflinks",
  "Earrings and Earcuffs",
  "Keyrings",
  "Necklaces, Pendants and Chains",
  "Rings",
  "Pins and Clips",
  "Backpacks",
  "Bum Bags",
  "Luggage",
  "Men's Bags",
  "Purses and Wallets",
  "Women's Bags",
  "Bag Straps",
  "Belts",
  "Eyewear",
  "Gloves",
  "Hats and Caps",
  "Scarves",
  "Suspenders",
  "Ties",
  "Bodies",
  "Bras",
  "Panties and Underpants",
  "Sets",
  "Socks",
  "Tights",
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
  const [firImages, setFirImages] = useState<any>([]);

  const NewProductSchema = Yup.object().shape({
    title: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
    images: Yup.array().min(1, "Images is required"),
    price: Yup.number().required("Price is required"),
  });

  const formik = useFormik({
    enableReinitialize: false,
    initialValues: {
      title: currentProduct?.title || "",
      description: currentProduct?.description || "",
      images: currentProduct?.images || [],
      sku: currentProduct?.sku || "",
      price: currentProduct?.price || "",
      salePrice: currentProduct?.salePrice || "",
      tags: currentProduct?.tags || [TAGS_OPTION[0]],
      inStock: true,
      gender: currentProduct?.gender || GENDER_OPTION[0],
      category: currentProduct?.category || CATEGORY_OPTION[0].classify[1],
    },
    validationSchema: NewProductSchema,

    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      values.images = firImages.map((image: any) => image.url);
      submitProduct(values);
      setFirImages([]);
      try {
        resetForm();
        setSubmitting(false);
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
    (acceptedFiles: any) => {
      setFieldValue(
        "images",
        acceptedFiles.map((file: any) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
      acceptedFiles.map((file: any) => uploadToStorage(file));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setFieldValue]
  );

  const handleRemoveAll = () => {
    firImages.map((image: any) => deleteFromStorage(image));
    setFieldValue("images", []);
  };

  const updateStateImages = (url: string, ref: any, name: string) => {
    const val = { ref, url, name };
    const fmg = firImages;
    fmg.push(val);
    setFirImages(fmg);
  };

  const uploadToStorage = (file: any | File) => {
    const name = file.name.split(".")[0];
    const imageRef = ref(storage, `products/${name}-${generateId()}`);
    uploadBytes(imageRef, file)
      .then((value: UploadResult) => {
        if (value.ref) {
          getDownloadURL(value.ref).then((url) => {
            updateStateImages(url, imageRef, name);
          });
        } else {
          console.log("error occured: ", value);
        }
      })
      .catch((error) => {
        console.log("error: ", error);
      });
  };

  const deleteFromStorage = (image: any) => {
    const imageRef = ref(storage, image.ref.fullPath);
    deleteObject(imageRef)
      .then(() => console.log("success res"))
      .catch((error) => console.log("error occured: ", error));
  };

  const handleRemove = (file: any) => {
    const imgname = file?.name.split(".")[0];
    const filteredImages = firImages.filter((image: any) => {
      if (image.name === imgname) deleteFromStorage(image);
      return image.name !== imgname;
    });
    setFirImages(filteredImages);
    const filteredItems = values.images.filter((_file: any) => _file !== file);
    setFieldValue("images", filteredItems);
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
                  label="Product Title"
                  {...getFieldProps("title")}
                  error={Boolean(touched.title && errors.title)}
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
                    {...getFieldProps("salePrice")}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                      ),
                      type: "number",
                    }}
                  />
                </Stack>
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
