import StaticPage from "./StaticPage";

const Error404Page = () => {
  return (
    <StaticPage title="Страница не найдена">
      <p>
        Извините, такая страница не найдена!
      </p>
    </StaticPage>
  )
}

export default Error404Page;