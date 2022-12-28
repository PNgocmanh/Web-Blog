import React from "react";
import Box from '@mui/material/Box';
import { CardHeader } from "@mui/material";
import Stack from '@mui/material/Stack';
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

function Footer(){
    return(
        <footer>
            <CardHeader
                sx={{
                    paddingTop: 0,
                    paddingBottom: 0,
                    paddingLeft:{
                        md: 20,
                        sm: 10
                    },
                    paddingRight:{
                        md: 20,
                        sm: 10
                    }
                }}
                title={
                    <Typography variant="h6" color="primary" sx={{ fontWeight: 600, paddingTop: 0}}>
                        mridula
                    </Typography>
                }
                subheader={
                    <Typography variant='caption'>
                        Copyright © 2022, Pham Ngoc Manh
                    </Typography>
                }
                action={
                    <Box sx={{ textAlign: 'center' }}>
                        <Typography sx={{ paddingBottom: 0.5 }}>Follow Me</Typography>
                        <Stack direction={'row'} spacing={2}>
                            <Link style={{ textDecoration: 'none' }} href="https://www.facebook.com/ngocmanh2000" target='blank'>
                                <FacebookIcon />
                            </Link>
                            <Link style={{ textDecoration: 'none'}} href="https://github.com/PNgocmanh" target='blank'>
                                <GitHubIcon />
                            </Link>
                            <Link style={{ textDecoration: 'none'}} href="https://www.linkedin.com/in/ng%E1%BB%8Dc-m%E1%BA%A1nh-a332bb245/" target='blank'>
                                <LinkedInIcon />
                            </Link>
                        </Stack>
                    </Box>
                }
            />
        </footer>
    );
}

export default Footer;

