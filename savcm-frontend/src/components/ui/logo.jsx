import LogoDarkImg from "../../assets/images/logo-dark.png";
import LogoImg from "../../assets/images/logo.png";
import { useTheme } from "./theme-provider";

function Logo() {
  const theme = useTheme();

  return (
    <div className="flex flex-row items-center gap-2">
      {theme.theme === "light" ? (
        <img src={LogoImg} alt="Logo" className="w-[16rem] -mt-1" />
      ) : (
        <img src={LogoDarkImg} alt="Logo" className="w-[17rem] -ml-2" />
      )}
    </div>
  );
}

export default Logo;
