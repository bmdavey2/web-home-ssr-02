<template lang="pug">
.xm-member-claim-invalid-link
  .card
    .card-content
      .header
        ._icon: b-icon(icon="close" custom-size="mdi-48px")
        h2 Sorry!
        h3 Looks like you are using an invalid link. Please contact our support.
      .actions
        b-button(type="is-primary" outlined @click.prevent="doShowContactSupport()") Contact Support
        b-button(type="is-primary" @click.prevent="doCloseModal()") Close
</template>

<script>
export default {
  name: 'XMMemberClaimInvalidLink',
  methods: {
    doCloseModal() {
      this.$router.push('/')
      this.$parent.close()
    },
    async doShowContactSupport() {
      this.$zendesk.open()
      await this.$router.push('/')
      this.$parent.close()
    },
  },
}
</script>

<style lang="scss" scoped>
.xm-member-claim-invalid-link::v-deep {
  .card {
    .card-content {
      padding: 50px 30px;

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
          background-color: $danger;
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

        button,
        a {
          text-transform: uppercase;
          min-width: 100px;
          margin: 0 10px;
        }
      }
    }
  }

  @media screen and (max-width: 767px) {
    padding: 0 15px;
  }
}
</style>
