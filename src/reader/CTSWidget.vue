<template>
    <div class="cts-reference">
        <a v-if="apiLink" :href="apiLink" target="_blank">{{ reference }}</a>
        <span v-else>No reference selected</span>
    </div>
</template>

<script>
export default {
  scaifeConfig: {
    displayName: 'CTS URN',
    location: 'sidebar',
  },
  computed: {
    reference() {
      return this.$store.state.selectedReference;
    },
    apiLink() {
      return this.reference && `https://cdli.thaumas.net/api/cts?request=GetPassage&urn=${this.reference}`;
    },
  },
};
</script>

<style lang="scss">
    .cts-reference a {
        font-size: 14px;
    }
</style>
