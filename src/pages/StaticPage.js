const StaticPage = (props) => {
  const {title, children} = props;
  return (
    <section className="top-sales">
      <h2 className="text-center">{title}</h2>
      {children}
    </section>
  )
}

export default StaticPage;