<template lang="pug">
.xp-member-profile-edit.py-6
  .container
    h1 Edit Profile
    .contents
      .left-content
        .tab-item(
          :class="activeTab === 'personal-information' && 'active'"
          @click.prevent="activeTab = 'personal-information'")
          ._icon: img(src="~assets/images/MemberProfileEdit/checked-person.svg" width="44" height="44")
          ._label Personal Information
        .tab-item(:class="activeTab === 'about' && 'active'" @click.prevent="activeTab = 'about'")
          ._icon: img(src="~assets/images/MemberProfileEdit/checked-about.svg" width="44" height="44")
          ._label About
      .right-content
        XMMemberProfileEditPersonalInformation(v-if="activeTab === 'personal-information'")
        XMMemberProfileEditAbout(v-if="activeTab === 'about'")
</template>

<script>
import XMMemberProfileEditPersonalInformation from '~/components/molecules/MemberProfileEdit/PersonalInformation'
import XMMemberProfileEditAbout from '~/components/molecules/MemberProfileEdit/About'

export default {
  name: 'XPMemberProfileEdit',
  components: { XMMemberProfileEditPersonalInformation, XMMemberProfileEditAbout },
  data() {
    return {
      activeTab: this.$route?.query?.tab || 'personal-information',
    }
  },
}
</script>

<style lang="scss" scoped>
.xp-member-profile-edit::v-deep {
  background-color: $white;
  border-bottom: 1px solid #e3e3e3;

  h1 {
    font-size: 3rem;
    color: $secondary;
  }

  .contents {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .left-content {
      width: 100%;
      max-width: 260px;
      background-color: #f8f8f8;
      border-radius: 0 20px 20px 0;
      height: 100%;
      padding: 25px 0;

      .tab-item {
        text-transform: uppercase;
        color: $secondary;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        cursor: pointer;
        user-select: none;

        &.active {
          background-color: #e5e9f0;
        }

        ._icon {
          display: flex;
        }
      }
    }

    .right-content {
      flex: 10000 1 0;
      padding-left: 20px;
    }
  }

  @media screen and (max-width: 768px) {
    h1 {
      font-size: 2rem;
    }

    .contents {
      .left-content {
        max-width: 100%;
        background-color: transparent;
        border-radius: 0;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;

        .tab-item {
          border-bottom: 1px solid transparent;
          padding: 0 10px 5px;
          margin: 0 10px;

          &.active {
            background-color: transparent;
            border-color: $secondary;
          }

          ._icon {
            display: none;
          }
        }
      }

      .right-content {
        padding-left: 0;
      }
    }
  }
}
</style>
