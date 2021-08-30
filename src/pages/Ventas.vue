<template>
  <div>
    <h1>Carrito de compras</h1>

    <GameList
      :list="$store.state.carrito"
      :shoppingCart="true"
      :colors="true"
    ></GameList>

    <p v-if="!($store.getters.totalPrice === 0)">
      Total: ${{ $store.getters.totalPrice }}
    </p>
  </div>
</template>

<script>
  import GameList from "@/components/GameList";
  export default {
    methods: {},
    components: {
      GameList,
    },
  };
</script>

<style></style>
