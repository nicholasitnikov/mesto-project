export default class UserInfo {
    constructor({ nameSelector, aboutSelector, avatarSelector, api }) {
        this._nameElement = document.querySelector(nameSelector);
        this._aboutElement = document.querySelector(aboutSelector);
        this._avatarElement = document.querySelector(avatarSelector);
        this._name = '';
        this._about = '';
        this._avatar = '';
        this._api = api;
    }
    async getUserInfo() {
        try {
            const user = await this._api.getUser();
            return user;
        } catch (err) {
            console.log(err);
        }
    }
    setUserInfo(user) {
        this._name = user.name;
        this._about = user.about;
        this._avatar = user.avatar;
        this._nameElement.textContent = this._name;
        this._aboutElement.textContent = this._about;
        this._avatarElement.style.backgroundImage = `url("${this._avatar}")`;
    }
}