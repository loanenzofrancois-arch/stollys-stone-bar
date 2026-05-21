"use client";
import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Flame,
  Droplets,
  Moon,
  Sparkles,
  Clover,
  Wine,
  Martini,
  GlassWater,
  X,
  SlidersHorizontal,
  KeyRound,
  ClipboardList,
  Send,
  CheckCircle2,
} from "lucide-react";

const cocktails = [
  { name: "Aviation", spirit: "Gin", ingredients: ["Gin", "Marasquin", "Lime", "Liqueur violette"], taste: ["floral", "acidulé"], color: "violet", intensity: 2, mood: "Élégant & Sophistiqué", glass: "Coupe", description: "Un classique floral, aérien et délicatement rétro." },
  { name: "Negroni", spirit: "Gin", ingredients: ["Gin ou Mezcal", "Campari", "Vermouth rouge"], taste: ["amer", "fort"], color: "rouge", intensity: 5, mood: "Intense & Profond", glass: "Old fashioned", description: "Amer, noble et magnétique, pour les amateurs de caractère." },
  { name: "Negroni Blanc", spirit: "Gin", ingredients: ["Gin", "Suze", "Lillet blanc"], taste: ["amer", "sec"], color: "doré", intensity: 4, mood: "Mélancolique", glass: "Old fashioned", description: "Une variation claire, herbacée et contemplative." },
  { name: "Blue Moon", spirit: "Gin", ingredients: ["Gin", "Liqueur violette", "Citron", "Sirop de sucre"], taste: ["floral", "doux"], color: "bleu", intensity: 2, mood: "Mélancolique", glass: "Coupe", description: "Un verre nocturne, doux et mystérieux." },
  { name: "Jasmin", spirit: "Gin", ingredients: ["Gin", "Campari", "Triple sec", "Citron"], taste: ["acidulé", "amer"], color: "rouge", intensity: 3, mood: "Élégant & Sophistiqué", glass: "Coupe", description: "Équilibré, vif, avec une belle amertume de bar italien." },
  { name: "Bramble", spirit: "Gin", ingredients: ["Gin", "Liqueur mûre", "Citron vert", "Sirop de sucre"], taste: ["fruité", "acidulé"], color: "bordeaux", intensity: 2, mood: "Léger & Rafraîchissant", glass: "Rocks", description: "Fruité, frais et lumineux, parfait pour lancer la soirée." },
  { name: "Lucien Gaudin", spirit: "Gin", ingredients: ["Gin", "Campari", "Vermouth", "Triple sec"], taste: ["amer", "sec"], color: "rouge", intensity: 4, mood: "Élégant & Sophistiqué", glass: "Coupe", description: "Une signature vintage, sèche et raffinée." },
  { name: "Monkey Gland", spirit: "Gin", ingredients: ["Gin", "Absinthe", "Orange", "Grenadine"], taste: ["fruité", "anisé"], color: "orange", intensity: 4, mood: "Intense & Profond", glass: "Coupe", description: "Excentrique, épicé, avec une pointe d’absinthe." },
  { name: "Blooming Buds", spirit: "Gin", ingredients: ["Gin", "Fever Tree", "Liqueur de rose", "Liqueur de sureau", "Liqueur de violette"], taste: ["floral", "léger"], color: "rose", intensity: 2, mood: "Léger & Rafraîchissant", glass: "Highball", description: "Un jardin en verre, frais, floral et délicat." },
  { name: "Last Word", spirit: "Gin", ingredients: ["Gin", "Liqueur marasquin", "Lime", "Chartreuse ou liqueur de gin"], taste: ["herbacé", "acidulé"], color: "vert", intensity: 4, mood: "Fin de Nuit", glass: "Coupe", description: "Mystique et complexe, idéal pour les fins de conversation." },
  { name: "Blue Lady", spirit: "Gin", ingredients: ["Gin", "Curaçao bleu", "Lime"], taste: ["acidulé", "sec"], color: "bleu", intensity: 3, mood: "Fin de Nuit", glass: "Coupe", description: "Bleu électrique, net et nocturne." },
  { name: "Yuzu Sour", spirit: "Gin", ingredients: ["Gin", "Sureau", "Lime", "Sirop de sucre", "Purée yuzu"], taste: ["acidulé", "frais"], color: "jaune", intensity: 2, mood: "Léger & Rafraîchissant", glass: "Rocks", description: "Un sour éclatant, vif et très rafraîchissant." },

  { name: "Cuba Libre", spirit: "Rhum", ingredients: ["Rhum blanc", "Coca", "Citron vert"], taste: ["doux", "frais"], color: "brun", intensity: 2, mood: "Esprit Pub Irlandais", glass: "Highball", description: "Simple, convivial, parfait pour trinquer sans réfléchir." },
  { name: "Mai Tai", spirit: "Rhum", ingredients: ["Rhum vieux", "Sirop orgeat", "Lime", "Liqueur orange"], taste: ["fruité", "rond"], color: "ambre", intensity: 4, mood: "Chaleureux & Réconfortant", glass: "Tiki", description: "Tropical, généreux et chaleureux." },
  { name: "Piña Colada", spirit: "Rhum", ingredients: ["Rhum blanc", "Ananas", "Crème de coco", "Curaçao"], taste: ["doux", "fruité"], color: "crème", intensity: 2, mood: "Chaleureux & Réconfortant", glass: "Hurricane", description: "Un classique solaire, crémeux et réconfortant." },
  { name: "Hemingway", spirit: "Rhum", ingredients: ["Liqueur marasquin", "Pamplemousse", "Lime", "Rhum blanc"], taste: ["acidulé", "sec"], color: "rose", intensity: 3, mood: "Mélancolique", glass: "Coupe", description: "Sec, littéraire et légèrement amer." },
  { name: "Yuzu Daiquiri", spirit: "Rhum", ingredients: ["Rhum", "Purée yuzu", "Lime"], taste: ["acidulé", "frais"], color: "jaune", intensity: 2, mood: "Léger & Rafraîchissant", glass: "Coupe", description: "Un daiquiri moderne, citronné et précis." },
  { name: "Atlantic", spirit: "Rhum", ingredients: ["Rhum blanc", "Citron", "Grand Marnier", "Liqueur framboise"], taste: ["fruité", "acidulé"], color: "rouge", intensity: 3, mood: "Élégant & Sophistiqué", glass: "Coupe", description: "Fruité mais élégant, entre agrume et framboise." },
  { name: "Délice des Îles", spirit: "Rhum", ingredients: ["Rhum", "Ananas", "Citron", "Liqueur fruit de la passion"], taste: ["fruité", "doux"], color: "orange", intensity: 2, mood: "Léger & Rafraîchissant", glass: "Highball", description: "Une invitation douce et exotique." },
  { name: "Blue Hawaiian", spirit: "Rhum", ingredients: ["Rhum", "Liqueur coco", "Ananas", "Curaçao bleu"], taste: ["fruité", "doux"], color: "bleu", intensity: 2, mood: "Léger & Rafraîchissant", glass: "Highball", description: "Bleu lagon, coco et ananas, très festif." },
  { name: "Kinson", spirit: "Rhum", ingredients: ["Rhum", "Ananas", "Grand Marnier", "Chartreuse", "Curaçao bleu"], taste: ["fruité", "herbacé"], color: "vert", intensity: 4, mood: "Intense & Profond", glass: "Highball", description: "Tropical, puissant et étonnamment complexe." },
  { name: "Pink Panther", spirit: "Rhum", ingredients: ["Rhum", "Cannelle", "Citron", "Pêche", "Liqueur fraise"], taste: ["fruité", "épicé"], color: "rose", intensity: 3, mood: "Chaleureux & Réconfortant", glass: "Rocks", description: "Rose, gourmand et épicé, avec une belle douceur." },

  { name: "Margarita", spirit: "Others", ingredients: ["Tequila", "Triple sec", "Lime"], taste: ["acidulé", "sec"], color: "jaune", intensity: 3, mood: "Léger & Rafraîchissant", glass: "Margarita", description: "Fraîche, saline et directe." },
  { name: "Caipirinha", spirit: "Others", ingredients: ["Cachaça", "Lime", "Sirop de sucre"], taste: ["acidulé", "doux"], color: "vert", intensity: 3, mood: "Léger & Rafraîchissant", glass: "Rocks", description: "Rustique, fraîche et solaire." },
  { name: "Boulevardier", spirit: "Others", ingredients: ["Jack Daniel’s", "Abricot", "Ginger beer", "Lime", "Sirop de sucre"], taste: ["fort", "amer"], color: "ambre", intensity: 5, mood: "Intense & Profond", glass: "Old fashioned", description: "Profond, boisé, avec une touche d’abricot inattendue." },
  { name: "Pétales de Rose", spirit: "Others", ingredients: ["Crème cassis", "Liqueur de rose", "Campari"], taste: ["floral", "amer"], color: "rose", intensity: 3, mood: "Mélancolique", glass: "Rocks", description: "Floral, sombre et légèrement amer." },
  { name: "Japanese Slipper", spirit: "Others", ingredients: ["Tequila", "Crème melon", "Lime"], taste: ["fruité", "acidulé"], color: "vert", intensity: 2, mood: "Léger & Rafraîchissant", glass: "Coupe", description: "Vert vif, fruité et léger." },
  { name: "Peach Daiquiri", spirit: "Others", ingredients: ["Bacardi", "Liqueur pêche", "Lime"], taste: ["fruité", "acidulé"], color: "pêche", intensity: 2, mood: "Léger & Rafraîchissant", glass: "Coupe", description: "Pêche, lime et fraîcheur immédiate." },
  { name: "Niss’Une Kiss", spirit: "Others", ingredients: ["Curaçao bleu", "Nivau", "Prosecco", "Lime"], taste: ["pétillant", "frais"], color: "bleu", intensity: 2, mood: "Fin de Nuit", glass: "Coupe", description: "Pétillant, bleu et festif." },
  { name: "Pisco Sour", spirit: "Others", ingredients: ["Pisco", "Lime", "Sirop de sucre"], taste: ["acidulé", "doux"], color: "crème", intensity: 3, mood: "Élégant & Sophistiqué", glass: "Coupe", description: "Mousseux, élégant et parfaitement acidulé." },

  { name: "Apretini", spirit: "Vodka", ingredients: ["Vodka", "Liqueur pomme verte", "Citron vert", "Sirop de sucre"], taste: ["fruité", "acidulé"], color: "vert", intensity: 2, mood: "Léger & Rafraîchissant", glass: "Martini", description: "Pomme verte vive et acidulée." },
  { name: "Kamikaze", spirit: "Vodka", ingredients: ["Vodka", "Triple sec", "Lime", "Sirop de sucre"], taste: ["acidulé", "sec"], color: "clair", intensity: 3, mood: "Fin de Nuit", glass: "Shot / Coupe", description: "Net, vif, efficace." },
  { name: "Moscow Mule", spirit: "Vodka", ingredients: ["Vodka", "Ginger beer", "Lime"], taste: ["frais", "épicé"], color: "ambre", intensity: 2, mood: "Esprit Pub Irlandais", glass: "Mug cuivre", description: "Gingembre, cuivre et fraîcheur immédiate." },
  { name: "Long Island", spirit: "Vodka", ingredients: ["Vodka", "Tequila", "Rhum blanc", "Gin", "Triple sec", "Citron", "Sirop de canne"], taste: ["fort", "doux"], color: "brun", intensity: 5, mood: "Intense & Profond", glass: "Highball", description: "Puissant, généreux et dangereusement facile." },
  { name: "Russian Spring Punch", spirit: "Vodka", ingredients: ["Vodka", "Citron", "Cassis", "Prosecco", "Sirop de sucre"], taste: ["fruité", "pétillant"], color: "rouge", intensity: 3, mood: "Léger & Rafraîchissant", glass: "Highball", description: "Rouge, pétillant et joyeux." },
  { name: "Cosmopolitan", spirit: "Vodka", ingredients: ["Vodka", "Triple sec", "Lime", "Cranberry"], taste: ["acidulé", "fruité"], color: "rose", intensity: 3, mood: "Élégant & Sophistiqué", glass: "Martini", description: "Chic, rosé et intemporel." },
  { name: "French Martini", spirit: "Vodka", ingredients: ["Vodka", "Chambord", "Ananas"], taste: ["fruité", "doux"], color: "crème", intensity: 2, mood: "Élégant & Sophistiqué", glass: "Martini", description: "Velouté, fruité et très lounge." },
  { name: "Sea Breeze", spirit: "Vodka", ingredients: ["Vodka", "Cranberry", "Pamplemousse"], taste: ["fruité", "acidulé"], color: "rouge", intensity: 2, mood: "Léger & Rafraîchissant", glass: "Highball", description: "Frais, rouge et désaltérant." },
  { name: "Sweet Melon", spirit: "Vodka", ingredients: ["Vodka", "Crème melon", "Ananas"], taste: ["doux", "fruité"], color: "vert", intensity: 2, mood: "Chaleureux & Réconfortant", glass: "Coupe", description: "Doux, rond et fruité." },
  { name: "Sex on the Beach", spirit: "Vodka", ingredients: ["Vodka", "Liqueur pêche", "Jus d’orange", "Chambord", "Ananas"], taste: ["fruité", "doux"], color: "orange", intensity: 2, mood: "Léger & Rafraîchissant", glass: "Highball", description: "Coloré, fruité et très festif." },
  { name: "Ultra Violet", spirit: "Vodka", ingredients: ["Vodka", "Triple sec", "Sirop violette"], taste: ["floral", "doux"], color: "violet", intensity: 3, mood: "Fin de Nuit", glass: "Coupe", description: "Violet profond, floral et nocturne." },
  { name: "Espresso Martini", spirit: "Vodka", ingredients: ["Vodka", "Liqueur café", "Espresso", "Tia Maria", "Sirop de sucre"], taste: ["café", "fort"], color: "noir", intensity: 4, mood: "Fin de Nuit", glass: "Martini", description: "La dernière énergie de la soirée, sombre et élégante." },
  { name: "Sonic Screwdriver", spirit: "Vodka", ingredients: ["Vodka", "Curaçao bleu", "Orange"], taste: ["fruité", "frais"], color: "bleu", intensity: 2, mood: "Léger & Rafraîchissant", glass: "Highball", description: "Bleu vif, orange et très facile à aimer." },
  { name: "Blue Hawaiian Vodka", spirit: "Vodka", ingredients: ["Vodka", "Bacardi", "Curaçao bleu", "Citron", "Jus de canne"], taste: ["fruité", "acidulé"], color: "bleu", intensity: 3, mood: "Fin de Nuit", glass: "Highball", description: "Un bleu intense, plus sec et plus électrique." },
  { name: "Barbie Shot", spirit: "Vodka", ingredients: ["Vodka", "Malibu", "Cranberry", "Orange"], taste: ["fruité", "doux"], color: "rose", intensity: 2, mood: "Chaleureux & Réconfortant", glass: "Shot", description: "Fun, rose et sucré." },
  { name: "Poison Bitch", spirit: "Vodka", ingredients: ["Vodka", "Campari", "Orange", "Triple sec", "Cranberry"], taste: ["amer", "fruité"], color: "rouge", intensity: 4, mood: "Intense & Profond", glass: "Rocks", description: "Amer, rouge, piquant et assumé." },
  { name: "Midnight Temptation Martini", spirit: "Vodka", ingredients: ["Vodka", "Curaçao bleu", "Triple sec", "Lime"], taste: ["acidulé", "sec"], color: "bleu", intensity: 3, mood: "Fin de Nuit", glass: "Martini", description: "Bleu nuit, sec et séduisant." },
  { name: "Black Jack Martini", spirit: "Vodka", ingredients: ["Vodka", "Chambord", "Cranberry", "Citron"], taste: ["fruité", "acidulé"], color: "bordeaux", intensity: 3, mood: "Mélancolique", glass: "Martini", description: "Sombre, fruité et élégant." },
  { name: "Cosmo Litchi / Amore Rosé", spirit: "Vodka", ingredients: ["Vodka", "Sirop ou litchi", "Limoncello", "Rose", "Citron vert", "Pamplemousse rose"], taste: ["floral", "fruité"], color: "rose", intensity: 3, mood: "Élégant & Sophistiqué", glass: "Coupe", description: "Romantique, floral et délicatement acidulé." },,

  { name: "Tom Collins", spirit: "Gin", ingredients: ["Gin", "Citron", "Sirop de sucre", "Fever Tree"], taste: ["frais", "acidulé"], color: "clair", intensity: 2, mood: "Léger & Rafraîchissant", glass: "Highball", description: "Grand classique pétillant, citronné et facile à boire." },
  { name: "Gin Fizz", spirit: "Gin", ingredients: ["Gin", "Citron", "Sirop de sucre", "Fever Tree"], taste: ["frais", "pétillant"], color: "clair", intensity: 2, mood: "Léger & Rafraîchissant", glass: "Highball", description: "Vif, mousseux et désaltérant, parfait en début de soirée." },
  { name: "Gimlet", spirit: "Gin", ingredients: ["Gin", "Lime", "Sirop de sucre"], taste: ["acidulé", "sec"], color: "clair", intensity: 3, mood: "Élégant & Sophistiqué", glass: "Coupe", description: "Minimaliste, précis et très cocktail bar." },
  { name: "Southside", spirit: "Gin", ingredients: ["Gin", "Lime", "Sirop de sucre"], taste: ["frais", "acidulé"], color: "clair", intensity: 2, mood: "Léger & Rafraîchissant", glass: "Coupe", description: "Un gin sour frais et élégant, très speakeasy." },
  { name: "White Lady", spirit: "Gin", ingredients: ["Gin", "Triple sec", "Citron"], taste: ["acidulé", "sec"], color: "clair", intensity: 3, mood: "Élégant & Sophistiqué", glass: "Coupe", description: "Chic, citronné et sec, une valeur sûre de bar classique." },
  { name: "French 75", spirit: "Gin", ingredients: ["Gin", "Citron", "Sirop de sucre", "Prosecco"], taste: ["pétillant", "acidulé"], color: "doré", intensity: 3, mood: "Élégant & Sophistiqué", glass: "Flûte", description: "Pétillant, sophistiqué et festif sans être trop sucré." },
  { name: "Floradora", spirit: "Gin", ingredients: ["Gin", "Liqueur framboise", "Lime", "Ginger beer"], taste: ["fruité", "frais"], color: "rose", intensity: 2, mood: "Léger & Rafraîchissant", glass: "Highball", description: "Framboise, gingembre et gin pour un cocktail rose très vivant." },
  { name: "Sureau Collins", spirit: "Gin", ingredients: ["Gin", "Liqueur de sureau", "Citron", "Fever Tree"], taste: ["floral", "frais"], color: "clair", intensity: 2, mood: "Léger & Rafraîchissant", glass: "Highball", description: "Floral, long et délicat, idéal pour ceux qui veulent de la fraîcheur." },
  { name: "Rose Gin Spritz", spirit: "Gin", ingredients: ["Gin", "Liqueur de rose", "Prosecco", "Citron"], taste: ["floral", "pétillant"], color: "rose", intensity: 2, mood: "Élégant & Sophistiqué", glass: "Wine glass", description: "Un spritz floral, romantique et très lumineux." },
  { name: "Violet Gin Fizz", spirit: "Gin", ingredients: ["Gin", "Liqueur violette", "Citron", "Sirop de sucre", "Fever Tree"], taste: ["floral", "frais"], color: "violet", intensity: 2, mood: "Mélancolique", glass: "Highball", description: "Un fizz violet, doux et mystérieux, parfait pour l’ambiance du bar." },

  { name: "Classic Daiquiri", spirit: "Rhum", ingredients: ["Rhum blanc", "Lime", "Sirop de sucre"], taste: ["acidulé", "sec"], color: "clair", intensity: 3, mood: "Élégant & Sophistiqué", glass: "Coupe", description: "Pur, net et précis, le rhum dans sa version la plus élégante." },
  { name: "Mojito Royal", spirit: "Rhum", ingredients: ["Rhum blanc", "Lime", "Sirop de sucre", "Prosecco"], taste: ["frais", "pétillant"], color: "clair", intensity: 2, mood: "Léger & Rafraîchissant", glass: "Highball", description: "Une version plus chic et pétillante du mojito." },
  { name: "Rum Mule", spirit: "Rhum", ingredients: ["Rhum", "Ginger beer", "Lime"], taste: ["frais", "épicé"], color: "ambre", intensity: 2, mood: "Esprit Pub Irlandais", glass: "Highball", description: "Le gingembre du mule avec la rondeur du rhum." },
  { name: "Rum Sour", spirit: "Rhum", ingredients: ["Rhum", "Citron", "Sirop de sucre"], taste: ["acidulé", "doux"], color: "ambre", intensity: 3, mood: "Chaleureux & Réconfortant", glass: "Rocks", description: "Un sour rond, chaleureux et très accessible." },
  { name: "Coco Daiquiri", spirit: "Rhum", ingredients: ["Rhum blanc", "Liqueur coco", "Lime", "Sirop de sucre"], taste: ["doux", "acidulé"], color: "clair", intensity: 2, mood: "Chaleureux & Réconfortant", glass: "Coupe", description: "Coco, lime et rhum blanc pour une douceur tropicale maîtrisée." },
  { name: "Passion Daiquiri", spirit: "Rhum", ingredients: ["Rhum", "Liqueur fruit de la passion", "Lime"], taste: ["fruité", "acidulé"], color: "orange", intensity: 2, mood: "Léger & Rafraîchissant", glass: "Coupe", description: "Exotique, vif et solaire, avec une belle tension acidulée." },
  { name: "Blackberry Rum Bramble", spirit: "Rhum", ingredients: ["Rhum", "Liqueur mûre", "Citron vert", "Sirop de sucre"], taste: ["fruité", "acidulé"], color: "bordeaux", intensity: 2, mood: "Mélancolique", glass: "Rocks", description: "Une variation sombre et fruitée du Bramble, plus ronde grâce au rhum." },
  { name: "Rum Old Fashioned", spirit: "Rhum", ingredients: ["Rhum vieux", "Sirop de sucre", "Orange"], taste: ["fort", "doux"], color: "ambre", intensity: 4, mood: "Intense & Profond", glass: "Old fashioned", description: "Boisé, lent et profond, pour les amateurs de cocktails de dégustation." },

  { name: "Vodka Gimlet", spirit: "Vodka", ingredients: ["Vodka", "Lime", "Sirop de sucre"], taste: ["acidulé", "sec"], color: "clair", intensity: 3, mood: "Élégant & Sophistiqué", glass: "Coupe", description: "Une version plus neutre et très nette du Gimlet." },
  { name: "Vodka Collins", spirit: "Vodka", ingredients: ["Vodka", "Citron", "Sirop de sucre", "Fever Tree"], taste: ["frais", "acidulé"], color: "clair", intensity: 2, mood: "Léger & Rafraîchissant", glass: "Highball", description: "Simple, frais et citronné, pensé pour plaire au plus grand nombre." },
  { name: "Litchi Martini", spirit: "Vodka", ingredients: ["Vodka", "Sirop ou litchi", "Lime"], taste: ["fruité", "doux"], color: "clair", intensity: 2, mood: "Élégant & Sophistiqué", glass: "Martini", description: "Doux, parfumé et très élégant, avec une finale fraîche." },
  { name: "Cranberry Mule", spirit: "Vodka", ingredients: ["Vodka", "Cranberry", "Ginger beer", "Lime"], taste: ["fruité", "frais"], color: "rouge", intensity: 2, mood: "Esprit Pub Irlandais", glass: "Mug cuivre", description: "Un Moscow Mule rouge, fruité et encore plus festif." },
  { name: "Melon Ball", spirit: "Vodka", ingredients: ["Vodka", "Crème melon", "Orange", "Ananas"], taste: ["fruité", "doux"], color: "vert", intensity: 2, mood: "Chaleureux & Réconfortant", glass: "Highball", description: "Vert, doux et tropical, très facile à aimer." },
  { name: "Black Russian", spirit: "Vodka", ingredients: ["Vodka", "Liqueur café"], taste: ["café", "fort"], color: "noir", intensity: 4, mood: "Fin de Nuit", glass: "Old fashioned", description: "Sombre, direct et idéal pour les amateurs de café." },
  { name: "Vodka Rose Lemonade", spirit: "Vodka", ingredients: ["Vodka", "Liqueur de rose", "Citron", "Sirop de sucre", "Fever Tree"], taste: ["floral", "frais"], color: "rose", intensity: 2, mood: "Léger & Rafraîchissant", glass: "Highball", description: "Une limonade rose, florale et très fraîche." },

  { name: "Tequila Sunrise", spirit: "Others", ingredients: ["Tequila", "Orange", "Grenadine"], taste: ["fruité", "doux"], color: "orange", intensity: 2, mood: "Chaleureux & Réconfortant", glass: "Highball", description: "Visuel, solaire et convivial, parfait pour les invités." },
  { name: "Paloma Maison", spirit: "Others", ingredients: ["Tequila", "Pamplemousse", "Lime", "Fever Tree"], taste: ["frais", "acidulé"], color: "rose", intensity: 2, mood: "Léger & Rafraîchissant", glass: "Highball", description: "Fraîche, rose et légèrement amère, une alternative à la Margarita." },
  { name: "Mezcal Negroni", spirit: "Others", ingredients: ["Mezcal", "Campari", "Vermouth rouge"], taste: ["amer", "fort"], color: "rouge", intensity: 5, mood: "Intense & Profond", glass: "Old fashioned", description: "Fumé, amer et profond, pour les palais curieux." },
  { name: "Whiskey Sour Maison", spirit: "Others", ingredients: ["Jack Daniel’s", "Citron", "Sirop de sucre"], taste: ["acidulé", "fort"], color: "ambre", intensity: 4, mood: "Chaleureux & Réconfortant", glass: "Rocks", description: "Un classique boisé et acidulé, très réconfortant." },
  { name: "Whiskey Mule", spirit: "Others", ingredients: ["Jack Daniel’s", "Ginger beer", "Lime"], taste: ["épicé", "frais"], color: "ambre", intensity: 3, mood: "Esprit Pub Irlandais", glass: "Highball", description: "Boisé, épicé et très pub, avec une belle fraîcheur." },
  { name: "Apricot Jack", spirit: "Others", ingredients: ["Jack Daniel’s", "Abricot", "Citron", "Sirop de sucre"], taste: ["fruité", "fort"], color: "ambre", intensity: 4, mood: "Intense & Profond", glass: "Rocks", description: "Whiskey, abricot et citron pour un cocktail puissant mais velouté." },
  { name: "Cassis Spritz", spirit: "Others", ingredients: ["Crème cassis", "Prosecco", "Citron"], taste: ["fruité", "pétillant"], color: "rouge", intensity: 2, mood: "Léger & Rafraîchissant", glass: "Wine glass", description: "Rouge, pétillant et élégant, très simple à servir." },
  { name: "Yuzu Margarita", spirit: "Others", ingredients: ["Tequila", "Triple sec", "Purée yuzu", "Lime"], taste: ["acidulé", "frais"], color: "jaune", intensity: 3, mood: "Léger & Rafraîchissant", glass: "Margarita", description: "Une Margarita moderne, plus vive et plus parfumée." },
];

const moods = [
  { label: "Tous", icon: Sparkles },
  { label: "Chaleureux & Réconfortant", icon: Flame },
  { label: "Léger & Rafraîchissant", icon: Droplets },
  { label: "Élégant & Sophistiqué", icon: Martini },
  { label: "Intense & Profond", icon: Wine },
  { label: "Mélancolique", icon: Moon },
  { label: "Fin de Nuit", icon: Moon },
  { label: "Esprit Pub Irlandais", icon: Clover },
];

const spirits = ["Tous", "Gin", "Rhum", "Vodka", "Others"];
const tastes = ["Tous", "fruité", "acidulé", "doux", "amer", "fort", "floral", "frais", "sec", "pétillant", "épicé", "herbacé", "café"];
const colors = ["Tous", "rouge", "rose", "bleu", "vert", "violet", "ambre", "orange", "jaune", "bordeaux", "crème", "brun", "clair", "noir"];

function classNames(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function Intensity({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((item) => (
        <span
          key={item}
          className={classNames(
            "h-1.5 w-6 rounded-full border border-[#7A5A2A]/50",
            item <= value ? "bg-[#C58B45] shadow-[0_0_10px_rgba(197,139,69,.5)]" : "bg-[#161311]"
          )}
        />
      ))}
    </div>
  );
}

function SelectFilter({ label, value, onChange, options }) {
  return (
    <label className="flex flex-col gap-2 text-xs uppercase tracking-[0.24em] text-[#C7A56A]">
      {label}
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="rounded-xl border border-[#7A5A2A]/60 bg-[#161311]/90 px-4 py-3 font-sans text-sm normal-case tracking-normal text-[#E8DDC7] outline-none transition focus:border-[#C7A56A]"
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}

function SecretDoorIntro({ onEnter }) {
  const [opening, setOpening] = useState(false);

  const enter = () => {
    setOpening(true);
    window.setTimeout(onEnter, 1150);
  };

  return (
    <motion.div
      className="fixed inset-0 z-[100] overflow-hidden bg-[#050403] text-[#E8DDC7]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(184,115,51,.18),transparent_34%),linear-gradient(180deg,#030201,#11100e_45%,#050403)]" />
      <motion.div
        className="absolute left-1/2 top-1/2 h-[72vh] w-[78vw] max-w-3xl -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-t-[2rem] border border-[#7A5A2A]/60 bg-[#120c08] shadow-[0_0_80px_rgba(0,0,0,.85)]"
        animate={opening ? { scale: 1.08 } : { scale: 1 }}
        transition={{ duration: 1.1, ease: "easeInOut" }}
      >
        <motion.div
          className="absolute inset-y-0 left-0 w-1/2 origin-left border-r border-[#7A5A2A]/50 bg-[linear-gradient(90deg,#1b1009,#3a2418_52%,#160d08)]"
          animate={opening ? { rotateY: -72, x: -40 } : { rotateY: 0, x: 0 }}
          transition={{ duration: 1.05, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute inset-y-0 right-0 w-1/2 origin-right border-l border-[#7A5A2A]/50 bg-[linear-gradient(270deg,#1b1009,#3a2418_52%,#160d08)]"
          animate={opening ? { rotateY: 72, x: 40 } : { rotateY: 0, x: 0 }}
          transition={{ duration: 1.05, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_55%,rgba(232,221,199,.55),rgba(197,139,69,.18)_28%,transparent_58%)]"
          initial={{ opacity: 0 }}
          animate={opening ? { opacity: 1 } : { opacity: 0.12 }}
          transition={{ duration: 0.8 }}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
          <motion.div animate={opening ? { opacity: 0, y: -18 } : { opacity: 1, y: 0 }}>
            <KeyRound className="mx-auto mb-6 h-10 w-10 text-[#B87333]" strokeWidth={1.2} />
            <p className="text-xs uppercase tracking-[0.35em] text-[#B87333]">Behind the stone</p>
            <h1 className="mt-5 font-serif text-4xl uppercase tracking-[0.16em] text-[#E8DDC7] md:text-7xl">Stolly’s<br /><span className="text-[#C7A56A]">Stone Bar</span></h1>
            <p className="mt-6 font-serif text-xl italic text-[#C7A56A]">Knock to enter</p>
            <button onClick={enter} className="mt-8 rounded-full border border-[#C7A56A]/70 bg-[#B87333]/15 px-7 py-4 text-xs uppercase tracking-[0.24em] text-[#E8DDC7] shadow-[0_0_35px_rgba(184,115,51,.25)] transition hover:bg-[#B87333]/30">
              Frapper à la porte
            </button>
          </motion.div>
        </div>
      </motion.div>
      <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center text-[10px] uppercase tracking-[0.28em] text-[#E8DDC7]/45" animate={{ opacity: [0.35, 0.8, 0.35] }} transition={{ repeat: Infinity, duration: 2.8 }}>
        Jazz lounge · lumière ambrée · entrée privée
      </motion.div>
    </motion.div>
  );
}

function recipeFor(cocktail) {
  const citrus = ["Citron", "Lime", "Citron vert", "Pamplemousse", "Purée yuzu"];
  const sweet = ["Sirop", "Grenadine", "Orgeat", "Miel", "Cassis"];
  const sparkling = ["Fever Tree", "Ginger beer", "Prosecco", "Coca", "Tonic"];
  return cocktail.ingredients.map((ingredient, index) => {
    const dose = sparkling.some((word) => ingredient.toLowerCase().includes(word.toLowerCase()))
      ? "top"
      : citrus.some((word) => ingredient.toLowerCase().includes(word.toLowerCase()))
        ? "2 cl"
        : sweet.some((word) => ingredient.toLowerCase().includes(word.toLowerCase()))
          ? "1 à 1,5 cl"
          : index === 0
            ? "4 cl"
            : "2 cl";
    return { ingredient, dose };
  });
}

function methodFor(cocktail) {
  if (["Negroni", "Negroni Blanc", "Lucien Gaudin", "Black Russian", "Mezcal Negroni"].includes(cocktail.name)) return "Stir au verre à mélange, puis servir sur glace.";
  if (cocktail.glass?.toLowerCase().includes("highball") || cocktail.ingredients.some((i) => ["Ginger beer", "Fever Tree", "Coca", "Prosecco"].includes(i))) return "Monter directement au verre sur glace, puis remuer délicatement.";
  return "Shaker avec glace, double filtrer, puis servir frais.";
}

function CocktailCard({ cocktail, onClick }) {
  return (
    <motion.button
      layout
      onClick={() => onClick(cocktail)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      whileHover={{ y: -6 }}
      className="group relative overflow-hidden rounded-2xl border border-[#7A5A2A]/50 bg-[#161311]/80 p-4 text-left shadow-2xl shadow-black/30 transition hover:border-[#C7A56A]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(184,115,51,.25),transparent_45%)] opacity-0 transition group-hover:opacity-100" />
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-[#7A5A2A]/40 bg-[linear-gradient(135deg,#123524,#161311_45%,#3a2418)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(232,221,199,.16),transparent_18%),radial-gradient(circle_at_50%_70%,rgba(197,139,69,.25),transparent_34%)]" />
        <GlassWater className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 text-[#C7A56A]/80" strokeWidth={1.2} />
        <div className="absolute bottom-3 left-3 rounded-full border border-[#C7A56A]/40 bg-black/30 px-3 py-1 text-xs uppercase tracking-[0.18em] text-[#E8DDC7] backdrop-blur">{cocktail.color}</div>
      </div>
      <div className="relative mt-4">
        <p className="font-serif text-xl uppercase tracking-[0.12em] text-[#E8DDC7]">{cocktail.name}</p>
        <p className="mt-1 text-xs uppercase tracking-[0.22em] text-[#C7A56A]">{cocktail.mood}</p>
        <p className="mt-3 line-clamp-2 font-serif text-sm text-[#E8DDC7]/75">{cocktail.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {cocktail.taste.slice(0, 2).map((taste) => (
            <span key={taste} className="rounded-full border border-[#7A5A2A]/60 px-3 py-1 text-xs text-[#C7A56A]">{taste}</span>
          ))}
        </div>
      </div>
    </motion.button>
  );
}

export default function StollysStoneBar() {
  const [introDone, setIntroDone] = useState(false);
  const [orders, setOrders] = useState([]);
  const [mood, setMood] = useState("Tous");
  const [spirit, setSpirit] = useState("Tous");
  const [taste, setTaste] = useState("Tous");
  const [color, setColor] = useState("Tous");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);

  const filteredCocktails = useMemo(() => {
    return cocktails.filter((cocktail) => {
      const matchesMood = mood === "Tous" || cocktail.mood === mood;
      const matchesSpirit = spirit === "Tous" || cocktail.spirit === spirit;
      const matchesTaste = taste === "Tous" || cocktail.taste.includes(taste);
      const matchesColor = color === "Tous" || cocktail.color === color;
      const q = query.trim().toLowerCase();
      const matchesQuery = !q || [cocktail.name, cocktail.spirit, cocktail.mood, cocktail.description, ...cocktail.ingredients, ...cocktail.taste].join(" ").toLowerCase().includes(q);
      return matchesMood && matchesSpirit && matchesTaste && matchesColor && matchesQuery;
    });
  }, [mood, spirit, taste, color, query]);

  const sendToBar = (cocktail) => {
    setOrders((current) => [
      { id: `${cocktail.name}-${Date.now()}`, cocktail, status: "En attente", createdAt: new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }) },
      ...current,
    ]);
    setSelected(null);
  };

  const updateOrderStatus = (id, status) => {
    setOrders((current) => current.map((order) => order.id === id ? { ...order, status } : order));
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#161311] text-[#E8DDC7] selection:bg-[#B87333] selection:text-[#161311]">
      <AnimatePresence>{!introDone && <SecretDoorIntro onEnter={() => setIntroDone(true)} />}</AnimatePresence>
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_20%_10%,rgba(18,53,36,.95),transparent_36%),radial-gradient(circle_at_80%_0%,rgba(184,115,51,.22),transparent_28%),linear-gradient(180deg,#07120c,#161311_50%,#0b0908)]" />
      <div className="fixed inset-0 pointer-events-none opacity-[0.08] [background-image:url('data:image/svg+xml,%3Csvg_viewBox=%220_0_200_200%22_xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter_id=%22n%22%3E%3CfeTurbulence_type=%22fractalNoise%22_baseFrequency=%220.85%22_numOctaves=%224%22_stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect_width=%22100%25%22_height=%22100%25%22_filter=%22url(%23n)%22/%3E%3C/svg%3E')]" />

      <header className="fixed left-0 right-0 top-0 z-40 border-b border-[#7A5A2A]/30 bg-[#161311]/70 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <a href="#home" className="font-serif text-lg uppercase tracking-[0.22em] text-[#C7A56A]">Stolly’s</a>
          <div className="hidden items-center gap-8 text-xs uppercase tracking-[0.22em] text-[#E8DDC7]/75 md:flex">
            <a className="transition hover:text-[#C7A56A]" href="#home">Accueil</a>
            <a className="transition hover:text-[#C7A56A]" href="#cocktails">Cocktails</a>
            <a className="transition hover:text-[#C7A56A]" href="#story">L’esprit</a>
            <a className="transition hover:text-[#C7A56A]" href="#barmaid">Barmaid</a>
          </div>
          <a href="#cocktails" className="rounded-full border border-[#7A5A2A]/60 px-4 py-2 text-xs uppercase tracking-[0.18em] text-[#C7A56A] transition hover:bg-[#B87333]/20">Entrer</a>
        </nav>
      </header>

      <section id="home" className="relative flex min-h-screen items-center px-5 pt-24">
        <motion.div
          className="absolute left-1/2 top-24 h-80 w-80 -translate-x-1/2 rounded-full bg-[#C58B45]/10 blur-3xl"
          animate={{ opacity: [0.25, 0.55, 0.25], scale: [1, 1.08, 1] }}
          transition={{ repeat: Infinity, duration: 6 }}
        />
        <div className="mx-auto grid max-w-7xl items-center gap-12 py-16 md:grid-cols-[1.05fr_.95fr]">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-[#7A5A2A]/60 bg-[#123524]/40 px-4 py-2 text-xs uppercase tracking-[0.2em] text-[#C7A56A]">
              <Clover className="h-4 w-4" /> Bar privé · Est. 2025
            </div>
            <h1 className="font-serif text-5xl uppercase leading-[0.95] tracking-[0.08em] text-[#E8DDC7] md:text-8xl">
              Stolly’s<br />
              <span className="text-[#C7A56A]">Stone Bar</span>
            </h1>
            <p className="mt-6 font-serif text-2xl italic text-[#C7A56A]">A Home for Stories & Spirits</p>
            <p className="mt-5 max-w-xl text-base leading-8 text-[#E8DDC7]/75 md:text-lg">
              Un bar privé inspiré des pubs irlandais, des clubs feutrés et des longues soirées où chaque verre raconte une histoire.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href="#cocktails" className="rounded-xl border border-[#C7A56A] bg-[#B87333]/20 px-6 py-4 text-center text-sm uppercase tracking-[0.2em] text-[#E8DDC7] shadow-[0_0_28px_rgba(184,115,51,.22)] transition hover:bg-[#B87333]/35">Découvrir les cocktails</a>
              <a href="#story" className="rounded-xl border border-[#7A5A2A]/60 px-6 py-4 text-center text-sm uppercase tracking-[0.2em] text-[#C7A56A] transition hover:border-[#C7A56A]">L’esprit Stolly’s</a>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 0.15 }} className="relative">
            <div className="relative overflow-hidden rounded-[2rem] border border-[#7A5A2A]/60 bg-[#123524]/35 p-5 shadow-2xl shadow-black/50">
              <div className="aspect-[4/5] rounded-[1.5rem] border border-[#7A5A2A]/40 bg-[radial-gradient(circle_at_50%_28%,rgba(232,221,199,.16),transparent_14%),radial-gradient(circle_at_50%_62%,rgba(197,139,69,.38),transparent_28%),linear-gradient(135deg,#123524,#161311_45%,#2a180e)]">
                <div className="flex h-full flex-col items-center justify-center p-8 text-center">
                  <KeyRound className="mb-7 h-10 w-10 text-[#B87333]" strokeWidth={1.2} />
                  <div className="rounded-full border border-[#C7A56A]/40 p-8">
                    <GlassWater className="h-24 w-24 text-[#C7A56A]" strokeWidth={1} />
                  </div>
                  <p className="mt-8 font-serif text-3xl uppercase tracking-[0.18em] text-[#E8DDC7]">Private Cocktail Club</p>
                  <p className="mt-4 max-w-sm text-sm leading-7 text-[#E8DDC7]/70">Bois sombre, pierre brute, cuir vieilli, lueur ambrée et secrets servis sur glace.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="cocktails" className="relative px-5 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-[#B87333]">Ce que vous cherchez ce soir</p>
              <h2 className="mt-3 font-serif text-4xl uppercase tracking-[0.12em] text-[#E8DDC7] md:text-6xl">La carte émotionnelle</h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-[#E8DDC7]/70">Choisissez d’abord une envie, puis affinez par alcool, goût ou couleur. Le bar vous proposera le verre le plus juste pour le moment.</p>
          </div>

          <div className="mb-8 flex gap-3 overflow-x-auto pb-3">
            {moods.map(({ label, icon: Icon }) => (
              <button
                key={label}
                onClick={() => setMood(label)}
                className={classNames(
                  "flex min-w-fit items-center gap-2 rounded-2xl border px-4 py-3 text-sm transition",
                  mood === label ? "border-[#C7A56A] bg-[#B87333]/20 text-[#E8DDC7]" : "border-[#7A5A2A]/50 bg-[#161311]/60 text-[#C7A56A] hover:border-[#C7A56A]"
                )}
              >
                <Icon className="h-4 w-4" /> {label}
              </button>
            ))}
          </div>

          <div className="mb-10 rounded-3xl border border-[#7A5A2A]/50 bg-[#123524]/25 p-4 md:p-6">
            <div className="mb-5 flex items-center gap-3 text-[#C7A56A]"><SlidersHorizontal className="h-5 w-5" /><span className="text-xs uppercase tracking-[0.24em]">Filtres du barman</span></div>
            <div className="grid gap-4 md:grid-cols-5">
              <label className="flex flex-col gap-2 text-xs uppercase tracking-[0.24em] text-[#C7A56A] md:col-span-2">
                Recherche
                <div className="flex items-center gap-3 rounded-xl border border-[#7A5A2A]/60 bg-[#161311]/90 px-4 py-3">
                  <Search className="h-4 w-4 text-[#B87333]" />
                  <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Negroni, yuzu, rose…" className="w-full bg-transparent font-sans text-sm normal-case tracking-normal text-[#E8DDC7] outline-none placeholder:text-[#E8DDC7]/35" />
                </div>
              </label>
              <SelectFilter label="Alcool" value={spirit} onChange={setSpirit} options={spirits} />
              <SelectFilter label="Goût" value={taste} onChange={setTaste} options={tastes} />
              <SelectFilter label="Couleur" value={color} onChange={setColor} options={colors} />
            </div>
          </div>

          <p className="mb-6 text-sm text-[#E8DDC7]/60">{filteredCocktails.length} cocktail{filteredCocktails.length > 1 ? "s" : ""} trouvé{filteredCocktails.length > 1 ? "s" : ""}</p>

          <motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <AnimatePresence>
              {filteredCocktails.map((cocktail) => <CocktailCard key={cocktail.name} cocktail={cocktail} onClick={setSelected} />)}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <section id="story" className="relative px-5 py-20">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[.9fr_1.1fr]">
          <div className="rounded-3xl border border-[#7A5A2A]/50 bg-[#161311]/70 p-8">
            <p className="text-xs uppercase tracking-[0.28em] text-[#B87333]">L’esprit Stolly’s</p>
            <h2 className="mt-4 font-serif text-4xl uppercase tracking-[0.12em] text-[#E8DDC7]">Entrée privée</h2>
            <p className="mt-6 leading-8 text-[#E8DDC7]/72">Inspiré du Stolly’s parisien, ce bar privé est un refuge de souvenirs, de conversations et de cocktails choisis selon l’humeur du soir.</p>
          </div>
          <div className="rounded-3xl border border-[#7A5A2A]/50 bg-[#123524]/35 p-8">
            <div className="grid gap-5 sm:grid-cols-3">
              {["Bois sombre", "Pierre brute", "Laiton chaud"].map((item) => (
                <div key={item} className="rounded-2xl border border-[#7A5A2A]/40 bg-[#161311]/60 p-5">
                  <p className="font-serif text-2xl text-[#C7A56A]">{item}</p>
                  <p className="mt-3 text-sm leading-6 text-[#E8DDC7]/65">Texture premium, lumière basse et ambiance de club privé.</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      <section id="barmaid" className="relative px-5 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-[#B87333]">Tablette barmaid</p>
              <h2 className="mt-3 font-serif text-4xl uppercase tracking-[0.12em] text-[#E8DDC7] md:text-6xl">Commandes du bar</h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-[#E8DDC7]/70">Version locale de démonstration : les commandes envoyées depuis cette tablette apparaissent ici avec une fiche recette rapide. Pour deux tablettes synchronisées, il faudra ensuite brancher Firebase ou Supabase.</p>
          </div>

          {orders.length === 0 ? (
            <div className="rounded-3xl border border-[#7A5A2A]/50 bg-[#123524]/25 p-8 text-center text-[#E8DDC7]/65">
              <ClipboardList className="mx-auto mb-4 h-10 w-10 text-[#C7A56A]" strokeWidth={1.2} />
              Aucune commande pour le moment.
            </div>
          ) : (
            <div className="grid gap-5 lg:grid-cols-2">
              {orders.map((order) => (
                <div key={order.id} className="rounded-3xl border border-[#7A5A2A]/50 bg-[#161311]/80 p-6 shadow-xl shadow-black/30">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.22em] text-[#B87333]">{order.createdAt} · {order.status}</p>
                      <h3 className="mt-2 font-serif text-3xl uppercase tracking-[0.1em] text-[#E8DDC7]">{order.cocktail.name}</h3>
                    </div>
                    <span className="rounded-full border border-[#C7A56A]/40 px-3 py-1 text-xs text-[#C7A56A]">{order.cocktail.glass}</span>
                  </div>

                  <div className="mt-5 grid gap-4 md:grid-cols-2">
                    <div className="rounded-2xl border border-[#7A5A2A]/40 bg-[#123524]/25 p-4">
                      <p className="mb-3 text-xs uppercase tracking-[0.2em] text-[#B87333]">Dosages</p>
                      <ul className="space-y-2 text-sm text-[#E8DDC7]/80">
                        {recipeFor(order.cocktail).map((line) => <li key={line.ingredient} className="flex justify-between gap-3"><span>{line.ingredient}</span><span className="text-[#C7A56A]">{line.dose}</span></li>)}
                      </ul>
                    </div>
                    <div className="rounded-2xl border border-[#7A5A2A]/40 bg-[#123524]/25 p-4">
                      <p className="mb-3 text-xs uppercase tracking-[0.2em] text-[#B87333]">Méthode</p>
                      <p className="text-sm leading-7 text-[#E8DDC7]/75">{methodFor(order.cocktail)}</p>
                      <p className="mt-3 text-sm text-[#C7A56A]">Garniture : zeste, herbe ou fruit selon disponibilité.</p>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-3">
                    <button onClick={() => updateOrderStatus(order.id, "En préparation")} className="rounded-xl border border-[#C7A56A]/50 px-4 py-3 text-xs uppercase tracking-[0.18em] text-[#C7A56A] transition hover:bg-[#B87333]/20">En préparation</button>
                    <button onClick={() => updateOrderStatus(order.id, "Servi")} className="inline-flex items-center gap-2 rounded-xl border border-[#C7A56A] bg-[#B87333]/20 px-4 py-3 text-xs uppercase tracking-[0.18em] text-[#E8DDC7] transition hover:bg-[#B87333]/35"><CheckCircle2 className="h-4 w-4" />Servi</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <footer className="relative border-t border-[#7A5A2A]/40 px-5 py-8 text-center text-xs uppercase tracking-[0.22em] text-[#C7A56A]/75">
        Stolly’s Stone Bar — Tous droits réservés © 2025
      </footer>

      <AnimatePresence>
        {selected && (
          <motion.div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-4 backdrop-blur-sm md:items-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelected(null)}>
            <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }} onClick={(event) => event.stopPropagation()} className="max-h-[92vh] w-full max-w-2xl overflow-auto rounded-3xl border border-[#C7A56A]/50 bg-[#161311] p-6 shadow-2xl shadow-black">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-[#B87333]">{selected.mood}</p>
                  <h3 className="mt-2 font-serif text-4xl uppercase tracking-[0.1em] text-[#E8DDC7]">{selected.name}</h3>
                </div>
                <button onClick={() => setSelected(null)} className="rounded-full border border-[#7A5A2A]/60 p-2 text-[#C7A56A] transition hover:border-[#C7A56A]"><X className="h-5 w-5" /></button>
              </div>
              <p className="mt-6 font-serif text-xl italic leading-8 text-[#C7A56A]">{selected.description}</p>
              <div className="mt-8 grid gap-5 md:grid-cols-2">
                <div className="rounded-2xl border border-[#7A5A2A]/40 bg-[#123524]/25 p-5">
                  <p className="mb-4 text-xs uppercase tracking-[0.22em] text-[#B87333]">Ingrédients</p>
                  <ul className="space-y-2 text-[#E8DDC7]/80">
                    {selected.ingredients.map((ingredient) => <li key={ingredient}>— {ingredient}</li>)}
                  </ul>
                </div>
                <div className="rounded-2xl border border-[#7A5A2A]/40 bg-[#123524]/25 p-5">
                  <p className="mb-4 text-xs uppercase tracking-[0.22em] text-[#B87333]">Profil</p>
                  <div className="space-y-4 text-sm text-[#E8DDC7]/80">
                    <p><span className="text-[#C7A56A]">Alcool :</span> {selected.spirit}</p>
                    <p><span className="text-[#C7A56A]">Verre :</span> {selected.glass}</p>
                    <p><span className="text-[#C7A56A]">Couleur :</span> {selected.color}</p>
                    <div><p className="mb-2 text-[#C7A56A]">Intensité</p><Intensity value={selected.intensity} /></div>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {selected.taste.map((tag) => <span key={tag} className="rounded-full border border-[#C7A56A]/40 px-3 py-1 text-xs uppercase tracking-[0.14em] text-[#C7A56A]">{tag}</span>)}
              </div>
              <button onClick={() => sendToBar(selected)} className="mt-7 inline-flex w-full items-center justify-center gap-3 rounded-2xl border border-[#C7A56A] bg-[#B87333]/20 px-6 py-4 text-sm uppercase tracking-[0.22em] text-[#E8DDC7] shadow-[0_0_28px_rgba(184,115,51,.2)] transition hover:bg-[#B87333]/35">
                <Send className="h-4 w-4" /> Commander au bar
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}