<script>
export default {
  name: 'XHMediaUploader',
  props: {
    value: { type: Array, default: () => [] },
    photoFiles: Array,
    videoFile: null,
    mediaStates: Array,
    editableFiles: Array,
  },
  data() {
    return {
      files: [],
    }
  },
  watch: {
    photoFiles: {
      immediate: true,
      async handler(files) {
        if (!files) return
        try {
          for (const file of files) {
            const { id } = await this.$store.dispatch('media/upload', { file })
            this.files.push(id)
          }
        } catch (e) {
          //
        }
        this.$emit('update:photoFiles', null)
      },
    },
    videoFile: {
      immediate: true,
      async handler(file) {
        if (!file) return
        try {
          const { id } = await this.$store.dispatch('media/upload', { file })
          this.files.push(id)
        } catch (e) {
          //
        }
        this.$emit('update:videoFile', null)
      },
    },
  },
  mounted() {
    this.loadInitialData()
  },
  beforeDestroy() {
    this.$root.$on('file', this.onFileEvent)
  },
  methods: {
    loadInitialData() {
      if (this.editableFiles) {
        const files = this.editableFiles
        for (const file of files) {
          this.files.push(file.id)
        }
      }
      this.$root.$on('file', this.onFileEvent)
    },
    onFileEvent() {
      let files
      files = this.files.map((x) => this.$store.getters['media/getFile'](x))
      files = files.filter(function (el) {
        return el
      })
      this.$emit('update:mediaStates', files)
      this.$emit(
        'input',
        files
          .filter((x) => x.processed)
          .map(({ data: { objectType, objectID } }) => ({
            objectType,
            objectID,
          }))
      )
    },
  },
  render() {
    return null
  },
}
</script>
