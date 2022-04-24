<template lang="pug">
.xp-medals-order
  .container.is-max-widescreen
    h1 Digital NFT Medals ordering form
    h4.text-weight-thin.sub-paragraph Complete the form to speak with one of our experts. Digital NFT Medals are here to become your number one online marketing and brand solution. It’s the competitive edge you’ve been searching for

    form(action="#")
      XOMedalsOrderInformation(v-show="activeForm === 1")
      XOMedalsOrderMedalDesign(v-show="activeForm === 2")
      XOMedalsOrderEventInformation(v-show="activeForm === 3")
</template>

<script>
import XOMedalsOrderInformation from '~/components/organisms/Medals/Order/Information'
import XOMedalsOrderMedalDesign from '~/components/organisms/Medals/Order/MedalDesign'
import XOMedalsOrderEventInformation from '~/components/organisms/Medals/Order/EventInformation'

export default {
  name: 'XPMedalsOrder',
  components: {
    XOMedalsOrderInformation,
    XOMedalsOrderMedalDesign,
    XOMedalsOrderEventInformation,
  },
  data() {
    return {
      activeForm: 1,
    }
  },
  watch: {
    activeForm: {
      deep: true,
      handler(value) {
        switch (value) {
          case 1:
            this.$appClient.segment.trackPageView({ page: 'Digital NFT Medals ordering form information' })
            break

          case 2:
            this.$appClient.segment.trackPageView({ page: 'Digital NFT Medals ordering form medal design' })
            break

          case 3:
            this.$appClient.segment.trackPageView({ page: 'Digital NFT Medals ordering form event information' })
            break

          default:
            break
        }
      },
    },
  },
  mounted() {
    this.$root.$on('set/active/form', (value) => {
      this.activeForm = value
    })
  },
}
</script>

<style lang="scss" scoped>
.xp-medals-order::v-deep {
  background-color: #08252c;
  min-height: calc(100vh - 90px);
  position: relative;
  padding: 100px 0;

  @include max-width(767px) {
    padding: 50px 0;
  }

  &::before {
    content: '';
    background-color: $secondary;
    background-image: url('~assets/images/v2/Businesses/bg-gradient.svg');
    background-size: cover;
    padding: 100px 0;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 800px;

    @include max-width(767px) {
      content: none;
    }
  }

  h1 {
    font-size: 5rem;
    line-height: 5.7143rem;
    letter-spacing: -2.1px;
    color: $white;
    margin-bottom: 30px;
    width: 100%;
    max-width: 580px;

    @include max-width(1023px) {
      font-size: 2.8571rem;
      line-height: 4rem;
    }
  }

  h2 {
    font-size: 2.2857rem;
    line-height: 2.8571rem;
    letter-spacing: -0.8px;
  }

  h3 {
    font-size: 2.2857rem;
    line-height: 2.8571rem;
    letter-spacing: -0.8px;

    @include max-width(767px) {
      font-size: 1.7143rem;
      line-height: 2.4286rem;
    }
  }

  h4 {
    font-size: 1.5714rem;
    line-height: 2.8571rem;

    @include max-width(1023px) {
      font-size: 1.1429rem;
      line-height: 2rem;
    }

    &.sub-paragraph {
      color: rgba($white, 0.8);
      width: 100%;
      max-width: 900px;
    }
  }

  form {
    margin-top: 100px;

    @include max-width(767px) {
      margin-top: 80px;
    }

    .form-content {
      background-color: $white;
      border-radius: 10px;
      padding: 50px;

      @include max-width(767px) {
        padding: 30px;
      }

      .actions {
        .btn-prev {
          margin-right: 10px;
          width: 60px;
          height: 82px;
          color: #8a9ea2;
          background-color: $white;
        }

        .btn-next {
          width: 295px;
          height: 82px;
          text-transform: uppercase;

          @include max-width(767px) {
            width: 100%;
          }

          .step {
            color: rgba($white, 0.6);
          }
        }
      }
    }
  }
}
</style>
