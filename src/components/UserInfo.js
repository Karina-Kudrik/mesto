export default class UserInfo {
   constructor({nameSelector, descriptionSelector}) {
      this._name = document.querySelector(nameSelector);
      this._description = document.querySelector(descriptionSelector);
   }

   getUserInfo() {
      const userInfo = {
         userName: this._name.textContent,
         userDescription: this._description.textContent
      }
      return userInfo;
   }

   setUserInfo(userInfo) {
      this._name.textContent = userInfo.name;
      this._description.textContent = userInfo.description;
   }
}