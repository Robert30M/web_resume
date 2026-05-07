import { Avatar, Box, SpeedDial, SpeedDialAction, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import WorkIcon from '@mui/icons-material/Work';
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import Grid from "@mui/material/Grid2";

const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(5),
  right: '5rem',
}));

const actions = [
  { icon: <WorkIcon />, name: 'Experiences' },
  { icon: <AutoAwesomeMotionIcon/>, name: 'Skills' },
  { icon: <PermContactCalendarIcon />, name: 'Contacts' },
];


export default function Header() {
  return (
      <Grid size = {{lg: 12}}>
      <Box sx={{ position: 'relative', minHeight: 120 }}>
        <Typography variant="h4" sx={{ textAlign: 'left', paddingTop: 5, paddingLeft: 5 }}>
          Robert Melente | Portfolio
        </Typography>
        <StyledSpeedDial
          ariaLabel="Career Shortcuts"
          icon={
            <Avatar
              alt="Resume Logo"
              src="/src/assets/img/web_logo.png"
              sx={{ width: 80, height: 80 }}
            />
          }
          direction="left"
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              slotProps={{
                tooltip: {
                  title: action.name,
                },
              }}
            />
          ))}
        </StyledSpeedDial>
      </Box>
      </Grid>
  );
}