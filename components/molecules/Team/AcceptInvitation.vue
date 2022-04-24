<template lang="pug">
.xm-team-accept-invitation(:class="status")
  .card
    .card-content
      template(v-if="status === 'success'")
        .header
          ._icon: b-icon(icon="check" custom-size="mdi-48px")
          h3 {{ message }}
        .actions: b-button(type="is-primary" @click.prevent="doCloseModal()") Close
      template(v-if="status === 'error'")
        .header
          ._icon: b-icon(icon="close" custom-size="mdi-48px")
          h2 Sorry!
          h3 {{ message }}
        .actions: b-button(type="is-primary" @click.prevent="doCloseModal()") Close
</template>

<script>
export default {
  name: 'XMTeamAcceptInvitation',
  props: {
    status: String,
    message: String,
  },
  methods: {
    doCloseModal() {
      this.$parent.close()
      location.href = '/my-feed'
    },
  },
}
</script>

<style lang="scss" scoped>
.xm-team-accept-invitation::v-deep {
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
        border-bottom: 1px solid #eef1f1;
        padding-bottom: 20px;
        margin-bottom: 20px;

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
          ._icon {
            background-color: $success;
          }
        }
      }
    }
  }

  &.error {
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
