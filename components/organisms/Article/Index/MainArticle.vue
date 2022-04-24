<template lang="pug">
.main-article
  XOArticleIndexMainLoader(v-if="isRetrieving")
  template(v-else)
    .left-content
      h1: nuxt-link(:to="`/`") Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      .aggregates
        .date.details Jul 01, 2021
        .high-fives.details
          ._icon: img(src="~assets/icons/high-fived.webp")
          .value 10
        .views.details
          ._icon: img(src="~assets/icons/views.webp")
          .value 20
      ._content.mb-5 {{ content | truncate(380) }} #[nuxt-link(:to="`/a/undefined`") Read more]
      .user-details.is-flex.is-align-items-center
        XAProfileAvatar.mr-3(size="38px" label="AA")
        p.has-text-secondary Anton Akira
    .right-content
      nuxt-link(:to="`/`")
        img(src="https://homepages.cae.wisc.edu/~ece533/images/arctichare.png" v-if="imageLoaded")
        XAImageNotLoaded(v-else)
</template>

<script>
import XAProfileAvatar from '~/components/atoms/ProfileAvatar'
import XOArticleIndexMainLoader from '~/components/organisms/Article/Index/MainArticleLoader'
import XAImageNotLoaded from '~/components/atoms/ImageNotLoaded'

export default {
  name: 'XOArticleIndexMainArticle',
  components: { XAImageNotLoaded, XOArticleIndexMainLoader, XAProfileAvatar },
  props: {
    isRetrieving: { type: Boolean, default: true },
  },
  data() {
    return {
      imageLoaded: true,
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
    }
  },
}
</script>

<style lang="scss" scoped>
/* stylelint-disable no-descending-specificity */

.main-article::v-deep {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  color: #050505;

  .left-content {
    width: calc(100% / 2 - 20px);
    font-size: 1.1429rem;
    line-height: 1.7143rem;
    font-weight: 300;

    h1 {
      font-size: 3rem;
      line-height: 3.5714rem;
      margin-bottom: 10px;
      font-family: $secondary-font;

      a {
        color: inherit;
        display: block;
      }
    }

    .aggregates {
      margin: 20px 0;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      color: #65676b;
      font-weight: 300;
      font-size: 1rem;

      .details {
        display: flex;
        flex-wrap: wrap;
        align-items: center;

        &:last-child {
          &::after {
            content: none;
          }
        }

        &::after {
          content: '';
          margin: 0 8px 4px;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background-color: #65676b;
          display: block;
        }

        ._icon {
          margin-right: 5px;
          display: flex;
          padding-bottom: 5px;
        }
      }
    }

    a {
      color: $secondary;
      font-weight: 400;
    }
  }

  .right-content {
    width: calc(100% / 2 - 20px);
    max-height: 350px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  @media screen and (max-width: 767px) {
    .left-content,
    .right-content {
      width: 100%;
    }

    .left-content {
      order: 2;
      margin-bottom: 20px;

      h1 {
        font-size: 1.7rem !important;
        line-height: 2rem;
        margin-bottom: 10px;
      }

      .aggregates {
        margin: 10px 0;
      }

      ._content {
        display: none;
      }
    }

    .right-content {
      order: 1;
      margin-bottom: 10px;
    }
  }
}
</style>
