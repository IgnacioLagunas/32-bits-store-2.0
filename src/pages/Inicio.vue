<template>
  <div class="container">
    <div class="logo">
      <h1>32<span>_Bits Store</span></h1>
      <h2>Juegos de PC y Consolas</h2>
    </div>
    <GameCard></GameCard>
  </div>
</template>
<script>
  import GameCard from "@/components/GameCard.vue";
  export default {
    components: {
      GameCard,
    },
  };
</script>
<style scoped>
  .logo {
    font-size: 1rem;
    color: var(--primary-color);
    margin-bottom: 2em;
  }
  .logo h1 {
    font-weight: 400;
    margin-bottom: 0px;
  }
  .logo span {
    color: #333333;
    font-weight: 300;
  }
  .logo h2 {
    font-size: 1em;
    font-weight: 300;
  }
</style>
