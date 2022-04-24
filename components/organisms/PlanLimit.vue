<template lang="pug">
.xo-plan-limit
  .card
    .card-content
      .close(@click.prevent="$parent.close()"): b-icon(icon="close")
      XOPlanLimitInvite(v-if="type === 'invite'")
      XOPlanLimitFollow(v-if="type === 'follow'")
      .actions
        b-button.btn-no-thanks(type="is-primary" outlined @click.prevent="$parent.close()") No Thanks
        b-button.btn-plans-pricing(
          type="is-primary"
          tag="router-link"
          to="/businesses/plans-pricing"
          @click.native="$parent.close()") See Plans & Pricing
</template>

<script>
import XOPlanLimitInvite from '~/components/organisms/PlanLimit/Invite'
import XOPlanLimitFollow from '~/components/organisms/PlanLimit/Follow'

export default {
  name: 'XOPlanLimit',
  components: { XOPlanLimitInvite, XOPlanLimitFollow },
  props: {
    details: Object,
  },
  computed: {
    type() {
      return this.details?.type || null
    },
  },
}
</script>

<style lang="scss" scoped>
.xo-plan-limit::v-deep {
  .card {
    .card-content {
      position: relative;
      padding: 60px 30px;

      .close {
        position: absolute;
        top: 20px;
        right: 20px;
        cursor: pointer;
      }

      h3 {
        font-size: 2.2857rem;
        line-height: 1.45;
        text-align: center;
        color: $secondary;
        margin-bottom: 20px;
      }

      p {
        font-size: 16px;
        font-weight: 300;
        line-height: 1.45;
        color: $dark;
        text-align: center;
        margin-bottom: 30px;
      }

      .actions {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;

        button,
        a {
          margin: 0 10px;
          text-transform: uppercase;
        }
      }
    }
  }

  @media screen and (max-width: 767px) {
    padding: 0 15px;
  }

  @media screen and (max-width: 427px) {
    .card {
      .card-content {
        h3 {
          font-size: 1.5714rem;
        }

        .actions {
          .btn-no-thanks {
            order: 2;
          }

          .btn-plans-pricing {
            order: 1;
            margin-bottom: 15px;
          }
        }
      }
    }
  }
}
</style>
