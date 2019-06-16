<template>
  <div class="select-passage-reader">
    <ReferenceInput @readFromStore="onReadFromStore" @lookup="onLookup" />
    <Reader :passage-text="text" />
  </div>
</template>

<script>
import axios from 'axios';

import Reader from '../reader/Reader.vue';
import ReferenceInput from '../reader/ReferenceInput.vue';

export default {
  scaifeConfig: {
    displayName: 'CDLI Reader',
    location: 'both',
  },
  components: {
    Reader,
    ReferenceInput,
  },
  methods: {
    onReadFromStore(lookupFromStore) {
      this.lookupFromStore = lookupFromStore;
    },
    onLookup(urn, reference) {
      this.reference = reference || 'P481090';
      axios
        .get(`https://cdli.thaumas.net/api/cts?request=GetPassage&urn=urn:cts:cdli:test.${this.reference}`)
        .then((response) => {
          const parser = new DOMParser();
          const cts = parser.parseFromString(response.data, 'text/xml');
          const editionLines = cts.querySelectorAll('TEI text body div[type=edition] l');
          const lines = Array.from(editionLines)
            .map((line, index) => [line.getAttribute('n') || index, line.innerHTML]);
          this.passageText = lines;
        });
    },
  },
  data() {
    return {
      reference: 'P481090',
      lookupFromStore: false,
      passageText: '',
    };
  },
  computed: {
    text() {
      return this.lookupFromStore ? this.$store.state.passageText : this.passageText;
    },
  },
};
</script>

<style lang="scss">
.select-passage-reader {
  width: 100%;
}
</style>
