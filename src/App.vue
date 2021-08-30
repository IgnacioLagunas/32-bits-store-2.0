<template>
  <div id="app">
    <Navbar />

    <div class="container">
      <transition name="vista">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
  import Navbar from "./components/Navbar.vue";
  export default {
    components: { Navbar },
    data: () => ({
      API_KEY: "332f52a5202843c3a6723715fbaae3d2",
    }),
    async beforeMount() {
      let res = await fetch(
        `https://api.rawg.io/api/games?key=${this.API_KEY}&page_size=30`
      );
      let data = await res.json();
      this.$store.dispatch("getGames", data.results);
      console.log(this.$store.state.juegos);
    },
  };
</script>

<style>
  .vista-enter-active,
  .vista-leave-active {
    transition: opacity 0.1s;
  }
  .vista-enter,
  .vista-leave-to {
    opacity: 0;
  }
  :root {
    --primary-color: #7469ca;
  }
  * {
    margin: 0;
    box-sizing: border-box;
    font-family: "Roboto", sans-serif;
  }
  body {
    background-color: black;
    color: white;
  }

  .container {
    width: 95%;
    margin: 0 auto;
    margin-top: 2rem;
  }
  h1 {
    margin-bottom: 2rem;
    font-weight: 300;
  }
</style>
