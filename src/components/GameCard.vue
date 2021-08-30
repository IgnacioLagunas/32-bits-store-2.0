<template lang="">
  <div class="card-container">
    <div class="card">
      <div
        class="img"
        :style="{ backgroundImage: `url(${game.imagen})` }"
      ></div>
      <div class="info">
        <h3 class="name">{{ game.nombre }}</h3>
        <div class="price-container">
          <div class="prices">
            <div class="prices-oferta" v-if="game.oferta">
              <p>Oferta!</p>
              <h3>${{ $store.getters.preciosConOferta[index] }}</h3>
            </div>
            <h3 v-else>${{ game.precio }}</h3>
          </div>
          <div class="cart-button">
            <button @click="venderJuego">
              <i class="icon far fa-cart-plus"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "GameCard",
    props: {
      game: Object,
      index: Number,
    },
    data: () => ({
      cantidad: 1,
    }),
    methods: {
      venderJuego() {
        this.$emit("venderJuego");
      },
    },
    computed: {
      precioConOferta() {
        let precio = this.game.precio;
        if (this.game.oferta) {
          precio =
            this.game.precio -
            (this.game.monto_oferta * this.game.precio) / 100;
        }
        return precio;
      },
    },
  };
</script>
<style>
  .card-container {
    display: flex;
    justify-content: center;
  }
  .card {
    min-width: 250px;
    width: 350px;
    height: 340px;
    background-color: #333333;
    border-radius: 12px;
    font-size: 0.8em;
  }
  .img {
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    width: 100%;
    height: 220px;
    overflow: hidden;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
  }
  .img img {
    width: 100%;
  }
  .info {
    margin-top: 0.5em;
    margin-left: 0.5em;
  }
  .info * {
    color: white;
    font-weight: 300;
  }
  .name {
    font-weight: 600;
    width: 80%;
  }
  .price-container {
    margin-right: 1em;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .prices {
    display: flex;
  }
  .prices p {
    margin-right: 0.5em;
    color: var(--primary-color);
  }
  .cart-button {
    display: flex;
    justify-content: flex-end;
  }

  .cart-button button {
    width: 60px;
    height: 30px;
    border-radius: 8px;
    font-size: 1.5em;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background-color: var(--primary-color);
    cursor: pointer;
    transition: all 0.2s;
  }
  .cart-button button i {
    margin-left: 0;
    font-size: 0.8em;
    color: white;
  }
  .cart-button button i:hover {
    color: white;
  }

  .cart-button button:active {
    transform: scale(0.9);
  }
</style>
