import { LabelComponent } from '@ComponentsAPI';

interface FieldLabelProperties {
  text: string;
  htmlFor?: string;
  classes?: string;
}

const FIELD_LABEL_CLASSES = `block font-bold`;

export default class FieldLabel extends LabelComponent {
  constructor({ text, htmlFor, classes = '' }: FieldLabelProperties) {
    super({ classes: `${FIELD_LABEL_CLASSES} ${classes}`.trim() });

    if (htmlFor) this.setFor(htmlFor);

    if (text) this.setContent(text);
  }
}
