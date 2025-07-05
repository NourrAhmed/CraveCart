import biryani from "../assets/restaurantLogos/biryani.png";
import burgerking from "../assets/restaurantLogos/burgerking.png";
import dimsum from "../assets/restaurantLogos/dimsum.png";
import pasta from "../assets/restaurantLogos/pasta.png";
import pizza from "../assets/restaurantLogos/pizza.png";
import steakhouse from "../assets/restaurantLogos/steakhouse.png";
import sushi from "../assets/restaurantLogos/sushi.png";
import tacos from "../assets/restaurantLogos/tacos.png";
import vegan from "../assets/restaurantLogos/vegan.png";

export const restaurants = [
  {
    id: 1,
    name: "Pizza Palace",
    image: pizza,
    rating: 4.5,
    description:
      "The best pizza in town, freshly made with high-quality ingredients.",
    menu: [
      { name: "Margherita Pizza", price: "$10" },
      { name: "Pepperoni Pizza", price: "$12" },
      { name: "Pasta Alfredo", price: "$15" },
    ],
  },
  {
    id: 2,
    name: "Sushi Heaven",
    image: sushi,
    rating: 4.8,
    description:
      "Authentic Japanese sushi with the finest selection of seafood.",
    menu: [
      { name: "Sushi Roll", price: "$18" },
      { name: "Sashimi Plate", price: "$20" },
      { name: "Miso Soup", price: "$5" },
    ],
  },
  {
    id: 3,
    name: "Burger King",
    image: burgerking,
    rating: 4.2,
    description: "Juicy burgers and crispy fries – the ultimate comfort food.",
    menu: [
      { name: "Cheeseburger", price: "$8" },
      { name: "Whopper", price: "$10" },
      { name: "French Fries", price: "$3" },
    ],
  },
  {
    id: 4,
    name: "Taco Fiesta",
    image: tacos,
    rating: 4.7,
    description:
      "Tacos, burritos, and quesadillas with all the flavors of Mexico.",
    menu: [
      { name: "Beef Taco", price: "$6" },
      { name: "Chicken Burrito", price: "$9" },
      { name: "Cheese Quesadilla", price: "$7" },
    ],
  },
  {
    id: 5,
    name: "Pasta Perfection",
    image: pasta,
    rating: 4.9,
    description:
      "Delicious homemade pasta dishes crafted with love and passion.",
    menu: [
      { name: "Spaghetti Carbonara", price: "$12" },
      { name: "Lasagna", price: "$14" },
      { name: "Fettuccine Alfredo", price: "$13" },
    ],
  },
  {
    id: 6,
    name: "Biryani Palace",
    image: biryani,
    rating: 4.6,
    description: "Spicy, aromatic biryanis and flavorful Indian cuisine.",
    menu: [
      { name: "Chicken Biryani", price: "$15" },
      { name: "Paneer Tikka", price: "$10" },
      { name: "Mutton Curry", price: "$18" },
    ],
  },
  {
    id: 7,
    name: "Vegan Vibes",
    image: vegan,
    rating: 4.4,
    description:
      "A plant-based dining experience with fresh ingredients and great flavors.",
    menu: [
      { name: "Vegan Burger", price: "$11" },
      { name: "Quinoa Salad", price: "$9" },
      { name: "Vegan Pizza", price: "$13" },
    ],
  },
  {
    id: 8,
    name: "Dim Sum Delight",
    image: dimsum,
    rating: 4.8,
    description: "Authentic Chinese dim sum and delicious small plates.",
    menu: [
      { name: "Pork Dumplings", price: "$8" },
      { name: "Shrimp Spring Rolls", price: "$7" },
      { name: "Dim Sum Assortment", price: "$15" },
    ],
  },
  {
    id: 9,
    name: "Steakhouse Supreme",
    image: steakhouse,
    rating: 4.9,
    description:
      "Premium steaks and exceptional cuts of meat grilled to perfection.",
    menu: [
      { name: "Ribeye Steak", price: "$25" },
      { name: "Filet Mignon", price: "$30" },
      { name: "Garlic Mashed Potatoes", price: "$8" },
    ],
  },
];
