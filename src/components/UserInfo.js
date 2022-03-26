
export default class UserInfo {
   constructor({ profileName, profileDescription, placeAvatarInput }) {
      this._nameElement = profileName;
      this._jobElement = profileDescription;
      this._avatarElement = placeAvatarInput;
   }

   getUserInfo() {
      this._userData = {
         name: this._nameElement.textContent,
         job: this._jobElement.textContent,
         avatar: this._avatarElement.src
      };

      return this._userData;
   }

   setUserInfo(name, job) {
      this._nameElement.textContent = name;
      this._jobElement.textContent = job;
   }

   setAvatar(avatar) {
      this._avatarElement.src = avatar;
   }
}
