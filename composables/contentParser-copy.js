
export class ContentParser2 {
  constructor(content) {
    this.isDynamicImageSize = true;
    this.content = content || [];
    this.htmlContent = '';
  }

  init() {
    this.parseContent(this.content);
    return this.htmlContent;
  }

  parseContent(content) {
    
    content.forEach(item => {
      if (item.type === 'image' && item.image) {
        this.htmlContent += this.generateImageHtml(item.image);
      } else if (item.type === 'link' && item.url) {
        this.htmlContent += this.generateLinkHtml(item);
      } else if (item.type === 'paragraph') {
        this.htmlContent += this.generateParagraphHtml(item);
      } else if (item.type === 'list') {
        this.htmlContent += this.generateListHtml(item);
      } else if (item.type === 'heading') {
        this.htmlContent += this.generateHeadingHtml(item);
      } else if (item.type === 'quote') {
        this.htmlContent += this.generateQuoteHtml(item);
      }

      // Рекурсивная обработка дочерних элементов
      if (item.children && Array.isArray(item.children)) {
        this.htmlContent += this.parseContent(item.children);
      }
    });
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
    // console.log(children, 'children', );
    
    return children
      .map((child) => {
        return this.handleTextStyle(child)
      })
      .join('');
  }

  handleTextStyle(child) {
    
    const textContent = child.text || '';
    let markup = 'a';
    if(child.type === 'link'){
      console.log(child, 'child');
      // text = this.getTextFromChildren(child.children);
      this.generateLinkHtml(child);
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
    }

    return markup;
  }
}

export default ContentParser;

