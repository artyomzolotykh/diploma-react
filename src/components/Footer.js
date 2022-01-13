import { nanoid } from "nanoid";
import FooterMenu from "./FooterMenu";

const Footer = () => {
  const paymentMethods = [
    'paypal',
    'master-card',
    'visa',
    'yandex',
    'webmoney',
    'qiwi',
  ]

  return (
    <footer className="container bg-light footer">
      <div className="row">
        <div className="col">
          <section>
            <h5>Информация</h5>
            <FooterMenu />
          </section>
        </div>
        <div className="col">
          <section>
            <h5>Принимаем к оплате:</h5>
            <div className="footer-pay">
              {paymentMethods.map((method) => <div key={nanoid()} className={`footer-pay-systems footer-pay-systems-${method}`}></div>)}
            </div>
          </section>
          <section>
            <div className="footer-copyright">2009-2019 © BosaNoga.ru — модный интернет-магазин обуви и аксессуаров.
              Все права защищены.<br />Доставка по всей России!
            </div>
          </section>
        </div>
        <div className="col text-right">
          <section className="footer-contacts">
            <h5>Контакты:</h5>
            <a className="footer-contacts-phone" href="tel:+7-495-790-35-03">+7 495 79 03 5 03</a>
            <span className="footer-contacts-working-hours">Ежедневно: с 09-00 до 21-00</span>
            <a className="footer-contacts-email" href="mailto:office@bosanoga.ru">office@bosanoga.ru</a>
            <div className="footer-social-links">
              <a href="https://twitter.com" target="_blank" className="footer-social-link footer-social-link-twitter"></a>
              <a href="https://vk.com" target="_blank" className="footer-social-link footer-social-link-vk"></a>
            </div>
          </section>
        </div>
      </div>
    </footer>
  )
}

export default Footer;