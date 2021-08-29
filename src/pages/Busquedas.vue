<template>
  <div>
    <h1>Busquedas</h1>

    <input
      type="text"
      v-model="codigoBuscado"
      @click="resetBusqueda()"
    /><button
      class="btn"
      @click="buscarJuegoPorCodigo(codigoBuscado, $store.state.juegos)"
    >
      Buscar
    </button>
    <div class="busqueda">
      <p>Busqueda:</p>
      <GameList
        :list="[juegoEncontrado]"
        :colors="true"
        v-if="Object.keys(juegoEncontrado).length != 0"
      ></GameList>
      <p class="respuesta" v-else>Juego no encontrado.</p>
    </div>
    <p>Total de juegos con stock: {{ $store.getters.cantidadDeJuegos }}</p>
    <p>Total stock: {{ $store.getters.totalStock }}</p>

    <GameList :list="$store.state.juegos" :colors="true"></GameList>
  </div>
</template>

<script>
  import GameList from "@/components/GameList";

  export default {
    components: {
      GameList,
    },
    data: () => ({
      codigoBuscado: "",
      juegoEncontrado: {},
    }),
    methods: {
      async buscarJuegoPorCodigo(codigo) {
        let fixedCodigo = this.ajustarCodigo(codigo);
        this.codigoBuscado = fixedCodigo;
        let resp = await this.$store.dispatch("juegoPorCodigo", fixedCodigo);
        this.juegoEncontrado = resp;
      },
      ajustarCodigo(codigo) {
        let codigoLength = codigo.length;
        if (codigoLength <= 3) {
          codigo = `${"0".repeat(4 - codigoLength)}${codigo}`;
        }
        return codigo;
      },
      resetBusqueda() {
        this.codigoBuscado = "";
      },
    },
  };
</script>

<style scoped>
  .busqueda p {
    margin-top: 2em;
  }
  .busqueda .respuesta {
    margin: 1em 0;
  }
</style>
