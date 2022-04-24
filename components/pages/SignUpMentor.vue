<template lang="pug">
.xp-sign-up-mentor.fill.flex-center
  .contents.inner.py-6
    XMSignUpHeader.flex-auto.mb-5 Let’s get your Mentor application completed.

    .content-body.px-2
      b-input.mb-2(v-model="form.introduction" name="introduction" type="textarea" placeholder="Introduce yourself *")
      b-input.mb-2(v-model="form.qualifications" name="qualifications" placeholder="Current Qualifications *")
      b-input.mb-2(
        v-model="form.experience"
        name="experience"
        type="textarea"
        placeholder="Experience or Practical Knowledge *")
      b-input.mb-2(v-model="form.results" name="results" type="textarea" placeholder="Awards and/or Race Results *")
      b-input.mb-2(v-model="form.expertise" name="expertise" placeholder="Categories of expertise and focus *")
      div(style="font-size: 12px") (i.e. running, nutrition, etc.)
      b-input.mb-2(v-model="form.socialHandles" name="socialHandles" placeholder="Social Handles *")
      b-input.mb-2(v-model="form.brands" name="brands" placeholder="Brands currently working with *")
      b-input.mb-2(v-model="form.links" name="links" placeholder="Website and/or Podcast Links *")
      .agreed: b-checkbox.my-2(v-model="agreed") In applying, you agree to The Mentor Program's T&C.

    .flex-auto.flex-center.mt-5
      b-button.mr-2(type="is-primary" @click="onClickBack" outlined, :disabled="submitting") BACK
      b-button(type="is-primary" @click="onClickNext", :loading="submitting", :disabled="disabled") SUBMIT
</template>

<script>
import gql from 'graphql-tag'
import XMSignUpHeader from '~/components/molecules/SignUpHeader'
export default {
  name: 'XPSignUpMentor',
  components: { XMSignUpHeader },
  props: {
    value: Object,
  },
  data() {
    return {
      submitting: false,
      agreed: false,
      form: {
        introduction: '',
        qualifications: '',
        experience: '',
        results: '',
        expertise: '',
        socialHandles: '',
        brands: '',
        links: '',
      },
    }
  },
  computed: {
    disabled() {
      return (
        !this.form.introduction ||
        !this.form.qualifications ||
        !this.form.experience ||
        !this.form.results ||
        !this.form.socialHandles ||
        !this.form.links ||
        !this.agreed
      )
    },
  },
  methods: {
    onClickBack() {
      this.$router.back()
    },
    async onClickNext() {
      try {
        this.submitting = true
        await this.$apollo.mutate({
          variables: {
            input: this.form,
          },
          context: this.getGraphQLContext(),
          mutation: gql`
            mutation ($input: InputMentorApplication!) {
              createMentorApplication(input: $input) {
                success
              }
            }
          `,
        })
        await this.$appClient.segment.trackUserSignUp(this.$store.state.auth.uid)
        location.href = '/'
      } catch (error) {
        this.doTrackSegmentError(error, 'Mentor Profile Signup')
      } finally {
        this.submitting = false
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.xp-sign-up-mentor::v-deep {
  .contents {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 400px;
    max-height: 100%;
    height: 100%;

    .content-body {
      flex: 1 0 0;
      overflow-y: auto;

      .agreed {
        background-color: rgba($white, 0.8);
        font-weight: 300;
      }
    }
  }

  @media screen and (max-width: 767px) {
    .contents {
      padding: 0 15px;
    }
  }
}
</style>
