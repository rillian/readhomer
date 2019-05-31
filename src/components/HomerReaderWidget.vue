<template>
  <div class="select-passage-reader">
    <ReferenceInput @readFromStore="onReadFromStore" @lookup="onLookup" />
    <Reader :passage-text="text" />
  </div>
</template>

<script>
import axios from 'axios';
import xml2js from 'xml2js';

import Reader from '../reader/Reader.vue';
import ReferenceInput from '../reader/ReferenceInput.vue';

export default {
  scaifeConfig: {
    displayName: 'Homer Reader',
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
          xml2js.parseString(response.data, (err, result) => {
            const lines = result.TEI.text[0].body[0].div[0].div[0].l
              .map((line, index) => [index + 1, line]);
            this.passageText = lines;
          });
        });
    },
  },
  data() {
    return {
      reference: '',
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
