
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
    const imageTemplate = (!this.isDynamicImageSize || !image.formats || image.formats.length <= 1)
      ? `<img src="${image.url}" alt="${image.alternativeText || image.name}" width="${image.width}" height="${image.height}" />`
      : `<picture><source srcset="${image.url}" type="image/webp"><img src="${image.url}" alt="${image.alternativeText || image.name}" width="${image.width}" height="${image.height}" /></picture>`;
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

  // Метод для извлечения текста из дочерних элементов
  getTextFromChildren(children) {
    return children
      .filter(child => child.type === 'text')
      .map(child => child.text)
      .join('');
  }
}

export default ContentParser;

