import React from "react";
import Nav from "../components/header/Nav";
import Footer from "../components/footer/Footer";
import { useForm, ValidationError } from "@formspree/react";

const Contact = () => {
  const [state, handleSubmit] = useForm("xqkjnoag");

  if (state.succeeded) {
    return <p>Thanks for joining!</p>;
  }

  return (
    <div>
      <Nav />
      <div className="contact">
        <div className="explain_contact">
          <h1>Contact</h1>
          <p>
            pour des renseignements ou un futur projet, je suis à votre écoute
            et réponds rapidement a vos demandes.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <fieldset id="fs-frm-inputs">
            <div className="formulaire">
              <label for="full-name">Nom</label>
              <input
                type="text"
                name="firstnames"
                id="full-name"
                placeholder="Nom"
                required></input>
              <label for="full-name">Prénom</label>
              <input
                type="text"
                name="lastname"
                id="full-name"
                placeholder="Prénom"
                required></input>
              <label htmlFor="email">adresse Email</label>
              <input id="email" type="email" name="email" required />
              <ValidationError
                prefix="Email"
                field="email"
                errors={state.errors}
              />
            </div>
            <div className="formulaire">
              <label for="message">Votre message</label>
              <textarea id="message" name="message" required />
              <ValidationError
                prefix="Message"
                field="message"
                errors={state.errors}
              />
              <button type="submit" disabled={state.submitting}>
                Submit
              </button>
            </div>
          </fieldset>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
