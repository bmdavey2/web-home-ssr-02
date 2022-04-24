<template lang="pug">
.xo-signup-user-step-2.signup-process(ref="Step2Container")
  .container
    .contents.row.items-center
      .left-content: img(src="~assets/images/SignUp/step2.webp")
      .right-content
        .header.row.items-center
          .logo: img(src="~assets/icons/logo@3x.svg")
          ._label Add some details to make it yours.
        form(@submit.prevent autocomplete="off")
          .user-avatar.mb-6.row.items-center
            template(v-if="socialMediaAvatar")
              b-upload.img(accept="image/*" @input="addImage" v-model="avatar")
                img(:src="socialMediaAvatar")
                .profile-image-change.is-clickable(@click.prevent="(socialMediaAvatar = null), (avatar = null)")
                  img(src="~/assets/icons/close.svg" width="30" height="30")
            template(v-else)
              b-upload.row.items-center.justify-center(accept="image/*" @input="addImage" v-model="avatar"): b-icon(
                icon="camera"
                size="is-medium"
                type="is-primary")
            .name.col {{ name }}
          template(v-if="showName")
            .mb-5: FormInput(v-model="firstName" placeholder="First name" is-large)
            .mb-6: FormInput(v-model="lastName" placeholder="Surname" is-large)

            .actions: b-button.btn-action(
              type="is-primary"
              @click.prevent="showName = false",
              :disabled="isDisabledName") NEXT
          template(v-else)
            .mb-5: XAFormPlaceAutoComplete(
              :value="initialAddress"
              placeholder="Enter suburb or zip code"
              @updateText="setValue"
              @getAddress="setData"
              is-large)
            .mb-6
              .btn-action.btn-auto-detect.row.items-center.justify-center(@click.prevent="locateMe")
                ._icon: b-icon(icon="map-marker-radius-outline")
                ._label Allow auto detect

            p.is-danger {{ errorData }}

            .actions: b-button.btn-action(
              type="is-primary"
              @click.prevent="doSetLocation()",
              :disabled="isDisabledLocation") NEXT
</template>

<script>
import gql from 'graphql-tag'
import { mapFields } from 'vuex-map-fields'
import { mapGetters } from 'vuex'
import mime from 'mime-types'
import countries from '~/assets/json/country.json'
import FormInput from '~/components/atoms/Form/Input'
import XAFormAutocomplete from '~/components/atoms/Form/Autocomplete'
import XAFormPlaceAutoComplete from '~/components/atoms/Form/PlaceAutoComplete'

export default {
  name: 'XOSignUpUserStep2',
  components: { XAFormPlaceAutoComplete, FormInput, XAFormAutocomplete },
  data() {
    return {
      showName: true,
      countries: countries.map((x) => x.name) || [],

      // data for auto detect
      errorData: '',
      initialAddress: '',
      geoLocation: '',
      gettingLocation: false,
    }
  },
  computed: {
    ...mapFields('v2/signup', [
      'form.socialMediaAvatar',
      'form.avatar',
      'form.firstName',
      'form.lastName',
      'form.location',
      'form.PhotoID',
    ]),
    ...mapGetters({
      getMedalClaimDetails: 'medals/getMedalClaimDetails',
    }),
    name() {
      if (this.firstName && this.lastName) {
        return `${this.firstName} ${this.lastName}`
      }

      return 'New User'
    },
    isDisabledName() {
      return !this.firstName || !this.lastName
    },
    isDisabledLocation() {
      return !this.initialAddress
    },
  },
  watch: {
    geoLocation(value) {
      this.location = value
    },
  },
  mounted() {
    if (this.getMedalClaimDetails) {
      this.firstName = this.getMedalClaimDetails?.firstName
      this.lastName = this.getMedalClaimDetails?.lastName
    }

    if (!('geolocation' in navigator)) {
      this.errorData = 'Geolocation is not available.'
    }
    this.geocoder = new window.google.maps.Geocoder()

    if (this.socialMediaAvatar)
      this.convertImgToBase64(this.socialMediaAvatar, (base64Img) => {
        const file = this.dataURLtoFile(base64Img, '')
        this.addImage(file)
      })
  },
  methods: {
    async addImage(file) {
      const loadingComponent = this.$buefy.loading.open({
        container: this.$refs.Step2Container,
      })

      try {
        const { waitForProcess } = await this.$store.dispatch('media/upload', { file })
        const { objectID } = await waitForProcess
        this.PhotoID = objectID
        this.doGetPhotoURL(this.PhotoID)
      } catch (e) {
        console.log(e)
      } finally {
        setTimeout(() => loadingComponent.close(), 2 * 1000)
      }
    },
    dataURLtoFile(dataurl) {
      const arr = dataurl.split(',')
      const mimeTypes = arr[0].match(/:(.*?);/)[1]
      const bstr = atob(arr[1])
      let n = bstr.length
      const u8arr = new Uint8Array(n)

      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      const ext = mime.extension(mimeTypes)
      return new File([u8arr], 'signup.' + ext, { type: mimeTypes })
    },
    convertImgToBase64(url, callback, outputFormat) {
      let canvas = document.createElement('CANVAS')
      const ctx = canvas.getContext('2d')
      const img = new Image()
      img.crossOrigin = 'Anonymous'
      img.onload = function () {
        canvas.height = img.height
        canvas.width = img.width
        ctx.drawImage(img, 0, 0)
        const dataURL = canvas.toDataURL(outputFormat || 'image/png')
        callback.call(this, dataURL)
        // Clean up
        canvas = null
      }
      img.src = url
    },
    setValue(txt) {
      this.initialAddress = txt
    },
    setData(txt) {
      this.geoLocation = txt
    },
    doSetLocation() {
      this.$router.push({
        query: {
          step: 3,
        },
      })
    },
    async locateMe() {
      this.gettingLocation = true
      try {
        this.gettingLocation = false
        await navigator.geolocation.getCurrentPosition(this.getPosition)
      } catch (e) {
        this.gettingLocation = false
        this.errorData = e.message
      }
    },
    async getPosition(position) {
      const latlng = {
        lat: parseFloat(position.coords.latitude),
        lng: parseFloat(position.coords.longitude),
      }
      await this.geocoder.geocode({ location: latlng }).then((response) => {
        let locality
        let state
        let country

        this.initialAddress = response.results[0].formatted_address
        const ac = response.results[0].address_components
        if (ac) {
          for (const component of ac) {
            const componentType = component.types

            if (componentType.includes('locality')) locality = component.long_name
            if (componentType.includes('administrative_area_level_1')) state = component.short_name
            if (componentType.includes('country')) country = component.long_name
          }
        }

        this.geoLocation = { sub: locality, state, country }
      })
    },
    async doGetPhotoURL(id) {
      const { data } = await this.$apollo.query({
        variables: {
          id,
        },
        query: gql`
          query ($id: String!) {
            getPhotoURL(id: $id)
          }
        `,
      })

      this.socialMediaAvatar = data?.getPhotoURL
    },
  },
}
</script>

<style lang="scss" scoped>
.xo-signup-user-step-2::v-deep {
  .container {
    .contents {
      .right-content {
        form {
          width: 100%;
          max-width: 400px;

          .user-avatar {
            position: relative;
            @include max-width(427px) {
              justify-content: center;
            }

            .upload,
            .img {
              position: relative;
              width: 95px;
              height: 95px;
              border-radius: 50%;
              border: 2px solid #e5e9f0;
              cursor: pointer;

              img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                border-radius: 50%;
              }
            }

            .profile-image-change {
              padding: 5px;
              background-color: white;
              border-radius: 20px;
              height: 25px;
              position: absolute;
              z-index: 30;
              right: 0;
              bottom: 0;
              -webkit-box-shadow: 5px 5px 21px -1px rgba(0, 0, 0, 0.29);
              box-shadow: 5px 5px 21px -1px rgba(0, 0, 0, 0.29);

              img {
                width: max-content;
              }
            }

            .name {
              font-size: 1.8571rem;
              margin-left: 20px;
              word-break: break-word;

              @include max-width(427px) {
                flex: none;
                width: 100%;
                text-align: center;
                margin: 15px 0 0;
                font-size: 1.4286rem;
              }
            }
          }

          .btn-auto-detect {
            background-color: $black;
          }
        }
      }
    }
  }
}
</style>
