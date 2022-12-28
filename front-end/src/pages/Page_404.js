import React from 'react';
import { useNavigate } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid'; 
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

function Page_404(){
    const navigate = useNavigate();
    return (
        <Container>
            <Grid container justifyContent={'center'} item xs={12} md={12} sx={{ marginTop: 2 }}>
                <Card>
                    <CardMedia
                        component="img"
                        alt="green iguana"
                        image="../../assets/image/404.jpg"
                    />
                    <CardContent>
                        <Typography variant="h6" component="div" sx={{ textAlignLast: 'center', marginBottom: 3 }}>
                            Không tìm thấy trang bạn yêu cầu!
                        </Typography>
                        <Stack direction="row" spacing={2} sx={{ justifyContent: 'center' }}>
                            <Button variant="contained" color="info" onClick={()=>navigate('/')}>Homepage</Button>
                        </Stack>
                    </CardContent>
                </Card>
            </Grid>
        </Container>
    );
}

export default Page_404;