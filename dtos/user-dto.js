export default class UserDto {
  email;
  userId;
  isActivated;
  surname;
  name;
  middleName;
  phoneNumber;
  homePhoneNumber;
  town;

  constructor(model){
    this.email = model.email;
    this.userId = model._id;
    this.isActivated = model.isActivated;
    this.surname = model.surname;
    this.name = model.name;
    this.middleName = model.middleName;
    this.phoneNumber = model.phoneNumber;
    this.homePhoneNumber = model.homePhoneNumber;
    this.town = model.town;
  }
}


