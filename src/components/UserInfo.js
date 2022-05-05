export default class UserInfo {
   constructor({profileNameSelector, profileDescriptionSelector}) {
      this._name = profileNameSelector;
      this._description = profileDescriptionSelector;
   }

   getUserInfo() {
      return {
         name: this._name.textContent,
         description: this._description.textContent
      }
   }

   setUserInfo({name, description}) {
      this._name.textContent = name;
      this._description.textContent = description;
   }
}