<template lang="">
  <div class="card">
    <div class="img">
      <!--<img
        src="https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612001.jpg"
        alt=""
        srcset=""
      />!-->
    </div>
    <div class="info">
      <h2>Grand Theft Auto V</h2>
      <div class="price">
        <h3>$30.000</h3>
        <div class="selector">
          <button><i class="icon far fa-minus"></i></button>
          <input type="text" />
          <button><i class="icon far fa-plus"></i></button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "GameCard",
  };
</script>
<style>
  .card {
    width: 250px;
    height: 300px;
    background-color: #333333;
    border-radius: 12px;
  }
  .img {
    background-image: url("https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612001.jpg");
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    width: 100%;
    height: 200px;
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
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 80px;
  }
  .info * {
    color: white;
    font-weight: 300;
  }
  .price {
    display: flex;
    justify-content: space-between;
    margin-right: 1em;
  }
  .selector input {
    width: 30px;
    border: none;
    margin: 0;
  }
  .selector button {
    border: none;
    background-color: var(--primary-color);
    width: 20px;
    cursor: pointer;
  }
  .selector button .icon {
    margin: 0;
    font-size: 0.7em;
  }
  .selector button .icon:hover {
    color: white;
  }
</style>
