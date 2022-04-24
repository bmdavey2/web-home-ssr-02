<template lang="pug">
.xm-team-table
  b-table(:data="memberList", :mobile-cards="false")
    b-table-column(field="name" label="Name" v-slot="props")
      .profile
        XAProfileAvatar(
          :label="$app.getNameInitials(props.row.Member.name)",
          :image="props.row.Member.profilePhotoURL"
          size="50px")
        .details
          .name {{ props.row.Member.name }}
          .email {{ props.row.email }}
    b-table-column(field="email" label="Email" v-slot="props" header-class="column-email" cell-class="column-email") {{ props.row.email }}
    b-table-column(field="access" label="Access" v-slot="props" width="170px")
      .role
        template(v-if="isOwner[0].role === 'Owner'")
          span(v-if="props.row.Member.id === isOwner[0].Member.id") {{ props.row.role }}
          FormSelect(
            v-model="props.row.role",
            :options="roles"
            @input="doChangeRole(props.row.id, props.row.role, props.row.Business.id)",
            :disabled="isSubmitting"
            v-else)
        template(v-else): span {{ props.row.role }}
    b-table-column(field="status" label="Status" v-slot="props" width="120px" centered) {{ props.row.status }}
    b-table-column(field="remove" label="Remove" v-slot="props" width="120px" centered)
      template(v-if="isOwner[0].role === 'Owner' || isOwner[0].role === 'Admin'")
        .btn-remove(
          v-if="props.row.Member.id !== currentMember.id && props.row.status !== 'Declined' && props.row.role !== 'Owner'"
          @click.prevent="doShowRemoveMemberModal(props.row)"): b-icon(
          icon="close"
          size="is-small")
    template(#empty): div(style="text-align: center") No members found.
</template>

<script>
import gql from 'graphql-tag'
import FormSelect from '~/components/atoms/Form/Select'
import XAProfileAvatar from '~/components/atoms/ProfileAvatar'

export default {
  name: 'XMTeamTable',
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
            inactiveReason: undefined,
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
              editBusinessTeamMember(action: $action, id: $id, role: $role) {
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
.xm-team-table::v-deep {
  .b-table {
    table {
      border-spacing: 0 15px;

      thead {
        th {
          font-weight: 300;
          color: $secondary;
          border: 0;
          padding: 0 20px;
          font-size: 1.1429rem;
        }
      }

      tbody {
        tr {
          background-color: $white;
          box-shadow: 0 6px 20px rgba(153, 153, 153, 0.15);
          border-radius: 5px;

          td {
            vertical-align: middle;
            font-size: 1.1429rem;
            font-weight: 300;
            padding: 15px 20px;
            border-bottom: 0;
            color: #65676b;

            .profile {
              display: flex;
              flex-wrap: wrap;
              align-items: center;

              .details {
                margin-left: 10px;
                flex: 10000 1 0;

                .email {
                  display: none;
                  word-break: break-word;
                }
              }
            }
          }
        }
      }

      .role {
        width: 120px;
      }

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

  @media screen and (max-width: 1023px) {
    .b-table {
      table {
        tbody {
          tr {
            td {
              .profile {
                max-width: 250px;

                .details {
                  .name {
                    color: $secondary;
                  }

                  .email {
                    display: block;
                  }
                }
              }
            }
          }
        }

        .column-email {
          display: none;
        }
      }
    }
  }

  @media screen and (max-width: 767px) {
    display: none;
  }
}
</style>
