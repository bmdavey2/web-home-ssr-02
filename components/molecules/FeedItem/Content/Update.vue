<template lang="pug">
.xm-feed-item-content-update.py-4
  .description.mb-2(
    v-if="plan === null && !_isMember"
    style="font-weight: 300; font-size: 14px; word-break: break-word"
    v-html="value.content")
  .description.mb-2(
    style="font-weight: 300; font-size: 14px; word-break: break-word"
    v-html="value.content"
    v-linkified
    v-else)
  template(v-if="hasMedia")
    XMFeedItemMedias(:medias="medias", :is-medal="isNFTMedal", :medal-theme="medalTheme")
    //- template(v-if="isVideo")
      XAVideo(:value="videoURL")
    //- template(v-else)
      XAFeedImages(:images="photoGallery")

  .flex
    .flex-grow
    .flex-auto
      .content-tag.flex-center.px-2.py-1(style="box-shadow: 0 0 8px rgba(0, 0, 0, 0.15); border-radius: 0 0 6px 6px")
        img.mr-1(src="~assets/icons/updates.svg" style="width: 12px; height: 12px" loading="lazy")
        span.has-text-secondary(style="font-size: 12px") Update
</template>

<script>
import XAVideo from '~/components/atoms/Video'
import XAFeedImages from '~/components/atoms/Feed/Images'
import XMFeedItemMedias from '~/components/molecules/FeedItem/Medias'

export default {
  name: 'XMFeedItemContentUpdate',
  components: { XAVideo, XAFeedImages, XMFeedItemMedias },
  props: {
    value: Object,
    plan: String,
    isMember: Object,
  },
  computed: {
    hasMedia() {
      return this.value?.Media?.length > 0
    },
    isVideo() {
      return (this.value?.Media || [])[0]?.objectType === 'Video'
    },
    videoURL() {
      return (this.value?.Media || [])[0]?.VideoURL
    },
    photoGallery() {
      return this.value?.Media || []
      // ?.map((x) => x.PhotoURL)
    },
    _isMember() {
      return !!this.isMember
    },
    medias() {
      return this.value?.Media || []
    },
    isNFTMedal() {
      return this.value?.isNFTMedal || false
    },
    medalTheme() {
      return this.value?.ProductTheme || null
    },
  },
}
</script>
