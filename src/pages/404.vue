<template>
  <div>
    <div class="error">
      <h1>404<span>.</span></h1>
      <p>Page not found</p>
    </div>
  </div>
</template>

<script>
  export default {};
</script>

<style scoped>
  .error {
    height: 90vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 5rem;
  }
  .error * {
    font-weight: 300;
    margin-bottom: 0.5rem;
  }
  .error span {
    color: #7469ca;
  }
  .error p {
    font-size: 0.4em;
    margin-bottom: 3rem;
  }
</style>
