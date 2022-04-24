<template lang="pug">
.xp-remove-team-member
  .card
    .card-content
      .close(@click.prevent="$parent.close()"): b-icon(icon="close")
      h3 Remove {{ details.Member.name }}?
      .actions
        b-button(type="is-primary" outlined @click.prevent="$parent.close()", :disabled="isSubmitting") Exit
        b-button(type="is-primary" @click.prevent="doRemoveTeamMember()", :loading="isSubmitting") Confirm
</template>

<script>
import gql from 'graphql-tag'
export default {
  name: 'XPRemoveTeamMember',
  props: {
    details: Object,
  },
  data() {
    return {
      isSubmitting: false,
    }
  },
  methods: {
    async doRemoveTeamMember() {
      this.isSubmitting = true
      try {
        await this.$apollo.mutate({
          variables: {
            action: 'removeTeamMember',
            status: 'Declined',
            inactiveReason: 'Removed',
            id: this.details?.id,
            role: undefined,
          },
          context: {
            headers: {
              'X-ActivePlace-Business-ID': this.details?.Business?.id,
            },
          },
          mutation: gql`
            mutation ($action: String!, $status: String, $inactiveReason: String, $id: String!) {
              editBusinessTeamMember(action: $action, status: $status, inactiveReason: $inactiveReason, id: $id) {
                success
              }
            }
          `,
        })
        await this.$root.$emit('team/member/retrieve', this.details?.Business?.id)
        this.$toast.success('User has been removed', { duration: 3000, position: 'top-center' })
        this.$parent.close()
      } catch (error) {
        this.doTrackSegmentError(error, 'Team')
      } finally {
        this.isSubmitting = false
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.xp-remove-team-member::v-deep {
  .card {
    .card-content {
      position: relative;

      h3 {
        font-size: 1.5714rem;
        color: $secondary;
        text-align: center;
        margin: 30px 0 20px;
      }

      .close {
        position: absolute;
        top: 10px;
        right: 10px;
        cursor: pointer;
      }

      .actions {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        padding-bottom: 10px;

        button {
          text-transform: uppercase;
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
