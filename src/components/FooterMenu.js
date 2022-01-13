import { nanoid } from "nanoid";
import MenuItem from "./MenuItem";

const FooterMenu = () => {

  const footerMenuList = [
    {link: "/diploma-react/about", text: "О магазине"},
    {link: "/diploma-react/catalog", text: "Каталог"},
    {link: "/diploma-react/contacts", text: "Контакты"},
  ]

  return (
    <ul className="nav flex-column">
      {footerMenuList.map((item) => <MenuItem key={nanoid()} link={item.link} text={item.text} />)}
    </ul>
  )
}

export default FooterMenu;