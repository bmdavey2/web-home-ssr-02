<template lang="pug">
.form-partner-with
  .label 
    span.mr-1 {{ label }}
    b-tooltip(label="Add business partners to your profile." type="is-light" position="is-left" square multilined)
      b-icon(icon="help-circle" custom-size="mdi-18px")
  b-taginput(
    :value="value",
    :data="searchResults",
    :placeholder="placeholder"
    @typing="doRetrievePartnerWith"
    ref="taginput"
    autocomplete
    @input="$emit('input', $event)")
    template(v-slot="props")
      .search-item
        .avatar: XAProfileAvatar(
          :image="props.option.profilePhotoURL",
          :label="$app.getNameInitials(props.option.name)"
          size="32px")
        .name {{ props.option.name }}
        //- XAMentorBadge(:badge="props.option.badge")
    template(#empty) No matches found
    template(#selected="props")
      b-tag(
        v-for="(tag, index) in props.tags",
        :key="index",
        :tabstop="false"
        @close="$refs.taginput.removeTag(index, $event)"
        rounded
        closable)
        .selected-item
          .avatar: XAProfileAvatar(:image="tag.profilePhotoURL", :label="$app.getNameInitials(tag.name)" size="32px")
          .name {{ tag.name }}
</template>

<script>
import debounce from 'lodash/debounce'
import XAProfileAvatar from '~/components/atoms/ProfileAvatar'
import XAMentorBadge from '~/components/atoms/MentorBadge'

export default {
  name: 'FormPartnerWith',
  components: { XAProfileAvatar, XAMentorBadge },
  props: {
    value: Array,
    label: String,
    placeholder: String,
  },
  data() {
    return {
      searchResults: [],
    }
  },
  methods: {
    doRetrievePartnerWith: debounce(async function (text) {
      if (!text) return
      try {
        const { MentorAndBusinessSuggestions } = await this.$api.getMentorAndBusinessSuggestions({ text })

        const filteredResult = MentorAndBusinessSuggestions.map(({ objectType, objectID, Member, Business }) => {
          const isMember = objectType === 'Member'
          const isBusiness = objectType === 'Business'

          if (isMember) {
            if (Member.slug) {
              Member.objectType = `Member:${objectID}`
              return Member
            }
          }

          if (isBusiness) {
            if (Business.slug) {
              Business.objectType = `Business:${objectID}`
              return Business
            }
          }
        })

        this.searchResults = filteredResult.filter((result) => {
          return result !== null
        })
      } catch (error) {
        this.doTrackSegmentError(error, 'Partner With Input')
      }
    }, 500),
  },
}
</script>

<style lang="scss" scoped>
.form-partner-with::v-deep {
  .label {
    font-weight: 400;
    margin-bottom: 3px;
    color: #65676b;
  }

  .taginput {
    width: 100%;

    .taginput-container {
      min-height: 40px;

      .search-item {
        display: flex;
        flex-wrap: wrap;
        align-items: center;

        .name {
          margin-left: 7px;
          margin-right: 10px;
        }

        .xa-mentor-badge {
          width: 20px;
          height: 20px;
        }
      }

      .tag {
        height: auto;
        padding-top: 5px;
        padding-bottom: 5px;

        .selected-item {
          display: flex;
          flex-wrap: wrap;
          align-items: center;

          .name {
            margin-left: 7px;
          }
        }
      }

      input {
        border: 0 !important;
      }

      &.is-focused {
        border-color: #dbdbdb !important;
        border-radius: 4px !important;
      }
    }
  }
}
</style>
