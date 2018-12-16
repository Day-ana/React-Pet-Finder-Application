import React from "react";

class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      active: 0
    };
    this.handleClickIndex = this.handleClickIndex.bind(this);
  }
  static getDerivedStateFromProps({ media }) {
    let photos = [];

    if (media && media.photos && media.photos.photo) {
      photos = media.photos.photo.filter(photo => photo["@size"] === "pn");
    }

    return { photos };
  }
  //React synthetic event
  handleClickIndex(event) {
    this.setState({
      active: +event.target.dataset.index
    });
  }

  render() {
    const { photos, active } = this.state;
    return (
      <div className="carousel">
        <img src={photos[active].value} alt="primary animal" />
        <div className="carousel-smaller">
          {photos.map((photo, index) => (
            /*eslint-disable-next-line */
            <img
              onClick={this.handleClickIndex}
              key={photo.value}
              //set index to data attribute
              data-index={index}
              src={photo.value}
              //ternary opetator to set active state
              className={index === active ? "active" : ""}
              alt="animal thumbnail"
            />
          ))}
        </div>
      </div>
    );
  }
}
export default Carousel;
