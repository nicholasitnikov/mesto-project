import { getUser, updateAvatar, updateUser } from './api.js';
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
    const updatedUser = await updateAvatar(url);
    updateProfileElements(updatedUser);
}

const updateProfileElements = (user) => {
    profile.setAttribute('data-id', user._id)
    profileName.textContent = user.name;
    profileDescription.textContent = user.about;
    profileAvatar.style.backgroundImage = `url(${user.avatar})`;
}

export const loadCurrentProfile = async () => {
    const user = await getUser();
    updateProfileElements(user);
}

export const handleUpdateProfile = async () => {

    const user = {
        name: fieldNameProfile.value,
        description: fieldDescriptionProfile.value
    };
    
    const updatedUser = await updateUser(user);
    updateProfileElements(updatedUser);

}