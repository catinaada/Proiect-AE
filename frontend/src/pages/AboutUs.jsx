import React from "react";

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <div className="about-us-content">
        <div className="about-us-text">
          <h2>Despre Noi</h2>
          <p>
            La <strong>MyJewellery</strong>, fiecare bijuterie este o poveste. Suntem o echipă pasionată de design și calitate, dedicată să aducă strălucire în viața ta. Produsele noastre sunt realizate cu grijă, utilizând materiale premium, pentru a asigura un aspect sofisticat și durabil.
          </p>
          <p>
            Credem în frumusețea detaliilor și în emoția pe care o bijuterie o poate transmite. Ne străduim să oferim clienților noștri experiențe unice și personalizate, transformând fiecare moment într-unul de neuitat.
          </p>
          <h4>Misiunea Noastra</h4>
        <p>
          Să oferim produse de calitate, care să aducă bucurie și eleganță în viața clienților noștri, respectând totodată mediul înconjurător.
        </p>
        <p>Valorile Noastre:</p>
        <ul>
          <li>Calitate premium</li>
          <li>Design unic</li>
          <li>Integritate și transparență</li>
          <li>Respect pentru client</li>
        </ul>

        <h4>Contactează-ne</h4>
        <p>
          Adresa: Strada Bijuteriilor
        </p>
        <p>
          Email: catinaada20@stud.ase.ro
        </p>
        <p>
          Telefon: +40 123 456 789
        </p>
        <p>
          Program: Luni - Vineri: 09:00 - 18:00
        </p>

        </div>
        <div className="about-us-image">
          <img
            src="https://img.freepik.com/premium-photo/design-fashion-jewelry-background_87720-109609.jpg"
            alt="Despre noi"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;

