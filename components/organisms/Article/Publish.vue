<template lang="pug">
.article-publish-container.is-flex.is-align-items-center
  .article-content
    .publisher.is-flex.is-align-items-center(v-if="status != 'Published'")
      span.mr-3 {{ isSaving ? (isSaving == 'saved' ? 'Saved in Draft' : '') : 'Saving..' }}
      span.mr-3 Publish as
      XAProfileAvatar.mr-3(
        :image="selectedPublisher.profilePhotoURL"
        v-if="selectedPublisher",
        :label="initials(selectedPublisher.name)"
        size="37px")

      b-dropdown(aria-role="list" position="is-bottom-left")
        template(#trigger)
          b-icon.mr-3(:icon="onclickDrop ? 'menu-up' : 'menu-down'" @click.native="onclickDrop = !onclickDrop")

        b-dropdown-item(
          aria-role="listitem"
          v-for="account in accounts",
          :key="account.id"
          @click="setPublisher(account)")
          .list-profile.is-flex.is-align-items-center
            XAProfileAvatar.mr-3(:image="account.profilePhotoURL", :label="initials(account.name)" size="37px")
            p {{ account.name }}

        b-dropdown-item(aria-role="listitem" v-if="!accounts.length")
          .list-profile.is-flex.is-align-items-center
            p No Publisher Found

      b-button(type="is-primary" @click="onClickPublished") PUBLISH

    .publisher.is-flex.is-align-items-center(v-if="status == 'Published'")
      b-button(type="is-primary" @click="onClickPublished") Update Article
</template>

<script>
import XOMyProfileAvatar from '~/components/organisms/MyProfileAvatar'
import XAProfileAvatar from '~/components/atoms/ProfileAvatar'

export default {
  name: 'XOArticlePublish',
  components: { XAProfileAvatar, XOMyProfileAvatar },
  data() {
    return {
      onclickDrop: false,
      selectedPublisher: '',
    }
  },
  computed: {
    isSaving() {
      return this.$parent.timeout
    },
    article() {
      return this.$parent.article
    },
    isEdit() {
      return this.$parent.isEdit
    },
    status() {
      return this.$parent.status || ''
    },
    accounts() {
      return this.$parent.accounts || []
    },
  },
  watch: {
    accounts() {
      this.getActiveUser()
    },
  },
  methods: {
    async getActiveUser() {
      const data = await this.getMyDisplayProfile()
      if (data.__typename === 'MyMemberProfile') {
        this.setPublisher(this.accounts[0])
      } else {
        this.setPublisher(data)
      }
    },
    onClickPublished() {
      this.$emit('onClickPublished', this.selectedPublisher)
    },
    initials(name) {
      return this.$app.getNameInitials(name)
    },
    setPublisher(data) {
      this.selectedPublisher = data || null
      this.onclickDrop = true
      this.$emit('setPublisher', this.selectedPublisher)
    },
  },
}
</script>

<style lang="scss" scoped>
.article-content {
  max-width: 900px;
  width: 100%;
  margin: auto;
}
.publisher {
  img {
    width: 32px;
    height: 32px;
    border-radius: 45px;
    box-shadow: 0 4px 10px rgb(10 39 46 / 15%);
  }

  width: max-content;
}

@media screen and (min-width: $BPdesktop) {
  .article-publish-container {
    box-shadow: 0 8px 6px -6px rgb(39 85 96 / 10%);
    height: 60px;
    background: #fff;
    position: fixed;
    right: 0;
    left: 0;
    z-index: 39;
    top: 90px;
  }

  .publisher {
    margin-left: auto;
  }
}

@media screen and (max-width: $BPdesktop) {
  .publisher {
    width: 100% !important;
    padding: 20px;

    button {
      margin-left: auto;
    }
  }
}
</style>
