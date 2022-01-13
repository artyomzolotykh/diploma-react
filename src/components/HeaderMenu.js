import { nanoid } from 'nanoid';
import MenuItem from "./MenuItem";

const HeaderMenu = () => {
  const headerMenuList = [
    {link: "/diploma-react/", text: "Главная"},
    {link: "/diploma-react/catalog", text: "Каталог"},
    {link: "/diploma-react/about", text: "О магазине"},
    {link: "/diploma-react/contacts", text: "Контакты"},
  ]

  return (
    <ul className="navbar-nav mr-auto">
      {headerMenuList.map((item) => <MenuItem key={nanoid()} link={item.link} text={item.text} />)}
    </ul>
  )
}

export default HeaderMenu;