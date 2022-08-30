import { isString } from "lodash";
import { useDropzone } from "react-dropzone";
import Icone from "../Icon";
import { motion, AnimatePresence } from "framer-motion";
// material
import { alpha, experimentalStyled as styled } from "@mui/material/styles";
import {
  Box,
  List,
  Link,
  Stack,
  Paper,
  Button,
  ListItem,
  Typography,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
} from "@mui/material";
// utils
import { fData } from "../../utils/helpers";

// ----------------------------------------------------------------------

const DISTANCE = 120;
const TRANSITION_ENTER = {
  duration: 0.64,
  ease: [0.43, 0.13, 0.23, 0.96],
};

const TRANSITION_EXIT = {
  duration: 0.48,
  ease: [0.43, 0.13, 0.23, 0.96],
};

const varFadeInRight = {
  initial: { x: DISTANCE, opacity: 0 },
  animate: { x: 0, opacity: 1, transition: TRANSITION_ENTER },
  exit: { x: DISTANCE, opacity: 0, transition: TRANSITION_EXIT },
};

const DropZoneStyle = styled("div")(({ theme }) => ({
  outline: "none",
  display: "flex",
  textAlign: "center",
  alignItems: "center",
  flexDirection: "column",
  justifyContent: "center",
  padding: theme.spacing(5, 1),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "#eef3ff",
  border: `1px dashed grey`,
  "&:hover": { opacity: 0.72, cursor: "pointer" },
  [theme.breakpoints.up("md")]: { textAlign: "left", flexDirection: "row" },
}));

interface UploadFileProps {
  error: boolean;
  showPreview: boolean;
  files?: any;
  onRemove: (v: any) => void;
  onRemoveAll: (v: any) => void;
  sx?: any;
  maxSize?: number;
  accept?: any;
  onDrop?: any;
}

export default function UploadFile({
  error,
  showPreview = false,
  files,
  onRemove,
  onRemoveAll,
  sx,
  ...other
}: UploadFileProps) {
  const hasFile = files.length > 0;

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
    fileRejections,
  } = useDropzone({
    ...other,
  });

  const ShowRejectionItems = () => (
    <Paper
      variant="outlined"
      sx={{
        py: 1,
        px: 2,
        mt: 3,
        borderColor: "error.light",
        bgcolor: (theme) => alpha(theme.palette.error.main, 0.08),
      }}
    >
      {fileRejections.map(({ file, errors }) => {
        const { path, size }: any = file;
        return (
          <Box key={path} sx={{ my: 1 }}>
            <Typography variant="subtitle2" noWrap>
              {path} - {fData(size)}
            </Typography>
            {errors.map((e) => (
              <Typography key={e.code} variant="caption" component="p">
                - {e.message}
              </Typography>
            ))}
          </Box>
        );
      })}
    </Paper>
  );

  return (
    <Box sx={{ width: "100%", ...sx }}>
      <DropZoneStyle
        {...getRootProps()}
        sx={{
          ...(isDragActive && { opacity: 0.72 }),
          ...((isDragReject || error) && {
            color: "error.main",
            borderColor: "error.light",
            bgcolor: "error.lighter",
          }),
        }}
      >
        <input {...getInputProps()} />

        <img src={require("../assets/upload.png")} alt="" style={{width: '220px', borderRadius: '16px'}} />

        <Box sx={{ p: 3, ml: { md: 2 } }}>
          <Typography gutterBottom variant="h5">
            Drop or Select file
          </Typography>

          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Drop files here or click&nbsp;
            <Link underline="always">browse</Link>&nbsp;thorough your machine
          </Typography>
        </Box>
      </DropZoneStyle>

      {fileRejections.length > 0 && <ShowRejectionItems />}

      <List disablePadding sx={{ ...(hasFile && { my: 3 }) }}>
        <AnimatePresence>
          {files.map((file: any) => {
            const { name, size, preview } = file;
            const key = isString(file) ? file : name;

            if (showPreview) {
              return (
                <ListItem
                  key={key}
                  component={motion.div}
                  {...varFadeInRight}
                  sx={{
                    p: 0,
                    m: 0.5,
                    width: 80,
                    height: 80,
                    borderRadius: 1.5,
                    overflow: "hidden",
                    position: "relative",
                    display: "inline-flex",
                  }}
                >
                  <Paper
                    variant="outlined"
                    component="img"
                    src={isString(file) ? file : preview}
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      position: "absolute",
                    }}
                  />
                  <Box sx={{ top: 6, right: 6, position: "absolute" }}>
                    <Button
                      size="small"
                      onClick={() => onRemove(file)}
                      sx={{
                        p: "2px",
                        color: "common.white",
                        bgcolor: (theme) =>
                          alpha(theme.palette.grey[900], 0.72),
                        "&:hover": {
                          bgcolor: (theme) =>
                            alpha(theme.palette.grey[900], 0.48),
                        },
                      }}
                    >
                      <Icone icon="eva:close-fill" />
                    </Button>
                  </Box>
                </ListItem>
              );
            }

            return (
              <ListItem
                key={key}
                component={motion.div}
                {...varFadeInRight}
                sx={{
                  my: 1,
                  py: 0.75,
                  px: 2,
                  borderRadius: 1,
                  border: (theme) => `solid 1px ${theme.palette.divider}`,
                  bgcolor: "background.paper",
                }}
              >
                <ListItemIcon>
                  <Icone icon="eva:file-fill" width={28} height={28} />
                </ListItemIcon>
                <ListItemText
                  primary={isString(file) ? file : name}
                  secondary={isString(file) ? "" : fData(size)}
                  primaryTypographyProps={{ variant: "subtitle2" }}
                  secondaryTypographyProps={{ variant: "caption" }}
                />
                <ListItemSecondaryAction>
                  <Button size="small" onClick={() => onRemove(file)}>
                    <Icone icon="close-fill" />
                  </Button>
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        </AnimatePresence>
      </List>

      {hasFile && (
        <Stack direction="row" justifyContent="flex-end">
          <Button onClick={onRemoveAll} sx={{ mr: 1.5 }}>
            Remove all
          </Button>
          <Button variant="contained">Upload files</Button>
        </Stack>
      )}
    </Box>
  );
}
