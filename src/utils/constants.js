export const constants = {

    // api config
    api: {
        accessToken: 'a64406df-c19e-49de-ae1f-4d2f4d87c7d6',
        groupId: 'plus-cohort-2',
        apiURL: 'https://nomoreparties.co/v1',
    },    

    // validation options
    validation: {
        inputSelector: '.popup__field',
        submitButtonSelector: '.popup__button',
        inputErrorClass: '.popup__field-error',
        errorClass: 'popup__field-error_visible',
        fieldEpmty: 'popup__field_empty'
    },

    // profile selectors
    profile: {
        nameSelector: '.profile__heading',
        aboutSelector: '.profile__description',
        avatarSelector: '.profile__avatar'
    },

    // popup imageSelector
    popupImageSelector: {
        selector:'.popup_role_image',
        imageSelector: '.popup__image'
    },

    // cardSelector
    cardSelector: {
        cardSelector: '#placeTemplate'
    },

    // itemSelector
    itemSelector: {
        itemSelector: '.place'
    },

    // popupSelector
    popupSelector: {
        popup: 'popup',
        additionPopupSelector: '.popup_role_add',
        removingPopupSelector: '.popup_role_remove', 
        editProfilePopupSelector: '.popup_role_edit',  
        editAvatarPopupSelector: '.popup_role_edit-avatar'     
    },

    // initialValuesSelectors 
    initialValuesSelectors: {
        username: '.profile__heading',
        description: '.profile__description'
    },

    // btnLikeActive
    buttonLike: {
        buttonLikeAtive: 'place__like_active',
    },

    // templateSelector
    template: {
        templateSelector: '.place',
    },

    // elementSelector
    elementSelector: {
        buttonDelete: '.place__delete',
        buttonLike: '.place__like',
        buttonImage: '.place__image',
        placeHeading: '.place__heading',
        buttonSubmit: '.popup__button',
        popupImageCaption: '.popup__caption',
    },

    // popupState
    popupStateSelector: {
        popupActive: 'popup_opened',
        popupClose: '.popup__close'
    },

    // formSeletor
    formSelector: {
        form: '.form',
    }

}