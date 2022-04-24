export default {
  data() {
    return {
      metaTitle: '',
      metaImage: '',
      metaDescription: '',
    }
  },
  head() {
    return {
      title: `${this.metaTitle} | ActivePlace`,
      link: [{ rel: 'canonical', href: `${this.baseURL}${this.$route?.fullPath}` }],
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.metaDescription.replace(/<\/?[^>]+(>|$)/g, '') || `The World's Active Community`,
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: `${this.metaTitle} | ActivePlace`,
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: this.metaDescription.replace(/<\/?[^>]+(>|$)/g, '') || `The World's Active Community`,
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: this.metaImage || this.activeplaceLogo,
        },
        {
          hid: 'twitter:image:alt',
          name: 'twitter:image:alt',
          content: `${this.metaTitle} | ActivePlace`,
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: `${this.metaTitle} | ActivePlace`,
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.metaDescription.replace(/<\/?[^>]+(>|$)/g, '') || `The World's Active Community`,
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: this.metaImage || this.activeplaceLogo,
        },
        {
          hid: 'og:image:secure_url',
          property: 'og:image:secure_url',
          content: this.metaImage || this.activeplaceLogo,
        },
        {
          hid: 'og:image:alt',
          property: 'og:image:alt',
          content: `${this.metaTitle} | ActivePlace`,
        },
      ],
    }
  },
}
