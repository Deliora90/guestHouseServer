import process from "node:process";
import nodemailer from "nodemailer";
class MailService {

  async createTransporter() {
    this.transporter = await nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
      },
      debug: false,
      logger: false
    });
  }
  async sendActivationMain(to, link) {
    await this.createTransporter();
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to: to,
      subject: `Активация аккаунта на ${process.env.API_URL}`,
      text: "",
      html:
        `<div>
          <h1>Для активации перейдите по ссылке</h1>
          <a href=${link}>${link}</a>
        </div>`
    })
  }
  async sendBookingInfo(to, roomName, roomDesc, dateIn, dateOut, amountPerson, cost, withFood) {
    await this.createTransporter();
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to: to,
      subject: "Информация о бронировании номера в отеле Valentina Guest House",
      text: "",
      html:
        `<div>
          <h1>Дата заезда ${dateIn}, Дата выезда ${dateOut}</h1>
          <h2>Информация о номере</h2>
          <h3>Тип номера "${roomName}"</h3>
          <p>${roomDesc}</p>
          <h4>Количество человек: ${amountPerson}</h4>
          <h4>Тип проживания: ${withFood ? "С питанием" : "Без питания"}</h4>
          <h4>Итоговая стоимость: ${cost} р.</h4>
        </div>`
    })
  }
}

export default new MailService();
