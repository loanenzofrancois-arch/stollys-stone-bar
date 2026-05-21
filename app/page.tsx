"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Martini,
  Wine,
  Beer,
  Search,
  Send,
  Flame,
} from "lucide-react";

type Cocktail = {
  name: string;
  spirit: string;
  ingredients: string[];
  taste: string[];
  color: string;
  intensity: number;
  mood: string;
  glass: string;
  description: string;
  recipe: string;
};

const cocktails: Cocktail[] = [
  {
    name: "Aviation",
    spirit: "Gin",
    ingredients: ["Gin", "Marasquin", "Citron", "Liqueur violette"],
    taste: ["Floral", "Fruité"],
    color: "violet",
    intensity: 3,
    mood: "Elegant",
    glass: "Coupe",
    description: "Cocktail floral et raffiné.",
    recipe:
      "4cl Gin / 1.5cl Marasquin / 1.5cl citron / 1cl liqueur violette",
  },
  {
    name: "Negroni",
    spirit: "Gin",
    ingredients: ["Gin", "Campari", "Vermouth rouge"],
    taste: ["Amer", "Puissant"],
    color: "rouge",
    intensity: 5,
    mood: "Intense",
    glass: "Old Fashioned",
    description: "Classique italien amer et puissant.",
    recipe: "3cl Gin / 3cl Campari / 3cl Vermouth rouge",
  },
  {
    name: "Espresso Martini",
    spirit: "Vodka",
    ingredients: ["Vodka", "Espresso", "Liqueur café"],
    taste: ["Cafe", "Doux"],
    color: "ambre",
    intensity: 4,
    mood: "Night",
    glass: "Martini",
    description: "Cocktail énergique et gourmand.",
    recipe: "4cl Vodka / 3cl Espresso / 2cl liqueur café",
  },
  {
    name: "Mojito",
    spirit: "Rhum",
    ingredients: ["Rhum", "Menthe", "Citron vert", "Eau gazeuse"],
    taste: ["Frais", "Acidule"],
    color: "vert",
    intensity: 2,
    mood: "Summer",
    glass: "Highball",
    description: "Très frais et désaltérant.",
    recipe:
      "4cl Rhum / Menthe / 2cl citron vert / eau gazeuse / sucre",
  },
  {
    name: "Virgin Colada",
    spirit: "Sans alcool",
    ingredients: ["Ananas", "Coco", "Citron vert"],
    taste: ["Exotique", "Doux"],
    color: "jaune",
    intensity: 1,
    mood: "Relax",
    glass: "Tiki",
    description: "Version sans alcool tropicale.",
    recipe: "Jus ananas / crème coco / citron vert",
  },
  {
    name: "Guinness",
    spirit: "Bière",
    ingredients: ["Stout Irlandaise"],
    taste: ["Torréfie", "Crémeux"],
    color: "noir",
    intensity: 3,
    mood: "Pub",
    glass: "Pinte",
    description: "Bière iconique irlandaise.",
    recipe: "Servir très frais",
  },
  {
    name: "Chardonnay",
    spirit: "Vin",
    ingredients: ["Vin blanc"],
    taste: ["Sec", "Fruité"],
    color: "blanc",
    intensity: 2,
    mood: "Dinner",
    glass: "Verre à vin",
    description: "Vin blanc élégant.",
    recipe: "Servir entre 8 et 10°C",
  },
];

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(" ");
}

function Intensity({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((item) => (
        <Flame
          key={item}
          className={classNames(
            "h-4 w-4",
            item <= value ? "text-orange-400" : "text-zinc-700"
          )}
        />
      ))}
    </div>
  );
}

export default function Home() {
  const [search, setSearch] = useState<string>("");
  const [selected, setSelected] = useState<Cocktail | null>(null);
  const [mode, setMode] = useState<"visitor" | "barmaid">("visitor");

  useEffect(() => {
    if (window.location.hash === "#barmaid") {
      setMode("barmaid");
    }
  }, []);

  const filteredCocktails = useMemo(() => {
    return cocktails.filter((cocktail) =>
      cocktail.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  function sendToBar(cocktail: Cocktail) {
    alert(`${cocktail.name} envoyé au bar 🍸`);
  }

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-5xl font-bold text-amber-300">
              Stolly&apos;s Stone Bar
            </h1>
            <p className="text-zinc-400 mt-2">Speakeasy Experience</p>
          </div>

          <button
            onClick={() =>
              setMode(mode === "visitor" ? "barmaid" : "visitor")
            }
            className="bg-amber-400 text-black px-4 py-2 rounded-xl font-semibold"
          >
            {mode === "visitor" ? "Mode Barmaid" : "Mode Visiteur"}
          </button>
        </div>

        <div className="relative mb-8">
          <Search className="absolute left-4 top-4 h-5 w-5 text-zinc-500" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher un cocktail..."
            className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl pl-12 pr-4 py-4 text-white"
          />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCocktails.map((cocktail) => (
            <motion.div
              whileHover={{ scale: 1.03 }}
              key={cocktail.name}
              onClick={() => setSelected(cocktail)}
              className="cursor-pointer bg-zinc-900 border border-zinc-800 rounded-3xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold">{cocktail.name}</h2>
                  <p className="text-amber-300">{cocktail.spirit}</p>
                </div>

                {cocktail.spirit === "Bière" ? (
                  <Beer />
                ) : cocktail.spirit === "Vin" ? (
                  <Wine />
                ) : (
                  <Martini />
                )}
              </div>

              <p className="text-zinc-400 mb-4">{cocktail.description}</p>

              <div className="mb-4">
                <Intensity value={cocktail.intensity} />
              </div>

              <div className="flex flex-wrap gap-2">
                {cocktail.taste.map((tag) => (
                  <span
                    key={tag}
                    className="bg-zinc-800 px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center p-6 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 max-w-xl w-full"
            >
              <h2 className="text-4xl font-bold mb-2">{selected.name}</h2>
              <p className="text-amber-300 mb-6">{selected.spirit}</p>

              <div className="space-y-4 text-zinc-300">
                <div>
                  <h3 className="text-white font-semibold mb-2">Ingrédients</h3>
                  <ul className="list-disc ml-6">
                    {selected.ingredients.map((ingredient) => (
                      <li key={ingredient}>{ingredient}</li>
                    ))}
                  </ul>
                </div>

                {mode === "barmaid" && (
                  <div>
                    <h3 className="text-white font-semibold mb-2">Recette</h3>
                    <p>{selected.recipe}</p>
                  </div>
                )}
              </div>

              <div className="flex gap-4 mt-8">
                <button
                  onClick={() => setSelected(null)}
                  className="flex-1 bg-zinc-800 hover:bg-zinc-700 rounded-2xl py-3"
                >
                  Fermer
                </button>

                <button
                  onClick={() => sendToBar(selected)}
                  className="flex-1 bg-amber-400 hover:bg-amber-300 text-black rounded-2xl py-3 flex items-center justify-center gap-2 font-semibold"
                >
                  <Send className="h-4 w-4" />
                  Commander
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
