import Courses from "../pages/courses/courses.component";
import Timetable from "../pages/timetable/timetable.component";

export const privateRoutes = [
    {path: '/*', component: <Courses />},
    {path: '/timetable', component: <Timetable />},
]

// export const publicRoutes = [
//     {path: '/*', component: <Login />},
// ]