<template lang="pug">
.team-expired-card
  .card
    .header
      .close.ml-auto(@click.prevent="$parent.close()"): b-icon(icon="close")
    .card-content.has-text-centered
      ._icon: b-icon(icon="cancel" type="is-error" size="is-large" custom-size="mdi-48px")
      p._title.mb-5 Your team invitation has expired
      p.has-text-weight-light.mb-5 Please contact the owner of [Business Name] to request a new invite.
      .actions
        b-button.is-uppercase(type="is-primary" @click="$parent.close()" outlined) Okay
</template>

<script>
export default {
  name: 'XMTeamExpired',
  props: {
    business: Object,
  },
}
</script>

<style lang="scss" scoped>
.team-expired-card::v-deep {
  width: 487px !important;
  .card {
    .header {
      position: relative;
      padding: 17px 20px;

      .close {
        position: absolute;
        top: 0;
        bottom: 0;
        right: 20px;
        cursor: pointer;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
      }
    }
  }

  ._icon {
    font-size: 3rem !important;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    margin: 0 auto 10px;
    color: red;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
  }
  .mdi-cancel::before {
    font-size: 68px !important;
  }

  ._title {
    font-weight: 500;
    text-align: center;
    font-size: 32px;
    color: $secondary;
  }
}
</style>
