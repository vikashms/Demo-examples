/**
 * @author parthik.gosar
 */
function Loader (arrResources) {
    var arrScript, arrCSS, arrXML, arrHTML, arrFont, arrImage, i, oResource;
    arrScript = this._arrScript = [];
    arrCSS = this._arrCSS = [];
    arrXML = this._arrXML = [];
    arrHTML = this._arrHTML = [];
    arrFont = this._arrFont = [];
    arrImage = this._arrImage = [];
    Object.defineProperty(this, "arrResources", {
        value: arrResources
    });
    this._nLoadedFiles = 0;
    this._nTotalFiles = arrResources.length;
    for ( i = 0; i < arrResources.length; i++) {
        oResource = arrResources[i];
        switch (oResource.strType) {
            case Resource.types.IMAGEXML:
            case Resource.types.XML:
                arrXML.push(oResource);
                break;
            case Resource.types.FONT_BOLD:
            case Resource.types.FONT_ITALIC:
            case Resource.types.FONT_BOLD_ITALIC:
                arrFont.push(oResource);
                break;
            case Resource.types.HTML:
                arrHTML.push(oResource);
                break;
            case Resource.types.SCRIPT:
                arrScript.push(oResource);
                break;
            case Resource.types.CSS:
                this._arrCSS.push(oResource);
                break;
            case Resource.types.IMAGE:
                arrImage.push(oResource);
                break;
        }
    }
}

Loader.prototype = {
    _arrScript: null,
    _arrCSS: null,
    _arrXML: null,
    _arrHTML: null,
    _arrFont: null,
    _arrImage: null,
    _nLoadedFiles: 0,
    _nTotalFiles: null,
    Unload: function () {
        var arrScript = this._arrScript, arrCss = this._arrCSS, i, iLen;
        for ( i = 0, iLen = arrScript.length; i < iLen; i++) {
            $("script[src='" + arrScript[i].strPath + "']").remove();
        }
        for ( i = 0, iLen = arrCss.length; i < iLen; i++) {
            $("link[href='" + arrCss[i].strPath + "']").remove();
        }
        $("style[data-id='FontFaces']").remove();
    },
    Load: function Load () {
        this._LoadFonts();
        this._LoadScriptsAndXMLs();
        this._LoadImages();
        this._LoadCSS();
        this._LoadHtml();
    },
    _LoadScriptsAndXMLs: function _LoadScriptsAndXMLs () {
        this._LoadNextFile();
    },
    _LoadNextFile: function _LoadNextFile () {
        var objThis = this, arrScript = this._arrScript, arrXML = this._arrXML, url, scriptTag;
        if (arrScript.length > 0) {
            url = arrScript[0].strPath;
            scriptTag = document.createElement("script");
            scriptTag.onload = function () {
                arrScript.splice(0, 1);
                objThis._AddCount("LoadScripts:" + url);
                objThis._LoadNextFile();
            };
            scriptTag.onerror = function () {
                objThis._OnError(url);
            };
            scriptTag.src = url;

            //dont use $("head").append(scriptTag); it wont fire the onload event
            document.head.appendChild(scriptTag);
        }
        else if (arrXML.length > 0) {
            url = arrXML[0].strPath;
            $.ajax({
                success: function (data, success) {
                    arrXML[0].oData = data;
                    arrXML.splice(0, 1);
                    objThis._AddCount("LoadXMLs:" + this.url);
                    objThis._LoadNextFile();
                },
                error: function () {
                    objThis._OnError(this.url);
                },
                type: "GET",
                url: url,
                dataType: "text xml",
                async: false,
                cache: true
            });
        }
    },
    _LoadFonts: function _LoadFonts () {
        var arrFont, oThis, strStyle, strHTML, iLen, strFontStyle, i, oFont, strPath, arrTemp, strFontFamily;
        arrFont = this._arrFont;
        iLen = arrFont.length;
        oThis = this;
        strStyle = '';
        strHTML = '';

        if (iLen > 0) {
            strStyle += "<style data-id='FontFaces'>";
            for ( i = iLen - 1; i >= 0; i--) {
                strFontStyle = "";
                oThis._AddCount("LoadFonts:");
                oFont = arrFont[i];
                strPath = oFont.strPath;
                arrTemp = strPath.split("/");
                //var strFontFamily = arrTemp[arrTemp.length - 1].replace(/\s/g, '');
                strFontFamily = decodeURIComponent(arrTemp[arrTemp.length - 1]);
                switch(oFont.strType) {
                    case Resource.types.FONT_BOLD:
                        strFontStyle = "font-weight:bold;";
                        strFontFamily = strFontFamily.substr(0, strFontFamily.length - 1);
                        break;
                    case Resource.types.FONT_ITALIC:
                        strFontStyle = "font-style:italic;";
                        strFontFamily = strFontFamily.substr(0, strFontFamily.length - 1);
                        break;
                    case Resource.types.FONT_BOLD_ITALIC:
                        strFontStyle = "font-style:italic;font-weight:bold;";
                        strFontFamily = strFontFamily.substr(0, strFontFamily.length - 2);
                        break;
                }
                strStyle += "@font-face{font-family: " + strFontFamily + ";src: local('" + strFontFamily + "'), url('" + strPath + ".ttf') format('truetype');";
                strStyle += strFontStyle;
                strStyle += "}";
                strHTML += "<span style='position:absolute;top:0;left:0;opacity:0;font-family:" + decodeURIComponent(strFontFamily) + ";" + strFontStyle + "'>dummy text</span>";
            }
            strStyle += "</style>";
            $("body").append(strHTML + strStyle);
        }
    },
    _LoadHtml: function _LoadHtml () {
        var objThis = this, arrHTML = this._arrHTML, arrTemp = [], i, html;
        for ( i = 0; i < arrHTML.length; i++) {
            html = arrHTML[i];
            arrTemp[html.strPath] = html;
            $("#" + html.strContainerID).load(html.strPath, function (responseText, textStatus, XMLHttpRequest) {
                if (textStatus === "error") {
                    objThis._OnError(html.strPath);
                }
                else {
                    objThis._AddCount("Loader.LoadHtml");
                }
            });
        }
    },
    _LoadCSS: function _LoadCSS () {
        var arrCSS = this._arrCSS, strHead = "", i;
        for ( i = 0; i < arrCSS.length; i++) {
            strHead += '<link rel="stylesheet" href="' + arrCSS[i].strPath + '" type="text/css" />';
        }
        $('head').append(strHead);
        for ( i = 0; i < arrCSS.length; i++) {
            if (arrCSS[i].strCategory) {
                $("link[href='" + arrCSS[i].strPath + "']").attr(arrCSS[i].strCategory, "1")
            }
        }
        this._AddCount("Load CSS", arrCSS.length);
    },
    _LoadImages: function () {
        var objThis, arrImages, oResource, strId, bFuture, oImage, oObjImage, i, strImagePath, oGifPreload;
        objThis = this;
        arrImages = this._arrImage;
        for ( i = 0; i < arrImages.length; i++) {
            oResource = arrImages[i];

            strId = oResource.strID;
            bFuture = Boolean(Number(oResource.bFuture));

            strImagePath = oResource.strPath;

            if (String(strImagePath).substring(strImagePath.length - 3) == "cur") {
                oImage = {};
                oImage.strId = strId;
                oImage.src = strImagePath;
                oImage.oResource = oResource;
                oImage.oResource.oData = oImage;
                //oResource.oData = oImage;
                objThis._AddCount("LoadImages:" + strImagePath);
            }
            else {
                oImage = new Image ();
                oImage.oResource = oResource;
                oImage.strId = strId;
                oImage.bFuture = bFuture;
                if (String(strImagePath).substring(strImagePath.length - 3).toLocaleLowerCase() == "gif" && BrowserCheck.bFirefox) {
                    oImage = $('<img />', {
                        src: strImagePath
                    });
                    oObjImage = oImage.get(0);
                    oObjImage.oResource = oResource;
                    oGifPreload = document.getElementById('GifPreload');
                    if (!oGifPreload) {
                        oGifPreload = $('<div />', {
                            id: 'GifPreload',
                            style: 'display:none'
                        });
                        $('body').append(oGifPreload);
                    }
                    $('#GifPreload').append(oImage);
                    oObjImage.onload = function () {
                        this.oResource.oData = this;
                        objThis._AddCount("LoadImages:" + this.src);
                        $(this).remove();
                    }
                    oObjImage.onerror = function () {
                        objThis._OnError(this.src);
                    }
                    oObjImage.bFuture = bFuture;
                    oObjImage.strId = strId;
                }
                else {

                    oImage.onload = (function () {
                        this.oResource.oData = this;
                        objThis._AddCount("LoadImages:" + this.src);
                    });

                    oImage.onerror = function () {
                        objThis._OnError(this.src);
                    }

                    oImage.src = strImagePath;
                }
            }

        }
    },
    _AddCount: function _AddCount (strOrigin, nCount) {
        if (nCount == null) {
            nCount = 1;
        }
        var objThis = this;
        this._nLoadedFiles += nCount;
        $(this).trigger(Loader.ON_PROGRESS, [this._nLoadedFiles / this._nTotalFiles * 100]);

        if (this._nLoadedFiles == this._nTotalFiles) {
            $('#GifPreload').remove();
            this._OnSuccess();

        }
    },
    _OnSuccess: function _OnSuccess () {
        var objThis = $(this);
        objThis.trigger(Loader.ON_SUCCESS);
        objThis.unbind(Loader.ALL);
    },
    _OnError: function _OnError (src) {
        var objThis = $(this);
        objThis.trigger(Loader.ON_ERROR, [src]);
        objThis.unbind(Loader.ALL);
    }
}
$.extend(Loader, {
    ON_SUCCESS: "on_success",
    ON_ERROR: "on_error",
    ON_PROGRESS: "on_progress",
    ALL: "on_progress on_error on_success"
});
