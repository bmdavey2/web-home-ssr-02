export default {
  methods: {
    doShowLoginPopup() {
      this.$buefy.modal.open({
        parent: this,
        component: require('~/components/pages/LogIn').default,
        width: 600,
      })
    },
    doShowModalMedal(url = '') {
      this.$buefy.modal.open({
        parent: this,
        component: require('~/components/dialogs/Medal').default,
        width: 1024,
        props: {
          url,
        },
      })
    },
    doShowShareModal(details = {}) {
      this.$buefy.modal.open({
        parent: this,
        component: require('~/components/dialogs/Share').default,
        width: 500,
        canCancel: false,
        props: {
          details,
        },
      })
    },
  },
}
