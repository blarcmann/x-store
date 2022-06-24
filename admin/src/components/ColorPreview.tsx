import PropTypes from 'prop-types';
import { alpha, styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';

const RootStyle = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'centlefter',
});

const IconStyle = styled('div')(({ theme }) => ({
  marginLeft: -4,
  borderRadius: '50%',
  width: theme.spacing(3),
  height: theme.spacing(3),
  border: `solid 2px ${theme.palette.background.paper}`,
  boxShadow: `inset -1px 1px 2px ${alpha(theme.palette.common.black, 0.24)}`,
}));


ColorPreview.propTypes = {
  colors: PropTypes.array.isRequired,
  limit: PropTypes.number,
};

export default function ColorPreview({ colors, limit = 4, ...other }: any) {
  const showColor = colors.slice(0, limit);
  const moreColor = colors.length - limit;

  return (
    <RootStyle component="span" {...other}>
      {showColor.map((color: any, index: any) => (
        <IconStyle key={color + index} sx={{ bgcolor: color }} />
      ))}

      {colors.length > limit && <Typography variant="subtitle2">{`+${moreColor}`}</Typography>}
    </RootStyle>
  );
}
