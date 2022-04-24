<template lang="pug">
.xm-team-card-table
  template(v-if="members.length")
    .card(v-for="(member, index) in memberList")
      .card-content
        .header
          .left-header
            XAProfileAvatar(
              :label="$app.getNameInitials(member.Member.name)",
              :image="member.Member.profilePhotoURL"
              size="50px")
          .right-header
            template(v-if="isOwner[0].role === 'Owner'")
              span(v-if="member.Member.id === isOwner[0].Member.id") {{ member.role }}
              FormSelect(
                v-model="member.role",
                :options="roles"
                @input="doChangeRole(member.id, member.role, member.Business.id)",
                :disabled="isSubmitting"
                v-else)
            template(v-else): span {{ member.role }}
        .details
          .name {{ member.Member.name }}
          .email {{ member.email }}
        ._footer
          .left-footer
            .status {{ member.status }}
          .right-footer
            template(v-if="isOwner[0].role === 'Owner' || isOwner[0].role === 'Admin'")
              .btn-remove(
                v-if="member.Member.id !== currentMember.id && member.status !== 'Declined' && member.role !== 'Owner'"
                @click.prevent="doShowRemoveMemberModal(member)"): b-icon(
                icon="close"
                size="is-small")
  template(v-else): div(style="text-align: center; font-size: 16px") No members found.
</template>

<script>
import gql from 'graphql-tag'
import FormSelect from '~/components/atoms/Form/Select'
import XAProfileAvatar from '~/components/atoms/ProfileAvatar'

export default {
  name: 'XMTeamCardTable',
  components: { FormSelect, XAProfileAvatar },
  props: {
    members: Array,
    currentMember: Object,
  },
  data() {
    return {
      roles: ['Owner', 'Admin', 'User'],
      isSubmitting: false,
    }
  },
  computed: {
    memberList() {
      const memberList = this.members.map((member) => {
        return {
          Business: {
            id: member.Business?.id || null,
          },
          Member: {
            email: member?.Member?.email || null,
            id: member?.Member?.id || null,
            name: member?.Member?.name || 'Unregistered Member',
            profilePhotoURL: member?.Member?.profilePhotoURL || null,
          },
          email: member?.email || null,
          id: member?.id || null,
          inactiveReason: member?.inactiveReason || null,
          invitedBy: member?.invitedBy || null,
          role: member?.role || null,
          status: member?.status || null,
        }
      })
      return memberList
    },
    isOwner() {
      const isOwner = this.members.filter((member) => {
        return member?.Member?.id === this.currentMember?.id
      })
      return isOwner
    },
  },
  methods: {
    doShowRemoveMemberModal(details) {
      this.$buefy.modal.open({
        component: require('~/components/molecules/Team/RemoveTeamMember').default,
        parent: this,
        width: 425,
        canCancel: false,
        props: {
          details,
        },
      })
    },
    async doChangeRole(id, role, businessID) {
      this.isSubmitting = true
      try {
        await this.$apollo.mutate({
          variables: {
            action: 'changeRole',
            id,
            role,
          },
          context: {
            headers: {
              'X-ActivePlace-Business-ID': businessID,
            },
          },
          mutation: gql`
            mutation ($action: String!, $id: String!, $role: String) {
              editTeamManagement(action: $action, id: $id, role: $role) {
                success
              }
            }
          `,
        })
        this.$toast.success('Member details has been updated.', { duration: 3000, position: 'top-center' })
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
.xm-team-card-table::v-deep {
  display: none;

  .card {
    margin-bottom: 15px;

    .card-content {
      color: #65676b;
      font-weight: 300;

      .header {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        margin-bottom: 10px;

        .right-header {
          width: 120px;
          text-align: right;
        }
      }

      .details {
        .name {
          color: $secondary;
        }
      }

      ._footer {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: flex-end;

        .left-footer {
          .status {
            position: relative;
            margin-top: 10px;
            padding-top: 10px;

            &::before {
              content: '';
              width: 25px;
              height: 1px;
              background-color: $secondary;
              position: absolute;
              top: 0;
              left: 0;
            }
          }
        }

        .right-footer {
          .btn-remove {
            background-color: $white;
            box-shadow: 0 4px 10px rgba(10, 39, 46, 0.15);
            width: 24px;
            height: 24px;
            border-radius: 50%;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            margin: 0 auto;
          }
        }
      }
    }
  }

  @media screen and (max-width: 767px) {
    display: block;
  }
}
</style>
