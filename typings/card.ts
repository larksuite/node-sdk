/* eslint-disable */
export interface InteractiveCardActionEvent {
  open_id: string;
  user_id?: string;
  tenant_key: string;
  open_message_id: string;
  token: string;
  action: {
    value: Record<string, any>;
    tag: string;
    option?: string;
    timezone?: string;
  }
}

export interface InteractiveCard {
  config?: InteractiveCardConfig;
  header?: InteractiveCardHeader;
  elements?: InteractiveCardElement[]; // required, alternative i18n_elements
  i18n_elements?: Record<string, InteractiveCardElement[]>; // required, alternative elements
  card_link?: InteractiveCardUrlItem;
}

interface InteractiveCardConfig {
  enable_forward?: boolean;
  update_multi?: boolean;
  wide_screen_mode?: boolean; // deprecated after 2021/03/22
}

type InteractiveCardHeaderTemplate = 'blue'|'wathet'|'turquoise'|'green'|'yellow'|'orange'|'red'|'carmine'|'violet'|'purple'|'indigo'|'grey';
interface InteractiveCardHeader {
  title: InteractiveCardTitle;
  template?: InteractiveCardHeaderTemplate;
}

export type InteractiveCardElement = InteractiveCardDivElement|InteractiveCardMarkdownElement|InteractiveCardDividerElement|InteractiveCardImageElement|InteractiveCardNoteElement|InterfaceCardActionElement;
export interface InteractiveCardTitle extends Omit<InteractiveCardPlainTextItem, 'lines'> {
  i18n?: Record<string, string>;
}
export type InteractiveCardTextItem = InteractiveCardPlainTextItem|InteractiveCardLarkMdItem;
export interface InteractiveCardPlainTextItem {
  tag: "plain_text";
  content?: string;
  lines?: number;
}
export interface InteractiveCardLarkMdItem {
  tag: "lark_md";
  content?: string;
}
export interface InteractiveCardImageItem {
  tag: "img";
  img_key: string;
  alt: InteractiveCardPlainTextItem;
  preview?: boolean;
}
export interface InteractiveCardUrlItem {
  url: string;
  android_url?: string;
  ios_url?: string;
  pc_url?: string;
}

export interface InteractiveCardField {
  is_short: boolean;
  text: InteractiveCardTextItem;
}

export interface InteractiveCardDivElement {
  tag: "div";
  text: InteractiveCardTextItem;
  fields?: InteractiveCardField[];
  extra?: any;
}

export interface InteractiveCardMarkdownElement {
  tag: "markdown";
  content: string;
  text_align?: "left"|"center"|"right";
  href?: Record<string, InteractiveCardUrlItem>
}

export interface InteractiveCardDividerElement {
  tag: "hr";
}

export interface InteractiveCardImageElement extends InteractiveCardImageItem {
  title?: InteractiveCardTextItem;
  custom_width?: number;
  compact_width?: boolean;
  mode?: "crop_center"|"fit_horizontal";
}

export interface InteractiveCardNoteElement {
  tag: "note";
  elements: (InteractiveCardTextItem|InteractiveCardImageItem)[];
}

export interface InterfaceCardActionElement {
  tag: "action";
  actions: InteractiveCardActionItem[];
  layout?: "bisected"|"trisection"|"flow";
}

export type InteractiveCardActionItem = InteractiveCardDatePickerActionItem|InteractiveCardButtonActionItem|InteractiveCardOverflowActionItem|InteractiveCardSelectMenuActionItem;

interface InteractiveCardActionBaseItem {
  confirm?: {
    title: InteractiveCardPlainTextItem;
    text: InteractiveCardPlainTextItem;
  };
}
interface InteractiveCardActionOptionItem {
  text?: InteractiveCardPlainTextItem;
  value?: string;
}

export interface InteractiveCardDatePickerActionItem extends InteractiveCardActionBaseItem {
  tag: "date_picker"|"picker_time"|"picker_datetime";
  initial_date?: string;
  initial_time?: string;
  initial_datetime?: string;
  placeholder?: InteractiveCardPlainTextItem;
  value?: Record<string, any>;
}

export interface InteractiveCardButtonActionItem extends InteractiveCardActionBaseItem {
  tag: "button";
  text?: InteractiveCardTextItem;
  url?: string;
  multi_utl?: InteractiveCardUrlItem;
  type?: "default"|"primary"|"danger";
  value?: Record<string, any>;
}

export interface InteractiveCardOverflowActionItem extends InteractiveCardActionBaseItem {
  tag: "overflow";
  options?: (InteractiveCardActionOptionItem&{
    url?: string;
    multi_utl?: InteractiveCardUrlItem;
  })[];
  value?: Record<string, any>;
}

export interface InteractiveCardSelectMenuActionItem extends InteractiveCardActionBaseItem {
  tag: "select_static"|"select_person";
  placeholder?: InteractiveCardPlainTextItem;
  initial_option?: string;
  option?: InteractiveCardActionOptionItem[];
  value?: Record<string, any>;
}

