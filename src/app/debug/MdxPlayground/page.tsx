"use client";

import { compileMDX } from "next-mdx-remote/rsc";
import { type ChangeEvent, useEffect, useState } from "react";

import { Button } from "@/components/Button";
import { defaultMdxComponents } from "@/mdx-components";

const placeholder = `---
title: "Ajouter le titre"
publishedAt: ${new Date().toISOString()}
summary: "Ajouter la description ici."
image: thought-catalog-505eectW54k-unsplash.jpg
---

### Qu’est-ce qu’une énergie renouvelable&nbsp;?

- item 1
- item 2

<Spacer size="32" />

<Card fullWidth>
  <Card.Title>Titre de la carte</Card.Title>
  <Card.Body>
    Contenu de la carte
  </Card.Body>
</Card>

`;

const completeSample = `---
title: "Les systèmes de chauffage à énergie renouvelable pour les copropriétés"
publishedAt: 2024-11-20
summary: "Dans une période où la transition énergétique est devenue une priorité, les copropriétés ont un rôle clé à jouer pour réduire les émissions de gaz à effet de serre. Les systèmes de chauffage à énergie renouvelable offrent une solution efficace et durable pour chauffer les bâtiments tout en réduisant leur empreinte carbone."
image: thought-catalog-505eectW54k-unsplash.jpg
---

Dans une période où la transition énergétique est devenue une priorité, les copropriétés ont un rôle clé à jouer pour réduire les émissions de gaz à effet de serre. Les systèmes de chauffage à énergie renouvelable offrent une solution efficace et durable pour chauffer les bâtiments tout en réduisant leur empreinte carbone. 

### Quelles solutions concrètes pour ma copropriété&nbsp;?

1. **Réseau de chaleur urbain**
    - **Qu'est-ce que c'est ?** : Un réseau de chaleur urbain distribue la chaleur produite centralement à plusieurs bâtiments via des canalisations souterraines. Cette chaleur peut venir de déchets, de la biomasse, ou de la géothermie.
    - **Pourquoi c'est bien ?** : C'est mutualisé, économique, efficace, et utilise des sources d'énergie locales et renouvelables.
    - **Des sources pour aller plus loin** :  [France Chaleur Urbaine](https://france-chaleur-urbaine.beta.gouv.fr/), [site du ministère](https://www.ecologie.gouv.fr/politiques-publiques/reseaux-chaleur), [fonctionnement](https://www.connaissancedesenergies.org/fiche-pedagogique/reseaux-de-chaleur)
2. **Pompe à chaleur géothermique ou eau-eau**
    - **Qu'est-ce que c'est ?** : Ces pompes à chaleur utilisent la chaleur du sol ou de l'eau souterraine pour chauffer les bâtiments. Elles chauffent de l’eau pour alimenter des radiateurs ou un plancher chauffant.
    - **Pourquoi c'est bien ?** : C'est très efficace et permet également de rafraichir les bâtiments sans utiliser d’énergie. Il n’y a aucun élément à l’extérieur ce qui en fait une solution sans aucune nuisance (visuelle ou sonore)
    - **Des sources pour aller plus loin :** [les géothermies](https://www.geothermies.fr/) , [l’association française de géothermie](https://www.afpg.asso.fr/)

Pour aller plus loin, vous pouvez aller sur : le site du [fond chaleur](https://fondschaleur.ademe.fr/), le [site du ministère](https://www.economie.gouv.fr/particuliers/prime-renovation-energetique#) et le site du [SER](https://www.syndicat-energies-renouvelables.fr/)

### L'importance de l'isolation et de la sobriété énergétique

Un système de chauffage écologique fonctionne en effet mieux lorsque le bâtiment est bien isolé. Une approche globale pour la rénovation énergétique, qui intègre l'adoption d’un système de chauffage fonctionnant avec des énergies renouvelables et l'isolation, est donc essentielle pour réduire les émissions de gaz à effet de serre, et optimiser les gains financiers.

<Spacer size="64" />

<Card fullWidth>
  <Card.Title>Passez à l'action grâce à Pacoupa</Card.Title>
  <Card.Body>
    Vous êtes copropriétaire et intéressé.e par un passage aux systèmes de chauffage à énergie renouvelable ?

    Pacoupa, notre simulateur en ligne, permet d'estimer les coûts et les bénéfices d'un tel projet pour votre copropriété. En moins de 5 minutes, vous pouvez obtenir une évaluation des économies d'énergie, des réductions d'émissions de CO2, et du retour sur investissement.
    
    <Spacer size="32" />

    <CTA eventName="Blog" />
  </Card.Body>
</Card>
`;

export default function MDXEditorPage() {
  const [mdxContent, setMdxContent] = useState<string>(localStorage.getItem("mdxContent") || placeholder);
  const [renderedContent, setRenderedContent] = useState<React.ReactNode | null>(null);
  const [frontmatter, setFrontmatter] = useState<Record<string, unknown> | null>(null);

  useEffect(() => {
    const task = async () => {
      try {
        localStorage.setItem("mdxContent", mdxContent);

        const { content, frontmatter } = await compileMDX({
          source: mdxContent,
          components: defaultMdxComponents,
          options: {
            parseFrontmatter: true,
          },
        });

        setRenderedContent(content);
        setFrontmatter(frontmatter);
      } catch (error) {
        console.error("MDX Compilation Error:", error);

        setRenderedContent(
          <div className="text-red-500">
            <p>Error rendering MDX</p>
            {error instanceof Error && <p>{error.toString()}</p>}
          </div>,
        );
      }
    };

    task().catch(console.error);
  }, [mdxContent]);

  const handleRender = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const mdxContent = event.target.value;
    setMdxContent(mdxContent);
  };

  const loadSample = () => {
    setMdxContent(completeSample);
  };

  console.log("fronmatter", frontmatter);

  return (
    <div className="flex h-screen col-span-3">
      <div className="w-1/2 p-4 h-full flex flex-col">
        <div className="flex gap-4 flex-shrink-0">
          <Button priority="primary" className="mb-4" onClick={loadSample}>
            Exemple complet
          </Button>
        </div>
        <textarea
          className="w-full h-full p-2 border rounded bg-gray-100 overflow-y-auto resize-none"
          value={mdxContent}
          onChange={handleRender}
          placeholder="Write your MDX here. "
        />
      </div>
      <div className="w-1/2 p-4 bg-white h-full overflow-x-hidden overflow-y-auto">
        <div className="border p-4">{renderedContent}</div>
      </div>
    </div>
  );
}
