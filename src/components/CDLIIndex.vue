<template>
    <div class=cts-catalog>
        <div>
          Filter: <input v-model=filter>
        </div>
        <ul v-if="works.length">
          <li v-for="work in filteredWorks" v-bind:key=work.label
              @click="load(work.urn)"
          >
            {{ work.label }}
          </li>
        </ul>
        <span v-else>No catalog data found.</span>
    </div>
</template>

<script>
import axios from 'axios';

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
      works: [],
      filter: '',
    };
  },
  computed: {
    filteredWorks() {
      if (!this.filter) {
        return this.works;
      }
      return this.works.filter(
        obj => obj.label.includes(this.filter),
      );
    },
  },
  methods: {
    load(urn) {
      this.selectedUrn = urn;
      this.$store.dispatch(CDLI_FETCH_URN, { urn });
    },
  },
  mounted() {
    const url = 'https://cdli.thaumas.net/api/cts?request=GetCapabilities';
    axios
      .get(url)
      .then((response) => {
        const parser = new DOMParser();
        const cts = parser.parseFromString(response.data, 'text/xml');
        const workElements = cts.querySelectorAll('TextInventory work[urn]');
        return Array.from(workElements)
          .map(e => ({
            urn: e.getAttribute('urn'),
            label: e.querySelector('label').textContent,
          }));
      })
      .then((works) => {
        this.works = works;
      });
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
