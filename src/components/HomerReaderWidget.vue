<template>
  <div class="select-passage-reader">
    <ReferenceInput @readFromStore="onReadFromStore" @lookup="onLookup" />
    <div class="reader-toggles">
      <div v-on:click=switchText
           v-bind:class="{enabled: showText}">Transliteration</div>
      <div v-on:click=switchTranslation
           v-bind:class="{enabled: showTranslation}">Translation</div>
    </div>
    <div class=left>
      <Reader :passage-text="text" v-if=showText />
    </div>
    <div class=right>
      <Reader :passage-text="translation" v-if=showTranslation />
    </div>
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
        .get(`https://cdli.thaumas.net/api/cts?request=GetPassage&urn=${urn}:test.${this.reference}`)
        .then((response) => {
          const parser = new DOMParser();
          const cts = parser.parseFromString(response.data, 'text/xml');
          const editionLines = cts.querySelectorAll('TEI text body div[type=edition] l');
          const lines = Array.from(editionLines)
            .map((line, index) => [line.getAttribute('n') || index, line.innerHTML]);
          const translationLines = cts.querySelectorAll('TEI text body div[type=translation] l');
          const translation = Array.from(translationLines)
            .map((line, index) => [line.getAttribute('n') || index, line.textContent]);
          this.passageText = lines;
          this.translationText = translation;
        });
    },
    switchText() {
      this.showText = !this.showText;
    },
    switchTranslation() {
      this.showTranslation = !this.showTranslation;
    },
  },
  data() {
    return {
      reference: 'P481090',
      lookupFromStore: false,
      passageText: [],
      translationText: [],
      showText: true,
      disableText: false,
      showTranslation: false,
      disableTranslation: false,
    };
  },
  computed: {
    text() {
      return this.lookupFromStore ? this.$store.state.passageText : this.passageText;
    },
    translation() {
      return this.lookupFromStore ? this.$store.state.translationText : this.translationText;
    },
  },
};
</script>

<style lang="scss">
.select-passage-reader {
  width: 100%;
}
.left {
  float: left;
}
.right {
  float: right;
}
.reader-toggles {
  margin-top: -1.5em;
  display: flex;
  align-items: center;
}
.reader-toggles div {
  background-color: lightgray;
  padding: 8px;
  margin: 0 auto;
  corner-radius: 5px;
}
.reader-toggles div.enabled {
  background-color: darkgray;
}
.reader-toggles div.disabled {
  color: gray;
}
</style>
