# Ajouter du contenu
Le contenu du site sont des fichiers markdown (extensions `.md` et `.mdx`) situés dans le dossier `content`.

Un fichier markdown peut des fois être accompagné de métadonnées, qui sont des informations supplémentaires sur le contenu du fichier. Ces métadonnées sont situées en haut du fichier, entre deux lignes de trois tirets (`---`).

Le format markdown est un format de texte qui permet de mettre en forme du texte. Il est très simple à utiliser, et permet de mettre en forme du texte sans avoir à utiliser des balises HTML. Il est par exemple utilisé dans Mattermost. Pour plus d'informations sur le format markdown, vous pouvez consulter [cette page](https://github.github.com/gfm/).

## Pages autres que la landing (ex: cgu)
Les pages autres que la landing sont directement éditables dans à la racine du dossier `content`. Ces pages ne contiennent pas de métadonnées.

## Landing
Sur la landing, les blocs de contenu sont éditables dans le dossier `content/landing`. La landing est découpé en 3 parties, la section "hero", le contenu qui contient dynamiquement la liste des blocs de contenu, et la FAQ en guise de footer.

### Hero
Le contenu de la section "hero" est découpé en 2 fichiers, `hero_title.mdx` et `hero_bloc.mdx`. Le premier contient le titre ainsi que des métadonnées pour gérer le CTA. Le second contient le contenu du bloc.  
L'image utilisée est `public/hero.svg`. La taille est fixée à `md`. À noter qu'elle est utilisé pour l'open graph (partage sur les réseaux sociaux).

**Métadonnées**
- `cta`: les propriétés du CTA
- `cta.source`: Source utilisée comme propriété Matomo lors du clic
- `cta.href`: url de la page de destination (form par exemple). Si vide, l'url par défaut est utilisée (fichier config.ts).
- `cta.title`: Texte du bouton. Si vide, "Je souhaite recevoir ma Carte Verte" est utilisé.

### Blocs de contenu
Les blocs de contenu sont des fichiers markdown situés dans le dossier `content/landing/blocs`. Ils contiennent des métadonnées pour gérer le titre, le contenu, et l'image du bloc si besoin. Optionnellement, ils peuvent aussi contenir des informations pour ajouter une mise en exergue additionnelle ("highlight") au bloc. La mise en exergue, si présente, sera affichée en dessous du contenu mais au dessus du CTA.

Chaque bloc doit être dans un dossier numéroté. Le numéro du dossier est utilisé pour ordonner les blocs sur la landing.

#### Highlight
Un bloc peut avoir une mise en exergue additionnelle ("highlight"). Pour cela, il faut ajouter un fichier `highlight.mdx` dans le dossier du bloc. Ce fichier contient le contenu de la mise en exergue ainsi que ses métadonnées.

**Métadonnées**
- `size`: taille de la mise en exergue. Soit `small` ou `large`. (`large` par défaut)

Il existe 3 types de blocs.
- `single-image`: bloc avec une seule image
- `alternated`: bloc avec des images alternées sur desktop et en colonne sur mobile, avec des cards (dsfr)
- `text-only`: bloc avec du texte uniquement

#### Single image
Un bloc `single-image` est découpé en 2 fichiers, `bloc.mdx` et `title.mdx`. Le premier contient le contenu du bloc, et le second contient le titre du bloc et ses métadonnées.

**Métadonnées**
- `type`: doit être `single-image`
- `image`: les propriétés de l'image
- `image.src`: url de l'image. Soit une url, soit le nom d'un fichier situé dans le dossier `public/`
- `image.alt`: texte alternatif de l'image (pour l'accessibilité)
- `image.position`: position de l'image. Soit `left` soit `right`. (`left` par défaut)
- `image.mobile`: les propriétés de l'image sur mobile
- `image.mobile.size`: taille d'affichage de l'image sur mobile. Soit `small`, `medium`, `large`. (`medium` par défaut)
- `cta`: les propriétés du CTA
- `cta.source`: Source utilisée comme propriété Matomo lors du clic
- `cta.href`: url de la page de destination (form par exemple). Si vide, l'url par défaut est utilisée (fichier config.ts).
- `cta.title`: Texte du bouton. Si vide, "Je souhaite recevoir ma Carte Verte" est utilisé.

#### Alternated
Un bloc `alternated` est découpé en plusieurs fichiers, `title.mdx` qui contient le titre du bloc et ses métadonnées, et un fichier par colonne, `bloc_XX.mdx`. Les blocs sont ordonnés par numéro de fichier (`bloc_01.mdx` en premier, `bloc_02.mdx` en second, etc).

Un maximum de 12 blocs est autorisé.

**Métadonnées**
- `type`: doit être `alternated`
- `cards`: un tableau de propriétés des cards
    - `title`: titre de la card
    - `image`: les propriétés de l'image
    - `image.src`: url de l'image. Soit une url, soit le nom d'un fichier situé dans le dossier `public/`
    - `image.alt`: texte alternatif de l'image (pour l'accessibilité)
    - `image.position`: position de l'image. Soit `left` soit `right`. (`left` par défaut)
    - `image.mobile`: les propriétés de l'image sur mobile
    - `image.mobile.size`: taille d'affichage de l'image sur mobile. Soit `small`, `medium`, `large`. (`medium` par défaut)
- `cta`: les propriétés du CTA
- `cta.source`: Source utilisée comme propriété Matomo lors du clic
- `cta.href`: url de la page de destination (form par exemple). Si vide, l'url par défaut est utilisée (fichier config.ts).
- `cta.title`: Texte du bouton. Si vide, "Je souhaite recevoir ma Carte Verte" est utilisé.

#### Text only
Un bloc `text-only` est découpé en 2 fichiers, `bloc.mdx` et `title.mdx`. Le premier contient le contenu du bloc, et le second contient le titre du bloc et ses métadonnées.

**Métadonnées**
- `type`: doit être `text-only`
- `cta`: les propriétés du CTA
- `cta.source`: Source utilisée comme propriété Matomo lors du clic
- `cta.href`: url de la page de destination (form par exemple). Si vide, l'url par défaut est utilisée (fichier config.ts).
- `cta.title`: Texte du bouton. Si vide, "Je souhaite recevoir ma Carte Verte" est utilisé.

### FAQ
La FAQ est un ensemble de fichiers markdown numérotés situés dans le dossier `content/landing/faq`. Chaque fichier correspond à une question. La question est configurée dans les métadonnées du fichier, et le contenu du fichier est utilisé comme réponse. Le numéro du fichier est utilisé pour ordonner les questions sur la landing.
