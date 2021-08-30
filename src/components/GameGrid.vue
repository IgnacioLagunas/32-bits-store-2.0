<template lang="">
  <div class="grid">
    <GameCard
      v-for="(game, index) in gameList"
      :key="index"
      :game="game"
      @venderJuego="venderProducto(game, index)"
    ></GameCard>
  </div>
</template>
<script>
  import GameCard from "@/components/GameCard.vue";
  export default {
    name: "GameGrid",
    data: () => ({
      cantidad: 3,
    }),
    props: {
      gameList: Array,
    },
    components: {
      GameCard,
    },
    methods: {
      venderProducto(juego, index, qtty) {
        this.$store.dispatch("venderProducto", { juego, index, qtty });
      },
    },
  };
</script>
<style>
  .grid {
    display: grid;
    grid-gap: 2em;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    align-items: center;
    transition: all 1s;
  }
</style>
