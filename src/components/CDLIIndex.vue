<template>
    <div class=cts-catalog>
        <ul v-if="works.length">
          <li v-for="work in works" v-bind:key=work.label
              @click="load(work.urn)"
          >
            {{ work.label }}
          </li>
        </ul>
        <span v-else>No catalog data found.</span>
    </div>
</template>

<script>
import { CDLI_FETCH_URN } from '../constants';

export default {
  scaifeConfig: {
    displayName: 'Suggested documents',
    location: 'sidebar',
  },
  props: ['ctsUrl'],
  data() {
    return {
      selectedUrn: null,
      works: [
        {
          label: 'CDLI P481090 LAOS 1, 47',
          urn: 'urn:cts:cdli:test.P481090',
        },
        {
          label: 'CDLI X001001 bēlšunu',
          urn: 'urn:cts:cdli:test.X001001',
        },
        {
          label: 'CDLI P464358 Codex Hammurapi',
          urn: 'urn:cts:cdli:test.P464358',
        },
        {
          label: 'CDLI P497322 Descent of Ishtar',
          urn: 'urn:cts:cdli:test.P497322',
        },
      ],
    };
  },
  methods: {
    load(urn) {
      this.selectedUrn = urn;
      this.$store.dispatch(CDLI_FETCH_URN, { urn });
    },
  },
};
</script>

<style lang="scss">
  .cts-catalog ul {
    list-style: none;
  }
  .cts-catalog li:hover {
    background: lightgray;
  }
</style>
