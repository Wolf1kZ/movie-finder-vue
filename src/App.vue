<template>
<div id="body">
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-6 col-md-6" style="padding-right: 0px;">
        <form class="searchline" method="post" onkeypress="if(event.keyCode == 13) return false;">
          <input type="text" placeholder="Название фильма..." v-model="search" @keyup.enter="shareData(KeywordApi, {keyword: search}, 'Films', { name: search , data: ''})">
          <button type="button" class="btn-search" @click="shareData(KeywordApi, {keyword: search}, 'Films', { name: search , data: ''})"></button>
        </form>
      </div>
      <div class="col-1 col-md-1" style="padding-left: 0px;">
        <button type="button" class="btn-window" @click="ifwindow = !ifwindow"></button>
      </div>
      <div v-if="ifwindow" class="window">
        <div class="top">
          <div class="row">
            <div class="col-2 title">
              Топы:
            </div>
            <div class="col-3">
              <button @click="ifwindow = !ifwindow, shareData(TopApi, { type : 'TOP_250_BEST_FILMS' }, 'Top' ,{ name: 'top250', data: '', type : 'TOP_250_BEST_FILMS' })">250 Лучших</button>
            </div>
            <div class="col-4">
              <button @click="ifwindow = !ifwindow, shareData(TopApi, { type : 'TOP_100_POPULAR_FILMS' }, 'Top' ,{ name: 'top100', data: '', type : 'TOP_100_POPULAR_FILMS'})">100 Популярных</button>
            </div>
            <div class="col-3">
              <button @click="ifwindow = !ifwindow, shareData(TopApi, { type : 'TOP_AWAIT_FILMS' }, 'Top' ,{ name: 'topAwait', data: '', type : 'TOP_AWAIT_FILMS'})">Ожидаемые</button>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="filters" style="height: 450px">
            <div class="row">
              <div class="col-5 " style="text-align: left; font-size:20px; padding-left: 35px">
                <a>Рейтинг:</a>
              </div>
              <div class="col-6 " style="text-align: left; font-size:20px; padding-left: 35px">
                <a>Год выпуска:</a>
              </div>
            </div>
            <div class="row">
              <div class="col-5">
                <div class="range-slider">
                  <input type="range" min="0" max="10" v-model.number="minRating" @change="setRangeSliders()">
                  <input type="range" min="0" max="10" v-model.number="maxRating" @change="setRangeSliders()">
                </div>
              </div>
              <div class="col-6">
                <div class="range-slider">
                  <input type="range" min="1888" max="2020" v-model.number="minYear" @change="setRangeSliders()">
                  <input type="range" min="1888" max="2020" v-model.number="maxYear" @change="setRangeSliders()">
                </div>
              </div>
            </div>
            <div class="rangeValues row">
              <div class="col-3" style="text-align: left; padding-left: 28px;">
                <span>От: {{minRating}} </span>
              </div>
              <div class="col-2" style="text-align: right;">
                <span>До: {{maxRating}} </span>
              </div>
               <div class="col-3" style="text-align: left; padding-left: 28px;">
                <span>От: {{minYear}} </span>
              </div>
              <div class="col-3" style="text-align: right;">
                <span>До: {{maxYear}} </span>
              </div>
            </div>
            <div class="row" style="padding-top: 10px">
              <div class="col">
                asd
              </div>
            </div>
          </div>
        </div>
      </div>
      <router-view></router-view>
    </div>
  </div>
</div>
</template>

<script>

import axios from 'axios';
export default {
  name: 'App',
  data: () =>{
    return{
      search: '',
      ifwindow: false,
      TopApi: '/api/v2.2/films/top',
      KeywordApi: '/api/v2.1/films/search-by-keyword',
      minRating: 0,
      maxRating: 10,
      minYear: 1888,
      maxYear:2020,
      countries: String,
      genres: String,
    }
  },
  created(){
    axios.get('https://kinopoiskapiunofficial.tech/api/v2.1/films/filters', 
      {
      headers: {'X-API-KEY':'27b18e18-799e-4f9a-bdcc-bc8e6a3348a6'},
      })
        .then(response =>  {
          console.log(response.data) 
          this.countries = response.data.countries
          this.genres = response.data.genres
        })
        .catch(e => console.log(e))
        .finally(() => console.log('Data loading complete'))
  },
  methods:{
    shareData(secPartApi, paramsApi, routerName ,routerParams){
      if( this.search.trim() != "" || secPartApi == this.TopApi){
      axios.get('https://kinopoiskapiunofficial.tech' + secPartApi, 
      {
      headers: {'X-API-KEY':'27b18e18-799e-4f9a-bdcc-bc8e6a3348a6'},
      params: paramsApi
      })
        .then(response =>  {
          console.log(response.data) 
          routerParams.data = response.data
          this.$router.push({ name: routerName, params: routerParams }).catch(() => {})
        })
        .catch(e => console.log(e))
        .finally(() => console.log('Data loading complete'))
      } 
    },
    setRangeSliders(){
      if (this.minRating > this.maxRating){
         let temp = this.maxRating;
         this.maxRating = this.minRating;
         this.minRating = temp;
      }
    }
  }
}

</script>

<style scoped>
#body{
    background: url('../public/christmas-dark.png');
    color: white;
   }
.container{
  background: url('../public/55.png');
  width: 1000px;
  height: 3500px;
  padding-top: 10px;
  text-align: center;
  box-shadow: 0px 0px 20px rgba(68, 0, 77, 0.644);
}

.filters{
  border: 2px solid  rgb(96, 53, 107);
  border-radius: 4px;
  padding: 15px 0 15px 0;
  background: rgba(126, 67, 123, 0.13);
}

.rangeValues{padding-top:22px; font-size: 13px;}

.range-slider{
  text-align: center;
  position: relative;
}

 .range-slider input[type=range]{
  border: none;
  position: absolute;
  left: 0;
  -webkit-appearance: none;
}


.range-slider input[type=range]::-webkit-slider-runnable-track {
height: 9px;
border: 1px solid  rgb(182, 128, 207);
background: #75366bf8;
border-radius: 4px;
}

.range-slider input[type=range]::-webkit-slider-runnable-track:hover {
background: rgb(168, 84, 164);
box-shadow:  0 0 15px 3px rgb(145, 22, 202);
}

.range-slider input[type=range]::-webkit-slider-thumb{
  z-index: 2;
  position: relative;
  top: 2px;
  margin-top: -5px;
  width: 12px;
  height: 12px;
  background: #8f6d8f;
  border: 1px solid #ffffff;
  border-radius: 15px;
  -webkit-appearance: none;
} 

.range-slider input[type=range]::-webkit-slider-thumb:hover{
  background: rgb(255, 255, 255);
  box-shadow:  0 0 15px 3px rgb(240, 228, 245);
}

.window{
  background: url('../public/50.jpg');
  border: 3px solid rgb(173, 116, 187);
  box-shadow:  0 0 15px 3px rgb(145, 22, 202);
  padding: 30px;
  position: fixed;
  border-radius: 35px;
  top: 10%;
  z-index:99999999;  
  width: 750px;
  height: 600px;
}

.window button{
  background: rgb(168, 71, 192);
  border: 2px solid rgb(190, 116, 209);
  border-radius: 18px;
  font-size: 20px;
  padding: 0px 10px 3px 10px;
  box-shadow:  0 0 15px 3px rgb(145, 22, 202);
  color: rgb(255, 255, 255);
  text-shadow: 0 0 12px rgb(255, 255, 255);
}

.title{
font-size: 22px;
}

.top .row{
  border: 2px solid  rgb(96, 53, 107);
  border-radius: 4px;
  padding: 15px 0 15px 0;
  background: rgba(126, 67, 123, 0.13);
  margin-bottom: 10px;
}

form {
  position: relative;
  background: #331d66;
  border: none;
  border-radius: 20px;
}

input, .btn-window, .btn-search {
  border: none;
  outline: none;
  background: transparent;
}
input {
  border-radius: 20px ;
  width: 100%;
  height: 42px;
  padding-left: 15px;
  color: rgb(201, 201, 201);
}
.btn-window, .btn-search{
  border-radius: 20px ;
  height: 42px;
  width: 42px;
  position: absolute;
  cursor: pointer;
}
.btn-search{
  right: 0;
}
.btn-window{
  background: #331d66;
}
button:before {
  font-family: FontAwesome;
  font-size: 16px;
  color: #F9F0DA;
}
.btn-search::before{
  content: "\f002";
}

.btn-window::before{
  margin-left: 2px;
  content: "\f03a";
}

.btn-window:hover{
  border: 2px solid #b6b6b6;
  transition: all .1s;
} 

form:hover input, input:focus{
  border: 2px solid #b6b6b6;
  transition: all .1s;
}

</style>
