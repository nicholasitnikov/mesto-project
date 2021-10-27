import { api } from '../components/api.js';
import { openPopupEditAvatar } from './modalEditAvatar.js';
import { fieldNameProfile, fieldDescriptionProfile } from './modalEditUser.js';

export const profile = document.querySelector('.profile');
export const profileName = document.querySelector('.profile__heading');
export const profileDescription = document.querySelector('.profile__description');
export const profileAvatar = document.querySelector('.profile__avatar');

export const handleAvatarEdit = () => {
    openPopupEditAvatar();
}

export const handleUpdateAvatar = async (url) => {
    try {
        const updatedUser = await api.updateAvatar(url);
        updateProfileElements(updatedUser);
    } catch (err) {
        console.log(err);
    }
}

const updateProfileElements = (user) => {
    profile.setAttribute('data-id', user._id)
    profileName.textContent = user.name;
    profileDescription.textContent = user.about;
    profileAvatar.style.backgroundImage = `url(${user.avatar})`;
}

export const loadCurrentProfile = async () => {
    try {
        const user = await api.getUser();
        updateProfileElements(user);
    } catch (err) {
        console.log(err);
    }
}

export const handleUpdateProfile = async () => {

    const user = {
        name: fieldNameProfile.value,
        description: fieldDescriptionProfile.value
    };
    
    try {
        const updatedUser = await api.updateUser(user); 
        updateProfileElements(updatedUser);
    } catch (err) {
        console.log(err);
    }
    

}