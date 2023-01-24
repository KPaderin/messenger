import {updateUserImageApi} from "../../services/userProfileUpdate";
import {avatarLooksLikeGithub} from "../../images/avatarLooksLikeGithub/avatarLooksLikeGithub";

export const updateUserAsync = (userLogin, isDefaultImage) => {
    return function(dispatch){
        let userImage = "null";
        if(isDefaultImage === true) {
            let ava = new avatarLooksLikeGithub(userLogin);
            userImage = ava.getMatrix().getSvgBase64();
        }
        updateUserImageApi(userImage)
    }
}