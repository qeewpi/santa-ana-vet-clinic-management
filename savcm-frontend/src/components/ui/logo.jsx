import { Link } from "react-router-dom";
import LogoDarkImg from "../../assets/images/logo-dark.png";
import LogoImg from "../../assets/images/logo.png";
import { useTheme } from "./theme-provider";

function Logo() {
  const theme = useTheme();

  return (
    <div className="flex flex-row items-center gap-2">
      <Link to="/">
        {theme.theme === "light" ? (
          <img src={LogoImg} alt="Logo" className="w-1/2" />
        ) : (
          <img src={LogoDarkImg} alt="Logo" className="w-1/2" />
        )}
      </Link>
    </div>
  );
}

export default Logo;
