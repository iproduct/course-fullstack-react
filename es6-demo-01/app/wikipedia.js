import $ from 'jquery';

export class WikipediaService {
    constructor(elementSelector) {
        this._selector = elementSelector;
    }
    search(term) {
        let wikiUrl = 'http://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=' + term;
        // "https://api.github.com/users/jeresig?callback=?"


        // $.ajax({
        //     url: wikiUrl,
        //     dataType: "jsonp",
        //     jsonpCallback: logResults
        // });

        let self = this;
        let flickerAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
        $.getJSON(flickerAPI, {
            tags: "mount rainier",
            tagmode: "any",
            format: "json"
        }).done((data) => {
            console.log(JSON.stringify(data));

            $.each(data.items, (i, item) => {
                $("<img>").attr("src", item.media.m).appendTo(self._selector);
                if (i === 3) {
                    return false;
                }
            });
        });

        // var params = new URLSearchParams();
        // params.set('search', term); // the user's search value
        // params.set('action', 'opensearch');
        // params.set('format', 'json');
        // params.set('callback', 'JSONP_CALLBACK');
        // // TODO: Add error handling
        // return this.jsonp
        //     .get(wikiUrl, { search: params })
        //     .map(request => <string[] > request.json()[1]);
    }
}