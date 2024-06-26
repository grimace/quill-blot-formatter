// @flow

import deepmerge from 'deepmerge';
import type { Options } from './Options';
import DefaultOptions from './Options';
import Action from './actions/Action';
import BlotSpec from './specs/BlotSpec';

const dontMerge = (destination: Array<any>, source: Array<any>) => source;

export default class BlotFormatter {
  quill: any;
  options: Options;
  currentSpec: ?BlotSpec;
  specs: BlotSpec[];
  overlay: HTMLElement;
  actions: Action[];
  quillParent:any;

  constructor(quill: any, options: $Shape<Options> = {}) {
    this.quill = quill;
    this.options = deepmerge(DefaultOptions, options, { arrayMerge: dontMerge });
    this.currentSpec = null;
    this.actions = [];
    this.overlay = document.createElement('div');
    this.quillParent = this.quill.root.parentNode;
    this.overlay.classList.add(this.options.overlay.className);
    if (this.options.overlay.style) {
      Object.assign(this.overlay.style, this.options.overlay.style);
    }

    // disable native image resizing on firefox
    document.execCommand('enableObjectResizing', false, 'false'); // eslint-disable-line no-undef
    this.quill.root.parentNode.style.position = this.quill.root.parentNode.style.position || 'relative';

    this.quill.root.addEventListener('click', this.onClick);
    this.specs = this.options.specs.map((SpecClass: Class<BlotSpec>) => new SpecClass(this));
    this.specs.forEach((spec) =>
      {
        console.log('BlotFormatter consructor - spec : '+spec.getName());
        spec.init();
      }
    );
  }

  show(spec: BlotSpec) {
    console.log('BlotFormatter show - spec : '+spec);
    this.currentSpec = spec;
    this.currentSpec.setSelection();
    this.setUserSelect('none');
    this.quill.root.parentNode.appendChild(this.overlay);
    this.repositionOverlay();
    this.createActions(spec);
  }

  hide() {
    if (!this.currentSpec) {
      return;
    }

    this.currentSpec.onHide();
    this.currentSpec = null;
    this.quill.root.parentNode.removeChild(this.overlay);
    this.overlay.style.setProperty('display', 'none');
    this.setUserSelect('');
    this.destroyActions();
  }

  update() {
    this.repositionOverlay();
    this.actions.forEach(action => action.onUpdate());
  }

  createActions(spec: BlotSpec) {
    this.actions = spec.getActions().map((ActionClass: Class<Action>) => {
      const action: Action = new ActionClass(this);
      action.onCreate();
      return action;
    });
  }

  destroyActions() {
    this.actions.forEach((action: Action) => action.onDestroy());
    this.actions = [];
  }

  repositionOverlay() {
    console.log('BlotFormatter - repositionOverlay()');
    if (!this.currentSpec) {
      return;
    }

    const overlayTarget = this.currentSpec.getOverlayElement();
    if (!overlayTarget) {
      return;
    }

    const parent: HTMLElement = this.quill.root.parentNode;
    const specRect = overlayTarget.getBoundingClientRect();
    const parentRect = parent.getBoundingClientRect();

    Object.assign(this.overlay.style, {
      display: 'block',
      left: `${specRect.left - parentRect.left - 1 + parent.scrollLeft}px`,
      top: `${specRect.top - parentRect.top + parent.scrollTop}px`,
      width: `${specRect.width}px`,
      height: `${specRect.height}px`,
    });
  }

  setUserSelect(value: string) {
    const props: string[] = [
      'userSelect',
      'mozUserSelect',
      'webkitUserSelect',
      'msUserSelect',
    ];

    props.forEach((prop: string) => {
      // set on contenteditable element and <html>
      this.quill.root.style.setProperty(prop, value);
      if (document.documentElement) {
        document.documentElement.style.setProperty(prop, value);
      }
    });
  }

  onClick = () => {
    if (this.currentSpec) {
      let overlayElement = this.currentSpec.getOverlayElement();
      if (overlayElement) {
        let data = {};
        let style = overlayElement.getAttribute('style');
        let height = overlayElement.getAttribute('height');
        let width = overlayElement.getAttribute('height');
        data.style = style;
        data.width = width;
        data.height = height;
        console.log('onClick - width : '+width+' , height : '+height+' , style : '+JSON.stringify(style));
        console.log('overlay parentNode : '+JSON.stringify(overlayElement.parentNode.innerHTML));
        let event = new Event('kresize');
        event.data = data;
        overlayElement.parentNode.parentNode.dispatchEvent(event);
        console.log('done emitting event ...');
      }
    }
    this.hide();
  }
}
