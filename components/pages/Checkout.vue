<template lang="pug">
.xp-checkout.py-6
  .container
    form(action="#" autocomplete="off")
      .items
        .item
          .image
          .details
            .name {{ getCheckoutItems.name }}
            .description {{ getCheckoutItems.description }}
          .price AUD ${{ getCheckoutItems.price.toFixed(2) }}
      .inputs
        .mb-5: FormInput(v-model="name" label="Name")
        .mb-5: FormInput(v-model="email" label="Email" type="email")
        .mb-5
          ._label Card Information
          .credit-card
        .actions
          b-button(type="is-primary" size="is-medium" expanded) Pay AUD ${{ getCheckoutItems.price.toFixed(2) }}
        .payment-status.mt-6(style="display: flex; flex-wrap: wrap; justify-content: space-around")
          b-button(type="is-success" @click.prevent="doShowPaymentStatus('success')") Show Success
          b-button(type="is-danger" @click.prevent="doShowPaymentStatus('failure')") Show Failure
</template>

<script>
import { mapGetters } from 'vuex'
import FormInput from '~/components/atoms/Form/Input'
import XANoResultFound from '~/components/atoms/NoResultFound'

export default {
  name: 'XPCheckout',
  components: { FormInput, XANoResultFound },
  data() {
    return {
      name: '',
      email: '',
      totalPrice: 100,
    }
  },
  computed: {
    ...mapGetters({
      getCheckoutItems: 'checkout/getCheckoutItems',
    }),
  },
  mounted() {
    if (this.$stripe) {
      const elements = this.$stripe.elements()
      const card = elements.create('card', {
        style: {
          base: {
            fontSize: '16px',
            fontFamily: 'Rotunda, sans-serif',
            width: '10%',
          },
        },
        hidePostalCode: true,
      })
      card.mount('.credit-card')
    }
  },
  methods: {
    doShowPaymentStatus(status) {
      this.$buefy.modal.open({
        component: require('~/components/molecules/Checkout/Status').default,
        parent: this,
        canCancel: false,
        width: 500,
        props: {
          status,
        },
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.xp-checkout::v-deep {
  min-height: calc(100vh - 505px);
  background-color: $white;

  form {
    width: 100%;
    max-width: 900px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    ._label {
      margin-bottom: 3px;
    }

    .items,
    .inputs {
      width: calc(50% - 30px);
    }

    .items {
      margin-bottom: 30px;

      .item {
        display: flex;
        flex-wrap: wrap;

        .details {
          flex: 10000 1 0;
          padding-right: 50px;

          .name {
            font-size: 1.4286rem;
          }

          .description {
            font-weight: 300;
            color: #65676b;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
    }
  }

  .credit-card {
    border: 1px solid #dbdbdb;
    border-radius: 4px;
    min-height: 40px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding-left: 10px;

    .__PrivateStripeElement {
      width: 100%;
    }
  }

  @media screen and (max-width: 1023px) {
    form {
      .items,
      .inputs {
        width: 100%;
      }
    }
  }
}
</style>
