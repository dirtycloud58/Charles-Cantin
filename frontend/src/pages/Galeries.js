import React from "react";
import Nav from "../components/header/Nav";
import { useState, useEffect } from "react";
import { API_URL } from "../config";
import { useLocation, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Footer from "../components/footer/Footer";
import { useNavigate } from "react-router-dom";
import arrow from "../images/arrow.svg";
import { useMediaQuery } from "react-responsive";
import { Carousel } from "react-responsive-carousel";

const Galeries = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const { name = "undefined" ? "top" : [] } = useParams();
  const [isActive, setActive] = useState(false);
  const [img, setimg] = useState(false);
  const [isShown, setIsShown] = useState(false);

  const handleClick = () => {
    setIsShown(!isShown);
  };

  const isDesktop = useMediaQuery({
    query: "(min-width: 768px)",
  });
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  const toggleImg = () => {
    setimg(!img);
  };
  const toggleClass = () => {
    setActive(!isActive);
  };

  /**retour btn menu */
  const navigate = useNavigate();
  const btnReset = () => {
    navigate("/galeries");
    window.scrollTo(0, 0);
    setIsShown(false);
  };

  const changeUrl = () => {
    if (!window.scrollTo(0, 0)) {
      window.scrollTo(0, 0);
      handleClick();
    }
  };

  /**affiche le texte d'intro */
  const location = useLocation();
  const { pathname } = location;
  let divClass = "reset_none";
  let coupDeCoeur = "coup_de_coeur";
  if (pathname !== "/galeries") {
    divClass = "reset";
    coupDeCoeur = "coup_de_coeur_none";
  }
  /**useEffect pour trier par catégorie les articles */
  useEffect(() => {
    fetch(
      API_URL +
        `/api/articles?filters[$and][0][categories][name][$eq]=${name}&populate=*`,
      {
        method: "GET",
        headers: {
          Accept: "Application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((response) => {
        setArticles(response.data);
        setIsLoading(false);
      });
  }, [name]);

  /** useEffect pour récuperer dynamiquement la liste des catégories, attention que les 6 premieres sont visibles */
  useEffect(() => {
    fetch(API_URL + "/api/categories", {
      method: "GET",
      headers: {
        Accept: "Application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setCategories(result.data);
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
      <Nav />
      <div className="galeries">
        {/**  barre de recherche categories*/}
        {isMobile && (
          <div className="search">
            <nav className="nav_categories">
              <label
                htmlFor="cat_toggle"
                onClick={() => {
                  toggleImg();
                  handleClick();
                }}>
                Categories{" "}
                <span>
                  <img
                    src={arrow}
                    alt="arrow"
                    className={img ? "pivot_open" : "pivot"}
                  />
                </span>
              </label>
              <input type="checkbox" id="cat_toggle" />
              <div
                className={isShown ? "galeries_pages" : "galeries_pages_none"}>
                <ul>
                  {isLoading
                    ? "loading..."
                    : categories
                        .filter((categorie) => categorie.id < 7)
                        .map((categorie) => {
                          return (
                            <li key={categorie.id}>
                              <Link
                                onClick={() => {
                                  toggleClass();
                                  changeUrl();
                                  toggleImg();
                                }}
                                to={`/galeries/${categorie.attributes.name}`}
                                key={categorie.id}>
                                {categorie.attributes.name}
                              </Link>
                            </li>
                          );
                        })}
                </ul>
              </div>
            </nav>
          </div>
        )}

        {isDesktop && (
          <div className="search">
            <nav className="nav_categories">
              <ul>
                {isLoading
                  ? "loading..."
                  : categories
                      .filter((categorie) => categorie.id < 7)
                      .map((categorie) => {
                        return (
                          <li key={categorie.id}>
                            <Link
                              onClick={() => {
                                toggleClass();
                                changeUrl();
                                toggleImg();
                              }}
                              to={`/galeries/${categorie.attributes.name}`}
                              key={categorie.id}>
                              {categorie.attributes.name}
                            </Link>
                          </li>
                        );
                      })}
              </ul>
            </nav>
          </div>
        )}
        {/**button reset */}
        <div className={divClass}>
          <button onClick={btnReset} id="btnReset">
            annuler
          </button>
        </div>

        {/** la galerie des articles en fonction de la recherche */}
        <div className="container_galeries">
          <div className={coupDeCoeur}>
            <h1>Coup de coeur</h1>
            <p>
              veuillez trouver ci dessous mes coups de coeur, n'hesitez pas a
              vous promener dans les galeries pour découvrir d'autres pépites ❤
            </p>
          </div>

          {isMobile && (
            <div>
              {isLoading
                ? "loading .."
                : articles.map((article) => {
                    return (
                      <div
                        key={article.id}
                        className="cardGaleries"
                        style={{
                          backgroundImage: `url(${
                            API_URL +
                            article.attributes.image.data.attributes.url
                          })`,
                        }}></div>
                    );
                  })}
            </div>
          )}

          {isDesktop && (
            <Carousel
              autoPlay
              infiniteLoop="true"
              showThumbs={false}
              swipeable={true}>
              {isLoading
                ? "loading .."
                : articles.map((article) => {
                    return (
                      <div key={article.id}>
                        <img
                          src={
                            API_URL +
                            article.attributes.image.data.attributes.url
                          }
                          alt={article.attributes.image.data.attributes.name}
                        />
                      </div>
                    );
                  })}
            </Carousel>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Galeries;
