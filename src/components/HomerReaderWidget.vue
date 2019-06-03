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
      this.reference = reference;
      axios
        .get('https://raw.githubusercontent.com/rillian/atf2tei/master/SIL-034.tei')
        .then((response) => {
          const parser = new DOMParser();
          const tei = parser.parseFromString(response.data, 'text/xml');
          const lines = Array.from(tei.querySelectorAll('TEI text body div[type=tablet] l'))
            .map((line, index) => [index + 1, line.innerHTML]);
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
