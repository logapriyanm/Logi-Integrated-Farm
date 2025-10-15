import PremiumMaize from "../assets/PremiumMaize.jpg"
import OrganicSoybeans from "../assets/OrganicSoybeans.jpg"
import NapierGrass from "../assets/NapierGrass.jpg"
import FreshVegetables from "../assets/FreshVegetables.jpg"
import GermanShepherd from "../assets/GermanShepherd.jpg"
import Rottweiler from "../assets/Rottweiler.jpg"
import Labrador from "../assets/Labrador.jpg"
import BoerGoats from "../assets/BoerGoats.jpg"
import Kombai from "../assets/Kombai.jpg"


const products = [
  // Farm Produce
  {
    _id: 1,
    name: "Premium Maize",
    desc: "High-quality maize grown using sustainable farming practices. Perfect for human consumption and animals.",
    price: 45,
    stock: 500,
    category: "Farm Produce",
    image: PremiumMaize,
    quantity: 1
  },
  {
    _id: 2,
    name: "Organic Soybeans",
    desc: "Protein-rich soybeans that enhance soil fertility while providing excellent nutrition.",
    price: 65,
    stock: 300,
    category: "Farm Produce",
    image:OrganicSoybeans,
    quantity: 1,
  },
  {
    _id: 3,
    name: "Napier Grass",
    desc: "Drought-resistant fodder grass, excellent nutrition source for livestock.",
    price: 25,
    stock: 1000,
    category: "Farm Produce",
    image: NapierGrass,
     quantity: 1
  },
  {
    _id: 4,
    name: "Fresh Vegetables",
    desc: "Seasonal mix of fresh tomatoes, spinach, and other organic vegetables.",
    price: 35,
    stock: 200,
    category: "Farm Produce",
    image:FreshVegetables,
     quantity: 1
  },

  // Pets & Livestock
  {
    _id: 5,
    name: "German Shepherd Puppies",
    desc: "Purebred German Shepherd puppies with excellent temperament and health certifications.",
    price: 25000,
    stock: 3,
    category: "Pets & Livestock",
    image: GermanShepherd,
     quantity: 1,
  },
  {
    _id: 6,
    name: "Rottweiler Puppies",
    desc: "Strong, healthy Rottweiler puppies from champion bloodlines.",
    price: 22000,
    stock: 2,
    category: "Pets & Livestock",
    image: Rottweiler,
     quantity: 1,
  },
  {
    _id: 7,
    name: "Labrador Puppies",
    desc: "Friendly Labrador puppies, perfect family companions with gentle nature.",
    price: 18000,
    stock: 4,
    category: "Pets & Livestock",
    image: Labrador,
     quantity: 1,
  },
  {
    _id: 8,
    name: "Boer & Saanen Goats",
    desc: "Premium breeding goats with excellent genetics and health records.",
    price: 15000,
    stock: 8,
    category: "Pets & Livestock",
    image:BoerGoats,
     quantity: 1,
  },
  {
    _id: 9,
    name: "Kombai dogs",
    desc: "Kombai dogs are loyal, courageous, and protective native dogs from Tamil Nadu. Perfect as guard dogs and companions, raised with care on our farm",
    price: 8000,
    stock: 8,
    category: "Pets & Livestock",
    image:Kombai,
     quantity: 1,
  },
];


export default products