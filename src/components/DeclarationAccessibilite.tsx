import { H1, H2 } from "@/dsfr/base/typography";

export const DeclarationAccessibilite = ({
  produit = "[PRODUIT]",
  organisme = "Fabrique numérique des ministères sociaux",
  date = "9 décembre 2021",
  conformite = "non conforme",
  audited = false,
  email = "contact@fabrique.social.gouv.fr",
}) => {
  return (
    <div>
      <H1>Déclaration d’accessibilité</H1>
      <p>
        <span>{produit}</span> s’engage à rendre son service accessible, conformément à{" "}
        <a href="https://www.legifrance.gouv.fr/loda/article_lc/LEGIARTI000037388867/">
          l’article 47 de la loi n° 2005-102 du 11 février 2005.
        </a>
      </p>
      <p>
        Cette déclaration d’accessibilité s’applique à <span>{organisme}</span>.
      </p>
      <H2>État de conformité</H2>
      <p>
        <span>{produit}</span> est <b>{conformite} avec le RGAA 4.1</b>.
        {!audited && <span>Le site n’a encore pas été audité.</span>}
      </p>
      <H2>Contenus non accessibles</H2>
      <H2>Établissement de cette déclaration d’accessibilité</H2>
      <p>
        Cette déclaration a été établie le{" "}
        <b>
          <span>{date}</span>
        </b>
        .
      </p>
      <H2>Amélioration et contact</H2>
      <p>
        Si vous n’arrivez pas à accéder à un contenu ou à un service, vous pouvez contacter le responsable de{" "}
        <span>{organisme}</span> pour être orienté vers une alternative accessible ou obtenir le contenu sous une autre
        forme.
      </p>
      <ul className="basic-information feedback h-card">
        <li>
          E-mail : <a href={`mailto:${email}`}>{email}</a>
        </li>
      </ul>
      <H2>Voie de recours</H2>
      <p>
        Cette procédure est à utiliser dans le cas suivant : vous avez signalé au responsable du site internet un défaut
        d’accessibilité qui vous empêche d’accéder à un contenu ou à un des services du portail et vous n’avez pas
        obtenu de réponse satisfaisante.
      </p>
      <p>Vous pouvez :</p>
      <ul>
        <li>
          Écrire un message au <a href="https://formulaire.defenseurdesdroits.fr/">Défenseur des droits</a>
        </li>
        <li>
          Contacter{" "}
          <a href="https://www.defenseurdesdroits.fr/saisir/delegues">
            le délégué du Défenseur des droits dans votre région
          </a>
        </li>
        <li>
          Envoyer un courrier par la poste (gratuit, ne pas mettre de timbre) :
          <br />
          Défenseur des droits
          <br />
          Libre réponse 71120 75342 Paris CEDEX 07
        </li>
      </ul>
    </div>
  );
};
