<template lang="pug">
.xm-checkout-status(:class="status")
  .card
    .card-content
      template(v-if="status === 'success'")
        .header
          ._icon: b-icon(icon="check" custom-size="mdi-48px")
          h2 Payment successful!
          h3 Thank you for subscribing to world's healthiest social network
        .contents
          .content-row.amount-paid
            ._label.has-text-weight-medium Amount Paid
            .value AUD ${{ amount_total }}
        .actions: b-button(type="is-primary" @click.prevent="doCloseSuccessModal()") Close
      template(v-else)
        .header
          ._icon: b-icon(icon="close" custom-size="mdi-48px")
          h2 Sorry!
          h3 Your transaction has failed. Please go back and try again.
        .actions: b-button(type="is-primary" @click.prevnet="doCloseFailedModal()") Close
</template>

<script>
export default {
  name: 'XMCheckoutStatus',
  props: {
    status: String,
    sessionValue: { type: Object, default: () => {} },
  },
  computed: {
    /* eslint-disable camelcase */
    amount_total() {
      return this.sessionValue?.amount_total_converted || 0
    },
  },
  methods: {
    doCloseSuccessModal() {
      this.$parent.close()
    },
    doCloseFailedModal() {
      this.$parent.close()
    },
  },
}
</script>

<style lang="scss" scoped>
.xm-checkout-status::v-deep {
  .card {
    .card-content {
      position: relative;
      padding: 50px 30px;

      .close {
        position: absolute;
        top: 10px;
        right: 10px;
        cursor: pointer;
      }

      .header {
        text-align: center;

        ._icon {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          margin: 0 auto 10px;
          color: $white;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
        }

        h2 {
          font-size: 2.2857rem;
        }

        h3 {
          font-size: 1.2857rem;
          font-weight: 300;
        }
      }

      .contents {
        .content-row {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;

          ._label {
            flex: 10000 1 0;
            padding-right: 20px;
          }
        }
      }

      .actions {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        margin-top: 30px;

        button {
          text-transform: uppercase;
          min-width: 100px;
        }
      }
    }
  }

  &.success {
    .card {
      .card-content {
        .header {
          border-bottom: 1px solid #eef1f1;
          padding-bottom: 20px;
          margin-bottom: 20px;

          ._icon {
            background-color: $success;
          }
        }
      }
    }
  }

  &.cancel {
    .card {
      .card-content {
        .header {
          ._icon {
            background-color: $danger;
          }
        }
      }
    }
  }

  @media screen and (max-width: 767px) {
    padding: 0 15px;
  }
}
</style>
