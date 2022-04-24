<template lang="pug">
.xm-businesses-business-list
  .container
    h2 ActivePlace is built for the best health & fitness businesses in the world
    .list
      .item(v-for="(logo, index) in logos")
        img(
          :src="require(`~/assets/images/Businesses/business-logo/${logo}.webp`)",
          :class="logo"
          width="100"
          height="100")
</template>

<script>
export default {
  name: 'XMBusinessesBusinessList',
  data() {
    return {
      logos: ['wildearth', 'gc50', 'edco', 'fit', 'wyvrepublic', 'fractel', 'fisiocrem', 'cannibal', 'opkix'],
    }
  },
}
</script>

<style lang="scss" scoped>
.xm-businesses-business-list::v-deep {
  padding: 80px 0;

  h2 {
    text-align: center;
    width: 100%;
    max-width: 680px;
    margin: 0 auto 50px;
    color: #050505;
  }

  .list {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;

    .item {
      margin: 0 15px;
      position: relative;

      img {
        cursor: pointer;
        filter: grayscale(100%);
        opacity: 0.2;
        mix-blend-mode: multiply;

        &:hover {
          filter: grayscale(0%);
          opacity: 1;
        }
      }
    }
  }

  @media screen and (max-width: 1024px) {
    .list {
      .item {
        margin: 0 10px 10px;

        img {
          filter: grayscale(0%);
          opacity: 1;
        }
      }
    }
  }

  @media screen and (max-width: 767px) {
    padding: 50px 0;

    .list {
      .item {
        img {
          max-width: 56px;
        }
      }
    }
  }
}
</style>
