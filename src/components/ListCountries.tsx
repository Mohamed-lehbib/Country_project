import React, { useEffect, useState } from "react";
import Country from "./Country";
import City from "./City";

export default function ListCountries() {
  //List of Countries
  let listCounties = [
    { name: "Palestine", cities: ["Gaza", "Rafah", "Beit lahia"] },
    { name: "Mauritania", cities: ["Nouakchott", "Atar", "Néma"] },
    { name: "AS", cities: ["Jeda", "Mecque", "Riyad"] },
    { name: "UAE", cities: ["Dubai", "Abou Dabi", "Ajman"] },
    { name: "Canada", cities: ["Quebec", "Toronto", "Vancouver"] },
    { name: "Palestine", cities: ["Gaza", "Rafah", "Beit lahia"] },
    { name: "Mauritania", cities: ["Nouakchott", "Atar", "Néma"] },
    { name: "AS", cities: ["Jeda", "Mecque", "Riyad"] },
    { name: "UAE", cities: ["Dubai", "Abou Dabi", "Ajman"] },
    { name: "Canada", cities: ["Quebec", "Toronto", "Vancouver"] },
    { name: "Palestine", cities: ["Gaza", "Rafah", "Beit lahia"] },
    { name: "Mauritania", cities: ["Nouakchott", "Atar", "Néma"] },
    { name: "AS", cities: ["Jeda", "Mecque", "Riyad"] },
    { name: "UAE", cities: ["Dubai", "Abou Dabi", "Ajman"] },
    { name: "Canada", cities: ["Quebec", "Toronto", "Vancouver"] },
  ];
  // Initial Country selected
  let initCountrySelected = {
    country: "No country is selected",
    index: -1,
  };
  // Initialising the List of Cities
  const [countries, setCountries] = useState(listCounties);
  // Initialising the select country
  const [selectedCountry, setSelectedCountry] = useState(initCountrySelected);
  // Initial City Selected
  let initCitySelected = {
    city: "No city selected",
    index: -1,
  };
  // Initialising the City Selected
  const [selectedCity, setSelectedCity] = useState(initCitySelected);
  // the function that handle deleting a Country & City
  const deleteItem = (indexToDelete: number, isCountry: boolean) => {
    const updatedCountries = countries.map((country, index) => {
      if (isCountry && index === indexToDelete) {
        return null; // Skip this country
      } else if (!isCountry && index === selectedCountry.index) {
        const updatedCities = country.cities.filter(
          (_, cityIndex) => cityIndex !== indexToDelete
        );
        return { ...country, cities: updatedCities };
      }
      return country;
    });

    const filteredCountries = updatedCountries.filter(
      (country) => country !== null
    ) as { name: string; cities: string[] }[];

    setCountries(filteredCountries);
    if (isCountry) {
      setSelectedCountry(initCountrySelected);
      setSelectedCity(initCitySelected);
    } else {
      setSelectedCity(initCitySelected);
    }
  };

  // The function that handle navigating Up
  const navigate = (direction: string, isCity?: boolean) => {
    const currentIndex = isCity ? selectedCity.index : selectedCountry.index;
    const totalItems = isCity
      ? countries[selectedCountry.index]?.cities.length
      : countries.length;

    if (totalItems === 0 || totalItems === undefined) {
      return; // No items to navigate
    }

    let newIndex;
    if (direction === "up") {
      newIndex =
        currentIndex === 0 || currentIndex === -1
          ? totalItems - 1
          : currentIndex - 1;
    } else if (direction === "down") {
      newIndex =
        currentIndex === totalItems - 1 || currentIndex === -1
          ? 0
          : currentIndex + 1;
    } else {
      return; // Invalid direction
    }

    if (isCity) {
      setSelectedCity({
        city: countries[selectedCountry.index].cities[newIndex],
        index: newIndex,
      });
    } else {
      setSelectedCountry({
        country: countries[newIndex].name,
        index: newIndex,
      });
      setSelectedCity(initCitySelected);
    }
  };
  // For debugging
  useEffect(() => {
    console.log("countries" + JSON.stringify(countries));
    console.log("select country" + selectedCountry.index);
  }, [countries, selectedCountry]);

  return (
    <div className="card m-3 p-3">
      <h1 className="card-title">List of Countries:</h1>
      <h2 className="mb-4">
        {selectedCountry.country}, {selectedCity.city}
      </h2>
      <div className="mt-4">
        <button
          className="btn btn-primary me-2"
          onClick={() => navigate("down", false)}
        >
          <span className="bi bi-arrow-down me-1"></span>Down
        </button>
        <button
          className="btn btn-primary me-2"
          onClick={() => navigate("up", false)}
        >
          <span className="bi bi-arrow-up me-1"></span>Up
        </button>

        <button
          className="btn btn-primary"
          onClick={() => {
            setSelectedCountry(initCountrySelected);
            setSelectedCity(initCitySelected);
          }}
        >
          <span className="bi bi-x-circle-fill me-1"></span>Unselect
        </button>
      </div>
      <br />
      <ul className="list-group">
        {countries.map((country, index) => (
          <Country
            key={index}
            index={index}
            country={country}
            isSelected={selectedCountry.index === index}
            onClick={() => setSelectedCountry({ country: country.name, index })}
            onDelete={() => deleteItem(index, true)}
          />
        ))}
      </ul>
      {selectedCountry.index !== -1 && (
        <>
          <h4>List of cities for {selectedCountry.country}</h4>
          <div className="mt-4">
            <button
              className="btn btn-primary me-2"
              onClick={() => navigate("down", true)}
            >
              <span className="bi bi-arrow-down me-1"></span>Down
            </button>
            <button
              className="btn btn-primary"
              onClick={() => navigate("up", true)}
            >
              <span className="bi bi-arrow-up me-1"></span>Up
            </button>
          </div>
          <ul className="list-group mt-3">
            {countries[selectedCountry.index].cities.map((city, index) => (
              <City
                key={index}
                city={city}
                isSelected={selectedCity.index === index}
                onClick={() => setSelectedCity({ city, index })}
                onDelete={() => deleteItem(index, false)}
              />
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
