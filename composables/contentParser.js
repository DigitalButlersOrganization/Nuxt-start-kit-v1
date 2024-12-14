export class ContentParser {
  constructor({ content, options }) {
    this.isDynamicImageSize = true;
    this.content = content || [];
    this.htmlMarkup = '';
    this.showEmptyParagraphs = options.showEmptyParagraphs || false;
    this.typesOfTextStylization = [
      { jsonName: 'code', tagName: 'code' },
      { jsonName: 'strikethrough', tagName: 's' },
      { jsonName: 'underline', tagName: 'u' },
      { jsonName: 'italic', tagName: 'i' },
      { jsonName: 'bold', tagName: 'b' },
    ];
  }

  init() {
    return this.parseContent(this.content);
  }

  parseContent(content) {
    let temporaryMarkup = '';
    content.forEach((item) => {
      switch (item.type) {
        case 'link':
          temporaryMarkup += this.generateOuterMarkup({ item, tag: 'a', attributes: `href="${item.url}"` });
          break;
        case 'paragraph':
          temporaryMarkup += this.generateOuterMarkup({ item, tag: 'p' });
          break;
        case 'list':
          temporaryMarkup += this.generateOuterMarkup({ item, tag: `${item.format === 'unordered' ? 'ul' : 'ol'}` });
          break;
        case 'list-item':
          temporaryMarkup += this.generateOuterMarkup({ item, tag: 'li' });
          break;
        case 'heading':
          temporaryMarkup += this.generateOuterMarkup({ item, tag: `h${item.level}` });
          break;
        case 'quote':
          temporaryMarkup += this.generateOuterMarkup({ item, tag: 'blockquote' });
          break;
        case 'code':
          const language = item.language === 'css' ? 'style' : item.language === 'javascript' ? 'script' : 'code';
          temporaryMarkup += this.generateOuterMarkup({ item, tag: language });
          break;
        default:
          console.log(item.type);
          temporaryMarkup += '';
      }
    });
    return temporaryMarkup;
  }

  generateOuterMarkup({ item, tag, attributes }) {
    const innerMarkup = this.generateInnerMarkup(item);

    return `<${tag} ${attributes || ''}>${innerMarkup}</${tag}>`;
  }

  generateInnerMarkup(item) {
    if (item.children) {
      return item.children
        .map((child) => {
          return this.handleTextStyle(child);
        })
        .join('');
    } else {
      return item.text || (this.showEmptyParagraphs ? '&zwnj;' : '');
    }
  }

  handleTextStyle(child) {
    const textContent = child.text || (this.showEmptyParagraphs ? '&zwnj;' : '');
    let markup = '';
    if (child.children) {
      markup = this.parseContent([child]);
      return markup;
    }

    markup = textContent;
    this.typesOfTextStylization.forEach((type) => {
      if (child[type.jsonName]) {
        markup = `<${type.tagName}>${markup}</${type.tagName}>`;
      }
    });

    return markup;
  }
}

export default ContentParser;
