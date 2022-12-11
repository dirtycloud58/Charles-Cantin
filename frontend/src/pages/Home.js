import React from "react";
import Footer from "../components/footer/Footer";
import Nav from "../components/header/Nav";
import { useState, useEffect } from "react";
import { API_URL } from "../config";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [home, setHome] = useState();

  useEffect(() => {
    fetch(API_URL + "/api/acceuil?populate=*", {
      method: "GET",
      headers: {
        Accept: "Application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        setHome(response.data);
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
      <Nav />

      {isLoading ? (
        "is loading"
      ) : (
        <div
          className="home"
          style={{
            backgroundImage: `url(${
              API_URL + home.attributes.image.data.attributes.url
            })`,
          }}>
          <div className="home_title">
            <h1>Charles Cantin</h1>
            <h2>Photographe</h2>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Home;
