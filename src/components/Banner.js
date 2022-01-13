const Banner = ({text, image}) => {
  return (
    <div className="banner">
      <img src={image} className="img-fluid" alt={text} />
      <h2 className="banner-header">{text}</h2>
    </div>
  )
}

export default Banner;