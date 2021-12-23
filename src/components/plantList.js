import bonzai1 from "../images/plants/bonsai-g1e1afd442_1280.png";
import bonzai2 from "../images/plants/bonsai-gbfd49cb18_1280.png";
import roundLeaf from "../images/plants/flower-g3e4be6456_1920.jpg";
import tallPurple from "../images/plants/flower-gardens-ga6018fb5c_1920.jpg";
import shortPurple from "../images/plants/houseplants-gdfe5c8158_1920.jpg";
import leaf from "../images/plants/leaf-g966ddc13f_1920.jpg";
import monstera from "../images/plants/monstera-gbf46df0c1_1920.jpg";
import orchids from "../images/plants/orchids-gb868ee7f2_1920.png";
import flowingSucculent from "../images/plants/plant-pot-g608112271_1920.jpg";
import beaded from "../images/plants/rosario-g39a75f76e_1920.jpg";
import snakePlant from "../images/plants/snake-plant-g47dcb58b0_1920.jpg";
import sideSucculent from "../images/plants/succulent-g2c09a12c5_1920.jpg";
import purpleSucculent from "../images/plants/succulent-g2f76fc726_1920.jpg";
import leafy from "../images/plants/vase-gae6b39599_1920.jpg";

const plantList = [
  {
    name: "Bonzai",
    price: 230,
    img: bonzai1,
    id: 1,
    tags: ["plant", "expensive"],
  },
  {
    name: "Bonzai (Tall)",
    price: 530,
    img: bonzai2,
    id: 2,
    tags: ["plant", "expensive"],
  },
  {
    name: "Stilted Leaf",
    price: 25,
    img: roundLeaf,
    id: 3,
    tags: ["plant", "succulent"],
  },
  {
    name: "Purple Flowers",
    price: 15,
    img: shortPurple,
    id: 4,
    tags: ["plant", "flowering"],
  },
  {
    name: "Flute Plant",
    price: 20,
    img: tallPurple,
    id: 5,
    tags: ["plant", "flowering"],
  },
  { name: "Money Tree", price: 10, img: leaf, id: 6, tags: ["plant"] },
  {
    name: "Monstera",
    price: 50,
    img: monstera,
    id: 7,
    tags: ["plant", "expensive"],
  },
  {
    name: "Orchids",
    price: 20,
    img: orchids,
    id: 8,
    tags: ["plant", "flowering"],
  },
  {
    name: "Flowering Succulent",
    price: 34,
    img: flowingSucculent,
    id: 9,
    tags: ["plant", "succulent"],
  },
  {
    name: "String of Pearls",
    price: 45,
    img: beaded,
    id: 10,
    tags: ["plant", "expensive", "succulent"],
  },
  { name: "Snake Plant", price: 20, img: snakePlant, id: 11, tags: ["plant"] },
  {
    name: "Succulent",
    price: 12,
    img: sideSucculent,
    id: 12,
    tags: ["plant", "succulent"],
  },
  {
    name: "Purple Succulent",
    price: 15,
    img: purpleSucculent,
    id: 13,
    tags: ["plant", "succulent"],
  },
  { name: "Classic House", price: 20, img: leafy, id: 14, tags: ["plant"] },
];
export default plantList;
