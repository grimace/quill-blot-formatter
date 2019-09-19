// @flow

import BlotSpec from './BlotSpec';
import BlotFormatter from '../BlotFormatter';

export default class VideoSpec extends BlotSpec {
  video: ?HTMLElement;
  name: 'VideoSpec';

  constructor(formatter: BlotFormatter) {
    super(formatter);
    this.video = null;
  }

  init() {
    this.formatter.quill.root.addEventListener('click', this.onClick);
  }

  getTargetElement(): ?HTMLElement {
    return this.video;
  }

  onHide() {
    this.video = null;
  }

  onClick = (event: MouseEvent) => {
    const el = event.target;
    if (!(el instanceof HTMLElement) || el.tagName !== 'VIDEO') {
      return;
    }

    this.video = el;
    this.formatter.show(this);
  };

  getName() {
    return this.name;
  }

}
