import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListAltRoundedIcon from "@mui/icons-material/ListAltRounded";
import ListItemText from "@mui/material/ListItemText";
import TaskRoundedIcon from "@mui/icons-material/TaskRounded";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import Drawer from "@mui/material/Drawer";
import {useNavigate} from "react-router-dom";

interface Props {
    setPageTitle: (str: string) => void
}


const NavBar = ({setPageTitle}: Props) => {

    const navigate = useNavigate()

    const drawer = (
        <div>
            <Toolbar/>
            <Divider/>
            <List>
                <ListItem disablePadding onClick={()=> {
                    setPageTitle('Курсы')
                    navigate('/courses')
                }}>
                    <ListItemButton>
                        <ListItemIcon>
                            <ListAltRoundedIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Курсы'}/>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding onClick={()=> {
                    setPageTitle('Расписание')
                    navigate('/timetable')
                }}>
                    <ListItemButton>
                        <ListItemIcon>
                            <CalendarMonthRoundedIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Расписание'}/>
                    </ListItemButton>
                </ListItem>
            </List>
        </div>
    );

    return (
        <div>
            <Drawer
                variant="permanent"
                sx={{
                    display: {sm: 'block'},
                    '& .MuiDrawer-paper': {boxSizing: 'border-box', width: 240},
                }}
                open
            >
                {drawer}
            </Drawer>
        </div>
    );
};

export default NavBar;