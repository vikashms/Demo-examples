/**
 * @author parthik.gosar
 */

function Resource (strType, strPath, strContainerID, strID, bFuture, strCategory) {
    Object.defineProperty(this, "strCategory", {
        value: strCategory
    });
    Object.defineProperty(this, "strContainerID", {
        value: strContainerID
    });

    Object.defineProperty(this, "strType", {
        value: strType
    });
    Object.defineProperty(this, "strPath", {
        value: strPath
    });
    Object.defineProperty(this, "strID", {
        value: strID
    });
    Object.defineProperty(this, "bFuture", {
        value: bFuture
    });
    Object.defineProperty(this, "oData", {
        get: this._GetData,
        set: this._SetData
    });
}

Resource.prototype = {
    _oData: null,
    _GetData: function _GetData () {
        return this._oData;
    },
    _SetData: function _SetData (value) {
        this._oData = value;
    }
}
Resource.types = {
    SCRIPT: "script",
    CSS: "css",
    XML: "xml",
    IMAGE: "images",
    HTML: "html",
    IMAGEXML: "imagexml",
    FONT: "font",
    FONT_BOLD: "font_bold",
    FONT_ITALIC: "font_italic",
    FONT_BOLD_ITALIC: "font_bold_italic"

}