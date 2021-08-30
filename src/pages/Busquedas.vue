<template>
  <div>
    <h1>Buscar</h1>
    <div class="busquedas">
      <div class="busqueda-por-nombre">
        <input type="text" v-model="textoBuscado" />
        <button class="btn" @click="filterGames()">
          Buscar
        </button>
      </div>
      <div class="generos">
        <label for="generos">Generos</label>
        <select
          class="selects"
          id="generos"
          v-model="genero"
          @change="filterGames()"
        >
          <option value="">All</option>
          <option
            v-for="(genero, index) in $store.getters.allGenres"
            :key="index"
            :value="genero"
            >{{ genero }}</option
          >
        </select>
      </div>
      <div class="oferta">
        Oferta<input
          class="selects"
          type="checkbox"
          v-model="oferta"
          @change="filterGames()"
        />
      </div>
    </div>
    <GameGrid
      class="gameGrid"
      :gameList="$store.getters.filteredGames"
    ></GameGrid>
  </div>
</template>

<script>
  import GameGrid from "@/components/GameGrid";

  export default {
    name: "Busquedas",
    components: {
      GameGrid,
    },
    data: () => ({
      textoBuscado: "",
      genero: "",
      oferta: false,
      foundGames: [],
    }),
    methods: {
      filterGames() {
        let genero = this.genero;
        let oferta = this.oferta;
        let texto = this.textoBuscado;
        this.$store.dispatch("setFilters", { genero, oferta, texto });
      },
    },
  };
</script>

<style scoped>
  .busqueda p {
    margin-top: 2em;
  }
  .busquedas div {
    margin-bottom: 1em;
  }
  .selects {
    margin-left: 1em;
  }

  .gameGrid {
    transition: all 0.5s;
    margin-top: 2em;
  }
</style>
