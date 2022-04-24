<template lang="pug">
.xm-business-profile-edit-about
  form(action="#" autocomplete="off")
    .mb-5(v-if="$store.getters['business/getBusinessSubscription'].plan !== null"): FormPartnerWith(
      v-model="profile.Partners"
      label="We partner with"
      placeholder="tag the business profile")
    .mb-5: FormTextarea(
      v-model="profile.statement"
      label="Mission Statement:"
      placeholder="Write something..."
      maxlength="175")
    .mb-5: FormTextarea(v-model="profile.description" label="Overview" placeholder="Write something..." maxlength="1400")
    .mb-5: div ACTIVEPLACE 5
    .mb-5: FormInput(
      v-model="profile.ap5BestKnownFor"
      label="We are best known for:"
      placeholder="Write something..."
      maxlength="1400")
    .mb-5: FormMentionInputAp5(
      inputID="ap5InspiredBy",
      :value="profile.ap5InspiredBy"
      label="We are inspired by:"
      placeholder="@tag people, business, brands or input text"
      @input="setAp5ap5InspiredBy")
    .mb-5: FormMentionInputAp5(
      inputID="ap5PassionateAbout",
      :value="profile.ap5PassionateAbout"
      label="We are passionate about"
      placeholder="@tag people, business, brands or input text"
      @input="setAp5ap5PassionateAbout")
    .mb-5: FormMentionInputAp5(
      inputID="ap5FavoriteEvents",
      :value="profile.ap5FavoriteEvents"
      label="Our favourite events and active things:"
      placeholder="@tag events or input text"
      @input="setAp5ap5FavoriteEvents")
    .mb-5: FormTextarea(
      v-model="profile.ap5ProudestThing"
      label="Our proudest achievement is:"
      placeholder="Write something..."
      maxlength="1400")
    .actions: b-button(type="is-primary" size="is-medium" @click.prevent="doUpdateProfile()") Save
  b-loading(v-model="isLoading")
</template>

<script>
import gql from 'graphql-tag'
import FormInput from '~/components/atoms/Form/Input'
import FormTextarea from '~/components/atoms/Form/Textarea'
import FormMentionInputAp5 from '~/components/atoms/Form/MentionInputAp5'
import FormPartnerWith from '~/components/atoms/Form/PartnerWith'

/* eslint-disable unicorn/prefer-text-content */
export default {
  name: 'XMBusinessProfileEditAbout',
  components: { FormMentionInputAp5, FormInput, FormTextarea, FormPartnerWith },
  data() {
    return {
      profile: [],
      slug: this.$route.params.profile,
      isLoading: false,
    }
  },
  mounted() {
    this.loadBusinessAbout()
  },
  methods: {
    setAp5ap5InspiredBy(value) {
      this.ap5InspiredBy = value
    },
    setAp5ap5PassionateAbout(value) {
      this.ap5PassionateAbout = value
    },
    setAp5ap5FavoriteEvents(value) {
      this.ap5FavoriteEvents = value
    },
    async doUpdateProfile() {
      const partners = this.profile?.Partners.map((partner) => {
        return partner?.objectType
      })

      this.isLoading = true
      const profile = this.profile
      const input = {
        ap5FavoriteEvents: this.ap5FavoriteEvents === ('<br>' || '&nbsp;') ? '' : this.ap5FavoriteEvents,
        ap5InspiredBy: this.ap5InspiredBy === ('<br>' || '&nbsp;') ? '' : this.ap5InspiredBy,
        ap5PassionateAbout: this.ap5PassionateAbout === ('<br>' || '&nbsp;') ? '' : this.ap5PassionateAbout,
        ap5BestKnownFor: profile.ap5BestKnownFor || '',
        ap5ProudestThing: profile.ap5ProudestThing || '',
        statement: profile.statement || '',
        description: profile.description || '',
        partners,
      }
      try {
        await this.$apollo.mutate({
          variables: {
            id: profile.id,
            input,
          },
          mutation: gql`
            mutation ($id: String!, $input: InputBusiness!) {
              editBusiness(id: $id, input: $input) {
                success
              }
            }
          `,
        })
      } catch (error) {
        this.doTrackSegmentError(error, 'Edit Business')
      } finally {
        this.isLoading = false
        this.$toast?.success(`Data has been saved successfully`, { duration: 3 * 1000, position: 'bottom-right' })

        this.$store.commit('control/setLoading', {
          name: `app/loading`,
          value: true,
        })

        // location.href = `/b/${this.$route.params.profile}`
        this.$router.push({
          path: `/b/${this.$route.params.profile}`,
        })
      }
    },
    async loadBusinessAbout() {
      try {
        const { data } = await this.$apollo.query({
          variables: { slug: this.slug },
          fetchPolicy: 'no-cache',
          query: gql`
            query ($slug: String) {
              Business(slug: $slug) {
                id
                statement
                description
                plan
                ap5FavoriteEvents
                ap5InspiredBy
                ap5PassionateAbout
                ap5BestKnownFor
                ap5ProudestThing
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
          `,
        })
        const object = data?.Business

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

        this.profile = {
          id: object?.id,
          statement: object?.statement,
          description: object?.description,
          ap5FavoriteEvents: object?.ap5FavoriteEvents,
          ap5InspiredBy: object?.ap5InspiredBy,
          ap5PassionateAbout: object?.ap5PassionateAbout,
          ap5BestKnownFor: object?.ap5BestKnownFor,
          ap5ProudestThing: object?.ap5ProudestThing,
          Partners,
        }
      } catch (error) {
        this.doTrackSegmentError(error, 'Edit Business')
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.xm-business-profile-edit-about::v-deep {
  form {
    .actions {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-end;
    }
  }
}
</style>
