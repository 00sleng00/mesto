
console.log('++++++++++++++');
export default class UserInfo {
   constructor({ profileName, profileDescription }) {
      this._nameElement = profileName;
      this._jobElement = profileDescription;

     console.log('---****', profileName, this._nameElement, this._jobElement);
   }

   getUserInfo() {
      this._userData = {
         name: this._nameElement.textContent,
         job: this._jobElement.textContent
      };

      return this._userData;
   }

   setUserInfo({ name, job }) {
     console.log('setUserInfo', name, job);
      this._nameElement.textContent = name;
      this._jobElement.textContent = job;
   }
}
