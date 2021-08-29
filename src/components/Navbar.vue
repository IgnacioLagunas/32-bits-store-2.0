<template>
  <nav>
    <div class="nav-logo logo">
      <router-link class="link" :to="{ path: '/' }"
        ><h1>32<span>_Bits</span></h1></router-link
      >
    </div>
    <ul class="nav-links">
      <router-link class="nav-link link" :to="{ path: '/' }"
        >Inicio</router-link
      >
      <router-link class="nav-link link" :to="{ path: '/busquedas' }"
        >Busquedas</router-link
      >
      <router-link class="nav-link link" :to="{ path: '/ventas' }"
        >Ventas</router-link
      >
      <router-link class="nav-link link" :to="{ path: '/404' }"
        >Total</router-link
      >
    </ul>
  </nav>
</template>

<script>
  export default {};
</script>

<style>
  nav {
    width: 100%;
    height: 50px;
    margin-bottom: 1rem;
    background-color: #333333;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .nav-logo {
    margin-left: 3rem;
  }
  .nav-logo span {
    color: white;
    letter-spacing: 0.2rem;
    font-weight: 400;
  }
  .nav-logo h1 {
    margin-bottom: 0;
  }
  .link {
    text-decoration: none;
  }
  .nav-links {
    width: 350px;
    margin-right: 3rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .nav-link {
    color: white;
    font-weight: 400;
  }
  .nav-link:hover {
    color: #7469ca;
  }
</style>
