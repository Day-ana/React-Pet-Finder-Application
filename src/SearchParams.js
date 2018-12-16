import React from "react";
import pf, { ANIMALS } from "petfinder-client";

const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
});
class SearchParams extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      location: "Oakland, CA",
      animal: "",
      breed: "",
      breeds: []
    };
    //binding events handlers
    this.handleChangeLocation = this.handleChangeLocation.bind(this);
    this.handleChangeAnimal = this.handleChangeAnimal.bind(this);
    this.handleChangeBreed = this.handleChangeBreed.bind(this);
  }

  handleChangeLocation(event) {
    this.setState({
      location: event.target.value,
      breeds: ""
    });
  }

  handleChangeAnimal(event) {
    this.setState(
      {
        animal: event.target.value
      },
      this.getBreeds
    );
  }

  handleChangeBreed(event) {
    this.setState({
      breed: event.target.value
    });
  }
  getBreeds() {
    if (this.state.animal) {
      petfinder.breed.list({ animal: this.state.animal }).then(data => {
        if (
          data.petfinder &&
          data.petfinder.breeds &&
          Array.isArray(data.petfinder.breeds.breed)
        ) {
          this.setState({
            breeds: data.petfinder.breeds.breed
          });
        } else {
          this.setState({ breeds: [] });
        }
      });
    } else {
      this.setState({ breeds: [] });
    }
  }

  render() {
    return (
      <div className="search-params">
        <label htmlFor="location">
          Location
          <input
            onChange={this.handleChangeLocation}
            id="location"
            value={this.state.location}
            placeholder="location"
          />
        </label>
        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            value={this.state.animal}
            onChange={this.handleChangeAnimal}
            onBlur={this.handleChangeAnimal}
          >
            <option />
            {ANIMALS.map(animal => (
              <option key={animal} value={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="breed">
          Breed
          <select
            id="breed"
            value={this.state.breed}
            onChange={this.handleChangeBreed}
            onBlur={this.handleChangeBreed}
            //if no breeds are available disable breed selection
            disabled={this.state.breeds.length === 0}
          >
            <option />
            {this.state.breeds.map(breed => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>
        <button>Submit</button>
      </div>
    );
  }
}

export default SearchParams;
