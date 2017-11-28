KindEditor.plugin('media', function(K) {
    var self = this, name = 'media', lang = self.lang(name + '.');
    
    self.plugin.media = {
        edit : function() {
            var html = [
                '<div style="padding:20px;">',
                //url
                '<div class="ke-dialog-row">',
                '<label for="keUrl" style="width:60px;">MP4地址</label>',
                '<input class="ke-input-text" type="text"  style="width:260px;" id="keUrl" name="url" value="" style="width:160px;" />  ',
                '<input type="button" style="display:none;"  class="ke-upload-button" value="' + lang.upload + '" />  ',
                '<span class="ke-button-common ke-button-outer" style="display:none;" >',
                '<input type="button" style="display:none;"  class="ke-button-common ke-button" name="viewServer" value="' + lang.viewServer + '" />',
                '</span>',
                '</div>',
                //Webm地址
                '<div class="ke-dialog-row">',
                '<label for="keWidth" style="width:60px;">Webm地址</label>',
                '<input type="text" id="keWidth"  style="width:260px;" class="ke-input-text ke-input-number" name="width" value=""  />',
                '</div>',
                //缩略图地址
                '<div class="ke-dialog-row">',
                '<label for="keHeight" style="width:60px;">缩略图地址</label>',
                '<input type="text" id="keHeight"  style="width:260px;" class="ke-input-text ke-input-number" name="height" value=""  />',
                '</div>',
//                //autostart
//                '<div class="ke-dialog-row">',
//                '<label for="keAutostart">' + lang.autostart + '</label>',
//                '<input type="checkbox" id="keAutostart" name="autostart" value="" /> ',
//                '</div>',
                '</div>'
            ].join('');
            var dialog = self.createDialog({
                name : name,
                width : 450,
                height : 230,
                title : self.lang(name),
                body : html,
                yesBtn : {
                    name : self.lang('yes'),
                    click : function(e) {
                        var url = K.trim(urlBox.val()),
                            width = widthBox.val(),
                            height = heightBox.val();
                        if (url == 'http://' || K.invalidUrl(url)) {
                            alert(self.lang('invalidUrl'));
                            urlBox[0].focus();
                            return;
                        }
                        if (width == 'http://' || K.invalidUrl(width)) {
                            alert(self.lang('invalidUrl'));
                            widthBox[0].focus();
                            return;
                        }
                        if (height == 'http://' || K.invalidUrl(height)) {
                            alert(self.lang('invalidUrl'));
                            heightBox[0].focus();
                            return;
                        }
                        var html = K.mediaImg(self.themesPath + 'common/blank.gif', {
                                src : url,
                                type : width,
                                poster : height
                            });
                        self.insertHtml(html).hideDialog().focus();
                    }
                }
            }),
            div = dialog.div,
            urlBox = K('[name="url"]', div),
            widthBox = K('[name="width"]', div),
            heightBox = K('[name="height"]', div);


            var img = self.plugin.getSelectedMedia();
            if (img) {
                urlBox.val(img.attr('alt'));
                widthBox.val(img.attr('title'));
                heightBox.val(img.attr('src'));
            }
            urlBox[0].focus();
            urlBox[0].select();
        },
        'delete' : function() {
            self.plugin.getSelectedMedia().remove();
            // [IE] 删除图片后立即点击图片按钮出错
            self.addBookmark();
        }
    };
    self.clickToolbar(name, self.plugin.media.edit);
});