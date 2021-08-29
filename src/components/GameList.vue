<template lang="">
  <div>
    <div class="tabla">
      <li v-for="(game, index) in list" :key="index">
        <div
          class="color"
          :style="{ backgroundColor: game.color }"
          v-if="colors"
        ></div>
        {{ game.codigo }} | {{ game.nombre }} | {{ game.stock }} | ${{
          game.precio
        }}
        <button
          v-if="sellingPoint"
          class="btn"
          @click="venderProducto(game, index)"
        >
          Vender
        </button>
        <i
          @click="borrarProducto(index)"
          class="icon far fa-trash-alt"
          v-if="shoppingCart"
        ></i>
      </li>
    </div>
  </div>
</template>
<script>
  export default {
    name: "GameList",
    data: () => ({}),
    props: {
      list: Array,
      sellingPoint: Boolean,
      colors: Boolean,
      shoppingCart: Boolean,
    },
    methods: {
      venderProducto(juego, index) {
        this.$store.dispatch("venderProducto", { juego, index });
      },
      borrarProducto(index) {
        this.$store.dispatch("borrarProducto", index);
      },
    },
    computed: {
      listLenght() {
        return this.list.length;
      },
    },
  };
</script>

<style>
  .color {
    width: 10px;
    height: 10px;
    border-radius: 10px;
    background-color: black;
    margin-right: 0.5em;
  }
  .tabla {
    margin: 2rem 0;
  }

  .tabla li {
    display: flex;
    align-items: center;
    margin: 0.8rem 0;
  }
  .btn {
    margin-left: 1rem;
    background-color: #7469ca;
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
  .btn:hover {
    transform: scale(1.1);
  }
  .icon {
    margin-left: 1rem;
    color: black;
    text-decoration: none;
    font-weight: 300;
    font-weight: bold;
    cursor: pointer;
  }
  .icon:hover {
    transform: scale(1.1);
    color: #7469ca;
  }
</style>
