<template lang="pug">
.xm-member-profile-edit-about
  form(action="#" autocomplete="off" v-if="profile")
    //- .mb-5(v-if="profile.badge !== null"): FormPartnerWith(
      v-model="profile.Partners"
      label="I partner with"
      placeholder="tag the business profile")
    .mb-5: FormInput(v-model="profile.quotes" label="Quotes:" maxlength="95")
    .mb-5: FormTextarea(v-model="profile.biography" label="My Bio:" maxlength="1400" placeholder="Write something...")
    .mb-5: div ACTIVEPLACE 5
    .mb-5: FormMentionInputAp5(
      inputID="ap5InspiredBy",
      :value="profile.ap5InspiredBy"
      label="I'm inspired by:"
      placeholder="@tag people, business, brands, or input text"
      @input="setAp5InspiredBy")
    .mb-5: FormMentionInputAp5(
      inputID="ap5PassionateAbout",
      :value="profile.ap5PassionateAbout"
      label="I'm passionate about"
      placeholder="@tag people, business, brands, or input text"
      @input="setAp5PassionateAbout")
    .mb-5: FormMentionInputAp5(
      inputID="ap5FavoriteEvents",
      :value="profile.ap5FavoriteEvents"
      label="My favourite events and active things:"
      placeholder="@tag events, or input text"
      @input="setAp5FavoriteEvents")
    .mb-5: FormMentionInputAp5(
      inputID="ap5TrainingWith",
      :value="profile.ap5TrainingWith"
      label="I train with:"
      placeholder="@tag people, business, brands, or input text"
      @input="setAp5TrainingWith")
    .mb-5: FormTextarea(
      v-model="profile.ap5ToughestThing"
      label="The toughest thing I have overcome:"
      maxlength="1400"
      placeholder="Write something...")
    .actions: b-button(type="is-primary" size="is-medium" @click.prevent="doUpdateProfile()") Save
  b-loading(v-model="isLoading")
</template>

<script>
import gql from 'graphql-tag'
import FormInput from '~/components/atoms/Form/Input'
import FormTextarea from '~/components/atoms/Form/Textarea'
import FormMentionInput from '~/components/atoms/Form/MentionInput'
import FormMentionInputAp5 from '~/components/atoms/Form/MentionInputAp5'
import FormPartnerWith from '~/components/atoms/Form/PartnerWith'
/* eslint-disable unicorn/prefer-text-content */
export default {
  name: 'XMMemberProfileEditAbout',
  components: { FormInput, FormTextarea, FormMentionInput, FormMentionInputAp5, FormPartnerWith },
  data() {
    return {
      isLoading: false,
      ap5InspiredBy: '',
      ap5PassionateAbout: '',
      ap5FavoriteEvents: '',
      ap5TrainingWith: '',
      partnerWith: '',
    }
  },
  mounted() {
    this.ap5InspiredBy = this.profile?.ap5InspiredBy
    this.ap5PassionateAbout = this.profile?.ap5PassionateAbout
    this.ap5FavoriteEvents = this.profile?.ap5FavoriteEvents
    this.ap5TrainingWith = this.profile?.ap5TrainingWith
  },
  methods: {
    setAp5InspiredBy(value) {
      this.ap5InspiredBy = value
    },
    setAp5PassionateAbout(value) {
      this.ap5PassionateAbout = value
    },
    setAp5FavoriteEvents(value) {
      this.ap5FavoriteEvents = value
    },
    setAp5TrainingWith(value) {
      this.ap5TrainingWith = value
    },
    async doUpdateProfile() {
      const partners = this.profile?.Partners.map((partner) => {
        return partner?.objectType
      })

      this.isLoading = true
      const newAP = {
        ap5InspiredBy: this.ap5InspiredBy === ('<br>' || '&nbsp;') ? '' : this.ap5InspiredBy,
        ap5PassionateAbout: this.ap5PassionateAbout === ('<br>' || '&nbsp;') ? '' : this.ap5PassionateAbout,
        ap5FavoriteEvents: this.ap5FavoriteEvents === ('<br>' || '&nbsp;') ? '' : this.ap5FavoriteEvents,
        ap5TrainingWith: this.ap5TrainingWith === ('<br>' || '&nbsp;') ? '' : this.ap5TrainingWith,
        ap5ToughestThing: this.profile?.ap5ToughestThing === null ? '' : this.profile?.ap5ToughestThing,
        quotes: this.profile.quotes || '',
        biography: this.profile.biography || '',
        partners,
      }
      try {
        await this.$apollo.mutate({
          variables: {
            input: newAP,
          },
          context: this.getGraphQLContext(),
          mutation: gql`
            mutation ($input: InputProfile!) {
              editProfile(input: $input) {
                success
              }
            }
          `,
        })
      } catch (error) {
        this.doTrackSegmentError(error, 'Profile Edit')
      } finally {
        this.isLoading = false
        this.$toast?.success(`Data has been saved successfully`, { duration: 3 * 1000, position: 'bottom-right' })

        this.$store.commit('control/setLoading', {
          name: `app/loading`,
          value: true,
        })

        // location.href = `/p/${this.$route.params.profile}`
        this.$router.push({
          path: `/p/${this.$route.params.profile}`,
        })
      }
    },
  },
  apollo: {
    profile: {
      fetchPolicy: 'no-cache',
      query: gql`
        query {
          Me {
            Profile {
              Member {
                quotes
                biography
                ap5InspiredBy
                ap5PassionateAbout
                ap5FavoriteEvents
                ap5TrainingWith
                ap5ToughestThing
                Partners {
                  objectID
                  Business {
                    name
                    slug
                    profilePhotoURL
                  }
                  Member {
                    name
                    slug
                    profilePhotoURL
                  }
                }
              }
            }
          }
        }
      `,
      update(data) {
        if (!data.Me?.Profile) return {}
        const object = data.Me.Profile?.Member

        const Partners = object?.Partners.map(({ objectID, Member, Business }) => {
          if (Member !== null) {
            Member.objectType = `Member:${objectID}`
            return Member
          }
          if (Business !== null) {
            Business.objectType = `Business:${objectID}`
            return Business
          }
        })

        return {
          quotes: object?.quotes,
          biography: object?.biography,
          ap5InspiredBy: object?.ap5InspiredBy,
          ap5PassionateAbout: object?.ap5PassionateAbout,
          ap5FavoriteEvents: object?.ap5FavoriteEvents,
          ap5TrainingWith: object?.ap5TrainingWith,
          ap5ToughestThing: object?.ap5ToughestThing,
          Partners,
        }
      },
    },
  },
}
</script>

<style lang="scss" scoped>
.xm-member-profile-edit-about::v-deep {
  form {
    .actions {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-end;
    }
  }
}
</style>
