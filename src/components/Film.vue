<template>
  <div class="container-fluid">
    <div class="title border-bottom">
      <h1>{{ info.nameRu }}</h1>
      <p class="lead">{{ info.slogan }}</p>
    </div>
    <div class="row about-movie">
      <div class="col-sm-6">
        <img :src="info.posterUrl" alt="Постер" class="rounded img-fluid" />
      </div>
      <div class="col-sm-6">
        <h4><strong>Краткое описание</strong></h4>
        <p>
          {{ info.description }}
        </p>
        <h4><strong>Даты премьер</strong></h4>
        <div class="row">
          <div class="col-sm-6">
            <p>В России: {{ info.premiereRu }}</p>
          </div>
          <div class="col-sm-6">
            <p>В мире: {{ info.premiereWorld }}</p>
          </div>
        </div>
        <h4><strong>Продолжительность</strong></h4>
        <p>{{ filmLengthH }} ч. {{ filmLengthM }} м.</p>
        <h4><strong>Жанры</strong></h4>
        <ul class="list-inline">
          <li
            class="list-inline-item"
            v-for="genre of info.genres"
            :key="genre.genre"
          >
            {{ genre.genre }}
          </li>
        </ul>
        <h4><strong>Рейтинг</strong></h4>
        <div class="row">
          <div class="col-sm-6">Кинопоиск: {{ rating.rating }}</div>
          <div class="col-sm-6">IMDb: {{ rating.ratingImdb }}</div>
        </div>
        <div class="row">
          <div class="col-sm-6">
            <p>
              <em>{{ rating.ratingVoteCount }} голосов</em>
            </p>
          </div>
          <div class="col-sm-6">
            <p>
              <em>{{ rating.ratingImdbVoteCount }} голосов</em>
            </p>
          </div>
        </div>
        <h4><strong>Возрастные ограничения</strong></h4>
        <p>{{ info.ratingAgeLimits }}+</p>
      </div>
    </div>
    <h2>Трейлер</h2>
    <youtube width="100%" height="500px" :video-id="getId()"></youtube>
    <h2 class="images-title">Изображения</h2>
    <b-carousel controls indicators>
      <b-carousel-slide
        v-for="(frame, index) of frames"
        :key="index"
        :img-src="frame.image"
      ></b-carousel-slide>
    </b-carousel>
    <h2 class="actors-title">Актёры и режиссеры</h2>
    <swiper class="swiper" :options="swiperOption">
      <swiper-slide v-for="(actor, index) of actors" :key="index">
        <p>
          <strong>{{ actor.nameRu }}</strong>
        </p>
        <img class="actor-image" :src="actor.posterUrl" alt="Фото" />
        <p class="lead">{{ actor.professionText }}</p>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <a
      :href="info.webUrl"
      target="_blank"
      type="button"
      class="linkKP btn btn-link"
      >Открыть на кинопоиске</a
    >
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Film',
  data: function () {
    return {
      info: String,
      filmLengthH: String,
      filmLengthM: String,
      rating: String,
      trailer: String,
      frames: [
        {
          image: String,
          preview: String,
        },
      ],
      actors: [
        {
          staffId: String,
          nameRu: String,
          nameEn: String,
          description: String,
          posterUrl: String,
          professionText: String,
          professionKey: String,
        },
      ],
      swiperOption: {
        slidesPerView: 4,
        centeredSlides: true,
        spaceBetween: 30,
        grabCursor: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
      },
    };
  },
  created: function () {
    axios
      .get(
        'https://kinopoiskapiunofficial.tech/api/v2.1/films/' +
          this.$route.params.id +
          '?append_to_response=RATING',
        {
          headers: { 'X-API-KEY': '27b18e18-799e-4f9a-bdcc-bc8e6a3348a6' },
        }
      )
      .then((response) => {
        console.log(response.data);
        this.info = response.data.data;
        this.filmLengthH = this.info.filmLength.split(':')[0];
        this.filmLengthM = this.info.filmLength.split(':')[1];
        this.rating = response.data.rating;
      })
      .catch((e) => console.log(e))
      .finally(() => console.log('Information about movie loading complete'));

    axios
      .get(
        'https://kinopoiskapiunofficial.tech/api/v2.1/films/' +
          this.$route.params.id +
          '/videos',
        {
          headers: { 'X-API-KEY': '27b18e18-799e-4f9a-bdcc-bc8e6a3348a6' },
        }
      )
      .then((response) => {
        this.trailer = response.data.trailers[0];
      })
      .catch((e) => console.log(e))
      .finally(() => console.log('Videos loading complete'));

    axios
      .get(
        'https://kinopoiskapiunofficial.tech/api/v2.1/films/' +
          this.$route.params.id +
          '/frames',
        {
          headers: { 'X-API-KEY': '27b18e18-799e-4f9a-bdcc-bc8e6a3348a6' },
        }
      )
      .then((response) => {
        this.frames = response.data.frames;
        console.log(this.frames);
      })
      .catch((e) => console.log(e))
      .finally(() => console.log('Frames loading complete'));

    axios
      .get(
        'https://kinopoiskapiunofficial.tech/api/v1/staff?filmId=' +
          this.$route.params.id,
        {
          headers: { 'X-API-KEY': '27b18e18-799e-4f9a-bdcc-bc8e6a3348a6' },
        }
      )
      .then((response) => {
        this.actors = response.data;
        console.log(this.actors);
      })
      .catch((e) => console.log(e))
      .finally(() => console.log('Staff loading complete'));
  },
  methods: {
    getId() {
      return this.$youtube.getIdFromUrl(this.trailer.url);
    },
  },
};
</script>

<style scoped>
/* .movieImages {
  width: 100%;
  height: auto;
  border-left: 10px solid white;
} */
.container-fluid {
  padding-top: 10px;
}
.title {
  margin-bottom: 20px;
}
img {
  object-fit: cover;
}
.about-movie {
  margin-bottom: 30px;
}
.images-title,
.linkKP,
.actors-title {
  margin-top: 30px;
}
.swiper-slide {
  width: 60%;
}
.swiper-slide:nth-child(2n) {
  width: 40%;
}
.swiper-slide:nth-child(3n) {
  width: 20%;
}
.actor-image {
  width: 200px;
  height: 250px;
  object-fit: cover;
  border-radius: 50%;
}
</style>
