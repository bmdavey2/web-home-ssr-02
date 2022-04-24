<template lang="pug">
.business-review.card(:class="lt('mobile') && 'is-mobile-below'")
  ._header.p-3
    ._title.has-text-weight-medium Add REVIEW
    .close.is-flex.is-flex-wrap-wrap.is-align-items-center(@click.prevent="$parent.close()" v-if="lt('tabletLG')"): b-icon(
      icon="close")
  .card-content
    .has-text-centered.pb-5
      .has-text-secondary How was your experience with {{ businessName }}?
      b-rate.business-rate.pt-3(v-model="rate" size="is-medium")

    .is-flex.is-flex-wrap-wrap.is-align-items-center.mb-3
      XOMyProfileAvatar.mr-3
      XOMyProfileName
    form(action="#" autocomplete="off")
      .post-input(v-click-outside="doShowPlaceholder")
        .mb-3
          FormMentionTextarea(@input="onInput", :placeholder="`Write your review here`" maxLength="1400" isPost)

      //- .file-inputs.is-flex.is-flex-wrap-wrap.is-align-items-center.mb-5
      //-   .image-preview
      //-     .add-image.is-flex.is-flex-wrap-wrap.is-align-items-center.is-justify-content-center.has-text-secondary.mr-3(
      //-       @click="$refs.addImage.click()"
      //-     )
      //-       input.file-browser(type="file" accept="image/*" multiple ref="addImage" @change="doAddImage()")
      //-       ._icon.is-flex.is-flex-wrap-wrap.mr-3: b-icon(icon="image-outline")
      //-       ._label.is-uppercase Add Image

      .submit-button
        b-button.is-uppercase(type="is-primary" @click.prevent="doPostReview()", :loading="isSubmitting") Add Review

      .input-errors.has-text-danger.mt-5
        .input-error {{ validation.firstError('rate') }}
        .input-error {{ validation.firstError('reviewContent') }}
      b-loading(v-model="isLoading")
</template>

<script>
import gql from 'graphql-tag'
import { Validator } from 'simple-vue-validator'
import XOMyProfileAvatar from '~/components/organisms/MyProfileAvatar'
import FormMentionTextarea from '~/components/atoms/Form/MentionTextarea'
import XOMyProfileName from '~/components/organisms/MyProfileName'

export default {
  name: 'XMProfileReviewBusiness',
  components: { XOMyProfileName, FormMentionTextarea, XOMyProfileAvatar },
  props: {
    businessName: String,
    businessID: String,
  },
  data() {
    return {
      reviewContent: '',
      showPlaceholder: true,
      selectedCategories: [],
      isLoading: false,
      rate: null,
      isSubmitting: false,
    }
  },
  validators: {
    rate(value) {
      return Validator.value(value).required('Rate field is required.')
    },
    reviewContent(value) {
      return Validator.value(value).required('Write your review field is required.')
    },
  },
  methods: {
    onInput(e) {
      this.reviewContent = e.innerHTML
    },
    onEmojiValueInput(e) {
      this.post = e.data
    },
    doShowPlaceholder() {
      if (this.post) return
      this.showPlaceholder = true
    },
    doAddImage() {
      this.isLoading = true

      // for demo purposes
      setTimeout(() => {
        this.isLoading = false
      }, 3000)
    },
    async doPostReview() {
      this.isSubmitting = true

      await this.$validate().then(async (success) => {
        if (success) {
          try {
            await this.$apollo.mutate({
              variables: {
                input: {
                  BusinessID: this.businessID,
                  content: this.reviewContent,
                  rating: this.rate,
                },
              },
              mutation: gql`
                mutation ($input: InputBusinessReview!) {
                  createBusinessReview(input: $input) {
                    success
                  }
                }
              `,
            })
          } catch (error) {
            this.doTrackSegmentError(error)
          } finally {
            this.isSubmitting = false
            this.$emit('loadReviews', this.rate)
            this.$parent.close()
            this.$toast.success('Your review has been submitted.', { duration: 5000, position: 'top-center' })
          }
        } else {
          this.isSubmitting = false
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.is-mobile-below {
  .card-content {
    padding: 15px;
  }
}
.business-review::v-deep {
  overflow: visible !important;

  .xa-profile-avatar {
    width: 35px !important;
    height: 35px !important;
  }

  ._header {
    position: relative;
    text-align: center;
    text-transform: uppercase;
    border-bottom: 1px solid #e5e5e5;

    .close {
      position: absolute;
      top: 0;
      bottom: 0;
      right: 10px;
      z-index: 1;
      cursor: pointer;
    }
  }

  .card-content {
    overflow-y: hidden !important;
    padding: 35px 45px;

    .post-input {
      position: relative;

      .placeholder {
        color: #9aa2ab;
        position: absolute;
        top: 2px;
        left: 0;
        font-weight: 300;
      }

      .form-textarea-emoji {
        .emoji-container {
          .emoji-mart {
            top: inherit;
            bottom: 0;
            height: 300px;
          }
        }
      }
    }

    .business-rate {
      width: max-content;
      margin: 0 auto;
    }

    .submit-button {
      margin-top: 50px;
      text-align: right;
    }

    .file-inputs {
      .add-image {
        cursor: pointer;
        position: relative;
        border: 1px solid $secondary;
        width: 125px;
        height: 40px;
        border-radius: 30px;

        ._icon {
          width: 16px;
        }

        .file-browser {
          display: none;
        }
      }
    }

    .input-errors {
      font-size: 0.8571rem;
    }
  }
}
</style>
