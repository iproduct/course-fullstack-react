'use strict';

const Remarkable = require('remarkable');
const markDown = new Remarkable();

export default function(markdownMarkup) {
    let rawHtmlMarkup = markDown.render(markdownMarkup.toString());
    return { __html: rawHtmlMarkup };
}