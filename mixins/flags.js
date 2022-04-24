import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions({
      getCode: 'countries/getCode',
    }),
    async getUserFlag(flag) {
      try {
        const result = await this.getCode(flag)
        if (result.length) return result[0]?.alpha2
      } catch (error) {
        console.log(error)
      }
    },
  },
}
