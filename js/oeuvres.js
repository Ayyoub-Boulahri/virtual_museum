// Catalogue des œuvres du musée des Années folles.
// Chaque entrée est utilisée à la fois pour accrocher le tableau (fichier, ratio, cadre)
// et pour le guide de visite (nom à l'approche, description quand on le regarde).
// Images : Wikimedia Commons, œuvres du domaine public.

const SALLES = {
  salle1: "Salle I · Paris, capitale des arts",
  salle2: "Salle II · L'abstraction : Bauhaus & De Stijl",
  salle3: "Salle III · L'Amérique du Jazz Age",
  mezzanine: "Mezzanine · Instantanés des Années folles",
  hall: "Hall · Chefs-d'œuvre",
};

const OEUVRES = {
  // ------------------------------------------------------------ Salle I
  monalisa: {
    fichier: "Mona_Lisa.jpg", ratio: 0.661, cadre: "dore", salle: "salle1",
    titre: "La Joconde", artiste: "Léonard de Vinci", annee: "vers 1503-1519",
    technique: "Huile sur panneau de peuplier", lieu: "Musée du Louvre, Paris",
    description: "Portrait de Lisa Gherardini, épouse du marchand florentin Francesco del Giocondo. Léonard y pousse à l'extrême le sfumato, ce modelé vaporeux qui adoucit les contours et anime le célèbre sourire.",
    anecdote: "En 1919, Marcel Duchamp dessine une moustache et un bouc sur une carte postale de la Joconde et l'intitule L.H.O.O.Q. : ce geste dada devient un manifeste des Années folles.",
  },
  lastDinner: {
    fichier: "last_dinner.jpg", ratio: 1.838, cadre: "dore", salle: "salle1",
    titre: "La Cène", artiste: "Léonard de Vinci", annee: "1495-1498",
    technique: "Tempera et huile sur plâtre", lieu: "Santa Maria delle Grazie, Milan",
    description: "Le Christ vient d'annoncer que l'un des apôtres va le trahir : Léonard saisit l'onde de stupeur qui parcourt la table. Toutes les lignes de la perspective convergent vers la tête du Christ.",
    anecdote: "Peinte à sec plutôt qu'en vraie fresque, l'œuvre a commencé à se dégrader du vivant même de Léonard.",
  },
  modigliani_hebuterne: {
    fichier: "modigliani_hebuterne.jpg", ratio: 0.585, cadre: "dore", salle: "salle1",
    titre: "Jeanne Hébuterne au chapeau", artiste: "Amedeo Modigliani", annee: "1919",
    technique: "Huile sur toile", lieu: "Collection particulière",
    description: "Jeanne Hébuterne, compagne du peintre, au cou allongé, au visage en amande et aux yeux sans pupilles : toute la grammaire de Modigliani, nourrie de sculpture africaine et de maniérisme italien.",
    anecdote: "Modigliani meurt de la tuberculose en janvier 1920, à 35 ans. Jeanne, enceinte, se donne la mort le lendemain.",
  },
  modigliani_lunia: {
    fichier: "modigliani_lunia.jpg", ratio: 0.651, cadre: "dore", salle: "salle1",
    titre: "Lunia Czechowska à la robe noire", artiste: "Amedeo Modigliani", annee: "1919",
    technique: "Huile sur toile", lieu: "Collection particulière",
    description: "Lunia Czechowska, amie polonaise du marchand Léopold Zborowski, fut l'un des modèles favoris de Modigliani. La robe noire et le fond sobre concentrent toute l'attention sur l'ovale du visage.",
  },
  soutine_groom: {
    fichier: "soutine_groom.jpg", ratio: 0.802, cadre: "dore", salle: "salle1",
    titre: "Le Groom", artiste: "Chaïm Soutine", annee: "vers 1925",
    technique: "Huile sur toile", lieu: "Centre Pompidou, Paris",
    description: "Un jeune chasseur d'hôtel dans son uniforme rouge vif, la main sur la hanche. La touche nerveuse et les déformations expressives traduisent l'intensité fiévreuse de la peinture de Soutine.",
    anecdote: "En 1922-1923, le collectionneur américain Albert Barnes achète d'un coup des dizaines de toiles de Soutine : le peintre, jusque-là misérable, devient célèbre du jour au lendemain.",
  },
  gris_arlequin: {
    fichier: "gris_arlequin.jpg", ratio: 0.79, cadre: "dore", salle: "salle1",
    titre: "Arlequin assis à la guitare", artiste: "Juan Gris", annee: "1919",
    technique: "Huile sur toile",
    description: "Figure de la commedia dell'arte chère aux cubistes, l'Arlequin est recomposé en plans colorés imbriqués. Gris pratique un cubisme synthétique, clair et rigoureux.",
    anecdote: "Voisin de Picasso au Bateau-Lavoir, Juan Gris meurt en 1927, à seulement 40 ans.",
  },
  delaunay_tour_eiffel: {
    fichier: "delaunay_tour_eiffel.jpg", ratio: 0.59, cadre: "dore", salle: "salle1",
    titre: "Tour Eiffel", artiste: "Robert Delaunay", annee: "1926",
    technique: "Huile sur toile",
    description: "Delaunay peint inlassablement la tour Eiffel, emblème de la modernité. La structure se dresse dans un tourbillon de couleurs vives, fragmentée par la lumière.",
    anecdote: "Avec son épouse Sonia, Delaunay est l'une des figures de l'orphisme, un nom inventé par Apollinaire.",
  },
  valadon_chambre_bleue: {
    fichier: "valadon_chambre_bleue.jpg", ratio: 1.354, cadre: "dore", salle: "salle1",
    titre: "La Chambre bleue", artiste: "Suzanne Valadon", annee: "1923",
    technique: "Huile sur toile", lieu: "Centre Pompidou, Paris",
    description: "Une femme allongée, en pantalon rayé, cigarette aux lèvres, entourée de livres : loin des odalisques lascives, Valadon peint une femme moderne, libre et sans artifice.",
    anecdote: "Ancien modèle de Renoir et de Toulouse-Lautrec, Suzanne Valadon est la première femme admise à la Société nationale des beaux-arts, en 1894.",
  },
  bonnard_petit_poucet: {
    fichier: "bonnard_petit_poucet.jpg", ratio: 1.461, cadre: "dore", salle: "salle1",
    titre: "Le Café du Petit Poucet", artiste: "Pierre Bonnard", annee: "1928",
    technique: "Huile sur toile", lieu: "Musée des Beaux-Arts et d'Archéologie, Besançon",
    description: "Une terrasse de café de la place de Clichy, baignée d'une lumière dorée. Bonnard compose la scène comme un instantané de la vie parisienne nocturne.",
    anecdote: "Le café du Petit Poucet existe toujours, à l'angle de la place de Clichy.",
  },
  vallotton_chale_rouge: {
    fichier: "vallotton_chale_rouge.jpg", ratio: 0.799, cadre: "dore", salle: "salle1",
    titre: "Femme au châle rouge", artiste: "Félix Vallotton", annee: "1920",
    technique: "Huile sur toile",
    description: "Un nu de dos, drapé dans un châle d'un rouge intense. Ancien nabi, Vallotton adopte une facture lisse et froide qui annonce la Nouvelle Objectivité.",
    anecdote: "Graveur sur bois de génie, Vallotton fut aussi romancier et critique d'art.",
  },

  // ------------------------------------------------------------ Salle II
  klee_senecio: {
    fichier: "klee_senecio.jpg", ratio: 0.918, cadre: "noir", salle: "salle2",
    titre: "Senecio", artiste: "Paul Klee", annee: "1922",
    technique: "Huile sur gaze", lieu: "Kunstmuseum, Bâle",
    description: "Un visage réduit à des formes simples — cercle, carrés, triangles — dans des tons chauds. Le titre évoque le séneçon, une plante, et le latin senex, « vieillard ».",
    anecdote: "Klee enseigne au Bauhaus de 1921 à 1931.",
  },
  kandinsky_gelb_rot_blau: {
    fichier: "kandinsky_gelb_rot_blau.jpg", ratio: 1.566, cadre: "noir", salle: "salle2",
    titre: "Jaune-Rouge-Bleu", artiste: "Vassily Kandinsky", annee: "1925",
    technique: "Huile sur toile", lieu: "Centre Pompidou, Paris",
    description: "Deux mondes s'opposent : à gauche, une forme jaune verticale aux contours nets ; à droite, un grand cercle bleu profond. Pour Kandinsky, chaque couleur possède une résonance intérieure, comme un son.",
    anecdote: "Professeur au Bauhaus de 1922 à 1933, Kandinsky y enseigne la théorie des formes et des couleurs.",
  },
  kandinsky_several_circles: {
    fichier: "kandinsky_several_circles.jpg", ratio: 0.982, cadre: "noir", salle: "salle2",
    titre: "Quelques cercles", artiste: "Vassily Kandinsky", annee: "1926",
    technique: "Huile sur toile", lieu: "Solomon R. Guggenheim Museum, New York",
    description: "Des cercles colorés et translucides flottent dans un espace sombre, comme des astres. Pour Kandinsky, le cercle est la forme la plus pure, la « synthèse des plus grandes oppositions ».",
  },
  mondrian_tableau_i: {
    fichier: "mondrian_tableau_i.jpg", ratio: 0.977, cadre: "noir", salle: "salle2",
    titre: "Tableau I", artiste: "Piet Mondrian", annee: "1921",
    technique: "Huile sur toile",
    description: "Mondrian réduit la peinture à l'essentiel : des lignes noires horizontales et verticales, les trois couleurs primaires et des gris. Il nomme ce langage le néoplasticisme.",
  },
  klee_burg_sonne: {
    fichier: "klee_burg_sonne.jpg", ratio: 1.219, cadre: "noir", salle: "salle2",
    titre: "Château et soleil", artiste: "Paul Klee", annee: "1928",
    technique: "Huile sur toile", lieu: "Collection particulière",
    description: "Une mosaïque de rectangles, de triangles et de carrés compose une cité fortifiée sous un soleil rond. Klee, musicien accompli, accorde les couleurs comme les notes d'une partition.",
  },
  mondrian_composition_ii: {
    fichier: "mondrian_composition_ii.jpg", ratio: 0.986, cadre: "noir", salle: "salle2",
    titre: "Composition II en rouge, bleu et jaune", artiste: "Piet Mondrian", annee: "1930",
    technique: "Huile sur toile", lieu: "Kunsthaus, Zurich",
    description: "Un grand carré rouge domine, équilibré par un petit carré bleu et une touche de jaune. L'harmonie naît de l'asymétrie et de la tension entre les surfaces.",
    anecdote: "Ce langage graphique a inspiré la mode : Yves Saint Laurent en tire sa célèbre robe Mondrian en 1965.",
  },
  lissitzky_proun: {
    fichier: "lissitzky_proun.jpg", ratio: 1.075, cadre: "noir", salle: "salle2",
    titre: "Proun", artiste: "El Lissitzky", annee: "vers 1923",
    technique: "Huile sur toile",
    description: "Les « Proun » (projets pour l'affirmation du nouveau) sont pour Lissitzky des « stations de correspondance entre la peinture et l'architecture » : des volumes en apesanteur dans un espace sans haut ni bas.",
  },
  malevich_paysan: {
    fichier: "malevich_paysan.jpg", ratio: 0.787, cadre: "noir", salle: "salle2",
    titre: "Tête de paysan", artiste: "Kasimir Malevitch", annee: "1928-1929",
    technique: "Huile sur contreplaqué", lieu: "Musée russe, Saint-Pétersbourg",
    description: "Après le suprématisme, Malevitch revient à la figure : un paysan au visage-masque, sans traits, se dresse devant des champs stylisés, à l'heure de la collectivisation forcée des campagnes.",
  },
  doesburg_counter_v: {
    fichier: "doesburg_counter_v.jpg", ratio: 0.985, cadre: "noir", salle: "salle2",
    titre: "Contre-composition V", artiste: "Theo van Doesburg", annee: "1924",
    technique: "Huile sur toile", lieu: "Stedelijk Museum, Amsterdam",
    description: "Fondateur de la revue De Stijl, Van Doesburg introduit la diagonale dans le langage orthogonal de Mondrian : c'est l'« élémentarisme », plus dynamique.",
    anecdote: "Ce désaccord sur la diagonale provoque la rupture entre Van Doesburg et Mondrian vers 1924-1925.",
  },
  kandinsky_on_white: {
    fichier: "kandinsky_on_white.jpg", ratio: 0.933, cadre: "noir", salle: "salle2",
    titre: "Sur blanc II", artiste: "Vassily Kandinsky", annee: "1923",
    technique: "Huile sur toile", lieu: "Centre Pompidou, Paris",
    description: "Sur un fond blanc lumineux, lignes et formes aiguës s'entrechoquent autour d'une grande diagonale noire : une composition sous tension, typique des années Bauhaus.",
  },

  // ------------------------------------------------------------ Salle III
  davis_lucky_strike: {
    fichier: "davis_lucky_strike.jpg", ratio: 0.541, cadre: "bois", salle: "salle3",
    titre: "Lucky Strike", artiste: "Stuart Davis", annee: "1921",
    technique: "Huile sur toile", lieu: "Museum of Modern Art, New York",
    description: "Davis transforme un paquet de tabac en composition cubiste. Bien avant le pop art, il fait entrer la publicité et les produits de consommation dans la peinture.",
    anecdote: "Grand amateur de jazz, Davis comparait sa peinture aux improvisations de ses musiciens favoris.",
  },
  hopper_automat: {
    fichier: "hopper_automat.jpg", ratio: 1.286, cadre: "bois", salle: "salle3",
    titre: "Automat", artiste: "Edward Hopper", annee: "1927",
    technique: "Huile sur toile", lieu: "Des Moines Art Center",
    description: "Une jeune femme seule, tasse de café à la main, dans un restaurant automatique la nuit. La vitre noire reflète les lampes à l'infini : Hopper peint la solitude urbaine.",
    anecdote: "Dans les « Automats », on se servait via des distributeurs à pièces : le symbole même de la vie moderne à New York.",
  },
  hopper_railroad: {
    fichier: "hopper_railroad.jpg", ratio: 1.208, cadre: "bois", salle: "salle3",
    titre: "La Maison près de la voie ferrée", artiste: "Edward Hopper", annee: "1925",
    technique: "Huile sur toile", lieu: "Museum of Modern Art, New York",
    description: "Une demeure victorienne isolée, coupée du spectateur par une voie ferrée. Le passé de l'Amérique semble abandonné au bord de la modernité.",
    anecdote: "C'est le premier tableau acquis par le MoMA, en 1930. Hitchcock s'en inspira pour la maison de Psychose.",
  },
  wood_american_gothic: {
    fichier: "wood_american_gothic.jpg", ratio: 0.828, cadre: "bois", salle: "salle3",
    titre: "American Gothic", artiste: "Grant Wood", annee: "1930",
    technique: "Huile sur panneau", lieu: "Art Institute of Chicago",
    description: "Un fermier et sa fille posent devant une maison de style néogothique. Image ambiguë, à la fois hommage et satire de l'Amérique rurale.",
    anecdote: "Les modèles étaient la sœur du peintre, Nan Wood Graham, et son dentiste, Byron McKeeby.",
  },
  motley_blues: {
    fichier: "motley_blues.jpg", ratio: 1.264, cadre: "bois", salle: "salle3",
    titre: "Blues", artiste: "Archibald Motley", annee: "1929",
    technique: "Huile sur toile",
    description: "Un club enfiévré où se mêlent danseurs et musiciens. Figure de la Renaissance de Harlem, Motley capte l'énergie et la sensualité de la culture du jazz.",
    anecdote: "Motley peint ce tableau à Paris, où le jazz fait fureur et où les clubs réunissent musiciens d'Afrique, des Antilles et d'Amérique.",
  },
  demuth_figure_5: {
    fichier: "demuth_figure_5.jpg", ratio: 0.828, cadre: "bois", salle: "salle3",
    titre: "I Saw the Figure 5 in Gold", artiste: "Charles Demuth", annee: "1928",
    technique: "Huile, graphite et encre sur carton", lieu: "Metropolitan Museum of Art, New York",
    description: "Un portrait-hommage au poète William Carlos Williams, inspiré de son poème « The Great Figure » : un camion de pompiers frappé d'un 5 doré traverse la ville la nuit.",
    anecdote: "Les mots « Bill », « Carlo » et les initiales « W.C.W. » sont cachés dans la composition.",
  },
  okeeffe_black_iris: {
    fichier: "okeeffe_black_iris.jpg", ratio: 0.836, cadre: "bois", salle: "salle3",
    titre: "Black Iris", artiste: "Georgia O'Keeffe", annee: "1926",
    technique: "Huile sur toile", lieu: "Metropolitan Museum of Art, New York",
    description: "Un iris agrandi jusqu'à remplir la toile. O'Keeffe veut forcer les citadins pressés de la ville moderne à prendre le temps de regarder vraiment une fleur.",
  },
  jazz_singer_affiche: {
    fichier: "jazz_singer_affiche.jpg", ratio: 0.658, cadre: "photo", salle: "salle3",
    titre: "Le Chanteur de jazz", artiste: "Warner Bros. (affiche)", annee: "1927",
    technique: "Affiche lithographiée",
    description: "Affiche du film d'Alan Crosland avec Al Jolson : le premier long métrage comportant des chansons et des dialogues synchronisés.",
    anecdote: "« Wait a minute, you ain't heard nothin' yet! » : la première réplique parlée, improvisée par Jolson, sonne le glas du cinéma muet.",
  },
  louise_brooks: {
    fichier: "louise_brooks.jpg", ratio: 0.848, cadre: "photo", salle: "salle3",
    titre: "Louise Brooks", artiste: "Photographie anonyme", annee: "années 1920",
    technique: "Tirage argentique", lieu: "Library of Congress, Washington",
    description: "Coupe au carré noire et frange droite : l'actrice Louise Brooks incarne la « flapper », jeune femme émancipée qui danse, fume, conduit et vote.",
    anecdote: "Elle triomphe en 1929 dans Loulou de G. W. Pabst.",
  },
  prohibition: {
    fichier: "prohibition.jpg", ratio: 1.258, cadre: "photo", salle: "salle3",
    titre: "La Prohibition à New York", artiste: "Photographie anonyme", annee: "vers 1921",
    technique: "Tirage argentique", lieu: "Library of Congress, Washington",
    description: "Le commissaire adjoint de la police de New York, John A. Leach (à droite), regarde des agents vider de l'alcool dans les égouts après une descente.",
    anecdote: "De 1920 à 1933, la vente d'alcool est interdite aux États-Unis : les bars clandestins (speakeasies) et les gangsters prospèrent.",
  },

  // ------------------------------------------------------------ Mezzanine
  lindbergh: {
    fichier: "lindbergh.jpg", ratio: 1.473, cadre: "photo", salle: "mezzanine",
    titre: "Lindbergh devant le Spirit of Saint Louis", artiste: "Agence Rol", annee: "1927",
    technique: "Négatif sur verre", lieu: "Bibliothèque nationale de France",
    description: "Les 20 et 21 mai 1927, Charles Lindbergh relie New York au Bourget en 33 h 30, seul et sans escale. Paris lui réserve un accueil triomphal.",
  },
  expo_1925: {
    fichier: "expo_1925.jpg", ratio: 1.388, cadre: "photo", salle: "mezzanine",
    titre: "L'Exposition des arts décoratifs", artiste: "Photographie anonyme", annee: "1925",
    technique: "Tirage argentique", lieu: "Bibliothèque nationale de France",
    description: "L'Exposition internationale des arts décoratifs et industriels modernes, à Paris, donne son nom au style Art déco : lignes géométriques, matériaux précieux, élégance moderne.",
    anecdote: "Le terme « Art déco », abréviation du nom de l'exposition, ne se popularise que dans les années 1960.",
  },
  expo_1925_porte: {
    fichier: "expo_1925_porte.jpg", ratio: 1.545, cadre: "photo", salle: "mezzanine",
    titre: "La Porte d'honneur, Exposition de 1925", artiste: "Carte postale", annee: "1925",
    technique: "Carte postale photographique", lieu: "Rijksmuseum, Amsterdam",
    description: "L'entrée monumentale de l'Exposition, conçue par les architectes Henri Favier et André Ventre, avec des grilles du ferronnier Edgar Brandt.",
  },
  bauhaus_maitres: {
    fichier: "bauhaus_maitres.jpg", ratio: 0.556, cadre: "photo", salle: "mezzanine",
    titre: "Les maîtres du Bauhaus à Dessau", artiste: "Photographie anonyme", annee: "1926",
    technique: "Tirage argentique",
    description: "Les professeurs du Bauhaus réunis sur le toit du nouveau bâtiment de Dessau, conçu par Walter Gropius et inauguré en décembre 1926.",
    anecdote: "Fermé par les nazis en 1933, le Bauhaus essaime dans le monde entier : ses maîtres émigrent aux États-Unis et y diffusent le modernisme.",
  },
  josephine_baker: {
    fichier: "josephine_baker.jpg", ratio: 0.621, cadre: "photo", salle: "mezzanine",
    titre: "Joséphine Baker", artiste: "Studio Walery", annee: "vers 1926",
    technique: "Carte postale photographique",
    description: "Arrivée à Paris en 1925 avec la Revue nègre, Joséphine Baker devient la vedette des Folies Bergère et l'icône des Années folles.",
    anecdote: "Résistante pendant la Seconde Guerre mondiale, elle entre au Panthéon en 2021.",
  },
  original_charleston: {
    fichier: "original_charleston.jpg", ratio: 0.765, cadre: "photo", salle: "mezzanine",
    titre: "The Original Charleston", artiste: "Roger de Valerio", annee: "vers 1926",
    technique: "Couverture de partition",
    description: "Partition du Charleston de Cecil Mack et Jimmy Johnson, chanté par Joséphine Baker dans la revue La Folie du jour aux Folies Bergère.",
  },
  baker_charleston: {
    fichier: "baker_charleston.jpg", ratio: 0.75, cadre: "photo", salle: "mezzanine",
    titre: "Joséphine Baker dansant le charleston", artiste: "Studio Walery", annee: "1926",
    technique: "Tirage argentique",
    description: "Venu de Caroline du Sud, le charleston déferle sur Paris : jambes lancées, genoux croisés, il devient la danse emblématique des Années folles.",
  },
  lenglen: {
    fichier: "lenglen.jpg", ratio: 1.026, cadre: "photo", salle: "mezzanine",
    titre: "Suzanne Lenglen à Cannes", artiste: "Photographie anonyme", annee: "1920",
    technique: "Tirage argentique",
    description: "« La Divine » domine le tennis mondial : six fois victorieuse à Wimbledon et double championne olympique à Anvers en 1920.",
    anecdote: "Elle bouscule les codes avec ses jupes courtes, ses bras nus et son bandeau, dessinés par le couturier Jean Patou.",
  },

  // ------------------------------------------------------------ Hall
  monet_nympheas: {
    fichier: "monet_nympheas.jpg", ratio: 3.483, cadre: "dore", salle: "hall",
    titre: "Les Nymphéas : Les Nuages", artiste: "Claude Monet", annee: "1915-1926",
    technique: "Huile sur toile", lieu: "Musée de l'Orangerie, Paris",
    description: "Au lendemain de l'armistice de 1918, Monet offre à l'État un ensemble monumental de Nymphéas. Les huit grands panneaux sont installés à l'Orangerie et inaugurés en 1927, quelques mois après sa mort.",
    anecdote: "Monet voulait offrir aux Parisiens « l'asile d'une méditation paisible au centre d'un aquarium fleuri ».",
  },
  kandinsky_composition_viii: {
    fichier: "kandinsky_composition_viii.jpg", ratio: 1.428, cadre: "dore", salle: "hall",
    titre: "Composition VIII", artiste: "Vassily Kandinsky", annee: "1923",
    technique: "Huile sur toile", lieu: "Solomon R. Guggenheim Museum, New York",
    description: "Cercles, triangles, lignes et damiers s'orchestrent comme une symphonie. Kandinsky y voyait l'aboutissement de sa période d'après-guerre.",
    anecdote: "Kandinsky « entendait » les couleurs : pour lui, peindre revenait à composer de la musique.",
  },
  stella_brooklyn_bridge: {
    fichier: "stella_brooklyn_bridge.jpg", ratio: 0.904, cadre: "dore", salle: "hall",
    titre: "Le Pont de Brooklyn", artiste: "Joseph Stella", annee: "1919-1920",
    technique: "Huile sur toile", lieu: "Yale University Art Gallery, New Haven",
    description: "Stella transforme le pont en cathédrale moderne de câbles, d'arches et de lumières : une vision futuriste et mystique de New York.",
    anecdote: "Sur le pont, Stella disait se sentir « comme au seuil d'une nouvelle religion ».",
  },
  bellows_dempsey_firpo: {
    fichier: "bellows_dempsey_firpo.jpg", ratio: 1.234, cadre: "dore", salle: "hall",
    titre: "Dempsey et Firpo", artiste: "George Bellows", annee: "1924",
    technique: "Huile sur toile", lieu: "Whitney Museum of American Art, New York",
    description: "Le 14 septembre 1923, l'Argentin Luis Firpo envoie le champion Jack Dempsey par-dessus les cordes. Dempsey remontera sur le ring et gagnera au deuxième round.",
    anecdote: "Bellows s'est représenté lui-même, à l'extrême gauche, parmi les journalistes.",
  },
  moise: {
    salle: "hall",
    titre: "Moïse", artiste: "Michel-Ange", annee: "1513-1515",
    technique: "Marbre (copie numérique)", lieu: "San Pietro in Vincoli, Rome",
    description: "Conçu pour le tombeau du pape Jules II, Moïse est assis, les Tables de la Loi sous le bras, le regard tourné vers son peuple infidèle. Une figure de colère contenue.",
    anecdote: "Les cornes sur sa tête viennent de la traduction latine de la Bible, où le mot hébreu « rayonnant » fut compris comme « cornu ».",
  },
};

// Renvoie les infos d'une œuvre, prêtes pour le guide (chemin de l'image et nom de la salle inclus)
function infoOeuvre(id) {
  const o = OEUVRES[id];
  return Object.assign({ id }, o, {
    salle: SALLES[o.salle] || "",
    image: o.fichier ? "./assets/posters/" + o.fichier : null,
  });
}

export { SALLES, OEUVRES, infoOeuvre };
