import React from "react";
import Nav from "../components/header/Nav";
import { useState, useEffect } from "react";
import { API_URL } from "../config";
import Footer from "../components/footer/Footer";

const Prices = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [tarifs, setTarifs] = useState([]);

  useEffect(() => {
    fetch(API_URL + "/api/tarifs?populate=*", {
      method: "GET",
      headers: {
        Accept: "Application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        setTarifs(response.data);
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
      <Nav />
      <div className="prices">
        <h1>Prestations</h1>
        <div className="container">
          {isLoading
            ? "loading .."
            : tarifs.map((tarif) => {
                return (
                  <div
                    className="cardPrices"
                    key={tarif.id}
                    style={{
                      backgroundImage: `url(${
                        API_URL + tarif.attributes.image.data.attributes.url
                      })`,
                    }}>
                    <h2>{tarif.attributes.title}</h2>

                    <div className="text_card">
                      <p>{tarif.attributes.content}</p>
                      <h3>{tarif.attributes.price}</h3>
                    </div>
                  </div>
                );
              })}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Prices;
