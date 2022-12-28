import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { favoriteArticle, unfavoriteArticle } from "../redux/apiArticle";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Button from '@mui/material/Button';

function ButtonFavorite({ article }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.getUser.userLogin);
    
    const handleFavorite = (e) => {
        e.preventDefault();

        if(!article.favorited) favoriteArticle(article.slug, dispatch);
        else unfavoriteArticle(article.slug, dispatch);
    }

    return(
        <>  
            {!user ? (
                <Button onClick={()=>navigate('/login')}    
                >
                    <FavoriteBorderIcon /> {article.favoritesCount} Like
                </Button>
            ): (
                <Button onClick={handleFavorite}    
                >
                    {article.favorited ? (
                        <FavoriteIcon />
                    ):(
                        <FavoriteBorderIcon />    
                    )}
                    {article.favoritesCount} Like
                </Button>
            )}
        </>
    ); 
}

export default ButtonFavorite;