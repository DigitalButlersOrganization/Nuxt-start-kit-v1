export class ContentParser {
  constructor({ content, options }) {
    this.isDynamicImageSize = true;
    this.content = content || [];
    this.htmlMarkup = '';
    this.showEmptyParagraphs = options.showEmptyParagraphs || false;
  }

  init() {
    return this.parseContent(this.content);
  }

  parseContent(content) {
    let temporaryMarkup = '';
    content.forEach((item) => {
      switch (item.type) {
        case 'link':
          temporaryMarkup += this.generateOuterMarkup({ item, tag: 'a' });
          break;
        case 'paragraph':
          temporaryMarkup += this.generateOuterMarkup({ item, tag: 'p' });
          break;
        case 'list':
          temporaryMarkup += this.generateOuterMarkup({ item, tag: 'ul' });
          break;
        case 'list-item':
          temporaryMarkup += this.generateOuterMarkup({ item, tag: 'li' });
          break;
        case 'heading':
          temporaryMarkup += this.generateOuterMarkup({ item, tag: 'h1' });
          break;
        case 'quote':
          temporaryMarkup += this.generateOuterMarkup({ item, tag: 'blockquote' });
          break;
        default:
          console.log(item.type);
          temporaryMarkup += '';
      }
    });
    return temporaryMarkup;
  }

  generateOuterMarkup({ item, tag }) {
    const innerMarkup = this.generateInnerMarkup(item);
    return `<${tag}>${innerMarkup}</${tag}>`;
  }

  generateInnerMarkup(item) {
    if (item.children) {
      return item.children
        .map((child) => {
          return this.handleTextStyle(child);
        })
        .join('');
    } else {
      return item.text || '&nbsp; !';
    }
  }

  handleTextStyle(child) {
    const textContent = child.text || (this.showEmptyParagraphs ? '&nbsp;' : '');
    let markup = '';
    if (child.children) {
      markup = this.parseContent([child]);
      return markup;
    }

    if (child.bold && child.italic && child.underline) {
      markup = `<strong><em><u>${textContent}</u></em></strong>`;
    } else if (child.italic && child.underline) {
      markup = `<em><u>${textContent}</u></em>`;
    } else if (child.bold && child.underline) {
      markup = `<strong><u>${textContent}</u></strong>`;
    } else if (child.bold && child.italic) {
      markup = `<strong><em>${textContent}</em></strong>`;
    } else if (child.bold) {
      markup = `<strong>${textContent}</strong>`;
    } else if (child.italic) {
      markup = `<em>${textContent}</em>`;
    } else if (child.underline) {
      markup = `<u>${textContent}</u>`;
    } else {
      markup = textContent;
    }

    return markup;
  }
}

export default ContentParser;
