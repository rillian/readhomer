import HomerReaderWidget from './components/HomerReaderWidget.vue';
import HomerGridReaderWidget from './components/HomerGridReaderWidget.vue';
import HomerParallelReaderWidget from './components/HomerParallelReaderWidget.vue';
import HomerReferenceInputWidget from './components/HomerReferenceInputWidget.vue';
import CDLIIndex from './components/CDLIIndex.vue';
import SelectedTextInfoWidget from './reader/SelectedTextInfoWidget.vue';
import CTSWidget from './reader/CTSWidget.vue';
import CardReaderWidget from './reader/CardReaderWidget.vue';
import TextSizeWidget from './text-size/TextSizeWidget.vue';
import TextWidthWidget from './text-width/TextWidthWidget.vue';

export default {
  [HomerReaderWidget.scaifeConfig.displayName]: HomerReaderWidget,
  [HomerGridReaderWidget.scaifeConfig.displayName]: HomerGridReaderWidget,
  [CardReaderWidget.scaifeConfig.displayName]: CardReaderWidget,
  [HomerParallelReaderWidget.scaifeConfig.displayName]: HomerParallelReaderWidget,
  [CDLIIndex.scaifeConfig.displayName]: CDLIIndex,
  [TextSizeWidget.scaifeConfig.displayName]: TextSizeWidget,
  [SelectedTextInfoWidget.scaifeConfig.displayName]: SelectedTextInfoWidget,
  [CTSWidget.scaifeConfig.displayName]: CTSWidget,
  [HomerReferenceInputWidget.scaifeConfig.displayName]: HomerReferenceInputWidget,
  [TextWidthWidget.scaifeConfig.displayName]: TextWidthWidget,
};
