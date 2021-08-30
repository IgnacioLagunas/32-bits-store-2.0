<template>
  <div>
    <h1>Agregar Juego</h1>
    <form class="form-agregar" @submit.prevent="ValidarFormulario()">
      <div>
        <label for="nombre">Nombre</label>
        <input
          type="text"
          id="nombre"
          class="form-fields"
          v-model="formulario.nombre"
          required
        />
      </div>
      <div>
        <label for="imagen">Imagen url</label>
        <input
          type="text"
          id="imagen"
          class="form-fields"
          v-model="formulario.imagen"
          required
        />
      </div>

      <div class="generos">
        <label for="generos">Genero</label>
        <select class="form-fields" id="generos" v-model="formulario.generos">
          <option
            v-for="(genero, index) in $store.getters.allGenres"
            :key="index"
            :value="genero"
            >{{ genero }}</option
          >
        </select>
      </div>
      <div>
        <label for="precio">Precio</label>

        <input
          type="text"
          id="precio"
          class="form-fields precio-input"
          v-model="formulario.precio"
          required
        />
      </div>
      <div class="oferta">
        Oferta<input
          class="form-fields"
          type="checkbox"
          v-model="formulario.oferta"
        />
        <span class="oferta-monto" v-if="formulario.oferta">
          <input
            type="text"
            class="oferta-input"
            v-model="formulario.monto_oferta"
          />
          <span>%</span>
        </span>
      </div>
      <input type="submit" value="Agregar" class="btn agregar-btn" />
    </form>
    <div class="respuesta">
      <h1>{{ mensaje }}</h1>
      <GameGrid
        class="gameGrid"
        :gameList="nuevoJuego"
        v-if="success"
      ></GameGrid>
    </div>
  </div>
</template>
<script>
  import GameGrid from "@/components/GameGrid";

  export default {
    name: "AgregarJuego",
    data: () => ({
      formulario: {
        nombre: "Sekiro",
        imagen:
          "https://media.rawg.io/media/resize/1920/-/screenshots/198/198257c08163153e72a31bd61a6cd70b.jpg",
        generos: "",
        oferta: false,
        precio: "30000",
        monto_oferta: "15",
      },
      nuevoJuego: [],
      success: false,
      mensaje: "",
    }),
    components: {
      GameGrid,
    },
    methods: {
      ValidarFormulario() {
        this.success = false;
        if (isNaN(this.precioNumero) || isNaN(this.ofertaNumero)) {
          this.mensaje =
            "Por favor ingrese solo numeros en la casilla de precio y monto oferta.";
        } else if (this.formulario.generos === "") {
          this.mensaje = "Por favor seleccione un genero.";
        } else if (this.ofertaNumero > 80) {
          this.mensaje = "Solo se permite ingresar una oferta hasta el 80%.";
        } else {
          let juegoParaAgregar = {
            ...this.formulario,
            precio: this.precioNumero,
            monto_oferta: this.ofertaNumero,
            generos: [this.formulario.generos],
          };
          console.log(juegoParaAgregar);
          this.AgregarJuego(juegoParaAgregar);
        }
      },

      async AgregarJuego(juego) {
        try {
          let juegoAgregado = await this.$store.dispatch("AgregarJuego", juego);
          console.log(juegoAgregado);
          this.nuevoJuego = [juegoAgregado];
          this.success = true;
          this.mensaje = "Juego agregado exitosamente!";
        } catch (e) {
          this.mensaje = e;
        }
      },
    },
    computed: {
      precioNumero() {
        return parseInt(this.formulario.precio);
      },
      ofertaNumero() {
        return parseInt(this.formulario.monto_oferta);
      },
    },
  };
</script>
<style>
  .form-agregar div {
    margin-bottom: 1em;
  }
  .form-agregar .form-fields {
    margin-left: 1em;
  }
  .form-fields {
    padding: 0.4em;
    font-size: 0.7em;
  }
  .agregar-btn {
    margin-left: 0;
    background-color: var(--primary-color);
    padding: 0.3em 1.2em;
    border: 1px solid black;
    border-radius: 2em;
    text-decoration: none;
    font-family: "Roboto", sans-serif;
    font-weight: 300;
    color: #ffffff;
    font-weight: bold;
    cursor: pointer;
  }
  .oferta-input,
  .precio-input {
    margin-left: 1em;
    width: 5em;
  }
  .oferta {
    display: flex;
  }
  .respuesta {
    margin: 0 auto;
    margin-top: 5em;
    width: 90%;
  }
  .respuesta h1 {
    font-size: 1.7em;
    text-align: center;
  }
</style>
