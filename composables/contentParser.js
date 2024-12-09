
export class ContentParser {
  constructor(content){
    this.isDynamicImageSize = true;
    this.content = content || [];
  }

  init() {
    const htmlContent = this.parseContent(this.content);
    return htmlContent;
  }

  parseContent(content) { 
    let htmlContent = '';

    content.forEach(item => {
      if (item.type === 'image' && item.image) {
        htmlContent += this.generateImageHtml(item.image);
      } else if (item.type === 'link' && item.url) {
        htmlContent += this.generateLinkHtml(item);
      } else if (item.type === 'paragraph') {
        htmlContent += this.generateParagraphHtml(item);
      } else if (item.type === 'list') {
        htmlContent += this.generateListHtml(item);
      } else if (item.type === 'heading') {
        htmlContent += this.generateHeadingHtml(item);
      } else if (item.type === 'quote') {
        htmlContent += this.generateQuoteHtml(item);
      }

      // Рекурсивная обработка дочерних элементов
      if (item.children && Array.isArray(item.children)) {
        htmlContent += this.parseContent(item.children);
      }
    });

    return htmlContent;
  }


  generateImageHtml(image) {
    const origin = 'http://localhost:1337/'
    const imageTemplate = (!this.isDynamicImageSize || !image.formats || image.formats.length <= 1)
      ? `<img src="${image.url}" alt="${image.alternativeText || image.name}" width="${image.width}" height="${image.height}" />`
      : 
      `<picture>
      <source media="(min-width:${image.formats.large.width}px)" srcset="${origin}${image.formats.large.url}" type="${image.formats.large.mime}">
      <source media="(min-width:${image.formats.medium.width}px)" srcset="${origin}${image.formats.medium.url}" type="${image.formats.medium.mime}">
      <source media="(min-width:${image.formats.small.width}px)" srcset="${origin}${image.formats.small.url}" type="${image.formats.small.mime}">
      <img src="${image.url}" alt="${image.alternativeText || image.name}" width="${image.width}" height="${image.height}" /></picture>`;
    return imageTemplate;
  }

  generateLinkHtml(item) {
    const linkText = this.getTextFromChildren(item.children);
    return `<a href="${item.url}">${linkText}</a>`;
  }

  generateParagraphHtml(item) {
    const paragraphText = this.getTextFromChildren(item.children);
    return `<p>${paragraphText}</p>`;
  }
 
  generateListHtml(item) {
    const listItems = item.children.map(child => {
      return `<li>${this.getTextFromChildren(child.children)}</li>`;
    }).join('');
    return `<ul>${listItems}</ul>`;
  }

  generateHeadingHtml(item) {
    const headingText = this.getTextFromChildren(item.children);
    return `<h${item.level}>${headingText}</h${item.level}>`;
  }

  generateQuoteHtml(item) {
    const quoteText = this.getTextFromChildren(item.children);
    return `<blockquote>${quoteText}</blockquote>`;
  }

  getTextFromChildren(children) {
    return children
      .map(child => this.handleTextStyle(child))
      .join('');
  }

  handleTextStyle(child) {
    let text = child.text || '';

    if (child.bold && child.italic && child.underline) {
      text = `<strong><em><u>${text}</u></em></strong>`;
    } else if (child.italic && child.underline) {
      text = `<em><u>${text}</u></em>`;
    } else if (child.bold && child.underline) {
      text = `<strong><u>${text}</u></strong>`;
    } else if (child.bold && child.italic) {
      text = `<strong><em>${text}</em></strong>`;
    } else if (child.bold) {
      text = `<strong>${text}</strong>`;
    } else if (child.italic) {
      text = `<em>${text}</em>`;
    } else if (child.underline) {
      text = `<u>${text}</u>`;
    }

    return text;
  }
}

export default ContentParser;

