import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

interface Props {
    pageTitle: string
}

const Header = ({pageTitle}: Props) => {
    return (
        <div>
            <CssBaseline/>
            <AppBar
                position="fixed"
                sx={{
                    width: {sm: `calc(100% - 240px)`},
                }}
            >
                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        {pageTitle}
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default Header;