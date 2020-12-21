<template>
  <div id="body">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-6 col-md-6" style="padding-right: 0px">
          <form
            class="searchline"
            method="post"
            onkeypress="if(event.keyCode == 13) return false;"
          >
            <input
              type="text"
              placeholder="Название фильма..."
              v-model="search"
              @keyup.enter="
                shareData(KeywordApi, { keyword: search }, 'Films', {
                  name: search,
                  data: '',
                })
              "
            />
            <button
              type="button"
              class="btn-search"
              @click="
                shareData(KeywordApi, { keyword: search }, 'Films', {
                  name: search,
                  data: '',
                })
              "
            ></button>
          </form>
        </div>
        <div class="col-1 col-md-1" style="padding-left: 0px">
          <button
            type="button"
            class="btn-window"
            @click="ifwindow = !ifwindow"
          ></button>
        </div>
        <div v-if="ifwindow" class="window">
          <div class="top">
            <div class="row">
              <div class="col-2 title">Топы:</div>
              <div class="col-3">
                <button
                  @click="
                    (ifwindow = !ifwindow),
                      shareData(TopApi, { type: 'TOP_250_BEST_FILMS' }, 'Top', {
                        name: '250',
                        data: '',
                      })
                  "
                >
                  250 Лучших
                </button>
              </div>
              <div class="col-4">
                <button
                  @click="
                    (ifwindow = !ifwindow),
                      shareData(
                        TopApi,
                        { type: 'TOP_100_POPULAR_FILMS' },
                        'Top',
                        {
                          name: '100',
                          data: '',
                        }
                      )
                  "
                >
                  100 Популярных
                </button>
              </div>
              <div class="col-3">
                <button
                  @click="
                    (ifwindow = !ifwindow),
                      shareData(TopApi, { type: 'TOP_AWAIT_FILMS' }, 'Top', {
                        name: 'Await',
                        data: '',
                      })
                  "
                >
                  Ожидаемые
                </button>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="filters" style="height: 450px">
              <div class="row">
                <div class="col-5 select">
                  <div class="title col-3">Тип:</div>
                  <multiselect
                    v-model="filtypes"
                    :options="type"
                    :multiple="false"
                    :close-on-select="false"
                    :preselect-first="true"
                    :preserve-search="true"
                    placeholder="Выберите жанры"
                    label="name"
                    track-by="name"
                  >
                    <template slot="selection" slot-scope="{ values, isOpen }">
                      <span
                        class="multiselect__single"
                        v-if="values.length &amp;&amp; !isOpen"
                      >
                      </span>
                    </template>
                  </multiselect>
                </div>
                <div class="col-6 select">
                  <div class="title col-3">Страны:</div>
                  <multiselect
                    v-model="filcountries"
                    :options="countries"
                    :multiple="true"
                    :close-on-select="false"
                    :preserve-search="true"
                    placeholder="Выберите страны"
                    label="country"
                    track-by="country"
                  >
                    <template
                      class="abc"
                      slot="selection"
                      slot-scope="{ values, isOpen }"
                    >
                      <span
                        class="multiselect__single"
                        v-if="values.length &amp;&amp; !isOpen"
                      >
                        Выбрано {{ values.length }}
                      </span>
                    </template>
                  </multiselect>
                </div>
              </div>
              <div class="row">
                <div class="col-5 select">
                  <div class="title col-3">Сортировка:</div>
                  <multiselect
                    v-model="filsort"
                    :options="sort"
                    :multiple="false"
                    :close-on-select="false"
                    :preselect-first="true"
                    :preserve-search="true"
                    placeholder="Выберите жанры"
                    label="name"
                    track-by="name"
                  >
                    <template slot="selection" slot-scope="{ values, isOpen }">
                      <span
                        class="multiselect__single"
                        v-if="values.length &amp;&amp; !isOpen"
                      >
                      </span>
                    </template>
                  </multiselect>
                </div>
                <div class="col-6 select">
                  <div class="title col-3">Жанры:</div>
                  <multiselect
                    v-model="filgenres"
                    :options="genres"
                    :multiple="true"
                    :close-on-select="false"
                    :preserve-search="true"
                    placeholder="Выберите жанры"
                    label="genre"
                    track-by="genre"
                  >
                    <template slot="selection" slot-scope="{ values, isOpen }">
                      <span
                        class="multiselect__single"
                        v-if="values.length &amp;&amp; !isOpen"
                      >
                        Выбрано {{ values.length }}
                      </span>
                    </template>
                  </multiselect>
                </div>
              </div>
              <div class="row">
                <div class="col-5">
                  <div class="title col-7">Рейтинг:</div>
                  <vue-slider
                    class="slider"
                    v-model="rating"
                    :min="0"
                    :max="10"
                    :tooltip="'active'"
                    :tooltip-placement="'bottom'"
                    :process="process2"
                  >
                    <template v-slot:dot="{ focus }">
                      <div :class="['custom-dot', { focus }]"></div>
                    </template>
                    <template #tooltip="{ index }">
                      <div v-if="index === 1" class="custom-tooltip">
                        {{ rating[1] }}
                      </div>
                      <div v-else class="custom-tooltip">{{ rating[0] }}</div>
                    </template>
                  </vue-slider>
                </div>
                <div class="col-7">
                  <div class="title col-7">Год выпуска:</div>
                  <vue-slider
                    class="slider"
                    v-model="year"
                    :min="1888"
                    :max="2020"
                    :tooltip="'active'"
                    :tooltip-placement="'bottom'"
                    :process="process2"
                  >
                    <template v-slot:dot="{ focus }">
                      <div :class="['custom-dot', { focus }]"></div>
                    </template>
                    <template #tooltip="{ index }">
                      <div v-if="index === 1" class="custom-tooltip">
                        {{ year[1] }}
                      </div>
                      <div v-else class="custom-tooltip">{{ year[0] }}</div>
                    </template>
                  </vue-slider>
                </div>
              </div>
              <div class="btn-filtres">
                <button
                  type="button"
                  @click="
                    (ifwindow = !ifwindow),
                      shareData(
                        FiltersAPI,
                        {
                          country: idfilcountries,
                          genre: idfilgenres,
                          order: filsort.order,
                          type: filtypes.type,
                          ratingFrom: rating[0],
                          ratingTo: rating[1],
                          yearFrom: year[0],
                          yearTo: year[1],
                          page: 1,
                        },
                        'FilterFilms',
                        {
                          name: int,
                          data: '',
                        }
                      )
                  "
                >
                  Поиск
                </button>
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
  data: () => {
    return {
      search: '',
      ifwindow: false,
      TopApi: '/api/v2.2/films/top',
      KeywordApi: '/api/v2.1/films/search-by-keyword',
      FiltersAPI: '/api/v2.1/films/search-by-filters',
      filcountries: null,
      idfilcountries: [],
      countries: null,
      filgenres: null,
      idfilgenres: [],
      genres: null,
      filtypes: null,
      id: null,

      type: [ 
        {name: 'фильм', type: 'FILM' },
        {name: 'тв-шоу', type: 'TV_SHOW' },
        {name: 'всё', type: 'ALL' },
        ],

      filsort: null,
      sort: [
        { name: 'по рейтингу', order: 'RATING' },
        { name: 'по популярности', order: 'NUM_VOTE' },
        { name: 'по дате', order: 'YEAR' },
      ],
      rating: [0, 10],
      year: [1888, 2020],
      process2: (dotsPos) => [
        [dotsPos[0], dotsPos[1], { backgroundColor: 'rgb(150, 36, 125)' }],
      ],
    };
  },
  created() {
    axios
      .get('https://kinopoiskapiunofficial.tech/api/v2.1/films/filters', {
        headers: {
          'X-API-KEY': '27b18e18-799e-4f9a-bdcc-bc8e6a3348a6',
        },
      })
      .then((response) => {
        console.log(response.data);
        this.countries = response.data.countries;
        this.genres = response.data.genres;
      })
      .catch((e) => console.log(e))
      .finally(() => console.log('Data loading complete'));
      this.int = Math.floor(Math.random() * (100000 - 10000 + 1)) + 10000
      

  },
  methods: {
    shareData(secPartApi, paramsApi, routerName, routerParams) {
      if( secPartApi == this.FiltersAPI){
        this.int = Math.floor(Math.random() * (100000 - 10000 + 1)) + 10000
        paramsApi.genre = []; 
        if(this.filgenres != null && this.filgenres.length != 0){
          for( let i = 0; i < this.filgenres.length; i++) paramsApi.genre[i] = this.filgenres[i].id;
        } 
        if(this.filcountries != null && this.filcountries.length != 0){
        for( let i = 0; i< this.filcountries.length; i++) paramsApi.country[i] = this.filcountries[i].id; 

        }
        console.log(paramsApi.genre);
        console.log(paramsApi.country);
        console.log(paramsApi.order);
        console.log(paramsApi.type);
        console.log(paramsApi.ratingFrom);
        console.log(paramsApi.ratingTo);
        console.log(paramsApi.yearFrom);
        console.log(paramsApi.yearTo);
        axios
          .get(
            'https://kinopoiskapiunofficial.tech' +
              secPartApi +
              `?country=${paramsApi.country}&genre=${paramsApi.genre}&order=${paramsApi.order}&type=${paramsApi.type}&ratingFrom=${paramsApi.ratingFrom}&ratingTo=${paramsApi.ratingTo}&yearFrom=${paramsApi.yearFrom}&yearTo=${paramsApi.yearTo}`,
            {
              headers: {
                'X-API-KEY': '27b18e18-799e-4f9a-bdcc-bc8e6a3348a6',
              },
            }
          )
          .then((response) => {
            console.log(response.data);
            routerParams.data = response.data;
            this.$router
              .push({ name: routerName, params: routerParams })
              .catch(() => {});
          })
          .catch((e) => console.log(e))
          .finally(() => console.log('Data loading complete'));
      }
      if (
        this.search.trim() != '' ||
        (secPartApi != this.KeywordApi && secPartApi != this.FiltersAPI)
      ) {
        axios
          .get('https://kinopoiskapiunofficial.tech' + secPartApi, {
            headers: {
              'X-API-KEY': '27b18e18-799e-4f9a-bdcc-bc8e6a3348a6',
            },
            params: paramsApi,
          })
          .then((response) => {
            console.log(response.data);
            routerParams.data = response.data;
            this.$router
              .push({ name: routerName, params: routerParams })
              .catch(() => {});
          })
          .catch((e) => console.log(e))
          .finally(() => console.log('Data loading complete'));
      }
    },
  },
};
</script>

<style scoped>
#body {
  background: url('../public/christmas-dark.png');
  color: white;
}
.container {
  background: url('../public/55.png');
  width: 1000px;
  min-height: 100vh;
  height: auto;
  padding-top: 10px;
  text-align: center;
  box-shadow: 0px 0px 20px rgba(68, 0, 77, 0.644);
}

.slider {
  margin: 0 10% 10px 10%;
  padding: 0 0 10px 0;
}

.select {
  margin: 0 0% 10px 2%;
}

.custom-dot {
  color: rgb(150, 36, 125);
  width: 100%;
  height: 100%;
  border-radius: 10px;
  border: 2px solid white;
  background-color: pink;
  transition: all 0.3s;
}

.custom-dot:hover {
  background: white;
  box-shadow: 0 0 15px 0 white;
}

.custom-tooltip {
  font-size: 15px;
  margin-top: -12px;
}

.filters {
  position: relative;
  border: 2px solid rgb(96, 53, 107);
  border-radius: 4px;
  padding: 15px 0 15px 0;
  background: rgba(126, 67, 123, 0.13);
}

.window {
  background: url('../public/50.jpg');
  border: 3px solid rgb(173, 116, 187);
  box-shadow: 0 0 15px 3px rgb(145, 22, 202);
  padding: 30px;
  position: fixed;
  border-radius: 35px;
  top: 10%;
  z-index: 99999999;
  width: 750px;
  height: 600px;
}

.window button {
  background: rgb(168, 71, 192);
  border: 2px solid rgb(190, 116, 209);
  border-radius: 18px;
  font-size: 20px;
  padding: 0px 10px 3px 10px;
  box-shadow: 0 0 15px 3px rgb(145, 22, 202);
  color: rgb(255, 255, 255);
  text-shadow: 0 0 12px rgb(255, 255, 255);
}

.filters button {
  border-radius: 8px;
  font-size: 25px;
  text-shadow: none;
}

.btn-filtres {
  position: absolute;
  bottom: 5%;
  right: 4%;
}

.title {
  font-size: 22px;
}

.filters .title {
  padding: 5px 20px 12px;
}

.top .row {
  border: 2px solid rgb(96, 53, 107);
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

input,
.btn-window,
.btn-search {
  border: none;
  outline: none;
  background: transparent;
}
input {
  border-radius: 20px;
  width: 100%;
  height: 42px;
  padding-left: 15px;
  color: rgb(201, 201, 201);
}
.btn-window,
.btn-search {
  border-radius: 20px;
  height: 42px;
  width: 42px;
  position: absolute;
  cursor: pointer;
}
.btn-search {
  right: 0;
}
.btn-window {
  background: #331d66;
}
button:before {
  font-family: FontAwesome;
  font-size: 16px;
  color: #f9f0da;
}
.btn-search::before {
  content: '\f002';
}

.btn-window::before {
  margin-left: 2px;
  content: '\f03a';
}

.btn-window:hover {
  border: 2px solid #b6b6b6;
  transition: all 0.1s;
}

form:hover input,
input:focus {
  border: 2px solid #b6b6b6;
  transition: all 0.1s;
}
</style>
