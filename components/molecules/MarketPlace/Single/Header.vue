<template lang="pug">
.xm-marketplace-single-header
  h1 {{ title }}
  .contents
    .left-content
      .aggregates
        .views
          b-icon(icon="eye" custom-size="mdi-18px")
          | {{ viewsCount }} Views
        .saves
          b-icon(icon="bookmark" custom-size="mdi-18px")
          | {{ savesCount }} Saves
    .right-content
      .save(@click.prevent="doSaveProduct()")
        img(src="~assets/images/MarketPlace/saves-secondary.svg" v-if="isSaved")
        img(src="~assets/images/MarketPlace/saves-outline.png" v-else)
      //- .like: img(src="~assets/images/MarketPlace/like-outline.png")
      .linkedin
        share-network(
          network="linkedin",
          :title="title",
          :description="description",
          :media="coverPhotoURL",
          :url="`${baseURL}${$route.fullPath}`"): img(
          src="~assets/images/MarketPlace/linkedin.png")
      .twitter
        share-network(
          network="twitter",
          :title="title",
          :description="description",
          :media="coverPhotoURL",
          :url="`${baseURL}${$route.fullPath}`"): img(
          src="~assets/images/MarketPlace/twitter.png")
      .facebook
        share-network(
          network="facebook",
          :title="title",
          :description="description",
          :media="coverPhotoURL",
          :url="`${baseURL}${$route.fullPath}`"): img(
          src="~assets/images/MarketPlace/facebook.png")
</template>

<script>
import gql from 'graphql-tag'
export default {
  name: 'XMMarketPlaceSingleHeader',
  props: {
    product: Object,
  },
  data() {
    return {
      isSaved: this.product?.isSaved,
      savesCount: this.product?.savesCount,
    }
  },
  computed: {
    title() {
      return this.product?.title
    },
    viewsCount() {
      return this.product?.viewsCount
    },
    description() {
      return this.product?.description
    },
    coverPhotoURL() {
      return this.product?.coverPhotoURL
    },
  },
  methods: {
    async doSaveProduct() {
      if (!this.isLoggedIn) {
        this.showSignUpNagDialog()
        return
      }
      this.isSaved = !this.isSaved
      if (this.isSaved) {
        this.savesCount++
      } else {
        this.savesCount--
      }
      try {
        await this.$apollo.mutate({
          variables: {
            id: this.product?.id,
          },
          context: this.getGraphQLContext(),
          mutation: this.isSaved
            ? gql`
                mutation ($id: String!) {
                  saveProduct(id: $id) {
                    success
                  }
                }
              `
            : gql`
                mutation ($id: String!) {
                  unsaveProduct(id: $id) {
                    success
                  }
                }
              `,
        })
      } catch (error) {
        this.doTrackSegmentError(error, 'MarketPlace Product')
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.xm-marketplace-single-header::v-deep {
  margin-top: 50px;
  margin-bottom: 30px;

  h1 {
    font-size: 2.2857rem;
    line-height: 1.2;
    color: #050505;
  }

  .contents {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;

    .left-content {
      .aggregates {
        font-weight: 300;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        color: #65676b;

        .views,
        .saves {
          display: flex;
          flex-wrap: wrap;

          .icon {
            margin-right: 5px;
          }
        }

        .views {
          border-right: 1px solid #65676b;
          padding-right: 10px;
          margin-right: 10px;
        }
      }
    }

    .right-content {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-end;

      > div {
        width: 40px;
        height: 40px;
        border-radius: 100px;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        border: 1px solid $secondary;
        cursor: pointer;

        &:not(:last-child) {
          margin-right: 15px;
        }

        a {
          width: 100%;
          height: 100%;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
        }
      }
    }
  }

  @media screen and (max-width: 767px) {
    margin: 30px 0;

    h1 {
      font-size: 1.7143rem;
      margin-bottom: 10px;
    }

    .contents {
      .left-content,
      .right-content {
        width: 100%;
      }

      .left-content {
        margin-bottom: 20px;
      }

      .right-content {
        justify-content: flex-start;
      }
    }
  }
}
</style>
