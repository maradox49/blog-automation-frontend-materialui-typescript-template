import { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    Container,
    Divider,
    OutlinedInput,
    IconButton,
    Tooltip,
    FormControl,
    InputAdornment,
    Button,
    FormHelperText,
    Grid,
    useTheme,
    Stack
} from '@mui/material';
import { Helmet } from 'react-helmet-async';
import Logo from 'src/components/LogoSign';

import { styled } from '@mui/material/styles';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import MailTwoToneIcon from '@mui/icons-material/MailTwoTone';
import { Password, Person, VpnKey } from '@mui/icons-material';
import { useNavigate } from 'react-router';

const MainContent = styled(Box)(
    () => `
    height: 100%;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
);

const TypographyH1 = styled(Typography)(
    ({ theme }) => `
  font-size: ${theme.typography.pxToRem(75)};
`
);

const TypographyH3 = styled(Typography)(
    ({ theme }) => `
  color: ${theme.colors.alpha.black[50]};
`
);

const OutlinedInputWrapper = styled(OutlinedInput)(
    ({ theme }) => `
    background-color: ${theme.colors.alpha.white[100]};
`
);

const ButtonNotify = styled(Button)(
    ({ theme }) => `
    margin-right: -${theme.spacing(1)};
`
);

function Login() {
    const calculateTimeLeft = () => {
        const difference = +new Date(`2023`) - +new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60)
            };
        }

        return timeLeft;
    };
    const theme = useTheme();
    const navigate = useNavigate();

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
    });

    const timerComponents = [];

    Object.keys(timeLeft).forEach((interval) => {
        if (!timeLeft[interval]) {
            return;
        }

        timerComponents.push(
            <Box textAlign="center" px={3}>
                <TypographyH1 variant="h1">{timeLeft[interval]}</TypographyH1>
                <TypographyH3 variant="h3">{interval}</TypographyH3>
            </Box>
        );
    });

    return (
        <>
            <Helmet>
                <title>Status - Coming Soon</title>
            </Helmet>
            <Grid container>
                <Grid item md={5}>
                    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
                        <Logo />
                        <Typography variant='h1' color={theme.colors.primary.light} paddingBottom={20} textAlign={"center"}>
                            WELCOME TO <br />AUTOMATION OF SINGLEQUIVER
                        </Typography>
                    </Box>
                </Grid>
                <Grid item md={7}>
                    <Box sx={{ background: theme.colors.alpha.black["5"] }} display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
                        <Stack spacing={2} width={500}>
                            <OutlinedInput
                                fullWidth
                                sx={{
                                    "& fieldset": { border: 'none' },
                                    background: "white"
                                }}
                                id="outlined-adornment-amount"
                                startAdornment={<InputAdornment position="start"><Person color='primary' /></InputAdornment>}
                                placeholder='Username'
                            />
                            <OutlinedInput
                                fullWidth
                                sx={{
                                    "& fieldset": { border: 'none' },
                                    background: "white"
                                }}
                                id="outlined-adornment-amount"
                                startAdornment={<InputAdornment position="start"><VpnKey color='primary' /></InputAdornment>}
                                placeholder='Password'
                            />
                            <Button fullWidth variant='contained' 
                            onClick={()=>navigate("/management/blogs")}
                            >LOGIN</Button>
                        </Stack>
                    </Box>
                </Grid>
            </Grid>
        </>
    );
}

export default Login;
