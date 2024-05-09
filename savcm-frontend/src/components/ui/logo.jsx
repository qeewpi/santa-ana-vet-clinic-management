import { Link } from "react-router-dom";
import LogoDarkImg from "../../assets/images/logo-dark.png";
import LogoImg from "../../assets/images/logo.png";
import { useTheme } from "./theme-provider";

function Logo() {
  const theme = useTheme();

  return (
    <div className="flex flex-row items-center gap-2">
      <Link to="/dashboard/profile">
        {theme.theme === "light" ? (
          <img src={LogoImg} alt="Logo" className="w-40 md:w-48" />
        ) : (
          <img src={LogoDarkImg} alt="Logo" className="w-40 md:w-48" />
        )}
      </Link>
    </div>
  );
}

export default Logo;
