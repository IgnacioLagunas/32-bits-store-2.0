import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    carrito: [],
    filtros: {
      genero: "",
      oferta: false,
      textoBuscado: "",
    },
    juegos: [],
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
        if (juego.oferta) {
          let precioOferta =
            juego.precio - (juego.precio * juego.monto_oferta) / 100;
          total += precioOferta * juego.stock;
        } else {
          total += juego.precio * juego.stock;
        }
      });
      return total;
    },
    allGenres(state) {
      let allGenres = [];
      state.juegos.forEach((juego) => {
        juego.generos.forEach((genero) => {
          if (!allGenres.includes(genero)) {
            allGenres = allGenres.concat(genero);
          }
        });
      });
      return allGenres;
    },
    filteredGames(state) {
      let generoBuscado = state.filtros.genero;
      let filteredByGenre = state.juegos.filter((juego) => {
        if (generoBuscado === "") {
          return juego;
        } else {
          if (
            juego.generos.some((genero) => {
              return genero === generoBuscado;
            })
          )
            return juego;
        }
      });
      let filteredBySale = filteredByGenre.filter((juego) => {
        if (state.filtros.oferta) {
          return juego.oferta == true;
        } else {
          return juego;
        }
      });
      let filteredByName = filteredBySale.filter((juego) => {
        return juego.nombre
          .toLowerCase()
          .includes(state.filtros.textoBuscado.toLowerCase());
      });
      return filteredByName;
    },
    preciosConOferta(state) {
      let precios = state.juegos.map((juego) => {
        return juego.precio - (juego.monto_oferta * juego.precio) / 100;
      });
      console.log(precios);
      return precios;
    },
  },

  mutations: {
    ADD_GAME_TO_STATE: (state, game) => {
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
    SET_GENERO: (state, genero) => {
      state.filtros.genero = genero;
    },
    SET_OFERTA: (state, oferta) => {
      state.filtros.oferta = oferta;
    },
    SET_TEXTO: (state, texto) => {
      state.filtros.textoBuscado = texto;
    },
  },

  actions: {
    getGames(context, games) {
      games.map((game) => {
        let randomPrice = Math.floor(Math.random() * (50000 - 15000)) + 15000;
        let randomSale = Math.floor(Math.random() * (60 - 10)) + 10;
        let oferta = Math.random() >= 0.5;
        let { name, genres, background_image: image, id } = game;
        let simplifiedGame = {
          codigo: id,
          nombre: name,
          stock: 100,
          precio: randomPrice - (randomPrice % 500),
          oferta: oferta,
          monto_oferta: randomSale - (randomSale % 10),
          generos: genres.map((genre) => genre.name),
          imagen: image,
        };

        context.commit("ADD_GAME_TO_STATE", simplifiedGame);
      });
    },
    // {nombre, imagen, genero, precio, oferta, montoOferta}
    AgregarJuego(context, juego) {
      let found = context.state.juegos.some((juegoEnState) => {
        return juegoEnState.nombre.toLowerCase() === juego.nombre.toLowerCase();
      });
      if (found) {
        throw `El juego ${juego.nombre} ya existe.`;
      } else {
        console.log("Agregando juego", juego.nombre);
        let id = Math.floor(Math.random() * 999999);
        let juegoParaAgregar = { ...juego, id: id, stock: 100 };
        context.commit("ADD_GAME_TO_STATE", juegoParaAgregar);
        return juegoParaAgregar;
      }
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
            oferta: juego.oferta,
            monto_oferta: juego.monto_oferta,
          };
          context.commit("ADD_PRODUCT_TO_CART", gameToAdd);
          context.commit("LOWER_STOCK", index);
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
    setFilters(context, { genero, oferta, texto }) {
      console.log(genero);
      context.commit("SET_GENERO", genero);
      context.commit("SET_OFERTA", oferta);
      context.commit("SET_TEXTO", texto);
    },
    indexOfGame(context, { id }) {
      let index = context.state.juegos.findIndex((juego) => {
        return juego.id === id;
      });
      return index;
    },
  },
});

export default store;
