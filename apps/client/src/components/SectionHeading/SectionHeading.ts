import { HeadingComponent } from '@ComponentsAPI';

interface SectionHeadingProperties {
  title: string;
}

const SECTION_TITLE_CLASSES = `text-xl font-bold`;

export default class SectionHeading extends HeadingComponent {
  constructor({ title }: SectionHeadingProperties) {
    super({
      level: 2,
      classes: SECTION_TITLE_CLASSES,
      content: title,
    });
  }
}
