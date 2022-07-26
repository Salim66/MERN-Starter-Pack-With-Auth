import createError from "../controllers/errorController.js";
import jwt from 'jsonwebtoken';



// Check usee is authentiacated and Admin or not
export const adminMiddleware = (req, res, next) => {

    try {
        
        const token = req.cookies.access_token;

        // check logged in token has or not
        if( !token ){
            return next(createError(401, 'You are not authenticated'));
        }

        // If logged in 
        const login_user = jwt.verify(token, process.env.JWT_SECRET);

        if( !login_user ){
            return next(createError(401, 'Invalid Token'));
        }

        if( !login_user.isAdmin ){
            return next(createError(401, 'Only admin can access this features'));
        }
        
        if( login_user ){
            req.user = login_user;
            next();
        }


    } catch (error) {
        next(error);
    }

}