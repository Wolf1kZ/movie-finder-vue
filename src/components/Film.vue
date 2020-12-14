<template>
  <div class="container-fluid">
    {{info}}
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Film',
  data: function(){
      return{
          info: String
      }
  },
  created: function(){
      axios.get('https://kinopoiskapiunofficial.tech/api/v2.1/films/' + this.$route.params.id, 
      {
      headers: {'X-API-KEY':'27b18e18-799e-4f9a-bdcc-bc8e6a3348a6'},
      })
        .then(response =>  {
          console.log(response.data)
          this.info = response.data.data
        })
        .catch(e => console.log(e))
        .finally(() => console.log('Data loading complete'))
  }
  
}

</script>

<style scoped>
.container-fluid{
    padding-top: 10px;
}
</style>
