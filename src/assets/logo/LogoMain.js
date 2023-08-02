// material-ui
import { useTheme } from '@mui/material/styles';

/**
 * Import the logo PNG files
 */
import logoIconDark from 'assets/logo-dark.png';
import logoIcon from 'assets/logo-text.png';

// ==============================|| LOGO ICON SVG ||============================== //

const LogoIcon = () => {
  const theme = useTheme();

  return (
    <img
      src={theme.palette.mode === 'dark' ? logoIconDark : logoIcon}
      alt="Mantis"
    // width="100"
    // height={100}
    />
  );
};

export default LogoIcon;
