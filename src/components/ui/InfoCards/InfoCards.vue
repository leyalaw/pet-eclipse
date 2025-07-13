<template>
  <div class="info-cards">
    <InfoCardsCard
      v-for="card in cards"
      :key="card.icon"
      v-bind="card"
      :title-level="titleLevel"
      class="info-cards__card"
    />
  </div>
</template>

<script>
/* -------------------------------------------------------------------------- */
/*                           Информационные карточки                          */
/* -------------------------------------------------------------------------- */

import InfoCardsCard from "./InfoCardsCard.vue";

export default {
  name: "InfoCards",
  components: {
    InfoCardsCard,
  },
  /* ---------------------------------- Props --------------------------------- */
  props: {
    /** Карточки с id svg, заголовком и текстом */
    cards: {
      type: Array,
      required: true,
      validator(cards) {
        return cards.every((card) =>
          ["icon", "title", "text"].every((key) => key in card)
        );
      },
    },
    /** Уровень заголовка h, без значения заголовок будет иметь тег p */
    titleLevel: Number,
  },
};
</script>

<style lang="scss">
/* ---------------------------------- Style --------------------------------- */
.info-cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 5.5rem;
  column-gap: 1rem;
  row-gap: 3rem;

  @include mq(xl) {
    justify-content: space-around;
  }

  @include mq(sm) {
    justify-content: center;
  }

  &__card {
    width: 28.5rem;

    @include mq(xl) {
      width: 40%;
    }
    @include mq(md) {
      width: 45%;
    }
    @include mq(sm) {
      width: 70%;
    }
    @include mq(xs) {
      width: 90%;
    }
  }
}
</style>
