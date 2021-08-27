import pkg from 'mongoose';
const { Schema, model } = pkg;

const TypeRoom = new Schema({
  // Тип комнаты
  type: { type: String, required: true },
  // Описание
  descriptions: { type: String, required: true },
  // Стоимость
  cost: { type: Number, required: true },
  // Дополнительная стоимость, которая прибавляется к основной, когда количество человек больше одного
  additionalCost: { type: Number, required: true },
  //Стоимость питания на одного человека
  costFood: { type: Number, required: true },
  // Превью картинка
  mainPicture: { type: String },
  // Площадь комнаты
  square: { type: Number },
  // Количество спальных мест
  sleepingPlaces: { type: String },
  // Максимальное количество гостей
  maxGuests: { type: Number },
  // Оснащение комнаты
  equipment: { type: String },
  // Условие оплаты
  payment: { type: Number },
  // Фотографии номера
  photos: { type: Schema.Types.Array },
  // Свободные комнаты
  amountFree: { type: Number },
  //Конечная стоимость с питанием
  sumWithoutFood: { type: Number },
  //Конечная стоимость без питания
  sumWithFood: { type: Number },
  //Комнаты
  rooms: [{
    //Номер комнаты
    number: { type: String },
    // Дата въезда
    dateIn: { type: Schema.Types.Date },
    // Дата выезда
    dateOut: { type: Schema.Types.Date },
    // Количество человек в номере
    amountPerson: { type: Number },
    // Пользователь, который забронировал номер
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    // Итоговая стоимость
    cost: { type: Number },
    //С питанием или без питания
    withFood: { type: Boolean }
  }]
});

export default model('TypeRoom', TypeRoom);
