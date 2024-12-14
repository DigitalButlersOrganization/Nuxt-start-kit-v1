
export class ContentParser {
  constructor(content) {
    this.isDynamicImageSize = true;
    this.content = content || []; 
    this.htmlMarkup = '';
  }

  init() {
    return this.parseContent(this.content);
  }

  parseContent(content) {
    let temporaryMarkup = '';
    content.forEach(item => {
      if (item.type === 'link') {
        temporaryMarkup += this.generateOuterMarkup({item, tag: 'a'});
      } else if (item.type === 'paragraph') {
        temporaryMarkup += this.generateOuterMarkup({item, tag: 'p'});
      } else if (item.type === 'list') {
        temporaryMarkup += this.generateOuterMarkup({item, tag: 'ul'});
      } else if (item.type === 'list-item') {
        temporaryMarkup += this.generateOuterMarkup({item, tag: 'li'});
      } else if (item.type === 'heading') {
        temporaryMarkup += this.generateOuterMarkup({item, tag: 'h1'});
      } else if (item.type === 'quote') {
        temporaryMarkup += this.generateOuterMarkup({item, tag: 'blockquote'});
      }
    });
    return temporaryMarkup;
  }

  generateOuterMarkup({item, tag}){
    const innerMarkup = this.generateInnerMarkup(item);
    return `<${tag}>${innerMarkup}</${tag}>`;
  }

  generateInnerMarkup(item) {
    if(item.children){
      return item.children
      .map((child) => {
        return this.handleTextStyle(child)
      })
      .join('');
    } else{
      return item.text || '&nbsp !'  
    }
  }

  handleTextStyle(child) { 
    
    const textContent = child.text || '&nbsp'; 
    let markup = '';
    if(child.children){
      console.log(child, 'child');
      markup = this.parseContent([child]);
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
    }else{
      markup = textContent;
    }

    return markup;
  }
}

export default ContentParser;

