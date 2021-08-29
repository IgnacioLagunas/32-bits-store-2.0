import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    carrito: [],
    filters: {},
    juegos: [
      // {
      //   codigo: "0001",
      //   nombre: "Sekiro",
      //   stock: 100,
      //   precio: 30000,
      //   color: "#ef476f",
      //   destacado: true,
      // },
    ],
  },
  getters: {
    cantidadDeJuegos(state) {
      let juegosConStock = state.juegos.filter((juego) => {
        return juego.stock > 0;
      });
      return juegosConStock.length;
    },
    totalStock(state) {
      let total = 0;
      state.juegos.forEach((juego) => {
        total += juego.stock;
      });
      return total;
    },
    totalPrice(state) {
      let total = 0;
      state.carrito.forEach((juego) => {
        total += juego.precio * juego.stock;
      });
      return total;
    },
    juegoPorCodigo(state, codigo) {
      return state.juegos.find((juego) => {
        juego.codigo === codigo;
      });
    },
  },

  mutations: {
    ADD_GAMES_TO_STATE: (state, game) => {
      state.juegos.push(game);
    },
    LOWER_STOCK: (state, index) => {
      state.juegos[index].stock -= 1;
    },
    ADD_PRODUCT_TO_CART: (state, juego) => {
      state.carrito.push(juego);
    },
    INCREASE_CART_QTTY: (state, index) => {
      state.carrito[index].stock += 1;
    },
    LOWER_CART_QTTY: (state, index) => {
      state.carrito[index].stock -= 1;
    },
    REMOVE_PRODUCT_FROM_CART: (state, index) => {
      state.carrito.splice(index, 1);
    },
    INCREASE_PRODUCT_STOCK: (state, index) => {
      state.juegos[index].stock += 1;
    },
  },

  actions: {
    getGames(context, games) {
      // let simplifiedGames =
      games.map((game) => {
        let randomPrice = Math.floor(Math.random() * (50000 - 15000)) + 15000;
        let randomSale = Math.floor(Math.random() * (60 - 10)) + 10;
        let { name, genres, background_image: image, id } = game;
        let simplifiedGame = {
          codigo: id,
          nombre: name,
          stock: 100,
          precio: randomPrice,
          oferta: Math.random() >= 0.5,
          monto_oferta: randomSale - (randomSale % 10),
          generos: genres.map((genre) => genre.name),
          imagen: image,
        };
        context.commit("ADD_GAMES_TO_STATE", simplifiedGame);
      });
    },

    randomNumber(context, { min, max }) {
      console.log(min, max);
      let number = Math.floor(Math.random() * max + min);
      console.log(number);
      return number;
    },

    venderProducto(context, { juego, index }) {
      let foundInIndex = context.state.carrito.findIndex((juegoEnCarrito) => {
        return juegoEnCarrito.codigo === juego.codigo;
      });
      if (juego.stock > 0) {
        if (foundInIndex === -1) {
          let gameToAdd = {
            codigo: juego.codigo,
            nombre: juego.nombre,
            precio: juego.precio,
            stock: 1,
          };
          context.commit("LOWER_STOCK", index);
          context.commit("ADD_PRODUCT_TO_CART", gameToAdd);
        } else {
          context.commit("LOWER_STOCK", index);
          context.commit("INCREASE_CART_QTTY", foundInIndex);
        }
      } else {
        console.log(`El juego ${juego.nombre} no está disponible`);
      }

      // }
    },
    InCarrito(context, codigo) {
      let found = context.state.carrito.findIndex((juego) => {
        return juego.codigo === codigo;
      });
      console.log(found);
      return found;
    },
    borrarProducto(context, index) {
      let juegoEnCarrito = context.state.carrito[index];
      if (juegoEnCarrito.stock === 1) {
        context.commit("REMOVE_PRODUCT_FROM_CART", index);
      } else {
        context.commit("LOWER_CART_QTTY", index);
      }
      let foundInIndex = context.state.juegos.findIndex((juego) => {
        return juego.codigo === juegoEnCarrito.codigo;
      });
      // Reponer el stock al eliminar productos del carrito.
      context.commit("INCREASE_PRODUCT_STOCK", foundInIndex);
    },
    juegoPorCodigo(context, codigo) {
      let juegoEncontrado = context.state.juegos.find((juego) => {
        return juego.codigo === codigo;
      });
      if (juegoEncontrado === undefined) {
        juegoEncontrado = {};
      }
      return juegoEncontrado;
    },
  },
});

export default store;