<template>
  <div class="select-passage-reader">
    <ReferenceInput @readFromStore="onReadFromStore" @lookup="onLookup" />
    <div class="reader-toggles">
      <button v-on:click=switchText
              v-bind:class="{enabled: showText}">Transliteration</button>
      <button v-on:click=switchTranslation
              v-bind:class="{enabled: showTranslation}">Translation</button>
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
        .get(`https://cdli.thaumas.net/api/cts?request=GetPassage&urn=urn:cts:cdli:test.${this.reference}`)
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
    toggleText() {
      if (this.showText) {
        return 'button-on';
      }
      return 'button-off';
    },
    switchTranslation() {
      this.showTranslation = !this.showTranslation;
    },
    toggleTranslation() {
      if (this.showTranslation) {
        return 'button-on';
      }
      return 'button-off';
    },
  },
  data() {
    return {
      reference: 'P481090',
      lookupFromStore: false,
      passageText: [],
      translationText: [],
      showText: true,
      showTranslation: false,
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
button.enabled {
  background-color: darkgray;
}
</style>
