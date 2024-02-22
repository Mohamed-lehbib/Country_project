import React, { useEffect, useState } from "react";

export default function ListCountries() {
  let listCounties = [
    { name: "Palestine", cities: ["Gaza", "Rafah", "Beit lahia"] },
    { name: "Mauritania", cities: ["Nouakchott", "Atar", "Néma"] },
    { name: "AS", cities: ["Jeda", "Mecque", "Riyad"] },
    { name: "UAE", cities: ["Dubai", "Abou Dabi", "Ajman"] },
    { name: "Canada", cities: ["Quebec", "Toronto", "Vancouver"] },
  ];
  let initCountrySelected = {
    country: "No country is selected",
    index: -1,
  };
  const [countries, setCountries] = useState(listCounties);

  const [selectedCountry, setSelectedCountry] = useState(initCountrySelected);
  // let selectedIndex = selectedCountry.index;
  // let selectedCountry.country = selectedCountry.country;
  let initCitySelected = {
    city: "No city selected",
    index: -1,
  };
  const [selectedCity, setSelectedCity] = useState(initCitySelected);
  let selectedCityIndex = selectedCity.index;
  let selectedCityItem = selectedCity.city;

  const deleteCountry = (indexToDelete: number) => {
    const updatedCountries = countries.filter(
      (item, index) => index !== indexToDelete
    );
    setCountries(updatedCountries);
    console.log(initCountrySelected);
    setSelectedCountry(initCountrySelected);
    // setSelectedCity(initCitySelected);
  };

  const deleteCity = (indexToDelete: number) => {
    const updatedCountries = countries.map((country, index) => {
      if (index === selectedCountry.index) {
        const updatedCities = country.cities.filter(
          (city, cityIndex) => cityIndex !== indexToDelete
        );
        return { ...country, cities: updatedCities };
      }
      return country;
    });
    setCountries(updatedCountries);
    setSelectedCity(initCitySelected);
  };

  const goUp = () => {
    const upIndex =
      selectedCountry.index === 0 || selectedCountry.index === -1
        ? countries.length - 1
        : selectedCountry.index - 1;
    setSelectedCountry({ country: countries[upIndex].name, index: upIndex });
    setSelectedCity(initCitySelected);
  };

  const goDown = () => {
    const downIndex =
      selectedCountry.index === countries.length - 1 ||
      selectedCountry.index === -1
        ? 0
        : selectedCountry.index + 1;
    setSelectedCountry({
      country: countries[downIndex].name,
      index: downIndex,
    });
    setSelectedCity(initCitySelected);
  };
  const goLeft = () => {
    const leftIndex =
      selectedCity.index ===
        countries[selectedCountry.index].cities.length - 1 ||
      selectedCity.index === -1
        ? 0
        : selectedCity.index + 1;
    setSelectedCity({
      city: countries[selectedCountry.index].cities[leftIndex],
      index: leftIndex,
    });
  };
  const goRight = () => {
    const rightIndex =
      selectedCity.index === 0 || selectedCity.index === -1
        ? countries[selectedCountry.index].cities.length - 1
        : selectedCity.index - 1;
    setSelectedCity({
      city: countries[selectedCountry.index].cities[rightIndex],
      index: rightIndex,
    });
  };

  useEffect(() => {
    console.log("countries" + JSON.stringify(countries));
    console.log("select country" + selectedCountry.index);
  }, [countries, selectedCountry]);
  return (
    <div className="card m-3 p-3">
      <h1 className="card-title">List of Countries:</h1>
      <h2 className="mb-4">
        {selectedCountry.country}, {selectedCityItem}
      </h2>
      <ul className="list-group">
        {countries.map((country, index) => (
          <li
            key={index}
            className={
              selectedCountry.index === index
                ? "list-group-item active"
                : "list-group-item"
            }
          >
            <div className="d-flex justify-content-between align-items-center">
              <span
                onClick={() => {
                  setSelectedCountry({
                    country: country.name,
                    index: index,
                  });
                  setSelectedCity(initCitySelected);
                }}
              >
                {country.name}
              </span>
              {selectedCountry.index === index ? (
                <button
                  // type="button"
                  className="btn btn-outline-danger "
                  onClick={() => deleteCountry(index)}
                >
                  <span className="bi bi-trash"></span>
                </button>
              ) : (
                <></>
              )}
            </div>
          </li>
        ))}
      </ul>
      {selectedCountry.index !== -1 && (
        <>
          <h4>List of cities for {selectedCountry.country}</h4>
          <ul className="list-group mt-3">
            {countries[selectedCountry.index].cities.map((city, index) => (
              <li
                key={index}
                className={
                  selectedCityIndex === index
                    ? "list-group-item active"
                    : "list-group-item"
                }
                onClick={() =>
                  setSelectedCity({
                    city: city,
                    index: index,
                  })
                }
              >
                <div className="d-flex justify-content-between align-items-center">
                  <span>{city}</span>
                  {selectedCityIndex === index && (
                    <button
                      type="button"
                      className="btn btn-outline-danger"
                      onClick={() => deleteCity(index)}
                    >
                      <span className="bi bi-trash"></span>
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
      <div className="mt-4">
        <button className="btn btn-primary me-2" onClick={goLeft}>
          <span className="bi bi-arrow-left me-1"></span>Left
        </button>
        <button className="btn btn-primary me-2" onClick={goUp}>
          <span className="bi bi-arrow-up me-1"></span>Up
        </button>
        <button className="btn btn-primary me-2" onClick={goDown}>
          <span className="bi bi-arrow-down me-1"></span>Down
        </button>
        <button className="btn btn-primary" onClick={goRight}>
          <span className="bi bi-arrow-right me-1"></span>Right
        </button>
        <button
          className="btn btn-primary"
          onClick={() => setSelectedCountry(initCountrySelected)}
        >
          <span className="bi bi-arrow-right me-1"></span>Unselect
        </button>
      </div>
    </div>
  );
}
