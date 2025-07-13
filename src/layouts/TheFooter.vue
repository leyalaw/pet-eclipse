<template>
  <footer tabindex="0" @focus="onFocus" class="footer">
    <!-- ИЗОБРАЖЕНИЕ ДЛЯ ГЛАВНОЙ СТРАНИЦЫ -->
    <div
      v-if="footerImage"
      v-aos="['fade-right', $duration.calm]"
      aria-hidden="true"
      class="footer__image-block"
    >
      <img :src="footerImage" alt="" class="footer__image" />
    </div>

    <!-- КОНТЕНТ ФУТЕРА -->
    <div
      v-if="isContentReached"
      v-aos="{
        name: 'fade',
        duration: $duration.calm,
        offset: 0,
      }"
      class="wrapper"
    >
      <!-- социальные сети -->
      <Socials
        ref="socials"
        :socials="socials"
        tabindex="0"
        aria-label="Social networks"
        class="footer__socials"
      />

      <!-- меню -->
      <AdditionalMenu :items="menuItems" :in-columns="4" class="footer__menu" />

      <!-- информация -->
      <div class="footer__info">
        <p>Made in Melbourne By BlazRobar.com @BlazRobar</p>
        <p>Copyright © 2016, Cool stuff here</p>
      </div>
      <div class="footer__note">
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing</p>
      </div>
    </div>
  </footer>
</template>

<script>
/* -------------------------------------------------------------------------- */
/*                                    Футер                                   */
/* -------------------------------------------------------------------------- */

// основное
import { mapGetters } from "vuex";
// компоненты
import Socials from "@ui/SocialList/SocialList.vue";
import AdditionalMenu from "@ui/menu/AdditionalMenu.vue";

export default {
  name: "Footer",
  components: {
    Socials,
    AdditionalMenu,
  },
  /* ---------------------------------- Data ---------------------------------- */
  data() {
    return {
      menuItems: Object.freeze([
        { to: "/about", title: "About" },
        { to: "/support", title: "Support" },
        { to: "/blog", title: "Why Buy" },
        { to: "/affiliates", title: "Affiliates" },
        { to: "/contact-us", title: "Contact Us" },
        { to: "/returns", title: "Returns" },
      ]),
      socials: Object.freeze([
        {
          id: "twitter",
          iconId: "social-twitter",
          title: "Tweet",
          color: "#69b6f2",
          label: "Make a tweet",
        },
        {
          id: "fb",
          iconId: "social-fb",
          title: "Share",
          color: "#395799",
          label: "Share on facebook",
        },
      ]),
      isContentReached: false,
    };
  },
  /* -------------------------------- Computed -------------------------------- */
  computed: {
    ...mapGetters(["footerImage"]),
  },
  /* --------------------------------- Mounted -------------------------------- */
  mounted() {
    window.addEventListener("scroll", this.showContentIfReached);
    setTimeout(this.onScroll, 0);
  },
  /* ------------------------------ BeforeUnmount ----------------------------- */
  beforeUnmount() {
    window.removeEventListener("scroll", this.showContentIfReached);
  },
  /* --------------------------------- Methods -------------------------------- */
  methods: {
    /** Показать контент футера при достижении конца */
    showContentIfReached() {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 100 // для корректной работы на мобильных
      )
        this.setContentReached();
    },
    onFocus(event) {
      this.showContentIfReached();
      this.$nextTick(() => this.$refs.socials.$el.focus());
    },
    setContentReached() {
      this.isContentReached = true;
      window.removeEventListener("scroll", this.showContentIfReached);
      event.target.removeAttribute("tabindex");
    },
  },
};
</script>

<style lang="scss">
/* ---------------------------------- Style --------------------------------- */
.footer {
  @extend %Montserrat-regular;
  @extend %color-secondary-additional;
  @extend %text-smallest;

  @include set-responsive-property(4rem 0 13rem, padding);
  @include set-responsive-property(1.6rem, line-height);

  &__image-block {
    position: relative;
    height: 61rem;
    pointer-events: none;
    margin-bottom: 2.5rem;

    @include mq(xl) {
      height: 55rem;
    }

    @include mq(md) {
      display: none;
    }
  }

  &__image {
    pointer-events: none;
    user-select: none;
    position: absolute;
    width: 100rem;
    right: 10%;
    bottom: -10%;

    @include mq(xl) {
      width: 70%;
      right: 0;
    }
  }

  .wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    @include set-responsive-property(4.5rem, row-gap);
  }

  p,
  li {
    margin-bottom: 1.8rem;
  }

  &__socials {
    width: 100%;
    justify-content: flex-end;
  }

  &__menu {
    width: 20%;

    @include mq(md) {
      column-gap: 2rem;
    }
  }

  &__info {
    width: 40%;
    text-align: right;
  }

  &__menu,
  &__info {
    @include mq(md) {
      width: 100%;
    }
  }

  &__note {
    width: 100%;
  }
}
</style>
