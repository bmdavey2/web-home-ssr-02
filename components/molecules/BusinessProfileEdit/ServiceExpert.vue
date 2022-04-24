<template lang="pug">
.xm-business-profile-edit-service-expert
  treeselect(
    v-model="value",
    :options="options",
    :searchable="false"
    label="What type of services do you provide?"
    placeholder="What type of services do you provide?*"
    value-consists-of="LEAF_PRIORITY"
    ref="treeselect"
    multiple
    disable-branch-nodes
    flat
    @input="doInputService()")
  .input-error(:class="errorClass" v-if="error") {{ error }}
</template>

<script>
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'

export default {
  name: 'XMBusinessProfileEditServiceExpert',
  components: { Treeselect },
  props: {
    value: Array,
    error: { type: String, default: '' },
    errorClass: { type: String, default: 'has-text-danger' },
  },
  data() {
    return {
      service: null,
      activeBranch: '',
      options: [
        {
          id: 'Trainer',
          label: 'Trainer',
          children: [
            { id: 'Personal Trainer', label: 'Personal Trainer' },
            { id: 'Gym', label: 'Gym' },
            { id: 'Training Centre', label: 'Training Centre' },
          ],
        },
        {
          id: 'Coach',
          label: 'Coach',
          children: [
            { id: 'Triathlon Coach', label: 'Triathlon Coach' },
            { id: 'Swimming Coach', label: 'Swimming Coach' },
            { id: 'Running Coach', label: 'Running Coach' },
            { id: 'Cycling Coach', label: 'Cycling Coach' },
            { id: 'Obstacle Race Coach', label: 'Obstacle Race Coach' },
            { id: 'Mountain Bike Coach', label: 'Mountain Bike Coach' },
            { id: 'Qualified Life Coach', label: 'Qualified Life Coach' },
            { id: 'Conditioning Coach', label: 'Conditioning Coach' },
          ],
        },
        {
          id: 'Instructor',
          label: 'Instructor',
          children: [
            { id: 'Yoga Instructor', label: 'Yoga Instructor' },
            { id: 'Pilates Instructor', label: 'Pilates Instructor' },
          ],
        },
        {
          id: 'Qualified Practitioner',
          label: 'Qualified Practitioner',
          children: [
            { id: 'Physiotheraphy', label: 'Physiotheraphy' },
            { id: 'Podiatrist', label: 'Podiatrist' },
            { id: 'Chiropractor', label: 'Chiropractor' },
            { id: 'Massage Therapist', label: 'Massage Therapist' },
            { id: 'Nutritionist', label: 'Nutritionist' },
            { id: 'Sports Medicine', label: 'Sports Medicine' },
            { id: 'Psychology', label: 'Psychology' },
            { id: 'Exercise Physiology', label: 'Exercise Physiology' },
            { id: 'Dietician', label: 'Dietician' },
            { id: 'Occupational Therapist', label: 'Occupational Therapist' },
          ],
        },
      ],
    }
  },
  watch: {
    value() {
      switch (this.activeBranch) {
        case 'Trainer':
          this.options = [
            {
              id: 'Trainer',
              label: 'Trainer',
              children: [
                { id: 'Personal Trainer', label: 'Personal Trainer' },
                { id: 'Gym', label: 'Gym' },
                { id: 'Training Centre', label: 'Training Centre' },
              ],
            },
          ]
          break

        case 'Coach':
          this.options = [
            {
              id: 'Coach',
              label: 'Coach',
              children: [
                { id: 'Triathlon Coach', label: 'Triathlon Coach' },
                { id: 'Swimming Coach', label: 'Swimming Coach' },
                { id: 'Running Coach', label: 'Running Coach' },
                { id: 'Cycling Coach', label: 'Cycling Coach' },
                { id: 'Obstacle Race Coach', label: 'Obstacle Race Coach' },
                { id: 'Mountain Bike Coach', label: 'Mountain Bike Coach' },
                { id: 'Qualified Life Coach', label: 'Qualified Life Coach' },
                { id: 'Conditioning Coach', label: 'Conditioning Coach' },
              ],
            },
          ]
          break

        case 'Instructor':
          this.options = [
            {
              id: 'Instructor',
              label: 'Instructor',
              children: [
                { id: 'Yoga Instructor', label: 'Yoga Instructor' },
                { id: 'Pilates Instructor', label: 'Pilates Instructor' },
              ],
            },
          ]
          break

        case 'Qualified Practitioner':
          this.options = [
            {
              id: 'Qualified Practitioner',
              label: 'Qualified Practitioner',
              children: [
                { id: 'Physiotheraphy', label: 'Physiotheraphy' },
                { id: 'Podiatrist', label: 'Podiatrist' },
                { id: 'Chiropractor', label: 'Chiropractor' },
                { id: 'Massage Therapist', label: 'Massage Therapist' },
                { id: 'Nutritionist', label: 'Nutritionist' },
                { id: 'Sports Medicine', label: 'Sports Medicine' },
                { id: 'Psychology', label: 'Psychology' },
                { id: 'Exercise Physiology', label: 'Exercise Physiology' },
                { id: 'Dietician', label: 'Dietician' },
                { id: 'Occupational Therapist', label: 'Occupational Therapist' },
              ],
            },
          ]
          break

        default:
          this.options = [
            {
              id: 'Trainer',
              label: 'Trainer',
              children: [
                { id: 'Personal Trainer', label: 'Personal Trainer' },
                { id: 'Gym', label: 'Gym' },
                { id: 'Training Centre', label: 'Training Centre' },
              ],
            },
            {
              id: 'Coach',
              label: 'Coach',
              children: [
                { id: 'Triathlon Coach', label: 'Triathlon Coach' },
                { id: 'Swimming Coach', label: 'Swimming Coach' },
                { id: 'Running Coach', label: 'Running Coach' },
                { id: 'Cycling Coach', label: 'Cycling Coach' },
                { id: 'Obstacle Race Coach', label: 'Obstacle Race Coach' },
                { id: 'Mountain Bike Coach', label: 'Mountain Bike Coach' },
                { id: 'Qualified Life Coach', label: 'Qualified Life Coach' },
                { id: 'Conditioning Coach', label: 'Conditioning Coach' },
              ],
            },
            {
              id: 'Instructor',
              label: 'Instructor',
              children: [
                { id: 'Yoga Instructor', label: 'Yoga Instructor' },
                { id: 'Pilates Instructor', label: 'Pilates Instructor' },
              ],
            },
            {
              id: 'Qualified Practitioner',
              label: 'Qualified Practitioner',
              children: [
                { id: 'Physiotheraphy', label: 'Physiotheraphy' },
                { id: 'Podiatrist', label: 'Podiatrist' },
                { id: 'Chiropractor', label: 'Chiropractor' },
                { id: 'Massage Therapist', label: 'Massage Therapist' },
                { id: 'Nutritionist', label: 'Nutritionist' },
                { id: 'Sports Medicine', label: 'Sports Medicine' },
                { id: 'Psychology', label: 'Psychology' },
                { id: 'Exercise Physiology', label: 'Exercise Physiology' },
                { id: 'Dietician', label: 'Dietician' },
                { id: 'Occupational Therapist', label: 'Occupational Therapist' },
              ],
            },
          ]
          break
      }
    },
  },
  methods: {
    doInputService() {
      const { treeselect } = this.$refs
      if (this.value.length > 0) {
        this.value
          .slice(0, 1)
          .reverse()
          .filter((id) => {
            const node = treeselect.getNode(id)
            this.activeBranch = node?.ancestors[0]?.id
          })
      } else {
        this.activeBranch = ''
      }
      this.$emit('input', this.value)
    },
  },
}
</script>

<style lang="scss" scoped>
.xm-business-profile-edit-service-expert::v-deep {
  .input-error {
    font-size: 0.8571rem;
    font-weight: 300;
  }

  .vue-treeselect {
    .vue-treeselect__control {
      min-height: 39px;
      padding: 6px 7px 6px 9.5px;
      background: rgba($white, 0.8);
      border: 1px solid #dbdbdb;
      border-radius: 4px;
      box-shadow: none !important;

      .vue-treeselect__value-container {
        .vue-treeselect__multi-value {
          .vue-treeselect__placeholder {
            padding: 0;
            line-height: unset;
            color: #65676b;
            top: unset;
          }
        }
      }

      .vue-treeselect__x-container {
        width: 12px;
        padding-right: 17px;

        svg {
          fill: rgba(60, 60, 60, 0.5);
          width: 10px;
          height: 10px;
        }
      }

      .vue-treeselect__control-arrow-container {
        width: 12px;

        svg {
          fill: rgba(60, 60, 60, 0.5);
          width: 12px;
          height: 12px;
        }
      }
    }

    .vue-treeselect__menu-container {
      .vue-treeselect__checkbox-container {
        .vue-treeselect__checkbox--checked {
          background-color: $primary;
          border-color: $primary;
        }
      }
    }

    &.vue-treeselect--has-value {
      .vue-treeselect__control {
        padding-bottom: 3px;

        .vue-treeselect__value-container {
          .vue-treeselect__multi-value {
            margin-bottom: 0;

            .vue-treeselect__multi-value-item-container {
              padding-top: 0;
              padding-right: 5px;
              padding-bottom: 3px;

              .vue-treeselect__multi-value-item {
                background: #eef1f1;
                color: $secondary;
                font-weight: 300;
                font-size: 1rem;

                .vue-treeselect__value-remove {
                  color: $secondary;
                  border: 0;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
