<template>
    <div class=cts-catalog>
        <ul v-if="works.length">
          <li v-for="work in works" v-bind:key=work.label>
            {{ work.label }}
          </li>
        </ul>
        <span v-else>No catalog data found.</span>
    </div>
</template>

<script>
export default {
  scaifeConfig: {
    displayName: 'Suggested documents',
    location: 'sidebar',
  },
  props: ['cts-url'],
  data() {
    return {
      works: [
        { label: 'CDLI P481090 LAOS 1, 47' },
        { label: 'CDLI X001001 bēlšunu' },
        { label: 'CDLI P464358 Codex Hammurapi' },
        { label: 'CDLI P497322 Descent of Ishtar' },
      ],
    };
  },
};
</script>

<style lang="scss">
    .cts-catalog a {
        font-size: 14px;
    }
</style>
