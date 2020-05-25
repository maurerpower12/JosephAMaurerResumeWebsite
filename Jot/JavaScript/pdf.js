// JavaScript source code
var zoomed = false;
var openPage = function (pdfFile, pageNumber) {
    pdfFile.getPage(pageNumber).then(function (page) {
        viewport = page.getViewport(1);

        if (zoomed) {
            var scale = pageElement.clientWidth / viewport.width;
            viewport = page.getViewport(scale);
        }

        canvas.height = viewport.height;
        canvas.width = viewport.width;

        var renderContext = {
            canvasContext: context,
            viewport: viewport
        };

        page.render(renderContext);
    });
};


