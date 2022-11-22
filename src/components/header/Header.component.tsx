import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const Header = () => {
    return (
        <div>
            <CssBaseline/>
            <AppBar
            >
                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        Vetraz
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default Header;