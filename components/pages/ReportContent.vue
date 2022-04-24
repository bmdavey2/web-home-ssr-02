<template lang="pug">
.xp-report-content(:class="fullScreen && 'full-height'")
  .card
    .header.p-3
      ._title Report this content
      .close(v-if="fullScreen" @click.prevent="$parent.close()"): b-icon(icon="close")
    .card-content
      .is-uppercase.mb-4 You can report an article after selecting a problem
      .problem-list
        .problem(
          v-for="(problem, index) in problems",
          :key="index"
          @click.prevent="doSelectProblems(problem)",
          :class="selectedProblems.includes(problem) && 'active'") {{ problem }}
      .own-variant
        FormInput(v-model="ownVariant" placeholder="Type your own variant...")
      .next-steps
        b-field
          b-checkbox(v-model="block")
            ._content
              ._label Block {{ name }}
              .sub-label You won't be able to see or contact each other
        b-field
          b-checkbox(v-model="unfollow")
            ._content
              ._label Unfollow {{ name }}
              .sub-label Stop seeing posts
      .actions
        .report.btn-action: b-button(
          label="Report"
          type="is-primary"
          @click.prevent="doReportContent()",
          :loading="isSubmitting")
        .cancel.btn-action: b-button(
          label="Cancel"
          type="is-primary"
          outlined
          @click.prevent="$parent.close()",
          :disabled="isSubmitting")
</template>

<script>
import gql from 'graphql-tag'
import FormInput from '~/components/atoms/Form/Input'

export default {
  name: 'XPReportContent',
  components: { FormInput },
  props: {
    details: Object,
    fullScreen: Boolean,
  },
  data() {
    return {
      problems: [
        'Nudity',
        'Violence',
        'Harassment',
        'Suicide or self-injury',
        'False news',
        'Spam',
        'Unauthorized sales',
        'Hate speech',
        'Terrorism',
        'Training',
      ],
      selectedProblems: [],
      ownVariant: '',
      block: false,
      unfollow: false,
      isSubmitting: false,
      report: '',
    }
  },
  computed: {
    name() {
      return this.details?.name || 'ActivePlace Member'
    },
  },
  methods: {
    doSelectProblems(problem) {
      if (this.selectedProblems.includes(problem)) {
        this.selectedProblems = this.selectedProblems.filter(function (e) {
          return e !== problem
        })
        return
      }
      this.selectedProblems.push(problem)
    },
    async doReportContent() {
      this.isSubmitting = true
      try {
        await this.doConcatProblemsOwnVariant()
        if (!this.report.length) {
          this.$toast?.error('Please select or add a problem to report', { duration: 5000, position: 'top-center' })
        } else {
          const input = {
            GetStreamActivityID: this.details?.GetStreamActivityID,
            blockActor: this.block,
            objectID: this.details?.objectID,
            objectType: this.details?.objectType,
            reason: this.report.toString(),
            unfollowActor: this.unfollow,
          }
          await this.$apollo.mutate({
            variables: {
              input,
            },
            context: this.getGraphQLContext(),
            mutation: gql`
              mutation ($input: InputContentReport!) {
                createContentReport(input: $input) {
                  success
                }
              }
            `,
          })
          this.$parent.close()
          this.$toast?.success('Content has been reported.', { duration: 5000, positon: 'top-center' })
          this.$root.$emit('reload')
        }
      } catch (error) {
        this.doTrackSegmentError(error)
      } finally {
        this.isSubmitting = false
      }
    },
    doConcatProblemsOwnVariant() {
      if (this.ownVariant) {
        this.report = [].concat(this.selectedProblems).concat([this.ownVariant])
        return
      }

      this.report = this.selectedProblems
    },
  },
}
</script>

<style lang="scss" scoped>
/* stylelint-disable no-descending-specificity */
.xp-report-content::v-deep {
  &.full-height {
    height: 100%;

    .card {
      height: 100%;
    }
  }

  .card {
    .header {
      border: 1px solid #e5e5e5;
      position: relative;

      ._title {
        font-weight: 500;
        text-transform: uppercase;
        text-align: center;
      }

      .close {
        position: absolute;
        top: 0;
        bottom: 0;
        right: 10px;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
      }
    }

    .card-content {
      padding: 35px 45px;

      .problem-list {
        display: flex;
        flex-wrap: wrap;
        align-items: center;

        .problem {
          background-color: #eef1f1;
          cursor: pointer;
          border-radius: 100px;
          font-weight: 300;
          transition: 0.3s;
          text-align: center;
          padding: 7px 10px;
          margin-right: 10px;
          margin-bottom: 10px;

          &.active {
            background-color: $secondary;
            color: $white;
          }
        }
      }

      .next-steps {
        border-top: 1px solid #e5e5e5;
        margin-top: 30px;
        padding-top: 30px;

        ._content {
          ._label {
            color: $secondary;
          }

          .sub-label {
            font-size: 0.8571rem;
            font-weight: 300;
          }
        }
      }

      .actions {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: flex-end;
        margin-top: 30px;

        .btn-action {
          &:not(:last-child) {
            margin-right: 10px;
          }
        }
      }
    }
  }

  @media screen and (max-width: 767px) {
    .card {
      .card-content {
        padding: 20px;
      }
    }
  }
}
</style>
